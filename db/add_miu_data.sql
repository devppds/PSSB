-- 6. MADRASAH I'ANATUL ULUM (MIU) - Santri Formal (ID: 6)
INSERT INTO materi_categories (id, name, order_index) VALUES (6, 'MADRASAH I''ANATUL ULUM (MIU) - FORMAL', 6);

-- KELAS I ULA (ID: 12)
INSERT INTO materi_items (id, category_id, title, description, order_index, size) VALUES (12, 6, 'Kelas I Ula', 'Tanpa Ujian', 1, 'materi-item-med');
INSERT INTO materi_contents (item_id, section_type, label, order_index, icon_type) VALUES 
(12, 'kurikulum', 'Al-Qur’an — Al-Qur’an', 1, 'check'),
(12, 'kurikulum', 'Tauhid — Zaad al-Mubtadi', 2, 'check'),
(12, 'kurikulum', 'Fiqh — Fasholatan III & IV, Safinat as-Sholah, Duror al-Bahiyah', 3, 'check'),
(12, 'kurikulum', 'Tajwid — Fath ar-Rohman', 4, 'check'),
(12, 'kurikulum', 'Akhlaq — Nadzmu Alala, At-Tarbiyah al-Islamiyyah, Washoya', 5, 'check'),
(12, 'kurikulum', 'Tarikh — Ke-NU-an I, Isra’ Mi’raj, Tarikh al-Anbiya’, Syamail al-Muhammadiyah', 6, 'check'),
(12, 'kurikulum', 'Kitabah — Pegon I & II', 7, 'check');

-- KELAS II ULA (ID: 13)
INSERT INTO materi_items (id, category_id, title, order_index, size) VALUES (13, 6, 'Kelas II Ula', 2, 'materi-item-med');
INSERT INTO materi_contents (item_id, section_type, group_title, label, order_index, icon_type) VALUES 
(13, 'materi', 'UJIAN TULIS', 'Tauhid (Zaad al-Mubtadi’ I)', 1, 'edit'),
(13, 'materi', 'UJIAN TULIS', 'Fiqh (Safinat as-Sholah)', 2, 'edit'),
(13, 'materi', 'UJIAN TULIS', 'Imla’ (Pegon I)', 3, 'edit'),
(13, 'materi', 'UJIAN LISAN', '‘Aqo’id 50', 4, 'mic'),
(13, 'materi', 'UJIAN LISAN', 'Fasholatan Lengkap', 5, 'mic'),
(13, 'materi', 'UJIAN LISAN', 'Surat pendek (An-Naas s.d. At-Takatsur)', 6, 'mic');
INSERT INTO materi_contents (item_id, section_type, label, order_index, icon_type) VALUES 
(13, 'kurikulum', 'Al-Qur’an — Al-Qur’an', 1, 'check'),
(13, 'kurikulum', 'Hadits — Arba’in an-Nahdliyyah', 2, 'check'),
(13, 'kurikulum', 'Tauhid — ‘Aqidat al-Awam', 3, 'check'),
(13, 'kurikulum', 'Fiqh — Safinat an-Naja, Hidayat al-Mubtadi’, Duror al-Bahiyah', 4, 'check'),
(13, 'kurikulum', 'Nahwu — Nadzmu Jurumiyah Jawan', 5, 'check'),
(13, 'kurikulum', 'Tajwid — Tajwid Jawan', 6, 'check'),
(13, 'kurikulum', 'Akhlaq — Nadzm al-Mathlab, At-Tarbiyah al-Islamiyyah, Washoya', 7, 'check'),
(13, 'kurikulum', 'Tarikh — Ke-NU-an II, Syamail al-Muhammadiyah', 8, 'check'),
(13, 'kurikulum', 'Kitabah — Pegon III', 9, 'check');

