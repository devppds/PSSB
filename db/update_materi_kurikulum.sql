-- Clear existing data
DELETE FROM materi_contents;
DELETE FROM materi_items;
DELETE FROM materi_categories;

-- Reset standard IDs
UPDATE sqlite_sequence SET seq = 0 WHERE name IN ('materi_categories', 'materi_items', 'materi_contents');

-- 1. MADRASAH IBTIDAIYAH (ID: 1)
INSERT INTO materi_categories (id, name, order_index) VALUES (1, 'MADRASAH IBTIDAIYAH', 1);

-- Kelas I (ID: 1)
INSERT INTO materi_items (id, category_id, title, description, order_index, size) VALUES (1, 1, 'Kelas I', 'Kelas I Ibtidaiyah tanpa ujian masuk', 1, 'materi-item-med');
INSERT INTO materi_contents (item_id, section_type, label, order_index, icon_type) VALUES 
(1, 'kurikulum', 'CTBQ An-Nahdliyah', 1, 'check'),
(1, 'kurikulum', 'Ilmu Tauhid I', 2, 'check'),
(1, 'kurikulum', 'Hidayatul Mubtadi’ I', 3, 'check'),
(1, 'kurikulum', 'Fasholatan I', 4, 'check'),
(1, 'kurikulum', 'Ilmu Akhlaq I', 5, 'check'),
(1, 'kurikulum', 'Ta’limul Lughah I', 6, 'check'),
(1, 'kurikulum', 'Terampil Menulis Arab dan Pegon I', 7, 'check'),
(1, 'kurikulum', 'Bahasa Indonesia I', 8, 'cap'),
(1, 'kurikulum', 'Bahasa Daerah I', 9, 'cap'),
(1, 'kurikulum', 'Matematika I', 10, 'cap'),
(1, 'kurikulum', 'PKN I', 11, 'cap');

-- Kelas II (ID: 2)
INSERT INTO materi_items (id, category_id, title, description, order_index, size) VALUES (2, 1, 'Kelas II', 'Kelas II Ibtidaiyah tanpa ujian masuk', 2, 'materi-item-med');
INSERT INTO materi_contents (item_id, section_type, label, order_index, icon_type) VALUES 
(2, 'kurikulum', 'CTBQ An-Nahdliyah', 1, 'check'),
(2, 'kurikulum', 'Ilmu Tauhid II', 2, 'check'),
(2, 'kurikulum', 'Hidayatul Mubtadi’ II', 3, 'check'),
(2, 'kurikulum', 'Fasholatan II', 4, 'check'),
(2, 'kurikulum', 'Ilmu Akhlaq II', 5, 'check'),
(2, 'kurikulum', 'Ta’limul Lughah II', 6, 'check'),
(2, 'kurikulum', 'Bahasa Indonesia II', 7, 'cap'),
(2, 'kurikulum', 'Bahasa Daerah II', 8, 'cap'),
(2, 'kurikulum', 'Matematika II', 9, 'cap'),
(2, 'kurikulum', 'PKN II', 10, 'cap'),
(2, 'kurikulum', 'Terampil Menulis Arab dan Pegon II', 11, 'check');

-- Kelas III (ID: 3)
INSERT INTO materi_items (id, category_id, title, description, order_index, size) VALUES (3, 1, 'Kelas III', 'Kelas III Ibtidaiyah tanpa ujian masuk', 3, 'materi-item-med');
INSERT INTO materi_contents (item_id, section_type, label, order_index, icon_type) VALUES 
(3, 'kurikulum', 'Al-Qur’an', 1, 'check'),
(3, 'kurikulum', 'Tauhid Jawan', 2, 'check'),
(3, 'kurikulum', 'Hidayatul Mubtadi’ III', 3, 'check'),
(3, 'kurikulum', 'Fasholatan III', 4, 'check'),
(3, 'kurikulum', 'Tarikh Nabi Muhammad SAW', 5, 'check'),
(3, 'kurikulum', 'Ngudi Susilo', 6, 'check'),
(3, 'kurikulum', 'Ro’sun Sirah', 7, 'check'),
(3, 'kurikulum', 'Bahasa Indonesia III', 8, 'cap'),
(3, 'kurikulum', 'Bahasa Daerah III', 9, 'cap'),
(3, 'kurikulum', 'Matematika III', 10, 'cap'),
(3, 'kurikulum', 'PKN III', 11, 'cap'),
(3, 'kurikulum', 'Pegon I', 12, 'check');

