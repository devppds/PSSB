-- Comprehensive Seed Data for Global Website Content

-- 1. Programs (Section: program-unggulan)
DELETE FROM global_content WHERE section_slug = 'program-unggulan';
INSERT INTO global_content (section_slug, label, description, icon, order_index) VALUES 
('program-unggulan', 'Bahtsul Masa''il', 'Forum diskusi hukum Islam tingkat lanjut.', 'fa-comments', 1),
('program-unggulan', 'Kitab Kuning', 'Kurikulum kitab salaf klasik terlengkap.', 'fa-book', 2),
('program-unggulan', 'Ziaroh Wali & Ulama', 'Kegiatan spiritual tahunan santri.', 'fa-place-of-worship', 3);

-- 2. Programs Additional (Section: program-tambahan)
DELETE FROM global_content WHERE section_slug = 'program-tambahan';
INSERT INTO global_content (section_slug, label, description, icon, order_index) VALUES 
('program-tambahan', 'Takhossus Arab (Nahwu Shorof)', 'Pendalaman tata bahasa Arab intensif.', 'fa-language', 1),
('program-tambahan', 'Pengajian Bandongan/Kilatan', 'Metode klasikal pembacaan kitab oleh Masyayikh.', 'fa-microphone-alt', 2),
('program-tambahan', 'Bahtsul Masa''il Kubro', 'Forum musyawarah antar santri se-Jawa.', 'fa-users', 3);

-- 3. Misi (Section: misi)
DELETE FROM global_content WHERE section_slug = 'misi';
INSERT INTO global_content (section_slug, label, order_index) VALUES 
('misi', 'Mengembangkan ilmu agama berbasis pada kitab mu''tabaroh', 1),
('misi', 'Menumbuhkan kecintaan membaca, menulis dan berkarya', 2),
('misi', 'Membangun karakter bertanggung jawab dan taat pada norma sosial dan agama', 3);

-- 4. Ekstrakurikuler (Section: ekskul)
DELETE FROM global_content WHERE section_slug = 'ekskul';
INSERT INTO global_content (section_slug, label, icon, category, order_index) VALUES 
('ekskul', 'Pembinaan Organisasi', 'check-circle', 'umum', 1),
('ekskul', 'Seni Baca Al-Qur’an', 'check-circle', 'seni', 2),
('ekskul', 'Pelatihan Rebana', 'check-circle', 'seni', 3),
('ekskul', 'Pelatihan Khitobah', 'check-circle', 'keterampilan', 4),
('ekskul', 'Pelatihan Public Speaking', 'check-circle', 'keterampilan', 5),
('ekskul', 'Pelatihan Komputer', 'check-circle', 'keterampilan', 6);

-- 5. Alur Pendaftaran (Section: alur)
DELETE FROM global_content WHERE section_slug = 'alur';
INSERT INTO global_content (section_slug, label, description, order_index) VALUES 
('alur', 'Isi Data Diri', 'Mendaftarkan akun dan mengisi biodata lengkap sesuai KK dan dokumen resmi.', 1),
('alur', 'Unggah Berkas', 'Melampirkan pas foto, scan kartu keluarga, dan akta kelahiran.', 2),
('alur', 'Verifikasi', 'Proses validasi data oleh tim sekretariat dan penerbitan nomor ujian.', 3);

-- 6. Persyaratan Foto (Section: syarat-foto)
DELETE FROM global_content WHERE section_slug = 'syarat-foto';
INSERT INTO global_content (section_slug, label, order_index) VALUES 
('syarat-foto', 'Background Biru Polos', 1),
('syarat-foto', 'Baju Putih Berkerah', 2),
('syarat-foto', 'Kopyah Hitam Polos', 3),
('syarat-foto', 'Ukuran 3x4 (Maks 5MB)', 4),
('syarat-foto', 'Rambut Rapi (Pendek)', 5),
('syarat-foto', 'Kualitas Gambar Jelas', 6);

-- 7. Gallery Initial Data
DELETE FROM site_gallery;
INSERT INTO site_gallery (category, image_url, order_index) VALUES 
('Bahtsul Masa''il', 'https://res.cloudinary.com/dceamfy3n/image/upload/v1766710616/BAHSTU_2_llh7iy.webp', 1),
('Bahtsul Masa''il', 'https://res.cloudinary.com/dceamfy3n/image/upload/v1766710605/BAHSTU_3_z4rxnv.webp', 2),
('Kitab Kuning', 'https://res.cloudinary.com/dceamfy3n/image/upload/v1766710610/NGAJI_1_oshwpt.webp', 3),
('Ziaroh Wali & Ulama', 'https://res.cloudinary.com/dceamfy3n/image/upload/v1766710632/ZIAROH_ellm9c.webp', 4);
