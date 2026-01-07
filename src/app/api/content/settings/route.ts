
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

        const { results } = await env.DB.prepare('SELECT key, value FROM site_settings').all();

        // Convert array to object
        const settings = results.reduce((acc: any, item: any) => {
            acc[item.key] = item.value;
            return acc;
        }, {});

        return NextResponse.json(settings);
    } catch (error: any) {
        console.error('Fetch Settings Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