-- Kelas IV (ID: 4)
INSERT INTO materi_items (id, category_id, title, description, order_index, size) VALUES (4, 1, 'Kelas IV', 'Tingkat Kelas IV Ibtidaiyah tanpa ujian masuk', 4, 'materi-item-med');
INSERT INTO materi_contents (item_id, section_type, label, order_index, icon_type) VALUES 
(4, 'kurikulum', 'Al-Qur’an', 1, 'check'),
(4, 'kurikulum', 'Hidayatul Mubtadi’ IV', 2, 'check'),
(4, 'kurikulum', 'Fasholatan IV', 3, 'check'),
(4, 'kurikulum', 'Zadul Mubtadi’ I', 4, 'check'),
(4, 'kurikulum', 'Nadhmul Akhlaq Alala', 5, 'check'),
(4, 'kurikulum', 'Bahasa Arab Dasar', 6, 'check'),
(4, 'kurikulum', 'Tarikh Anbiya’', 7, 'check'),
(4, 'kurikulum', 'Isra’ Mi’raj', 8, 'check'),
(4, 'kurikulum', 'Bahasa Indonesia IV', 9, 'cap'),
(4, 'kurikulum', 'Bahasa Daerah IV', 10, 'cap'),
(4, 'kurikulum', 'Matematika IV', 11, 'cap'),
(4, 'kurikulum', 'PKN IV', 12, 'cap'),
(4, 'kurikulum', 'Pegon II', 13, 'check');

-- Kelas V (ID: 5)
INSERT INTO materi_items (id, category_id, title, order_index, size) VALUES (5, 1, 'Kelas V', 5, 'materi-item-med');
INSERT INTO materi_contents (item_id, section_type, group_title, label, order_index, icon_type) VALUES 
(5, 'materi', 'UJIAN TULIS', 'Tauhid (Zadul Mubtadi’ I)', 1, 'edit'),
(5, 'materi', 'UJIAN TULIS', 'Imla’ (Pegon)', 2, 'edit'),
(5, 'materi', 'UJIAN TULIS', 'Fiqh (Hidayatul Mubtadi’ IV)', 3, 'edit'),
(5, 'materi', 'UJIAN LISAN', 'Fasholatan lengkap', 4, 'mic'),
(5, 'materi', 'UJIAN LISAN', 'Surat pendek (An-Naas s.d. Al-Kafirun)', 5, 'mic'),
(5, 'materi', 'UJIAN LISAN', '‘Aqo’id 50', 6, 'mic');
INSERT INTO materi_contents (item_id, section_type, label, order_index, icon_type) VALUES 
(5, 'kurikulum', 'Al-Qur’an', 1, 'check'),
(5, 'kurikulum', 'Al-Arba’in An-Nahdliyah', 2, 'check'),
(5, 'kurikulum', '‘Aqidatul ‘Awam', 3, 'check'),
(5, 'kurikulum', 'Safinatun Naja', 4, 'check'),
(5, 'kurikulum', 'Nadhmul Mathlab', 5, 'check'),
(5, 'kurikulum', 'Fathur Rohman', 6, 'check'),
(5, 'kurikulum', 'Zadul Mubtadi’ II', 7, 'check'),
(5, 'kurikulum', 'Ta’limul Lughah al-‘Arobiyah', 8, 'check'),
(5, 'kurikulum', 'Nadhom al-Ajurumiyah Jawan', 9, 'check'),
(5, 'kurikulum', 'Bahasa Indonesia V', 10, 'cap'),
(5, 'kurikulum', 'Bahasa Daerah V', 11, 'cap'),
(5, 'kurikulum', 'Matematika V', 12, 'cap'),
(5, 'kurikulum', 'PKN V', 13, 'cap'),
(5, 'kurikulum', 'Ke-NU-an I', 14, 'check'),
(5, 'kurikulum', 'Pegon III', 15, 'check');

