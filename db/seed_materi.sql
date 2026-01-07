-- Seed Data for Materi Ujian

-- 1. Categories
INSERT INTO materi_categories (id, name, order_index) VALUES (1, 'Madrasah Hidayatul Mubtadi''in (MHM)', 1);
INSERT INTO materi_categories (id, name, order_index) VALUES (2, 'Ma’had Aly Lirboyo', 2);
INSERT INTO materi_categories (id, name, order_index) VALUES (3, 'Madrasah Ihya'' Ulumiddin (MIU)', 3);

-- 2. Items for MHM
INSERT INTO materi_items (id, category_id, title, age, size, order_index) VALUES (1, 1, 'MHM - I IBTIDAIYAH', '6 Tahun', 'materi-item-med', 1);
INSERT INTO materi_items (id, category_id, title, age, size, order_index) VALUES (2, 1, 'MHM - II IBTIDAIYAH', '7 Tahun', 'materi-item-med', 2);
-- ... and so on.

-- 3. Contents for MHM I Ibtida
INSERT INTO materi_contents (item_id, section_type, icon_type, label, order_index) VALUES (1, 'kurikulum', 'check', 'CTBQ An-Nahdliyah', 1);
INSERT INTO materi_contents (item_id, section_type, icon_type, label, order_index) VALUES (1, 'kurikulum', 'check', 'Ilmu Tauhid I', 2);
-- ...