-- KELAS III ULA (ID: 14)
INSERT INTO materi_items (id, category_id, title, order_index, size) VALUES (14, 6, 'Kelas III Ula', 3, 'materi-item-med');
INSERT INTO materi_contents (item_id, section_type, group_title, label, order_index, icon_type) VALUES 
(14, 'materi', 'UJIAN TULIS', 'Tauhid (Zaad al-Mubtadi’ II)', 1, 'edit'),
(14, 'materi', 'UJIAN TULIS', 'Fiqh (Safinat as-Najah)', 2, 'edit'),
(14, 'materi', 'UJIAN TULIS', 'Nahwu (Nadzm Jurumiyah Jawan)', 3, 'edit'),
(14, 'materi', 'UJIAN TULIS', 'Imla’ (Pegon II)', 4, 'edit'),
(14, 'materi', 'UJIAN LISAN', '‘Aqo’id 50', 5, 'mic'),
(14, 'materi', 'UJIAN LISAN', 'Fasholatan Lengkap', 6, 'mic'),
(14, 'materi', 'UJIAN LISAN', 'Surat pendek (An-Naas s.d. Al-‘Alaq)', 7, 'mic');
INSERT INTO materi_contents (item_id, section_type, label, order_index, icon_type) VALUES 
(14, 'kurikulum', 'Al-Qur’an — Al-Qur’an', 1, 'check'),
(14, 'kurikulum', 'Hadits — Mukhtar al-Hadits as-Syarif', 2, 'check'),
(14, 'kurikulum', 'Tauhid — Zaad al-Thulab', 3, 'check'),
(14, 'kurikulum', 'Fiqh — Tanwir al-Hija, Duror al-Bahiyah', 4, 'check'),
(14, 'kurikulum', 'Nahwu — ‘Awamil al-Jurjani, Matn al-Ajurumiyyah', 5, 'check'),
(14, 'kurikulum', 'Shorof — Qo’idat an-Natsar, Tasrif Istilahi', 6, 'check'),
(14, 'kurikulum', 'Akhlaq — Taisir al-Kholaq, At-Tarbiyah al-Islamiyyah, Washoya', 7, 'check'),
(14, 'kurikulum', 'Tarikh — Ke-NU-an III, Syamail al-Muhammadiyah', 8, 'check');

-- KELAS I WUSTHO (ID: 15)
INSERT INTO materi_items (id, category_id, title, order_index, size) VALUES (15, 6, 'Kelas I Wustho', 4, 'materi-item-large');
INSERT INTO materi_contents (item_id, section_type, group_title, label, order_index, icon_type) VALUES 
(15, 'materi', 'UJIAN TULIS', 'Tauhid (‘Aqidat al-Awam)', 1, 'edit'),
(15, 'materi', 'UJIAN TULIS', 'Nahwu (Matn al-Ajurumiyyah, ‘Awamil al-Jurjani)', 2, 'edit'),
(15, 'materi', 'UJIAN TULIS', 'Shorof (Qo’idat al-Natsar)', 3, 'edit'),
(15, 'materi', 'UJIAN TULIS', 'Imla’ (Pegon III)', 4, 'edit'),
(15, 'materi', 'UJIAN LISAN', '‘Aqo’id 50', 5, 'mic'),
(15, 'materi', 'UJIAN LISAN', 'Fasholatan Lengkap', 6, 'mic'),
(15, 'materi', 'UJIAN LISAN', 'Tashrif Istilahi (Bab I–VI)', 7, 'mic'),
(15, 'materi', 'UJIAN LISAN', 'Surat pendek (An-Naas s.d. Ad-Dhuha)', 8, 'mic');
INSERT INTO materi_contents (item_id, section_type, label, order_index, icon_type) VALUES 
(15, 'kurikulum', 'Al-Qur’an — Al-Qur’an', 1, 'check'),
(15, 'kurikulum', 'Hadits — Arba’in an-Nawawi', 2, 'check'),
(15, 'kurikulum', 'Tauhid — Matn al-Ibrohim', 3, 'check'),
(15, 'kurikulum', 'Fiqh — Sullam at-Taufiq, Duror al-Bahiyah', 4, 'check'),
(15, 'kurikulum', 'Nahwu — Al-Ajurumiyyah', 5, 'check'),
(15, 'kurikulum', 'Shorof — Qo’idah as-Shorfiyyah I, Tashrif al-Istilahi, Al-I’lal al-Istilahi', 6, 'check'),
(15, 'kurikulum', 'Tajwid — Tuhfat al-Athfal', 7, 'check'),
(15, 'kurikulum', 'Akhlaq — Washoya, Ta’lim al-Muta’allim, Tarbiyah al-Islamiyah', 8, 'check'),
(15, 'kurikulum', 'Tarikh — Fath al-Mubin I, Syamail al-Muhammadiyah', 9, 'check');

