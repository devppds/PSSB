
import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare/cloudflare-context';

export async function POST(req: NextRequest) {
    try {
        const { items } = await req.json();

        if (!Array.isArray(items)) {
            return NextResponse.json({ error: 'Items must be an array' }, { status: 400 });
        }

        const ctx = await getCloudflareContext();
        const env = ctx.env as unknown as { DB: any };
        if (!env.DB) {
            throw new Error('Database binding not found');
        }

        // Batch upsert for gallery items
        const queries = items.map(item => {
            return env.DB.prepare(`
                INSERT OR REPLACE INTO site_gallery (id, title, category, image_url, order_index)
                VALUES (?, ?, ?, ?, ?)
            `).bind(item.id || null, item.title, item.category, item.image_url, item.order_index || 0);
        });

        await env.DB.batch(queries);

        return NextResponse.json({ success: true, message: 'Gallery updated successfully' });

    } catch (error: any) {
        console.error('Gallery Update Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();
        const ctx = await getCloudflareContext();
        const env = ctx.env as unknown as { DB: any };

        await env.DB.prepare('DELETE FROM site_gallery WHERE id = ?').bind(id).run();
        return NextResponse.json({ success: true, message: 'Item deleted' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
