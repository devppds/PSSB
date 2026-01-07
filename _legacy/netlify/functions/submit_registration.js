const { Pool } = require('pg');
const busboy = require('busboy');
const cloudinary = require('cloudinary').v2;

// Cloudinary Configuration
cloudinary.config({
    cloud_name: 'dceamfy3n',
    api_key: '257842458234963',
    api_secret: '4tpgYL-MxG30IhFH4qkT8KFYzwI'
});

// Database Configuration
const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_m2WaKfdqA7le@ep-hidden-glade-a1d3ihyy-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
});

exports.handler = async (event) => {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' })
        };
    }

    return new Promise((resolve) => {
        const fields = {};
        const fileUploadPromises = [];
        const bb = busboy({ headers: event.headers });

        bb.on('field', (name, val) => {
            fields[name] = val;
        });

        bb.on('file', (name, file, info) => {
            const chunks = [];
            file.on('data', (data) => chunks.push(data));
            file.on('end', () => {
                const buffer = Buffer.concat(chunks);
                if (buffer.length > 0) {
                    const promise = new Promise((res) => {
                        cloudinary.uploader.upload_stream(
                            { folder: 'ppdb_uploads' },
                            (error, result) => {
                                if (error) {
                                    console.error('Cloudinary upload error:', error);
                                    res({ name, url: null });
                                } else {
                                    res({ name, url: result.secure_url });
                                }
                            }
                        ).end(buffer);
                    }).catch(err => {
                        console.error('Stream processing error:', err);
                        return { name, url: null };
                    });
                    fileUploadPromises.push(promise);
                }
            });
        });

        bb.on('finish', async () => {
            try {
                const uploadedFiles = await Promise.all(fileUploadPromises);
                const fileUrls = {};
                uploadedFiles.forEach(f => {
                    if (f.name === 'FileUpload') fileUrls.foto_santri = f.url;
                    if (f.name === 'FileUpload1') fileUrls.scan_kk = f.url;
                    if (f.name === 'FileUpload2') fileUrls.scan_ijazah = f.url;
                });

                const data = fields;

                // Address formatting
                let full_address = data.Address1_AddressLine1 || '';
                if (data.Address1_Village && data.Address1_Village !== '-Select-') {
                    full_address = `Desa/Kel. ${data.Address1_Village}, ${full_address}`;
                }

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
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41)
                    RETURNING id
                `;

                const values = [
                    data.Name_First || '', data.Name_Last || '', data.Number || '', data.Number1 || '', data.Number2 || '', data.Dropdown || '',
                    data.SingleLine2 || '', data.Date || null,
                    data.Dropdown2 || '', data.other_agama || null, data.Dropdown1 || '',
                    data.Dropdown3 || '', data.SingleLine || '', data.SingleLine1 || '',
                    data.Name1_First || '', data.Name1_Last || '', data.Number3 || '', data.PhoneNumber_countrycode || '',
                    data.Dropdown8 || '', data.other_pendidikan_ayah || null, data.Dropdown4 || '', data.other_pekerjaan_ayah || null, data.Dropdown6 || '',
                    data.Name2_First || '', data.Name2_Last || '', data.Number4 || '', data.PhoneNumber1_countrycode || '',
                    data.Dropdown9 || '', data.other_pendidikan_ibu || null, data.Dropdown5 || '', data.other_pekerjaan_ibu || null, data.Dropdown7 || '',
                    full_address, data.Address1_AddressLine2 || '', data.Address1_City || '', data.Address1_Region || '', data.Address1_ZipCode || '', data.Address1_Country || 'Indonesia',
                    fileUrls.foto_santri || null, fileUrls.scan_kk || null, fileUrls.scan_ijazah || null
                ];

                const result = await pool.query(query, values);

                resolve({
                    statusCode: 201,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        success: true,
                        message: 'Pendaftaran Berhasil!',
                        registration_id: result.rows[0].id,
                        data: {
                            nama: `${data.Name_First || ''} ${data.Name_Last || ''}`,
                            nik: data.Number || '',
                            jenjang: data.Dropdown3 || ''
                        }
                    })
                });

            } catch (error) {
                console.error('Database INSERT Error:', error);
                resolve({
                    statusCode: 500,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        success: false,
                        message: 'Kesalahan Database: ' + error.message
                    })
                });
            }
        });

        // Handling body from Netlify (handles base64 automatically)
        if (event.body) {
            const bodyContent = event.isBase64Encoded ? Buffer.from(event.body, 'base64') : event.body;
            bb.write(bodyContent);
        }
        bb.end();
    });
};
