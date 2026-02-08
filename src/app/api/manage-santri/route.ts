import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare/cloudflare-context';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Resend } from 'resend';


interface SantriRecord {
    id: number;
    nama_depan: string;
    nama_belakang: string;
    nik: string;
    login_email: string;
    no_hp_ayah: string;
    jenjang_kelas: string;
    jenis_kelamin: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    nama_ayah_depan: string;
    nama_ayah_belakang: string;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { action, id, status, catatan } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const ctx = await getCloudflareContext();
        const env = ctx.env as unknown as { 
            DB: { 
                prepare: (sql: string) => { 
                    bind: (...args: unknown[]) => { 
                        run: () => Promise<void>; 
                        first: <T>() => Promise<T | null>;
                        all: <T>() => Promise<{ results: T[] }>;
                    };
                    all: <T>() => Promise<{ results: T[] }>;
                };
            } 
        };
        if (!env.DB) {
            throw new Error('Database binding not found');
        }

        if (action === 'delete') {
            await env.DB.prepare('DELETE FROM pendaftaran_santri WHERE id = ?').bind(id).run();
            return NextResponse.json({ success: true, message: 'Data berhasil dihapus.' });
        }

        if (action === 'update_status') {
            // Fetch santri data first to send email if verified
            const santri = await env.DB.prepare('SELECT * FROM pendaftaran_santri WHERE id = ?').bind(id).first<SantriRecord>();
            
            if (!santri) {
                return NextResponse.json({ error: 'Santri not found' }, { status: 404 });
            }

            await env.DB.prepare('UPDATE pendaftaran_santri SET status = ?, catatan_admin = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
                .bind(status, catatan, id)
                .run();

            // If verified, send official PDF
            if (status === 'Terverifikasi' && (santri.login_email || santri.no_hp_ayah)) {
                try {
                    // Re-fetching settings properly
                    const settingsQuery = await env.DB.prepare('SELECT key, value FROM site_settings').all<{ key: string; value: string }>();
                    const settings = settingsQuery.results.reduce((acc: Record<string, string>, item) => {
                        acc[item.key] = item.value;
                        return acc;
                    }, {});

                    if (settings.email_gateway_api_key) {
                        const resend = new Resend(settings.email_gateway_api_key);

                        // Generate Official PDF
                        const doc = new jsPDF();
                        doc.setFillColor(30, 58, 138);
                        doc.rect(0, 0, 210, 45, 'F');
                        doc.setTextColor(255, 255, 255);
                        doc.setFontSize(22);
                        doc.setFont("helvetica", "bold");
                        doc.text("PONDOK PESANTREN DARUSSALAM", 105, 20, { align: 'center' });
                        doc.setFontSize(14);
                        doc.setFont("helvetica", "normal");
                        doc.text("LIRBOYO - KEDIRI", 105, 28, { align: 'center' });
                        doc.text("BUKTI PENDAFTARAN RESMI (VERIFIED)", 105, 38, { align: 'center' });

                        doc.setTextColor(0, 0, 0);
                        doc.setFontSize(12);
                        doc.setFont("helvetica", "bold");
                        doc.text(`NO. REGISTRASI: #${id.toString().padStart(5, '0')}`, 20, 55);
                        doc.text(`STATUS: TERVERIFIKASI`, 150, 55);
                        
                        autoTable(doc, {
                            startY: 70,
                            theme: 'grid',
                            head: [['Kategori', 'Informasi Detail']],
                            body: [
                                ['Nama Lengkap', `${santri.nama_depan} ${santri.nama_belakang}`],
                                ['NIK', santri.nik],
                                ['Jenjang / Kelas', santri.jenjang_kelas],
                                ['Jenis Kelamin', santri.jenis_kelamin],
                                ['Tempat, Tanggal Lahir', `${santri.tempat_lahir}, ${santri.tanggal_lahir}`],
                                ['Nama Ayah', `${santri.nama_ayah_depan} ${santri.nama_ayah_belakang}`],
                                ['Kontak Ortu', santri.no_hp_ayah],
                            ],
                            headStyles: { fillColor: [30, 58, 138] }
                        });

                        const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
                        
                        // Send Email
                        const targetEmail = santri.login_email;
                        if (targetEmail) {
                            await resend.emails.send({
                                from: `${settings.sender_name || 'PPDB Darussalam'} <onboarding@resend.dev>`,
                                to: targetEmail,
                                subject: `PENDAFTARAN TERVERIFIKASI - ${santri.nama_depan} (#${id})`,
                                html: `
                                    <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto;">
                                        <h2 style="color: #1e3a8a;">Selamat! Pendaftaran Terverifikasi</h2>
                                        <p>Assalamu'alaikum Wr. Wb.,</p>
                                        <p>Kami informasikan bahwa data pendaftaran santri atas nama <b>${santri.nama_depan} ${santri.nama_belakang}</b> telah <b>DIVERIFIKASI</b> oleh panitia.</p>
                                        <p>Terlampir adalah <b>Kartu Bukti Pendaftaran Resmi</b> yang harus dibawa saat kedatangan di pesantren untuk proses selanjutnya.</p>
                                        <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #10b981;">
                                            <b>Status: TERVERIFIKASI</b><br/>
                                            No. Registrasi: #${id}<br/>
                                            Catatan Panitia: ${catatan || '-'}
                                        </div>
                                        <p>Wassalamu'alaikum Wr. Wb.</p>
                                    </div>
                                `,
                                attachments: [{ filename: `Bukti_Resmi_${santri.nama_depan}.pdf`, content: pdfBuffer }]
                            });
                        }
                    }
                } catch (err) {
                    console.error('Processing verification email error:', err);
                }
            }

            return NextResponse.json({ success: true, message: 'Status santri diperbarui.' });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

    } catch (error: unknown) {
        console.error('Manage Santri Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
