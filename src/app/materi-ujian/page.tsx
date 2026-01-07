"use client";

import "@/app/styles/materi-ujian.css";
import { useEffect, useState } from "react";

// Utility Component for Class Cards in Bento Style
const BentoMateriCard = ({ title, materi, kurikulum, age, size = "materi-item-med" }: any) => {
    const [activeTab, setActiveTab] = useState("kurikulum"); // default to kurikulum

    return (
        <div className={`glass-card-materi ${size} reveal fade-bottom`}>
            <span className="gold-accent-text">{title.split(' - ')[0]}</span>
            <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>
                {title.split(' - ')[1] || title}
            </h3>

            <div className="materi-tabs">
                <button
                    className={`materi-tab-btn ${activeTab === 'kurikulum' ? 'active' : ''}`}
                    onClick={() => setActiveTab('kurikulum')}
                >
                    <i className="fas fa-book-open"></i> Kurikulum
                </button>
                <button
                    className={`materi-tab-btn ${activeTab === 'materi' ? 'active' : ''}`}
                    onClick={() => setActiveTab('materi')}
                >
                    <i className="fas fa-file-signature"></i> Materi Ujian
                </button>
            </div>

            <div className="tab-content-anim" key={activeTab}>
                {activeTab === 'kurikulum' ? (
                    <div className="materi-list">
                        {kurikulum}
                    </div>
                ) : (
                    <div className="materi-list">
                        {materi}
                    </div>
                )}
            </div>

            {age && (
                <div className="age-badge">
                    <i className="fas fa-birthday-cake"></i> Usia Minimal: {age}
                </div>
            )}
        </div>
    );
};

