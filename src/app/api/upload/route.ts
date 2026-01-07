
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Convert file to base64
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString('base64');
        const dataURI = `data:${file.type};base64,${base64}`;

        // Upload to Cloudinary
        const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dceamfy3n/image/upload';
        const uploadData = new FormData();
        uploadData.append('file', dataURI);
        uploadData.append('upload_preset', 'ml_default'); // You may need to create this preset in Cloudinary

        const response = await fetch(cloudinaryUrl, {
            method: 'POST',
            body: uploadData,
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error?.message || 'Upload failed');
        }

        return NextResponse.json({
            success: true,
            url: result.secure_url
        });
    } catch (error: any) {
        console.error('Upload Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
