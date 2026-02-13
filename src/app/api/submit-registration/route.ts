import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare/cloudflare-context';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Resend } from 'resend';

// Helper to upload buffer to Cloudinary using fetch (Edge compatible)
const uploadToCloudinary = async (buffer: Buffer, folder: string, filename?: string): Promise<string | null> => {
    const cloudName = 'dceamfy3n';
    const uploadPreset = 'ml_default'; // Using the same preset as in /api/upload

    const formData = new FormData();
    const blob = new Blob([buffer]);
    formData.append('file', blob);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', folder);
    if (filename) {
        formData.append('public_id', filename);
    }

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
            method: 'POST',
            body: formData,
        });

        const result: any = await response.json();
        if (!response.ok) {
            console.error('Cloudinary upload error:', result);
            return null;
        }
        return result.secure_url || null;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        return null;
    }
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
            scan_ijazah: ijazahUrl
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
                foto_santri, scan_kk, scan_ijazah
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
            data.foto_santri, data.scan_kk, data.scan_ijazah
        ).run();

        const registrationId = dbResult.meta.last_row_id;

        // EMAIL NOTIFICATION & PDF GENERATION
        try {
            const settingsRes = await env.DB.prepare('SELECT key, value FROM site_settings').all();
            const settings = settingsRes.results.reduce((acc: any, item: any) => {
                acc[item.key] = item.value;
                return acc;
            }, {});

            if (settings.email_gateway_api_key) {
                const resend = new Resend(settings.email_gateway_api_key);

                // 1. Generate Official PDF
                const doc = new jsPDF();

                // Header Design
                doc.setFillColor(30, 58, 138); // Dark blue
                doc.rect(0, 0, 210, 45, 'F');

                doc.setTextColor(255, 255, 255);
                doc.setFontSize(22);
                doc.setFont("helvetica", "bold");
                doc.text("PONDOK PESANTREN DARUSSALAM", 105, 20, { align: 'center' });

                doc.setFontSize(14);
                doc.setFont("helvetica", "normal");
                doc.text("LIRBOYO - KEDIRI", 105, 28, { align: 'center' });
                doc.text("BUKTI PENDAFTARAN SANTRI BARU", 105, 38, { align: 'center' });

                // Content
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(12);
                doc.setFont("helvetica", "bold");
                doc.text(`NO. REGISTRASI: #${registrationId.toString().padStart(5, '0')}`, 20, 55);
                doc.setFont("helvetica", "normal");
                doc.text(`Tanggal: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`, 20, 62);

                // Table for Data
                autoTable(doc, {
                    startY: 70,
                    theme: 'grid',
                    head: [['Kategori', 'Informasi Detail']],
                    body: [
                        ['Nama Lengkap', `${data.nama_depan} ${data.nama_belakang}`],
                        ['NIK / No. Identitas', data.nik],
                        ['Jenjang / Kelas', data.jenjang_kelas],
                        ['Jenis Kelamin', data.jenis_kelamin],
                        ['Tempat, Tanggal Lahir', `${data.tempat_lahir}, ${data.tanggal_lahir}`],
                        ['Alamat Lengkap', `${data.alamat_jalan}, Kec. ${data.alamat_kecamatan}, ${data.alamat_kota}`],
                        ['Nama Orang Tua (Ayah)', `${data.nama_ayah_depan} ${data.nama_ayah_belakang}`],
                        ['No. HP Ortu', data.no_hp_ayah],
                    ],
                    headStyles: { fillColor: [30, 58, 138], textColor: [255, 255, 255], fontStyle: 'bold' },
                    columnStyles: {
                        0: { cellWidth: 50, fontStyle: 'bold', fillColor: [249, 250, 251] },
                        1: { cellWidth: 'auto' }
                    },
                    margin: { left: 20, right: 20 }
                });

                // Footer
                const finalY = (doc as any).lastAutoTable.finalY + 20;
                doc.setFontSize(10);
                doc.text("Kediri, " + new Date().toLocaleDateString('id-ID'), 150, finalY);
                doc.text("Panitia PPDB", 150, finalY + 10);
                doc.text("(................................)", 150, finalY + 30);

                doc.setFontSize(9);
                doc.setTextColor(150, 150, 150);
                doc.text("* Simpan dokumen ini sebagai bukti pendaftaran resmi pesantren.", 20, 280);

                const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
                const pdfUrl = await uploadToCloudinary(pdfBuffer, 'ppdb_proofs', `bukti_${registrationId}`);

                // 2. Send Email via Resend
                const targetEmail = getVal('confirm_email') || `${data.nama_depan.toLowerCase()}@example.com`; // Fallback

                await resend.emails.send({
                    from: `${settings.sender_name || 'PPDB Darussalam'} <onboarding@resend.dev>`,
                    to: targetEmail,
                    subject: `Bukti Pendaftaran - ${data.nama_depan} (#${registrationId})`,
                    html: `
                        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto;">
                            <h2 style="color: #1e3a8a;">Pendaftaran Berhasil!</h2>
                            <p>Assalamu'alaikum Wr. Wb. Bapak/Ibu <b>${data.nama_ayah_depan}</b>,</p>
                            <p>Terima kasih telah melakukan pendaftaran untuk calon santri <b>${data.nama_depan} ${data.nama_belakang}</b> di Pondok Pesantren Darussalam Lirboyo.</p>
                            <p>Bersama email ini kami lampirkan file <b>Bukti Pendaftaran (PDF)</b>. Silakan simpan file tersebut untuk keperluan verifikasi berkas saat kedatangan di pesantren.</p>
                            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                                <b>Detail Pendaftaran:</b><br/>
                                No. Registrasi: #${registrationId}<br/>
                                Jenjang: ${data.jenjang_kelas}<br/>
                                Tanggal: ${new Date().toLocaleDateString('id-ID')}
                            </div>
                            <p>Jika ada pertanyaan, silakan hubungi sekretariat PPDB melalui kontak resmi kami.</p>
                            <p>Wassalamu'alaikum Wr. Wb.</p>
                            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
                            <small style="color: #888;">Email ini dikirim otomatis oleh sistem PPDB Online Darussalam.</small>
                        </div>
                    `,
                    attachments: [
                        {
                            filename: `Bukti_Pendaftaran_${data.nama_depan}.pdf`,
                            content: pdfBuffer,
                        }
                    ]
                });

                console.log('Email sent to:', targetEmail);
            } else {
                console.warn('Email Gateway API Key not found in settings.');
            }
        } catch (mailErr) {
            console.error('Email Generation/Sending Error:', mailErr);
            // Don't fail the whole request if email fails
        }

        return NextResponse.json({ success: true, message: 'Pendaftaran Berhasil!', id: registrationId });

    } catch (error: any) {
        console.error('Registration Error:', error);
        return NextResponse.json({ success: false, message: 'Terjadi kesalahan server: ' + error.message }, { status: 500 });
    }
}

