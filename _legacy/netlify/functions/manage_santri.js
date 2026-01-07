const { Client } = require('pg');

exports.handler = async (event, context) => {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    let body;
    try {
        body = JSON.parse(event.body);
    } catch (e) {
        return { statusCode: 400, body: 'Invalid JSON' };
    }

    const { action, id } = body;

    // 1. Connection to REGISTRATION DB (Source) - Data Pendaftar
    const clientSource = new Client({
        connectionString: 'postgresql://neondb_owner:npg_m2WaKfdqA7le@ep-hidden-glade-a1d3ihyy-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
    });

    try {
        await clientSource.connect();

        // --- ACTION: DELETE ---
        if (action === 'delete') {
            await clientSource.query('DELETE FROM pendaftaran_santri WHERE id = $1', [id]);
            await clientSource.end();
            return { statusCode: 200, body: JSON.stringify({ message: 'Data pendaftar berhasil dihapus.' }) };
        }

        // --- ACTION: VERIFY (Transfer to Target DB) ---
        if (action === 'verify') {
            // A. Get Data from Source (Pendaftaran)
            const res = await clientSource.query('SELECT * FROM pendaftaran_santri WHERE id = $1', [id]);
            if (res.rows.length === 0) {
                await clientSource.end();
                return { statusCode: 404, body: JSON.stringify({ error: 'Data pendaftar tidak ditemukan.' }) };
            }
            const src = res.rows[0]; // Data source

            // Prepare transformed data for Target DB
            const nama_siswa = `${src.nama_depan || ''} ${src.nama_belakang || ''}`.trim();
            const nama_ayah = `${src.nama_ayah_depan || ''} ${src.nama_ayah_belakang || ''}`.trim();
            const nama_ibu = `${src.nama_ibu_depan || ''} ${src.nama_ibu_belakang || ''}`.trim();

            // Format Tempat Tanggal Lahir: "Kediri, 2010-05-15"
            let ttl = src.tempat_lahir || '';
            if (src.tanggal_lahir) {
                const dateVal = new Date(src.tanggal_lahir).toISOString().split('T')[0];
                ttl += `, ${dateVal}`;
            }

            const tahun_masuk = new Date().getFullYear().toString(); // Tahun saat ini

            // B. Connect to TARGET DB (Database Pusat)
            const clientTarget = new Client({
                connectionString: 'postgresql://neondb_owner:npg_C8UG9lLAnoWx@ep-noisy-meadow-a1zm9l52-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
            });
            await clientTarget.connect();

            // C. Insert into 'santri' table
            // Kolom target: 
            // foto_santri, tahun_masuk, madrasah (jenjang), nik, nama_siswa, nisn, tempat_tanggal_lahir, 
            // jenis_kelamin, agama, hobi, cita_cita, kewarganegaraan, no_kk, 
            // nik_ayah, nama_ayah, pekerjaan_ayah, pendidikan_ayah, no_telp_ayah, penghasilan_ayah,
            // nik_ibu, nama_ibu, pekerjaan_ibu, pendidikan_ibu, no_telp_ibu,
            // dusun_jalan, desa_kelurahan (kecamatan?), kecamatan, kota_kabupaten, provinsi, kode_pos,
            // status_santri, created_at, updated_at

            // DETERMINE MADRASAH TYPE (MHM vs MIU)
            const jenjang_miu = ['I Ula', 'II Ula', 'III Ula', 'I Wustho', 'I Ulya'];
            let madrasahType = 'MHM'; // Default to MHM (Santri Salaf)
            if (jenjang_miu.includes(src.jenjang_kelas)) {
                madrasahType = 'MIU';
            }

            const insertQuery = `
                INSERT INTO santri (
                    foto_santri, tahun_masuk, 
                    status_mb, madrasah, kelas,
                    nik, nama_siswa, nisn, 
                    tempat_tanggal_lahir, jenis_kelamin, agama, hobi, cita_cita, kewarganegaraan, 
                    no_kk, 
                    nik_ayah, nama_ayah, pekerjaan_ayah, pendidikan_ayah, no_telp_ayah, penghasilan_ayah,
                    nik_ibu, nama_ibu, pekerjaan_ibu, pendidikan_ibu, no_telp_ibu,
                    dusun_jalan, kecamatan, kota_kabupaten, provinsi, kode_pos,
                    status_santri, created_at, updated_at
                ) VALUES (
                    $1, $2, 
                    'Baru Biasa', $30, $3,
                    $4, $5, $6, 
                    $7, $8, $9, $10, $11, $12, 
                    $13, 
                    $14, $15, $16, $17, $18, $19,
                    $20, $21, $22, $23, $24,
                    $25, $26, $27, $28, $29,
                    'Baru', NOW(), NOW()
                )
            `;

            const values = [
                src.foto_santri,            // $1
                tahun_masuk,                // $2
                src.jenjang_kelas,          // $3 (Kelas)
                src.nik,                    // $4
                nama_siswa,                 // $5
                src.nisn,                   // $6
                ttl,                        // $7
                src.jenis_kelamin,          // $8
                src.agama,                  // $9
                src.hobi,                   // $10
                src.cita_cita,              // $11
                src.alamat_negara || 'Indonesia', // $12
                src.no_kk,                  // $13
                src.nik_ayah,               // $14
                nama_ayah,                  // $15
                src.pekerjaan_ayah,         // $16
                src.pendidikan_ayah,        // $17
                src.no_hp_ayah,             // $18
                src.penghasilan_ayah,       // $19
                src.nik_ibu,                // $20
                nama_ibu,                   // $21
                src.pekerjaan_ibu,          // $22
                src.pendidikan_ibu,         // $23
                src.no_hp_ibu,              // $24
                src.alamat_jalan,           // $25
                src.alamat_kecamatan,       // $26
                src.alamat_kota,            // $27
                src.alamat_provinsi,        // $28
                src.alamat_kode_pos,        // $29
                madrasahType                // $30 (Madrasah Determined Logic)
            ];

            await clientTarget.query(insertQuery, values);
            await clientTarget.end();

            // HAPUS DATA DARI SUMBER (PENDAFTARAN) SETELAH BERHASIL DIPINDAHKAN
            await clientSource.query('DELETE FROM pendaftaran_santri WHERE id = $1', [id]);

            await clientSource.end();

            return { statusCode: 200, body: JSON.stringify({ message: 'Verifikasi Berhasil! Data telah dipindahkan ke Database Pusat dan dihapus dari antrian.' }) };
        }

        await clientSource.end();
        return { statusCode: 400, body: JSON.stringify({ error: 'Invalid action' }) };

    } catch (error) {
        console.error('SERVER ERROR:', error);
        // Safely close connections if open
        try { await clientSource.end(); } catch (e) { }

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Gagal memproses data: ' + error.message }),
        };
    }
};