-- KELAS I ULYA (ID: 16)
INSERT INTO materi_items (id, category_id, title, order_index, size) VALUES (16, 6, 'Kelas I Ulya', 5, 'materi-item-large');
INSERT INTO materi_contents (item_id, section_type, group_title, label, order_index, icon_type) VALUES 
(16, 'materi', 'UJIAN TULIS', 'Tauhid (Matn as-Sanusiyah)', 1, 'edit'),
(16, 'materi', 'UJIAN TULIS', 'Nahwu (Nadzm al-Imrithy)', 2, 'edit'),
(16, 'materi', 'UJIAN TULIS', 'Shorof (Nadzm al-Maqshud, Al-Amtsilat at-Tasrifiyah)', 3, 'edit'),
(16, 'materi', 'UJIAN TULIS', 'Imla’ (Arab)', 4, 'edit'),
(16, 'materi', 'UJIAN LISAN', '‘Aqo’id 50', 5, 'mic'),
(16, 'materi', 'UJIAN LISAN', 'Fasholatan Lengkap', 6, 'mic'),
(16, 'materi', 'UJIAN LISAN', 'Fiqh (membaca Fath al-Qarib)', 7, 'mic'),
(16, 'materi', 'UJIAN LISAN', 'Hafalan Alfiyah Ibn Malik (250 bait)', 8, 'mic'),
(16, 'materi', 'UJIAN LISAN', 'Surat pendek (An-Naas s.d. Asy-Syams)', 9, 'mic'),
(16, 'materi', 'UJIAN LISAN', 'Membaca Al-Qur’an', 10, 'mic');
INSERT INTO materi_contents (item_id, section_type, label, order_index, icon_type) VALUES 
(16, 'kurikulum', 'Tafsir — Tafsir al-Jalalain', 1, 'check'),
(16, 'kurikulum', 'Hadits — Riyadl as-Sholihin I', 2, 'check'),
(16, 'kurikulum', 'Ilmu Tafsir — Itmam al-Diroyah', 3, 'check'),
(16, 'kurikulum', 'Ilmu Hadits — Baiquniyah', 4, 'check'),
(16, 'kurikulum', 'Tauhid — Jawahar Tauhid', 5, 'check'),
(16, 'kurikulum', 'Fiqh — Fath al-Mu’in I', 6, 'check'),
(16, 'kurikulum', 'Akhlaq — Mau’idzot al-Mu’minin I, Minhaj al-‘Abidin', 7, 'check'),
(16, 'kurikulum', 'Nahwu & Shorof — Alfiyah Ibn Malik I, Qowa’id al-I’rob, Al-I’rob', 8, 'check');

-- KELAS I'DADIYAH (MIU) (ID: 17)
INSERT INTO materi_items (id, category_id, title, order_index, size) VALUES (17, 6, 'Kelas I''dadiyah (MIU)', 6, 'materi-item-large');
INSERT INTO materi_contents (item_id, section_type, group_title, label, order_index, icon_type) VALUES 
(17, 'materi', 'UJIAN TULIS', 'Imla’ (Pegon & Memaknai)', 1, 'edit'),
(17, 'materi', 'UJIAN LISAN', '‘Aqo’id 50', 2, 'mic'),
(17, 'materi', 'UJIAN LISAN', 'Fasholatan Lengkap', 3, 'mic'),
(17, 'materi', 'UJIAN LISAN', 'Surat pendek (An-Naas s.d. Al-‘Alaq)', 4, 'mic');
INSERT INTO materi_contents (item_id, section_type, label, order_index, icon_type) VALUES 
(17, 'kurikulum', 'Al-Qur’an — Al-Qur’an', 1, 'check'),
(17, 'kurikulum', 'Hadits — Mukhtar al-Hadits as-Syarif', 2, 'check'),
(17, 'kurikulum', 'Tauhid — Zaad al-Tholab', 3, 'check'),
(17, 'kurikulum', 'Fiqh — Tanwir al-Hija, Duror al-Bahiyah', 4, 'check'),
(17, 'kurikulum', 'Nahwu — Matn al-Ajurumiyyah, ‘Awamil al-Jurjani', 5, 'check'),
(17, 'kurikulum', 'Shorof — Qo’idat an-Natsar, Tasrif Istilahi', 6, 'check'),
(17, 'kurikulum', 'Akhlaq — Taisir al-Kholaq, At-Tarbiyah al-Islamiyyah, Washoya', 7, 'check'),
(17, 'kurikulum', 'Tarikh — Ke-NU-an III, Syamail al-Muhammadiyah', 8, 'check'); -- Fixed item_id to 17
