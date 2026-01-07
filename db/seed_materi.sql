-- Full Seed Data for Materi Ujian based on previous static content

-- 1. Categories
DELETE FROM materi_categories;
INSERT INTO materi_categories (id, name, order_index) VALUES (1, 'Madrasah Hidayatul Mubtadi''in (MHM)', 1);
INSERT INTO materi_categories (id, name, order_index) VALUES (2, 'Ma’had Aly Lirboyo', 2);
INSERT INTO materi_categories (id, name, order_index) VALUES (3, 'Madrasah Ihya'' Ulumiddin (MIU)', 3);

-- 2. Items for MHM
DELETE FROM materi_items;
INSERT INTO materi_items (id, category_id, title, age, size, order_index) VALUES (1, 1, 'MHM - I IBTIDAIYAH', '6 Tahun', 'materi-item-med', 1);
INSERT INTO materi_items (id, category_id, title, age, size, order_index) VALUES (2, 1, 'MHM - II IBTIDAIYAH', '7 Tahun', 'materi-item-med', 2);
INSERT INTO materi_items (id, category_id, title, age, size, order_index) VALUES (3, 1, 'MHM - III IBTIDAIYAH', '8 Tahun', 'materi-item-med', 3);
INSERT INTO materi_items (id, category_id, title, age, size, order_index) VALUES (4, 1, 'MHM - IV IBTIDAIYAH', '9 Tahun', 'materi-item-med', 4);
INSERT INTO materi_items (id, category_id, title, age, size, order_index) VALUES (5, 1, 'MHM - V IBTIDAIYAH', '10 Tahun', 'materi-item-med', 5);
INSERT INTO materi_items (id, category_id, title, age, size, order_index) VALUES (6, 1, 'MHM - VI IBTIDAIYAH', '11 Tahun', 'materi-item-med', 6);
INSERT INTO materi_items (id, category_id, title, age, size, order_index) VALUES (7, 1, 'MHM - I TSANAWIYAH', '12 Tahun', 'materi-item-med', 7);
INSERT INTO materi_items (id, category_id, title, age, size, order_index) VALUES (8, 1, 'MHM - ALIYAH', '15 Tahun', 'materi-item-med', 8);
INSERT INTO materi_items (id, category_id, title, age, size, order_index) VALUES (9, 1, 'MADRASAH I''DADIYAH - (PERSIAPAN MHM)', NULL, 'materi-item-large', 9);

-- Items for Ma'had Aly
INSERT INTO materi_items (id, category_id, title, age, size, order_index) VALUES (10, 2, 'MA''HAD ALY - MARHALAH ULA', NULL, 'materi-item-large', 10);
INSERT INTO materi_items (id, category_id, title, age, size, order_index) VALUES (11, 2, 'MA''HAD ALY - MARHALAH TSANIYAH', NULL, 'materi-item-large', 11);

-- Items for MIU
INSERT INTO materi_items (id, category_id, title, age, size, order_index) VALUES (12, 3, 'MIU - Kelas I Ula', NULL, 'materi-item-med', 12);
INSERT INTO materi_items (id, category_id, title, age, size, order_index) VALUES (13, 3, 'MIU - Kelas II Ula', NULL, 'materi-item-med', 13);
INSERT INTO materi_items (id, category_id, title, age, size, order_index) VALUES (14, 3, 'MIU - Kelas III Ula', NULL, 'materi-item-med', 14);
INSERT INTO materi_items (id, category_id, title, age, size, order_index) VALUES (15, 3, 'MIU - Kelas I Wustho', NULL, 'materi-item-med', 15);
INSERT INTO materi_items (id, category_id, title, age, size, order_index) VALUES (16, 3, 'MIU - Kelas I Ulya', NULL, 'materi-item-med', 16);
INSERT INTO materi_items (id, category_id, title, age, size, order_index) VALUES (17, 3, 'MIU - Kelas I''dadiyah', NULL, 'materi-item-med', 17);

