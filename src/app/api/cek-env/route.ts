import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  // Kita cek apakah variabel terbaca di server Cloudflare
  const debugInfo = {
    // Cek keberadaan variabel (TIDAK MENAMPILKAN NILAI ASLI DEMI KEAMANAN)
    has_auth_secret: !!process.env.AUTH_SECRET,
    auth_secret_length: process.env.AUTH_SECRET ? process.env.AUTH_SECRET.length : 0,
    
    has_google_id: !!process.env.AUTH_GOOGLE_ID,
    google_id_preview: process.env.AUTH_GOOGLE_ID ? process.env.AUTH_GOOGLE_ID.substring(0, 10) + '...' : 'MISSING',
    
    has_auth_url: !!process.env.AUTH_URL,
    auth_url_value: process.env.AUTH_URL,
    
    node_env: process.env.NODE_ENV,
    
    // Cek Cloudinary sekalian
    has_cloudinary: !!process.env.CLOUDINARY_CLOUD_NAME,
  };

  return NextResponse.json(debugInfo, { status: 200 });
}
