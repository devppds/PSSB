
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

        // Fetch Categories
        const { results: categories } = await env.DB.prepare('SELECT * FROM materi_categories ORDER BY order_index ASC').all();

        // Fetch Items
        const { results: items } = await env.DB.prepare('SELECT * FROM materi_items ORDER BY order_index ASC').all();

        // Fetch Contents
        const { results: contents } = await env.DB.prepare('SELECT * FROM materi_contents ORDER BY order_index ASC').all();

        // Structure the data
        const data = categories.map((cat: any) => {
            return {
                ...cat,
                items: items
                    .filter((item: any) => item.category_id === cat.id)
                    .map((item: any) => {
                        return {
                            ...item,
                            kurikulum: contents.filter((c: any) => c.item_id === item.id && c.section_type === 'kurikulum'),
                            materi: contents.filter((c: any) => c.item_id === item.id && c.section_type === 'materi')
                        };
                    })
            };
        });

        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Fetch Materi Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
