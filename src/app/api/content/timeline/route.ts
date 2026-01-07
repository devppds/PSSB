
import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare/cloudflare-context';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const item = await req.json();
        const ctx = await getCloudflareContext();
        const env = ctx.env as unknown as { DB: any };

        // Upsert Timeline Item
        await env.DB.prepare(`
            INSERT INTO timeline_items (id, year, date_label, title, content, image_url, order_index)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
                year = excluded.year,
                date_label = excluded.date_label,
                title = excluded.title,
                content = excluded.content,
                image_url = excluded.image_url,
                order_index = excluded.order_index
        `).bind(
            item.id || null, // null for new items (auto-increment)
            item.year,
            item.date_label,
            item.title,
            item.content,
            item.image_url,
            item.order_index || 0
        ).run();

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Update Timeline Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();
        const ctx = await getCloudflareContext();
        const env = ctx.env as unknown as { DB: any };

        await env.DB.prepare('DELETE FROM timeline_items WHERE id = ?').bind(id).run();

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
