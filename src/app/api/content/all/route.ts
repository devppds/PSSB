
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

        // Fetch everything in parallel
        const [settingsRes, globalContentRes, galleryRes] = await Promise.all([
            env.DB.prepare('SELECT key, value FROM site_settings').all(),
            env.DB.prepare('SELECT * FROM global_content ORDER BY order_index ASC').all(),
            env.DB.prepare('SELECT * FROM site_gallery ORDER BY order_index ASC').all()
        ]);

        const settings = settingsRes.results.reduce((acc: any, item: any) => {
            acc[item.key] = item.value;
            return acc;
        }, {});

        // Group global content by section_slug
        const content: any = {};
        globalContentRes.results.forEach((item: any) => {
            if (!content[item.section_slug]) content[item.section_slug] = [];
            content[item.section_slug].push(item);
        });

        // Group gallery by category
        const gallery: any = {};
        galleryRes.results.forEach((item: any) => {
            if (!gallery[item.category]) gallery[item.category] = [];
            gallery[item.category].push(item.image_url);
        });

        return NextResponse.json({
            settings,
            content,
            gallery,
            gallery_list: galleryRes.results
        });
    } catch (error: any) {
        console.error('Fetch All Content Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
