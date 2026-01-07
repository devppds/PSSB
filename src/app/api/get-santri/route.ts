
import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare/cloudflare-context';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const ctx = await getCloudflareContext();
        const env = ctx.env as unknown as { DB: any };
        if (!env.DB) {
            throw new Error('Database binding not found');
        }

        const { results } = await env.DB.prepare('SELECT * FROM pendaftaran_santri ORDER BY created_at DESC').all();

        return NextResponse.json(results);
    } catch (error: any) {
        console.error('Fetch Santri Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
