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

-- Seed Initial Data for Site Settings
INSERT OR REPLACE INTO site_settings (key, value) VALUES ('ta_info', 'TA. 1446 - 1447 H. / 2025 - 2026 M.');
INSERT OR REPLACE INTO site_settings (key, value) VALUES ('whatsapp_number', '6285156644026');
INSERT OR REPLACE INTO site_settings (key, value) VALUES ('hero_title', 'Pondok Pesantren');
INSERT OR REPLACE INTO site_settings (key, value) VALUES ('hero_title_gradient', 'Darussalam Lirboyo');
INSERT OR REPLACE INTO site_settings (key, value) VALUES ('hero_subtitle', 'Mencetak Generasi Bertakwa, Berakhlak Qur''ani dan As-Sunnah dan Berilmu dengan Memadukan Tradisi Salaf dan Modern.');