export default function MateriUjianPage() {
    useEffect(() => {
        const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, index * 50);
                } else {
                    entry.target.classList.remove('active');
                }
            });
        }, observerOptions);
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, []);

    return (
        <div style={{ backgroundColor: 'var(--bg-body)' }}>
            {/* LUXURY HERO SECTION */}
            <section className="info-hero-section">
                <div className="reveal fade-bottom">
                    <span className="ornament-icon"><i className="fas fa-book-reader"></i></span>
                    <h1 className="page-hero-title">
                        <span className="text-dark">Materi &</span> <span className="text-primary">Kurikulum</span>
                    </h1>
                    <p className="page-hero-subtitle">
                        Informasi lengkap rincian materi ujian masuk, kurikulum kitab salaf, dan batas usia minimal santri Pondok Pesantren Darussalam Lirboyo.
                    </p>
                </div>
            </section>

            <div className="materi-grid">

                {/* CATEGORY: MHM */}
                <div className="materi-category-header reveal fade-left">
                    <h2>Madrasah Hidayatul Mubtadi'in (MHM)</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Pusat pendidikan salafiyah dengan sistem klasikal.</p>
                </div>

                <BentoMateriCard
                    title="MHM - I IBTIDAIYAH"
                    age="6 Tahun"
                    size="materi-item-small"
                    materi={<div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Tanpa Ujian Masuk</div>}
                    kurikulum={
                        <ul className="materi-list">
                            <li className="materi-li"><i className="fas fa-check"></i> CTBQ An-Nahdliyah</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Ilmu Tauhid I & Akhlaq I</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Fasholatan & Hidayatul Mubtadi’ I</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Terampil Menulis Arab & Pegon</li>
                            <li className="materi-li"><i className="fas fa- graduation-cap"></i> Indo, MTK, PKN, Daerah I</li>
                        </ul>
                    }
                />

                <BentoMateriCard
                    title="MHM - II IBTIDAIYAH"
                    age="7 Tahun"
                    size="materi-item-small"
                    materi={<div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Tanpa Ujian Masuk</div>}
                    kurikulum={
                        <ul className="materi-list">
                            <li className="materi-li"><i className="fas fa-check"></i> Ilmu Tauhid II & Akhlaq II</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Hidayatul Mubtadi’ II & Fasholatan II</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Ta’limul Lughah II</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Terampil Menulis Arab & Pegon II</li>
                            <li className="materi-li"><i className="fas fa-graduation-cap"></i> Indo, MTK, PKN, Daerah II</li>
                        </ul>
                    }
                />

                <BentoMateriCard
                    title="MHM - III IBTIDAIYAH"
                    age="8 Tahun"
                    size="materi-item-small"
                    materi={<div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Tanpa Ujian Masuk</div>}
                    kurikulum={
                        <ul className="materi-list">
                            <li className="materi-li"><i className="fas fa-check"></i> Tauhid Jawan & Fasholatan III</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Hidayatul Mubtadi’ III</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Ngudi Susilo & Tarikh Nabi</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Ro’sul Sirah & Pegon I</li>
                            <li className="materi-li"><i className="fas fa-graduation-cap"></i> Pelajaran Umum III</li>
                        </ul>
                    }
                />

                <BentoMateriCard
                    title="MHM - IV IBTIDAIYAH"
                    age="9 Tahun"
                    size="materi-item-med"
                    materi={<div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Tanpa Ujian Masuk</div>}
                    kurikulum={
                        <ul className="materi-list">
                            <li className="materi-li"><i className="fas fa-check"></i> Zadul Mubtadi’ & Nadhmul Akhlaq</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Hidayatul Mubtadi’ IV & Fasholatan IV</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Bahasa Arab Dasar & Pegon II</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Tarikhul Anbiya’ & Isra’ Mi’raj</li>
                            <li className="materi-li"><i className="fas fa-graduation-cap"></i> Pelajaran Umum IV</li>
                        </ul>
                    }
                />

                <BentoMateriCard
                    title="MHM - V IBTIDAIYAH"
                    age="10 Tahun"
                    size="materi-item-med"
                    materi={
                        <ul className="materi-list">
                            <li className="materi-li"><i className="fas fa-pen-fancy"></i> Tulis: Tauhid (Zadul Mubtadi’)</li>
                            <li className="materi-li"><i className="fas fa-pen-fancy"></i> Tulis: Fiqh (Hidayatul Mubtadi’ IV)</li>
                            <li className="materi-li"><i className="fas fa-microphone"></i> Lisan: Fasholatan & Aqo’id 50</li>
                            <li className="materi-li"><i className="fas fa-microphone"></i> Lisan: Surat An-Naas s.d. Al-Kafirun</li>
                        </ul>
                    }
                    kurikulum={
                        <ul className="materi-list">
                            <li className="materi-li"><i className="fas fa-check"></i> ‘Aqidatul ‘Awam & Safinatun Naja</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Nadhom Al-Ajurumiyah Jawan</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Fathur Rohman & Nadhmul Mathlab</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Al-Arba’in An-Nahdliyah</li>
                            <li className="materi-li"><i className="fas fa-graduation-cap"></i> Ke-NU-an I & Pelajaran Umum V</li>
                        </ul>
                    }
                />

                <BentoMateriCard
                    title="MHM - VI IBTIDAIYAH"
                    age="11 Tahun"
                    size="materi-item-med"
                    materi={
                        <ul className="materi-list">
                            <li className="materi-li"><i className="fas fa-pen-fancy"></i> Tulis: Fiqh (Safinatun Naja) & Tauhid</li>
                            <li className="materi-li"><i className="fas fa-pen-fancy"></i> Tulis: Nadzom Al-Ajurumiyah Jawan</li>
                            <li className="materi-li"><i className="fas fa-microphone"></i> Lisan: Fasholatan & Aqo’id 50</li>
                            <li className="materi-li"><i className="fas fa-microphone"></i> Lisan: Surat An-Naas s.d. Al-Quraisy</li>
                        </ul>
                    }
                    kurikulum={
                        <ul className="materi-list">
                            <li className="materi-li"><i className="fas fa-check"></i> Matnu Al-Ajurumiyah & Al-‘Awamil</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Amtsilah Tashrifiyah & Qoidah Natsar</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Mukhtarul Hadits & Taisirul Kholaq</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Tanwirul Hija & Nadhmul Mathlab</li>
                            <li className="materi-li"><i className="fas fa-graduation-cap"></i> Ke-NU-an II & PKN VI</li>
                        </ul>
                    }
                />

                <BentoMateriCard
                    title="MHM - I TSANAWIYAH"
                    age="12 Tahun"
                    size="materi-item-med"
                    materi={
                        <ul className="materi-list">
                            <li className="materi-li"><i className="fas fa-pen-fancy"></i> Tulis: Nahwu (Ajurumiyah) & Shorof</li>
                            <li className="materi-li"><i className="fas fa-microphone"></i> Lisan: Tashrif Bab I - VI</li>
                            <li className="materi-li"><i className="fas fa-microphone"></i> Lisan: Surat Ash-Syamsy & Fasholatan</li>
                            <li className="materi-li"><i className="fas fa-microphone"></i> Lisan: Surat An-Naas s.d. At-Takatsur</li>
                        </ul>
                    }
                    kurikulum={
                        <ul className="materi-list">
                            <li className="materi-li"><i className="fas fa-check"></i> Sullamut Taufiq & Matnu Bajuri</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Al-Ajurumiyah & I'lal</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Al-Qowa’id As-Shorfiyah & Tashrif</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Arba’in Nawawi & Washoya</li>
                            <li className="materi-li"><i className="fas fa-graduation-cap"></i> Ke-NU-an III & Tuhfatul Athfal</li>
                        </ul>
                    }
                />

                <BentoMateriCard
                    title="MHM - ALIYAH"
                    age="15 Tahun"
                    size="materi-item-full"
                    materi={
                        <ul className="materi-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <li className="materi-li"><i className="fas fa-pen-fancy"></i> Tulis: Nahwu (Nadzom Al-‘Amrithi)</li>
                            <li className="materi-li"><i className="fas fa-pen-fancy"></i> Tulis: Shorof (Nadzom Al-Maqshud)</li>
                            <li className="materi-li"><i className="fas fa-microphone"></i> Lisan: Membaca Fathul Qorib</li>
                            <li className="materi-li"><i className="fas fa-microphone"></i> Lisan: Hafalan Alfiyah (350 Bait)</li>
                            <li className="materi-li"><i className="fas fa-microphone"></i> Lisan: Uji Fasholatan Lengkap</li>
                            <li className="materi-li"><i className="fas fa-pen-fancy"></i> Tulis: Imla' (Bahasa Arab)</li>
                        </ul>
                    }
                    kurikulum={
                        <ul className="materi-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <li className="materi-li"><i className="fas fa-check"></i> Tafsir Jalalain & Riyadlus Sholihin</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Ilmu Hadits & Jauharoh at-Tauhid</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Fathul Mu'in & Mabadi' Ushul Fiqh</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Alfiyah Ibnu Malik & Qawa'idul I'rob</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Ta'limul Muta'allim & Tarikh</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Al-Waroqot & Manaqib Arba'ah</li>
                        </ul>
                    }
                />

                <BentoMateriCard
                    title="MHM - I'DADIYAH"
                    size="materi-item-full"
                    materi={<div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Program Persiapan / Tanpa Ujian</div>}
                    kurikulum={
                        <ul className="materi-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                            <li className="materi-li"><i className="fas fa-check"></i> Fiqh: Fathul Qorib, Sullam, Safinah</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Nahwu: Amrithi, Ajurumiyah, 'Awamil</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Shorof: Maqshud, Tashrif, I'lal</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Tauhid: Sanusi, Bajuri, 'Awam</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Akhlaq: Tahliyah, Taisir, Mathlab</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Tajwid: At-Tuhfah, Hidayatus Shibyan</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Imla' Arab & Kitabah Pegon</li>
                        </ul>
                    }
                />

                {/* CATEGORY: MA'HAD ALY */}
                <div className="materi-category-header reveal fade-left">
                    <h2>Ma’had Aly Lirboyo</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Pusat Studi Fiqh & Ushul Fiqh (Takhassus Fiqh wa Ushulihi).</p>
                </div>

                <BentoMateriCard
                    title="MA'HAD ALY - MARHALAH ULA"
                    size="materi-item-med"
                    materi={
                        <ul className="materi-list">
                            <li className="materi-li"><i className="fas fa-pen-fancy"></i> Tulis: Balaghah & Nahwu Shorof</li>
                            <li className="materi-li"><i className="fas fa-pen-fancy"></i> Tulis: Ushul Fiqh & Imla'</li>
                            <li className="materi-li"><i className="fas fa-microphone"></i> Lisan: Membaca Fathul Mu'in</li>
                            <li className="materi-li"><i className="fas fa-microphone"></i> Lisan: Hafalan Juz 1 & Hadits Jami'</li>
                        </ul>
                    }
                    kurikulum={
                        <ul className="materi-list">
                            <li className="materi-li"><i className="fas fa-check"></i> Tafsir Ayatil Ahkam & Jam'il Jawami'</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Al-Mahalli & Alfiyah Suyuthi</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Aswaja & Fikih Kebangsaan</li>
                            <li className="materi-li"><i className="fas fa-check"></i> 'Uqudul Juman & Ilmu Falak</li>
                        </ul>
                    }
                />

                <BentoMateriCard
                    title="MA'HAD ALY - MARHALAH TSANIYAH"
                    size="materi-item-med"
                    materi={
                        <ul className="materi-list">
                            <li className="materi-li"><i className="fas fa-pen-fancy"></i> Tulis: Fikih Kebangsaan (Uraian)</li>
                            <li className="materi-li"><i className="fas fa-microphone"></i> Lisan: Kitab Kanzurroghibin</li>
                            <li className="materi-li"><i className="fas fa-microphone"></i> Lisan: Munaqosyah & Psikotest</li>
                            <li className="materi-li"><i className="fas fa-microphone"></i> Lisan: Hafalan 3 Juz & 150 Hadits</li>
                        </ul>
                    }
                    kurikulum={
                        <ul className="materi-list">
                            <li className="materi-li"><i className="fas fa-check"></i> Rowa'iul Bayan & Al-Itqon</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Al-Kaukab As-Sathi’ & Qowaidul Ahkam</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Sosiologi & Psikologi Islam</li>
                            <li className="materi-li"><i className="fas fa-check"></i> Metode Penelitian & Filsafat</li>
                        </ul>
                    }
                />

                {/* CATEGORY: MIU */}
                <div className="materi-category-header reveal fade-left">
                    <h2>Madrasah Ihya' Ulumiddin (MIU)</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Pendidikan khusus untuk pendalaman kitab kuning.</p>
                </div>

                <BentoMateriCard
                    title="MIU - KELAS I ULA"
                    size="materi-item-med"
                    materi={<div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)' }}>Pendaftaran Tanpa Ujian Seleksi</div>}
                    kurikulum={<div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)' }}>Kurikulum Standar MIU Lirboyo</div>}
                />

            </div>
        </div>
    );
}