-- 3. Contents for MHM I Ibtida
DELETE FROM materi_contents;
INSERT INTO materi_contents (item_id, section_type, icon_type, label, order_index) VALUES (1, 'kurikulum', 'check', 'CTBQ An-Nahdliyah', 1);
INSERT INTO materi_contents (item_id, section_type, icon_type, label, order_index) VALUES (1, 'kurikulum', 'check', 'Ilmu Tauhid I', 2);
INSERT INTO materi_contents (item_id, section_type, icon_type, label, order_index) VALUES (1, 'kurikulum', 'check', 'Fasholatan I', 3);
INSERT INTO materi_contents (item_id, section_type, icon_type, label, order_index) VALUES (1, 'kurikulum', 'check', 'Ilmu Akhlaq I', 4);
INSERT INTO materi_contents (item_id, section_type, icon_type, label, order_index) VALUES (1, 'kurikulum', 'check', 'Ta’limul Lughah I', 5);
INSERT INTO materi_contents (item_id, section_type, icon_type, label, order_index) VALUES (1, 'kurikulum', 'check', 'Terampil Menulis Arab dan Pegon I', 6);
INSERT INTO materi_contents (item_id, section_type, icon_type, label, order_index) VALUES (1, 'kurikulum', 'check', 'Hidayatul Mubtadi’ I', 7);
INSERT INTO materi_contents (item_id, section_type, icon_type, label, order_index) VALUES (1, 'kurikulum', 'cap', 'Indo I', 8);
INSERT INTO materi_contents (item_id, section_type, icon_type, label, order_index) VALUES (1, 'kurikulum', 'cap', 'Daerah I', 9);
INSERT INTO materi_contents (item_id, section_type, icon_type, label, order_index) VALUES (1, 'kurikulum', 'cap', 'MTK I', 10);
INSERT INTO materi_contents (item_id, section_type, icon_type, label, order_index) VALUES (1, 'kurikulum', 'cap', 'PKN I', 11);

-- MHM V Ibtida Ujian
INSERT INTO materi_contents (item_id, section_type, group_title, icon_type, label, order_index) VALUES (5, 'materi', 'UJIAN TULIS', 'edit', 'Tauhid (Zadul Mubtadi’)', 1);
INSERT INTO materi_contents (item_id, section_type, group_title, icon_type, label, order_index) VALUES (5, 'materi', 'UJIAN TULIS', 'edit', 'Fiqh (Hidayatul Mubtadi’ IV)', 2);
INSERT INTO materi_contents (item_id, section_type, group_title, icon_type, label, order_index) VALUES (5, 'materi', 'UJIAN TULIS', 'edit', 'Imla’ (Pegon)', 3);
INSERT INTO materi_contents (item_id, section_type, group_title, icon_type, label, order_index) VALUES (5, 'materi', 'UJIAN LISAN', 'mic', 'Fasholatan lengkap', 4);
INSERT INTO materi_contents (item_id, section_type, group_title, icon_type, label, order_index) VALUES (5, 'materi', 'UJIAN LISAN', 'mic', 'Surat pendek (An-Naas s.d. Al-Kafirun)', 5);
INSERT INTO materi_contents (item_id, section_type, group_title, icon_type, label, order_index) VALUES (5, 'materi', 'UJIAN LISAN', 'mic', 'Aqo’id 50', 6);

-- Hero Settings (Site Settings)
DELETE FROM site_settings;
INSERT INTO site_settings (key, value) VALUES ('ta_info', 'TA. 1446 - 1447 H. / 2025 - 2026 M.');
INSERT INTO site_settings (key, value) VALUES ('whatsapp_number', '6285156644026');
INSERT INTO site_settings (key, value) VALUES ('hero_title', 'Pondok Pesantren');
INSERT INTO site_settings (key, value) VALUES ('hero_title_gradient', 'Darussalam Lirboyo');
INSERT INTO site_settings (key, value) VALUES ('hero_subtitle', 'Mencetak Generasi Bertakwa, Berakhlak Qur''ani dan As-Sunnah dan Berilmu dengan Memadukan Tradisi Salaf dan Modern.');