-- Kelas VI (ID: 6)
INSERT INTO materi_items (id, category_id, title, order_index, size) VALUES (6, 1, 'Kelas VI', 6, 'materi-item-med');
INSERT INTO materi_contents (item_id, section_type, group_title, label, order_index, icon_type) VALUES 
(6, 'materi', 'UJIAN TULIS', 'Fiqh (Safinatun Naja)', 1, 'edit'),
(6, 'materi', 'UJIAN TULIS', 'Tauhid (Zadul Mubtadi’ II)', 2, 'edit'),
(6, 'materi', 'UJIAN TULIS', 'Imla’ (Pegon)', 3, 'edit'),
(6, 'materi', 'UJIAN TULIS', 'Nadhom al-Ajurumiyah Jawan', 4, 'edit'),
(6, 'materi', 'UJIAN LISAN', 'Fasholatan lengkap', 5, 'mic'),
(6, 'materi', 'UJIAN LISAN', 'Surat pendek (An-Naas s.d. Al-Quraisy)', 6, 'mic'),
(6, 'materi', 'UJIAN LISAN', '‘Aqo’id 50', 7, 'mic');
INSERT INTO materi_contents (item_id, section_type, label, order_index, icon_type) VALUES 
(6, 'kurikulum', 'Al-Qur’an', 1, 'check'),
(6, 'kurikulum', 'Mukhtarul Hadits as-Syarif', 2, 'check'),
(6, 'kurikulum', 'Tanwirul Hija', 3, 'check'),
(6, 'kurikulum', 'Al-‘Awamil al-Jurjani', 4, 'check'),
(6, 'kurikulum', 'Al-Amtsilah at-Tashrifiyah', 5, 'check'),
(6, 'kurikulum', '‘Aqidatul Awam', 6, 'check'),
(6, 'kurikulum', 'Qo’idah Natsar', 7, 'check'),
(6, 'kurikulum', 'Hidayatus Shibyan', 8, 'check'),
(6, 'kurikulum', 'Matnu Al-Ajurumiyah', 9, 'check'),
(6, 'kurikulum', 'Ke-NU-an II', 10, 'check'),
(6, 'kurikulum', 'PKN VI', 11, 'cap');

-- 2. MADRASAH TSANAWIYAH (ID: 2)
INSERT INTO materi_categories (id, name, order_index) VALUES (2, 'MADRASAH TSANAWIYAH', 2);
INSERT INTO materi_items (id, category_id, title, order_index, size) VALUES (7, 2, 'Kelas I Tsanawiyah', 1, 'materi-item-large');
INSERT INTO materi_contents (item_id, section_type, group_title, label, order_index, icon_type) VALUES 
(7, 'materi', 'UJIAN TULIS', 'Shorof (Qo’idah Natsar)', 1, 'edit'),
(7, 'materi', 'UJIAN TULIS', 'Nahwu (Matnu Al-Ajurumiyah)', 2, 'edit'),
(7, 'materi', 'UJIAN TULIS', 'Imla’ (Pegon)', 3, 'edit'),
(7, 'materi', 'UJIAN LISAN', 'Tashrif Bab I–VI', 4, 'mic'),
(7, 'materi', 'UJIAN LISAN', 'Fasholatan lengkap', 5, 'mic'),
(7, 'materi', 'UJIAN LISAN', 'Surat pendek (An-Naas s.d. At-Takatsur)', 6, 'mic'),
(7, 'materi', 'UJIAN LISAN', '‘Aqo’id 50', 7, 'mic');
INSERT INTO materi_contents (item_id, section_type, label, order_index, icon_type) VALUES 
(7, 'kurikulum', 'Al-Qur’an', 1, 'check'),
(7, 'kurikulum', 'Hadits (Al-Arba’in An-Nawawiyah)', 2, 'check'),
(7, 'kurikulum', 'Ilmu Tauhid (Matnu Ibrohim al-Bajuri)', 3, 'check'),
(7, 'kurikulum', 'Ilmu Tajwid (Tuhfatul Athfal)', 4, 'check'),
(7, 'kurikulum', 'Ilmu Fiqh (Sullamut Taufiq)', 5, 'check'),
(7, 'kurikulum', 'Ilmu Nahwu (Al-Ajurumiyah)', 6, 'check'),
(7, 'kurikulum', 'Ilmu Shorof', 7, 'check'),
(7, 'kurikulum', 'Ilmu Akhlaq (Washoya)', 8, 'check'),
(7, 'kurikulum', 'Aswaja (Pedoman Ke-NU-an)', 9, 'check'),
(7, 'kurikulum', 'Tarikh (Fath al-Mubin)', 10, 'check');

