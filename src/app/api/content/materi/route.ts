
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
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { categories, items, contents } = await req.json();
        const ctx = await getCloudflareContext();
        const env = ctx.env as unknown as { DB: any };

        const queries: any[] = [];

        if (categories) {
            categories.forEach((cat: any) => {
                queries.push(env.DB.prepare('INSERT OR REPLACE INTO materi_categories (id, name, order_index) VALUES (?, ?, ?)')
                    .bind(cat.id || null, cat.name, cat.order_index || 0));
            });
        }

        if (items) {
            items.forEach((item: any) => {
                queries.push(env.DB.prepare('INSERT OR REPLACE INTO materi_items (id, category_id, title, age, size, description, order_index) VALUES (?, ?, ?, ?, ?, ?, ?)')
                    .bind(item.id || null, item.category_id, item.title, item.age, item.size, item.description, item.order_index || 0));
            });
        }

        if (contents) {
            contents.forEach((c: any) => {
                queries.push(env.DB.prepare('INSERT OR REPLACE INTO materi_contents (id, item_id, section_type, group_title, icon_type, label, order_index) VALUES (?, ?, ?, ?, ?, ?, ?)')
                    .bind(c.id || null, c.item_id, c.section_type, c.group_title, c.icon_type, c.label, c.order_index || 0));
            });
        }

        if (queries.length > 0) {
            await env.DB.batch(queries);
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
