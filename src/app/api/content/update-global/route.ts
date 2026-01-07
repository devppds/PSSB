
import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare/cloudflare-context';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const { items } = await req.json();
        const ctx = await getCloudflareContext();
        const env = ctx.env as unknown as { DB: any };

        if (!items || !Array.isArray(items)) {
            return NextResponse.json({ error: 'Invalid items layout' }, { status: 400 });
        }

        const statements = items.map(item => {
            return env.DB.prepare(`
                INSERT INTO global_content (id, section_slug, label, description, icon, category, amount, order_index)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET
                    section_slug = excluded.section_slug,
                    label = excluded.label,
                    description = excluded.description,
                    icon = excluded.icon,
                    category = excluded.category,
                    amount = excluded.amount,
                    order_index = excluded.order_index
            `).bind(
                item.id || null,
                item.section_slug,
                item.label,
                item.description || null,
                item.icon || null,
                item.category || null,
                item.amount || null,
                item.order_index || 0
            );
        });

        await env.DB.batch(statements);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Update Global Content Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