-- 3. MADRASAH ALIYAH (ID: 3)
INSERT INTO materi_categories (id, name, order_index) VALUES (3, 'MADRASAH ALIYAH', 3);
INSERT INTO materi_items (id, category_id, title, order_index, size) VALUES (8, 3, 'Kelas I Aliyah', 1, 'materi-item-large');
INSERT INTO materi_contents (item_id, section_type, group_title, label, order_index, icon_type) VALUES 
(8, 'materi', 'UJIAN TULIS', 'Nahwu (Nazhom Al-‘Amrithi)', 1, 'edit'),
(8, 'materi', 'UJIAN TULIS', 'Shorof (Nazhom Al-Maqshud & Amtsilah Tasrifiyah)', 2, 'edit'),
(8, 'materi', 'UJIAN TULIS', 'Imla’ (Arab)', 3, 'edit'),
(8, 'materi', 'UJIAN LISAN', 'Membaca Fathul Qarib', 4, 'mic'),
(8, 'materi', 'UJIAN LISAN', 'Hafalan Alfiyah Ibnu Malik 350 bait', 5, 'mic'),
(8, 'materi', 'UJIAN LISAN', 'Fasholatan lengkap', 6, 'mic'),
(8, 'materi', 'UJIAN LISAN', 'Surat pendek (An-Naas s.d. Asy-Syams)', 7, 'mic'),
(8, 'materi', 'UJIAN LISAN', '‘Aqo’id 50', 8, 'mic');
INSERT INTO materi_contents (item_id, section_type, label, order_index, icon_type) VALUES 
(8, 'kurikulum', 'Tafsir (Jalalain)', 1, 'check'),
(8, 'kurikulum', 'Hadits (Riyadlus Sholihin)', 2, 'check'),
(8, 'kurikulum', 'Ilmu Hadits', 3, 'check'),
(8, 'kurikulum', 'Ilmu Tauhid (Jauharoh at-Tauhid)', 4, 'check'),
(8, 'kurikulum', 'Ilmu Fiqh (Fathul Mu’in)', 5, 'check'),
(8, 'kurikulum', 'Ushul Fiqh', 6, 'check'),
(8, 'kurikulum', 'Ilmu Nahwu (Alfiyah, I’rob)', 7, 'check'),
(8, 'kurikulum', 'Ilmu Akhlaq (Ta’limul Muta’allim)', 8, 'check'),
(8, 'kurikulum', 'Tarikh (Manaqib Aimmatil Arba’ah)', 9, 'check');

-- 4. MA’HAD ALY (ID: 4)
INSERT INTO materi_categories (id, name, order_index) VALUES (4, 'MA’HAD ALY', 4);
INSERT INTO materi_items (id, category_id, title, order_index, size) VALUES (9, 4, 'Marhalah Ula', 1, 'materi-item-large');
INSERT INTO materi_contents (item_id, section_type, group_title, label, order_index, icon_type) VALUES 
(9, 'materi', 'UJIAN TULIS', 'Balaghah (Al-Jauharul Maknun)', 1, 'edit'),
(9, 'materi', 'UJIAN TULIS', 'Nahwu Shorof (Alfiyah Ibnu Malik)', 2, 'edit'),
(9, 'materi', 'UJIAN TULIS', 'Ushul Fiqh (Lubbul Ushul)', 3, 'edit'),
(9, 'materi', 'UJIAN TULIS', 'Imla’ (Arab)', 4, 'edit'),
(9, 'materi', 'UJIAN LISAN', 'Membaca Fathul Mu’in', 5, 'mic'),
(9, 'materi', 'UJIAN LISAN', 'Hafalan Al-Qur’an Juz 1', 6, 'mic'),
(9, 'materi', 'UJIAN LISAN', 'Hafalan Hadits Jami’ul ‘Ulum wal Hikam', 7, 'mic'),
(9, 'materi', 'UJIAN LISAN', 'Fasholatan lengkap', 8, 'mic'),
(9, 'materi', 'UJIAN LISAN', '‘Aqo’id 50', 9, 'mic');
INSERT INTO materi_contents (item_id, section_type, label, order_index, icon_type) VALUES 
(9, 'kurikulum', 'Tafsir Ayatil Ahkam', 1, 'check'),
(9, 'kurikulum', 'Ilmu Tafsir', 2, 'check'),
(9, 'kurikulum', 'Hadits & Ilmu Hadits', 3, 'check'),
(9, 'kurikulum', 'Fiqh & Ushul Fiqh', 4, 'check'),
(9, 'kurikulum', 'Qoidah Ushuliyah & Fiqhiyah', 5, 'check'),
(9, 'kurikulum', 'Akhlaq', 6, 'check'),
(9, 'kurikulum', 'Aswaja', 7, 'check'),
(9, 'kurikulum', 'Balaghah', 8, 'check'),
(9, 'kurikulum', 'Ilmu Falak', 9, 'check');

