-- Database Schema for PPDB Website Dynamic Content

-- 1. Website Settings (Global)
CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Materi Ujian & Kurikulum
CREATE TABLE IF NOT EXISTS materi_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    order_index INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS materi_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER,
    title TEXT NOT NULL,
    age TEXT,
    size TEXT DEFAULT 'materi-item-med',
    description TEXT, -- For cases like "Tidak ada ujian masuk" or special notes
    order_index INTEGER DEFAULT 0,
    FOREIGN KEY (category_id) REFERENCES materi_categories(id)
);

CREATE TABLE IF NOT EXISTS materi_contents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER,
    section_type TEXT CHECK(section_type IN ('kurikulum', 'materi')) NOT NULL,
    group_title TEXT, -- e.g. "UJIAN TULIS", "UJIAN LISAN"
    icon_type TEXT, -- e.g. "check", "edit", "mic", "cap"
    label TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    FOREIGN KEY (item_id) REFERENCES materi_items(id)
);

-- 3. Hero & Info Sections (To make all page heroes dynamic)
CREATE TABLE IF NOT EXISTS page_heroes (
    page_path TEXT PRIMARY KEY, -- e.g. '/', '/informasi', '/materi-ujian'
    title_dark TEXT,
    title_primary TEXT,
    subtitle TEXT,
    ornament_icon TEXT DEFAULT 'fa-star'
);

-- 3. Content Sections (For general list items like Misi, Ekskul, Alur, etc.)
CREATE TABLE IF NOT EXISTS global_content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section_slug TEXT NOT NULL, -- e.g., 'misi', 'ekskul', 'alur-pendaftaran', 'persyaratan-foto'
    category TEXT, -- Optional (e.g., 'Ujian Tulis' or 'MHM Putra')
    label TEXT NOT NULL,
    description TEXT, -- Optional detail
    icon TEXT, -- FontAwesome class
    amount TEXT, -- For financial items
    order_index INTEGER DEFAULT 0
);

-- 4. Gallery & Media
CREATE TABLE IF NOT EXISTS site_gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    category TEXT NOT NULL, -- e.g., 'Bahtsul Masail', 'Kitab Kuning'
    image_url TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 5. Data Pendaftar (Santri)
CREATE TABLE IF NOT EXISTS santri_pendaftar (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    -- Identitas Pribadi
    nama_depan TEXT NOT NULL,
    nama_belakang TEXT,
    nik TEXT UNIQUE,
    nisn TEXT,
    tempat_lahir TEXT,
    tanggal_lahir TEXT,
    jenis_kelamin TEXT,
    agama TEXT DEFAULT 'Islam',
    jenjang_kelas TEXT,
    
    -- Alamat
    alamat_jalan TEXT,
    alamat_kota TEXT,
    
    -- Orang Tua
    nama_ayah TEXT,
    pekerjaan_ayah TEXT,
    no_hp_ayah TEXT,
    nama_ibu TEXT,
    no_hp_ibu TEXT,
    
    -- Berkas (Links)
    foto_santri TEXT,
    scan_kk TEXT,
    scan_ijazah TEXT,
    
    -- Metadata System
    status TEXT DEFAULT 'Pending', -- Pending, Terverifikasi, Ditolak
    catatan_admin TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seed Initial Data for Site Settings
DELETE FROM site_settings;
INSERT INTO site_settings (key, value) VALUES ('ta_info', 'TA. 1446 - 1447 H. / 2025 - 2026 M.');
INSERT INTO site_settings (key, value) VALUES ('whatsapp_number', '6285156644026');
INSERT INTO site_settings (key, value) VALUES ('hero_title', 'Pondok Pesantren');
INSERT INTO site_settings (key, value) VALUES ('hero_title_gradient', 'Darussalam Lirboyo');
INSERT INTO site_settings (key, value) VALUES ('hero_subtitle', 'Mencetak Generasi Bertakwa, Berakhlak Qur''ani dan As-Sunnah dan Berilmu dengan Memadukan Tradisi Salaf dan Modern.');
INSERT INTO site_settings (key, value) VALUES ('video_url', 'https://www.youtube-nocookie.com/embed/3UdUhHAbR9c');
INSERT INTO site_settings (key, value) VALUES ('visi_text', 'Mencetak insan bertaqwa, berakhlak Al Qur''an dan As Sunnah.');
INSERT INTO site_settings (key, value) VALUES ('about_history', 'Pesantren ini berdiri sejak...'); 
INSERT INTO site_settings (key, value) VALUES ('meta_title', 'PPDB Pondok Pesantren Darussalam Lirboyo Kediri');
INSERT INTO site_settings (key, value) VALUES ('meta_description', 'Pendaftaran Santri Baru Pondok Pesantren Darussalam Lirboyo Kediri. Mencetak Generasi Bertakwa dan Berakhlak Qur''ani.');
INSERT INTO site_settings (key, value) VALUES ('meta_keywords', 'ppdb, pesantren, lirboyo, darussalam, kediri, pendaftaran santri baru');

-- 6. Users Table for Admin Access
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seed initial admin user
INSERT OR IGNORE INTO users (username, password) VALUES ('admin', 'sekretary25');
