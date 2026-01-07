
import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare/cloudflare-context';

export async function POST(req: NextRequest) {
    try {
        const ctx = await getCloudflareContext();
        const env = ctx.env as unknown as { DB: any };

        if (!env.DB) {
            throw new Error('Database binding not found');
        }

        const body = await req.json();
        const { settings } = body; // Expected format: { "key": "value", ... }

        if (!settings || typeof settings !== 'object') {
            return NextResponse.json({ error: 'Invalid settings format' }, { status: 400 });
        }

        const statements = Object.entries(settings).map(([key, value]) => {
            return env.DB.prepare('INSERT OR REPLACE INTO site_settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)')
                .bind(key, String(value));
        });

        await env.DB.batch(statements);

        return NextResponse.json({ success: true, message: 'Settings updated successfully' });
    } catch (error: any) {
        console.error('Update Settings Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
