
-- Seed Timeline Data
DELETE FROM timeline_items;

INSERT INTO timeline_items (year, date_label, title, content, image_url, order_index) 
VALUES (
    '2002', 
    '20 Februari 2002', 
    'Pendirian Pondok', 
    'Pesantren yang biasa disebut dengan PPDS ini, terletak sekitar 500 M di selatan Pondok Pesantren Lirboyo induk. PPDS diasuh langsung oleh KH. Ahmad Mahin Thoha, Pesantren ini menjadi Unit Lirboyo tepat pada tanggal 8 Dzulhijah 1422 H. /20 Februari 2002 M. Pondok Pesantren Darussalam merupakan pendidikan non-formal yang masih mempertahankan kurikulum kesalafan di era modernisasi ini. Selain khusus mempelajari kitab - kitab salaf, para santri juga diberikan kesempatan untuk merangkap pendidikan formal (SD/MI, SMP/MTs, SMA/SMK dan Perguruan Tinggi) di luar Pondok. Bagi santri yang merangkap pendidikan formal, dibuatkan wadah tersendiri dengan nama “Madrasah Ihya Ulumiddin” untuk menunjang pembelajaran Ilmu Agama.', 
    'https://res.cloudinary.com/dceamfy3n/image/upload/v1766596062/romo-yai_jgcrqg.webp', 
    1
);

INSERT INTO timeline_items (year, date_label, title, content, image_url, order_index) 
VALUES (
    '2025', 
    'Masa Kini', 
    'Pendidikan Modern', 
    'Sistem pendidkan yang ada di Pondok Pesantren Lirboyo Darussalam pada dasarnya dibagi menjadi dua kategori. Pertama, bagi santri yang tidak merangkap pendidikan formal wajib mengikuti pendidikan di MHM(Madrasah Hidayatul Mubtadiin). Kedua, bagi santri yang merangkap pendidikan formal wajib mengikuti pendidikan di MIU (madrasah Ihya'' Ulumiddin).', 
    'https://res.cloudinary.com/dceamfy3n/image/upload/v1766596058/gus-amin_yiymmz.webp', 
    2
);
