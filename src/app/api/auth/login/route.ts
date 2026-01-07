
import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare/cloudflare-context';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();
        const ctx = await getCloudflareContext();
        const env = ctx.env as unknown as { DB: any };

        const user = await env.DB.prepare('SELECT * FROM users WHERE username = ? AND password = ?')
            .bind(username, password)
            .first();

        if (user) {
            return NextResponse.json({
                success: true,
                token: 'dummy-token-' + Date.now(), // In a real app, use JWT
                username: user.username
            });
        }

        return NextResponse.json({ success: false, error: 'Kredensial salah' }, { status: 401 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
