-- Payment Seed Data Sesuai Gambar Terbaru

-- 1. Tahunan Baru
DELETE FROM global_content WHERE section_slug = 'pembayaran-tahunan-baru';
INSERT INTO global_content (section_slug, label, amount, order_index) VALUES 
('pembayaran-tahunan-baru', 'Uang Gedung Santri Baru', '545.000', 1),
('pembayaran-tahunan-baru', 'Uang Pangkal Santri Baru', '25.000', 2),
('pembayaran-tahunan-baru', 'Buku Tata Tertib', '3.000', 3),
('pembayaran-tahunan-baru', 'Buku Istighotsah', '15.000', 4),
('pembayaran-tahunan-baru', 'Administrasi', '5.000', 5),
('pembayaran-tahunan-baru', 'Pendidikan', '5.000', 6),
('pembayaran-tahunan-baru', 'Jam’iyyah Pusat', '16.000', 7),
('pembayaran-tahunan-baru', 'Jam’iyyah Far’iyyah', '17.000', 8),
('pembayaran-tahunan-baru', 'Kalender', '25.000', 9),
('pembayaran-tahunan-baru', 'Buku 3 Tokoh', '16.000', 10),
('pembayaran-tahunan-baru', 'LBM', '16.500', 11),
('pembayaran-tahunan-baru', 'Kas Keuangan', '1.500', 12),
('pembayaran-tahunan-baru', 'Haul Haflah*', '15.000', 13),
('pembayaran-tahunan-baru', 'Ta’dhim Maulid', '15.000', 14);

-- 2. Tahunan Lama
DELETE FROM global_content WHERE section_slug = 'pembayaran-tahunan-lama';
INSERT INTO global_content (section_slug, label, amount, order_index) VALUES 
('pembayaran-tahunan-lama', 'Uang Gedung Santri Lama', '35.000', 1),
('pembayaran-tahunan-lama', 'Administrasi', '5.000', 2),
('pembayaran-tahunan-lama', 'Pendidikan', '5.000', 3),
('pembayaran-tahunan-lama', 'Jam’iyyah Pusat', '16.000', 4),
('pembayaran-tahunan-lama', 'Jam’iyyah Far’iyyah', '17.000', 5),
('pembayaran-tahunan-lama', 'Kalender', '25.000', 6),
('pembayaran-tahunan-lama', 'LBM', '16.500', 7),
('pembayaran-tahunan-lama', 'Kas Keuangan', '1.500', 8),
('pembayaran-tahunan-lama', 'Haul Haflah*', '15.000', 9),
('pembayaran-tahunan-lama', 'Ta’dhim Maulid', '15.000', 10);

-- 3. Bulanan
DELETE FROM global_content WHERE section_slug = 'pembayaran-bulanan';
INSERT INTO global_content (section_slug, label, amount, order_index) VALUES 
('pembayaran-bulanan', 'Perawatan Sarana', '5.000', 1),
('pembayaran-bulanan', 'Syahriyah', '9.000', 2),
('pembayaran-bulanan', 'Pembangunan', '30.000', 3),
('pembayaran-bulanan', 'Listrik dan Pengairan', '12.500', 4),
('pembayaran-bulanan', 'KBR', '2.000', 5),
('pembayaran-bulanan', 'Kesehatan', '1.000', 6),
('pembayaran-bulanan', 'Kas Yayasan', '500', 7);

-- 4. Ketentuan Pembayaran
DELETE FROM global_content WHERE section_slug = 'pembayaran-ketentuan';
INSERT INTO global_content (section_slug, label, order_index) VALUES 
('pembayaran-ketentuan', 'Setiap santri wajib membayar syahriyah 3 bulan pertama + syahriyah pertahun.', 1),
('pembayaran-ketentuan', 'Santri dikenakan iuran maklumat sebesar Rp. 200.000 yang akan disalurkan untuk pembelian tanah.', 2),
('pembayaran-ketentuan', 'Pembayaran dana pembangunan, maklumat, dan sumbangan gedung santri baru dihitung per KK.', 3),
('pembayaran-ketentuan', 'Dalam satu tahun syahriyah dibayarkan dalam 3 tahap (Bulan Syawal, Muharam, Jumadil Ula).', 4),
('pembayaran-ketentuan', 'Iuran pembayaran di atas belum termasuk pembayaran MHM, MIU, Iuran Daerah dan Kas Kamar.', 5),
('pembayaran-ketentuan', 'Santri Tamatan (MA Smt. 6, 3 Ulya dan 3 Wustho) dikenakan iuran tambahan Haul Haflah sebesar Rp. 100.000.', 6);

-- 5. Settings for Summary
INSERT OR REPLACE INTO site_settings (key, value) VALUES ('estimasi_baru', '898.500');
INSERT OR REPLACE INTO site_settings (key, value) VALUES ('estimasi_lama', '329.500');
INSERT OR REPLACE INTO site_settings (key, value) VALUES ('biaya_tahunan_baru', '720.000');
INSERT OR REPLACE INTO site_settings (key, value) VALUES ('biaya_tahunan_lama', '151.000');
