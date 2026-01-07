
import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare/cloudflare-context';

export async function POST(req: NextRequest) {
    try {
        const { action, id, status, catatan } = await req.json();

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const ctx = await getCloudflareContext();
        const env = ctx.env as unknown as { DB: any };
        if (!env.DB) {
            throw new Error('Database binding not found');
        }

        if (action === 'delete') {
            await env.DB.prepare('DELETE FROM pendaftaran_santri WHERE id = ?').bind(id).run();
            return NextResponse.json({ success: true, message: 'Data berhasil dihapus.' });
        }

        if (action === 'update_status') {
            await env.DB.prepare('UPDATE pendaftaran_santri SET status = ?, catatan_admin = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
                .bind(status, catatan, id)
                .run();
            return NextResponse.json({ success: true, message: 'Status santri diperbarui.' });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

    } catch (error: any) {
        console.error('Manage Santri Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
