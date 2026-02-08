import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { getCloudflareContext } from '@opennextjs/cloudflare/cloudflare-context';

export const runtime = 'edge';

// Helper to upload buffer to Cloudinary
const uploadToCloudinary = (buffer: Buffer, folder: string, filename?: string): Promise<string | null> => {
    // Configure Cloudinary inside to ensure environment variables are ready if needed
    cloudinary.config({
        cloud_name: 'dceamfy3n',
        api_key: '257842458234963',
        api_secret: '4tpgYL-MxG30IhFH4qkT8KFYzwI'
    });

    return new Promise((resolve) => {
        cloudinary.uploader.upload_stream(
            {
                folder: folder,
                public_id: filename,
                resource_type: 'raw' // Important for PDF
            },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    resolve(null);
                } else {
                    resolve(result?.secure_url || null);
                }
            }
        ).end(buffer);
    });
};

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const ctx = await getCloudflareContext();
        const env = ctx.env as unknown as { DB: any };
        if (!env.DB) throw new Error('Database binding not found');

        // Extract basic fields
        const getVal = (key: string) => formData.get(key)?.toString() || '';

        // File Handling
        const fotoSantri = formData.get('FileUpload') as File | null;
        const scanKK = formData.get('FileUpload1') as File | null;
        const scanIjazah = formData.get('FileUpload2') as File | null;

        let fotoUrl = null;
        let kkUrl = null;
        let ijazahUrl = null;

        if (fotoSantri && fotoSantri.size > 0) {
            const arrayBuffer = await fotoSantri.arrayBuffer();
            fotoUrl = await uploadToCloudinary(Buffer.from(arrayBuffer), 'ppdb_uploads');
        }
        if (scanKK && scanKK.size > 0) {
            const arrayBuffer = await scanKK.arrayBuffer();
            kkUrl = await uploadToCloudinary(Buffer.from(arrayBuffer), 'ppdb_uploads');
        }
        if (scanIjazah && scanIjazah.size > 0) {
            const arrayBuffer = await scanIjazah.arrayBuffer();
            ijazahUrl = await uploadToCloudinary(Buffer.from(arrayBuffer), 'ppdb_uploads');
        }

        const data = {
            nama_depan: getVal('Name_First'),
            nama_belakang: getVal('Name_Last'),
            nik: getVal('Number'),
            no_kk: getVal('Number1'),
            nisn: getVal('Number2'),
            jenis_kelamin: getVal('Dropdown'),
            tempat_lahir: getVal('SingleLine2'),
            tanggal_lahir: getVal('Date'),
            agama: getVal('Dropdown2'),
            agama_lainnya: getVal('other_agama') || null,
            pendidikan_terakhir: getVal('Dropdown1'),
            jenjang_kelas: getVal('Dropdown3'),
            hobi: getVal('SingleLine'),
            cita_cita: getVal('SingleLine1'),
            nama_ayah_depan: getVal('Name1_First'),
            nama_ayah_belakang: getVal('Name1_Last'),
            nik_ayah: getVal('Number3'),
            no_hp_ayah: getVal('PhoneNumber_countrycode'),
            pendidikan_ayah: getVal('Dropdown8'),
            pendidikan_ayah_lainnya: getVal('other_pendidikan_ayah') || null,
            pekerjaan_ayah: getVal('Dropdown4'),
            pekerjaan_ayah_lainnya: getVal('other_pekerjaan_ayah') || null,
            penghasilan_ayah: getVal('Dropdown6'),
            nama_ibu_depan: getVal('Name2_First'),
            nama_ibu_belakang: getVal('Name2_Last'),
            nik_ibu: getVal('Number4'),
            no_hp_ibu: getVal('PhoneNumber1_countrycode'),
            pendidikan_ibu: getVal('Dropdown9'),
            pendidikan_ibu_lainnya: getVal('other_pendidikan_ibu') || null,
            pekerjaan_ibu: getVal('Dropdown5'),
            pekerjaan_ibu_lainnya: getVal('other_pekerjaan_ibu') || null,
            penghasilan_ibu: getVal('Dropdown7'),
            alamat_jalan: getVal('Address1_AddressLine1'),
            alamat_kecamatan: getVal('Address1_AddressLine2'),
            alamat_kota: getVal('Address1_City'),
            alamat_provinsi: getVal('Address1_Region'),
            alamat_kode_pos: getVal('Address1_ZipCode'),
            alamat_negara: 'Indonesia',
            foto_santri: fotoUrl,
            scan_kk: kkUrl,
            scan_ijazah: ijazahUrl,
            login_email: getVal('confirm_email') // This will be the Gmail from session
        };

        const query = `
            INSERT INTO pendaftaran_santri (
                nama_depan, nama_belakang, nik, no_kk, nisn, jenis_kelamin,
                tempat_lahir, tanggal_lahir, agama, agama_lainnya, pendidikan_terakhir,
                jenjang_kelas, hobi, cita_cita,
                nama_ayah_depan, nama_ayah_belakang, nik_ayah, no_hp_ayah,
                pendidikan_ayah, pendidikan_ayah_lainnya, pekerjaan_ayah, pekerjaan_ayah_lainnya, penghasilan_ayah,
                nama_ibu_depan, nama_ibu_belakang, nik_ibu, no_hp_ibu,
                pendidikan_ibu, pendidikan_ibu_lainnya, pekerjaan_ibu, pekerjaan_ibu_lainnya, penghasilan_ibu,
                alamat_jalan, alamat_kecamatan, alamat_kota, alamat_provinsi, alamat_kode_pos, alamat_negara,
                foto_santri, scan_kk, scan_ijazah, login_email
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const dbResult = await env.DB.prepare(query).bind(
            data.nama_depan, data.nama_belakang, data.nik, data.no_kk, data.nisn, data.jenis_kelamin,
            data.tempat_lahir, data.tanggal_lahir, data.agama, data.agama_lainnya, data.pendidikan_terakhir,
            data.jenjang_kelas, data.hobi, data.cita_cita,
            data.nama_ayah_depan, data.nama_ayah_belakang, data.nik_ayah, data.no_hp_ayah,
            data.pendidikan_ayah, data.pendidikan_ayah_lainnya, data.pekerjaan_ayah, data.pekerjaan_ayah_lainnya, data.penghasilan_ayah,
            data.nama_ibu_depan, data.nama_ibu_belakang, data.nik_ibu, data.no_hp_ibu,
            data.pendidikan_ibu, data.pendidikan_ibu_lainnya, data.pekerjaan_ibu, data.pekerjaan_ibu_lainnya, data.penghasilan_ibu,
            data.alamat_jalan, data.alamat_kecamatan, data.alamat_kota, data.alamat_provinsi, data.alamat_kode_pos, data.alamat_negara,
            data.foto_santri, data.scan_kk, data.scan_ijazah, data.login_email
        ).run();

        const registrationId = dbResult.meta.last_row_id;

        return NextResponse.json({ success: true, message: 'Pendaftaran Berhasil!', id: registrationId });

    } catch (error: any) {
        console.error('Registration Error:', error);
        return NextResponse.json({ success: false, message: 'Terjadi kesalahan server: ' + error.message }, { status: 500 });
    }
}