INSERT INTO materi_items (id, category_id, title, order_index, size) VALUES (10, 4, 'Marhalah Tsaniyah', 2, 'materi-item-large');
INSERT INTO materi_contents (item_id, section_type, group_title, label, order_index, icon_type) VALUES 
(10, 'materi', 'UJIAN TULIS', 'Fikih Kebangsaan (2 soal uraian)', 1, 'edit'),
(10, 'materi', 'UJIAN LISAN', 'Membaca Kanzur Roghibin', 2, 'mic'),
(10, 'materi', 'UJIAN LISAN', 'Munaqosyah Fikih Kebangsaan', 3, 'mic'),
(10, 'materi', 'UJIAN LISAN', 'Psikotest', 4, 'mic'),
(10, 'materi', 'UJIAN LISAN', 'Hafalan Al-Qur’an 3 juz', 5, 'mic'),
(10, 'materi', 'UJIAN LISAN', 'Hafalan 150 Hadits', 6, 'mic');
INSERT INTO materi_contents (item_id, section_type, label, order_index, icon_type) VALUES 
(10, 'kurikulum', 'Tafsir', 1, 'check'),
(10, 'kurikulum', 'Ilmu Tafsir', 2, 'check'),
(10, 'kurikulum', 'Hadits & Ilmu Hadits', 3, 'check'),
(10, 'kurikulum', 'Fiqh Muwathonah', 4, 'check'),
(10, 'kurikulum', 'Ushul Fiqh', 5, 'check'),
(10, 'kurikulum', 'Qoidah Fiqh', 6, 'check'),
(10, 'kurikulum', 'Metode Penelitian', 7, 'check'),
(10, 'kurikulum', 'Sejarah Peradaban Islam', 8, 'check'),
(10, 'kurikulum', 'Sosiologi', 9, 'check'),
(10, 'kurikulum', 'Psikologi Islam', 10, 'check'),
(10, 'kurikulum', 'Filsafat Islam', 11, 'check');

-- 5. MADRASAH I’DADIYAH (PERSIAPAN) (ID: 5)
INSERT INTO materi_categories (id, name, order_index) VALUES (5, 'MADRASAH I’DADIYAH (PERSIAPAN)', 5);
INSERT INTO materi_items (id, category_id, title, order_index, size) VALUES (11, 5, 'Persiapan MHM', 1, 'materi-item-large');
INSERT INTO materi_contents (item_id, section_type, label, order_index, icon_type) VALUES 
(11, 'kurikulum', 'Al-Qur’an', 1, 'check'),
(11, 'kurikulum', 'Hadits', 2, 'check'),
(11, 'kurikulum', 'Ilmu Tauhid', 3, 'check'),
(11, 'kurikulum', 'Ilmu Fiqh', 4, 'check'),
(11, 'kurikulum', 'Ilmu Nahwu', 5, 'check'),
(11, 'kurikulum', 'Ilmu Shorof', 6, 'check'),
(11, 'kurikulum', 'Ilmu Akhlaq', 7, 'check'),
(11, 'kurikulum', 'Ilmu Tajwid', 8, 'check'),
(11, 'kurikulum', 'Ilmu Imla’', 9, 'check'),
(11, 'kurikulum', 'Kitabah (Menulis Arab & Pegon)', 10, 'check');
