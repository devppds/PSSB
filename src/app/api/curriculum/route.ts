import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare/cloudflare-context';

export const dynamic = 'force-dynamic';

// GET - Fetch all curriculum data
export async function GET(req: NextRequest) {
    try {
        const ctx = await getCloudflareContext();
        const env = ctx.env as unknown as { DB: any };

        const [categoriesRes, itemsRes, contentsRes] = await Promise.all([
            env.DB.prepare('SELECT * FROM materi_categories ORDER BY order_index ASC').all(),
            env.DB.prepare('SELECT * FROM materi_items ORDER BY order_index ASC').all(),
            env.DB.prepare('SELECT * FROM materi_contents ORDER BY order_index ASC').all()
        ]);

        return NextResponse.json({
            categories: categoriesRes.results,
            items: itemsRes.results,
            contents: contentsRes.results
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST - Update or create curriculum item/content
export async function POST(req: NextRequest) {
    try {
        const { type, data } = await req.json();
        const ctx = await getCloudflareContext();
        const env = ctx.env as unknown as { DB: any };

        if (type === 'category') {
            await env.DB.prepare(`
                INSERT INTO materi_categories (id, name, order_index)
                VALUES (?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET
                    name = excluded.name,
                    order_index = excluded.order_index
            `).bind(data.id || null, data.name, data.order_index || 0).run();
        } else if (type === 'item') {
            await env.DB.prepare(`
                INSERT INTO materi_items (id, category_id, title, age, size, description, order_index)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET
                    category_id = excluded.category_id,
                    title = excluded.title,
                    age = excluded.age,
                    size = excluded.size,
                    description = excluded.description,
                    order_index = excluded.order_index
            `).bind(
                data.id || null,
                data.category_id,
                data.title,
                data.age,
                data.size || 'materi-item-med',
                data.description,
                data.order_index || 0
            ).run();
        } else if (type === 'content') {
            await env.DB.prepare(`
                INSERT INTO materi_contents (id, item_id, section_type, group_title, icon_type, label, order_index)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET
                    item_id = excluded.item_id,
                    section_type = excluded.section_type,
                    group_title = excluded.group_title,
                    icon_type = excluded.icon_type,
                    label = excluded.label,
                    order_index = excluded.order_index
            `).bind(
                data.id || null,
                data.item_id,
                data.section_type,
                data.group_title,
                data.icon_type,
                data.label,
                data.order_index || 0
            ).run();
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE - Remove curriculum item/content
export async function DELETE(req: NextRequest) {
    try {
        const { type, id } = await req.json();
        const ctx = await getCloudflareContext();
        const env = ctx.env as unknown as { DB: any };

        if (type === 'category') {
            await env.DB.prepare('DELETE FROM materi_categories WHERE id = ?').bind(id).run();
        } else if (type === 'item') {
            await env.DB.prepare('DELETE FROM materi_items WHERE id = ?').bind(id).run();
        } else if (type === 'content') {
            await env.DB.prepare('DELETE FROM materi_contents WHERE id = ?').bind(id).run();
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
