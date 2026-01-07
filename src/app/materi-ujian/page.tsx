"use client";

import "@/app/styles/materi-ujian.css";
import { useEffect, useState } from "react";

// Utility Component for Class Cards in Bento Style
const BentoMateriCard = ({ title, materi, kurikulum, age, size = "materi-item-med" }: any) => {
    const [activeTab, setActiveTab] = useState("kurikulum"); // default to kurikulum

    const headerParts = title.includes(' - ') ? title.split(' - ') : [title, ""];
    const category = headerParts[0];
    const subTitle = headerParts[1] || "";

    return (
        <div className={`glass-card-materi ${size} reveal fade-bottom`}>
            {subTitle ? (
                <>
                    <span className="gold-accent-text">{category}</span>
                    <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>
                        {subTitle}
                    </h3>
                </>
            ) : (
                <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>
                    {title}
                </h3>
            )}

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

    // Helper for List Items to save generic repetition
    const Li = ({ children }: { children: React.ReactNode }) => (
        <li className="materi-li" style={{ fontSize: '0.9rem' }}>{children}</li>
    );
    const Check = () => <i className="fas fa-check-circle" style={{ color: 'var(--gold-main)', marginRight: '8px' }}></i>;
    const Edit = () => <i className="fas fa-edit" style={{ color: 'var(--primary)', marginRight: '8px' }}></i>;
    const Mic = () => <i className="fas fa-microphone" style={{ color: 'var(--primary)', marginRight: '8px' }}></i>;
    const Cap = () => <i className="fas fa-graduation-cap" style={{ color: 'var(--text-light)', marginRight: '8px' }}></i>;

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

                {/* --- CATEGORY: MHM --- */}
                <div className="materi-category-header reveal fade-left">
                    <h2>Madrasah Hidayatul Mubtadi'in (MHM)</h2>
                </div>

                <BentoMateriCard
                    title="MHM - I IBTIDAIYAH"
                    age="6 Tahun"
                    size="materi-item-med"
                    materi={<div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)' }}>Tidak ada ujian masuk.</div>}
                    kurikulum={
                        <ul>
                            <Li><Check />CTBQ An-Nahdliyah</Li>
                            <Li><Check />Ilmu Tauhid I</Li>
                            <Li><Check />Fasholatan I</Li>
                            <Li><Check />Ilmu Akhlaq I</Li>
                            <Li><Check />Ta’limul Lughah I</Li>
                            <Li><Check />Terampil Menulis Arab dan Pegon I</Li>
                            <Li><Check />Hidayatul Mubtadi’ I</Li>
                            <Li><Cap />Indo I</Li>
                            <Li><Cap />Daerah I</Li>
                            <Li><Cap />MTK I</Li>
                            <Li><Cap />PKN I</Li>
                        </ul>
                    }
                />

                <BentoMateriCard
                    title="MHM - II IBTIDAIYAH"
                    age="7 Tahun"
                    size="materi-item-med"
                    materi={<div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)' }}>Tidak ada ujian masuk.</div>}
                    kurikulum={
                        <ul>
                            <Li><Check />CTBQ An-Nahdliyah</Li>
                            <Li><Check />Ilmu Tauhid II</Li>
                            <Li><Check />Hidayatul Mubtadi’ II</Li>
                            <Li><Check />Fasholatan II</Li>
                            <Li><Check />Ilmu Akhlaq II</Li>
                            <Li><Check />Ta’limul Lughah II</Li>
                            <Li><Check />Terampil Menulis Arab dan Pegon II</Li>
                            <Li><Cap />Indo II</Li>
                            <Li><Cap />Daerah II</Li>
                            <Li><Cap />MTK II</Li>
                            <Li><Cap />PKN II</Li>
                        </ul>
                    }
                />

                <BentoMateriCard
                    title="MHM - III IBTIDAIYAH"
                    age="8 Tahun"
                    size="materi-item-med"
                    materi={<div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)' }}>Tidak ada ujian masuk.</div>}
                    kurikulum={
                        <ul>
                            <Li><Check />Al-Qur’an</Li>
                            <Li><Check />Tauhid Jawan</Li>
                            <Li><Check />Fasholatan III</Li>
                            <Li><Check />Hidayatul Mubtadi’ III</Li>
                            <Li><Check />Ngudi Susilo</Li>
                            <Li><Check />Tarikh Nabi Muhammad SAW</Li>
                            <Li><Check />Ro’sul Sirah</Li>
                            <Li><Check />Pegon I</Li>
                            <Li><Cap />Indo III, Daerah III, PKN III, Matematika III</Li>
                        </ul>
                    }
                />

                <BentoMateriCard
                    title="MHM - IV IBTIDAIYAH"
                    age="9 Tahun"
                    size="materi-item-med"
                    materi={<div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)' }}>Tidak ada ujian masuk.</div>}
                    kurikulum={
                        <ul>
                            <Li><Check />Al-Qur’an</Li>
                            <Li><Check />Zadul Mubtadi’</Li>
                            <Li><Check />Fasholatan IV</Li>
                            <Li><Check />Hidayatul Mubtadi’ IV</Li>
                            <Li><Check />Nadhmul Akhlaq Alala</Li>
                            <Li><Check />Bahasa Arab Dasar</Li>
                            <Li><Check />Tarikhul Anbiya’</Li>
                            <Li><Check />Isra’ Mi’raj</Li>
                            <Li><Check />Pegon II</Li>
                            <Li><Cap />Indo IV, Daerah IV, PKN IV, Matematika IV</Li>
                        </ul>
                    }
                />

                <BentoMateriCard
                    title="MHM - V IBTIDAIYAH"
                    age="10 Tahun"
                    size="materi-item-med"
                    materi={
                        <>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>UJIAN TULIS:</h4>
                            <ul>
                                <Li><Edit />Tauhid (Zadul Mubtadi’)</Li>
                                <Li><Edit />Fiqh (Hidayatul Mubtadi’ IV)</Li>
                                <Li><Edit />Imla’ (Pegon)</Li>
                            </ul>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem', marginTop: '1rem' }}>UJIAN LISAN:</h4>
                            <ul>
                                <Li><Mic />Fasholatan lengkap</Li>
                                <Li><Mic />Surat pendek (An-Naas s.d. Al-Kafirun)</Li>
                                <Li><Mic />Aqo’id 50</Li>
                            </ul>
                        </>
                    }
                    kurikulum={
                        <ul>
                            <Li><Check />Al-Qur’an & Al-Arba’in An-Nahdliyah</Li>
                            <Li><Check />‘Aqidatul ‘Awam & Safinatun Naja</Li>
                            <Li><Check />Fathur Rohman</Li>
                            <Li><Check />Nadhom Al-Ajurumiyah Jawan</Li>
                            <Li><Check />Nadhmul Mathlab</Li>
                            <Li><Check />Ta’limul Lughoh Al-‘Arobiyah</Li>
                            <Li><Check />Pegon III & Ke-NU-an I</Li>
                            <Li><Cap />Indo V, Daerah V, MTK V, PKN V</Li>
                        </ul>
                    }
                />

                <BentoMateriCard
                    title="MHM - VI IBTIDAIYAH"
                    age="11 Tahun"
                    size="materi-item-med"
                    materi={
                        <>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>UJIAN TULIS:</h4>
                            <ul>
                                <Li><Edit />Fiqh (Safinatun Naja)</Li>
                                <Li><Edit />Tauhid (‘Aqidatul ‘Awam)</Li>
                                <Li><Edit />Nadzom Al-Ajurumiyah Jawan</Li>
                                <Li><Edit />Imla’ (Pegon)</Li>
                            </ul>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem', marginTop: '1rem' }}>UJIAN LISAN:</h4>
                            <ul>
                                <Li><Mic />Fasholatan lengkap</Li>
                                <Li><Mic />Surat pendek (An-Naas s.d. Al-Quraisy)</Li>
                                <Li><Mic />Aqo’id 50</Li>
                            </ul>
                        </>
                    }
                    kurikulum={
                        <ul>
                            <Li><Check />Al-Qur’an & Mukhtarul Hadits</Li>
                            <Li><Check />Taisirul Kholaq & Tanwirul Hija</Li>
                            <Li><Check />Matnu Al-Ajurumiyah & Al-‘Awamil</Li>
                            <Li><Check />Qoidah Natsar & Amtsilah At-Tashrifiyah</Li>
                            <Li><Check />Zaaduththulab & Hidayatus Shibyan</Li>
                            <Li><Cap />Ke-NU-an II & PKN VI</Li>
                        </ul>
                    }
                />

                <BentoMateriCard
                    title="MHM - I TSANAWIYAH"
                    age="12 Tahun"
                    size="materi-item-med"
                    materi={
                        <>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>UJIAN TULIS:</h4>
                            <ul>
                                <Li><Edit />Shorof (Qo’idah Natsar)</Li>
                                <Li><Edit />Nahwu (Matnu Al-Ajurumiyah)</Li>
                                <Li><Edit />Imla’ (Pegon)</Li>
                            </ul>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem', marginTop: '1rem' }}>UJIAN LISAN:</h4>
                            <ul>
                                <Li><Mic />Asy-Syamsy & Aqo’id 50</Li>
                                <Li><Mic />Tashrif bab I–VI</Li>
                                <Li><Mic />Fasholatan lengkap</Li>
                                <Li><Mic />Surat An-Naas s.d. At-Takatsur</Li>
                            </ul>
                        </>
                    }
                    kurikulum={
                        <ul>
                            <Li><Check />Al-Qur’an & Arba’in An-Nawawiyah</Li>
                            <Li><Check />Matnu Ibrohim Al-Bajuri</Li>
                            <Li><Check />Sullamut Taufiq</Li>
                            <Li><Check />Al-Ajurumiyah & Al-I’lal</Li>
                            <Li><Check />Al-Qowa’id As-Shorfiyah</Li>
                            <Li><Check />Al-Amtsilah At-Tashrifiyah</Li>
                            <Li><Check />Tuhfatul Athfal</Li>
                            <Li><Check />Fathul Mubin I</Li>
                            <Li><Check />Washoya & Ke-NU-an III</Li>
                        </ul>
                    }
                />

                <BentoMateriCard
                    title="MHM - ALIYAH"
                    age="15 Tahun"
                    size="materi-item-med"
                    materi={
                        <>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>UJIAN TULIS:</h4>
                            <ul>
                                <Li><Edit />Nahwu (Nadzom Al-‘Amrithi)</Li>
                                <Li><Edit />Shorof (Nadzom Al-Maqshud & Amtsilah)</Li>
                                <Li><Edit />Imla’ (Arab)</Li>
                            </ul>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem', marginTop: '1rem' }}>UJIAN LISAN:</h4>
                            <ul>
                                <Li><Mic />Membaca Fathul Qorib</Li>
                                <Li><Mic />Hafalan Alfiyah Ibnu Malik 350 bait</Li>
                                <Li><Mic />Uji Fasholatan lengkap</Li>
                            </ul>
                        </>
                    }
                    kurikulum={
                        <ul>
                            <Li><Check />Tafsir (Tafsirul Jalalain)</Li>
                            <Li><Check />Hadits (Riyadlus Sholihin)</Li>
                            <Li><Check />Ilmu Hadits (al-Qowaidul Asasiyah)</Li>
                            <Li><Check />Ilmu Tauhid (Jauharoh at-Tauhid)</Li>
                            <Li><Check />Ilmu Fiqh (Fathul Mu'in)</Li>
                            <Li><Check />Ushul Fiqh (Mabadi' & al-Waroqot)</Li>
                            <Li><Check />Ilmu Nahwu (Alfiyah, Qawa'idul I'rob)</Li>
                            <Li><Check />Ilmu Akhlaq (Ta'limul Muta'allim)</Li>
                            <Li><Check />Tarikh (Manaqib Aimmatil Arba'ah)</Li>
                        </ul>
                    }
                />

                <BentoMateriCard
                    title="MADRASAH I'DADIYAH - (PERSIAPAN MHM)"
                    size="materi-item-large"
                    materi={<div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)' }}>-</div>}
                    kurikulum={
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                            <ul>
                                <Li><Check />Al-Qur'an</Li>
                                <Li><Check />Hadits (Arba'in An-Nawawi)</Li>
                                <Li><Check />Mukhtarul Hadits As-Syarif</Li>
                                <Li><Check />Tauhid (Matnu Sanusi)</Li>
                                <Li><Check />Tauhid (Matnu Bajuri)</Li>
                                <Li><Check />Tauhid ('Aqidatul 'Awam)</Li>
                                <Li><Check />Fiqh (Fathul Qorib)</Li>
                                <Li><Check />Fiqh (Sullamut Taufiq)</Li>
                                <Li><Check />Fiqh (Safinatun Naja)</Li>
                                <Li><Check />Nahwu (Al-Amrithi)</Li>
                                <Li><Check />Nahwu (Al-Ajurumiyah)</Li>
                                <Li><Check />Nahwu (Al-'Awamil)</Li>
                            </ul>
                            <ul>
                                <Li><Check />Shorof (Al-Maqshud)</Li>
                                <Li><Check />Shorof (Amtsilah At-Tashrifiyah)</Li>
                                <Li><Check />Shorof (Al-I’lal)</Li>
                                <Li><Check />Akhlaq (Tahliyah wa Targhib)</Li>
                                <Li><Check />Akhlaq (Taisirul Kholaq)</Li>
                                <Li><Check />Akhlaq (Nadhmul Mathlab)</Li>
                                <Li><Check />Tajwid (Tuhfatul Athfal)</Li>
                                <Li><Check />Tajwid (Hidayatus Shibyan)</Li>
                                <Li><Check />Ilmu Imla' Arab</Li>
                                <Li><Check />Kitabah Pegon</Li>
                            </ul>
                        </div>
                    }
                />

                {/* --- CATEGORY: MA'HAD ALY --- */}
                <div className="materi-category-header reveal fade-left">
                    <h2>Ma’had Aly Lirboyo</h2>
                </div>

                <BentoMateriCard
                    title="MA'HAD ALY - MARHALAH ULA"
                    size="materi-item-large"
                    materi={
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div>
                                <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>UJIAN TULIS:</h4>
                                <ul>
                                    <Li><Edit />Balaghah (Al-Jauharul Maknun)</Li>
                                    <Li><Edit />Nahwu Shorof (Alfiyah Ibn Malik)</Li>
                                    <Li><Edit />Ushul Fiqh (Lubbul Ushul)</Li>
                                    <Li><Edit />Imla' (Arab)</Li>
                                </ul>
                            </div>
                            <div>
                                <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>UJIAN LISAN:</h4>
                                <ul>
                                    <Li><Mic />Fiqh (membaca Fathul Mu’in)</Li>
                                    <Li><Mic />Hafalan Qur'an (Juz 1)</Li>
                                    <Li><Mic />Hadits Jami’ul ‘Ulum (1-25)</Li>
                                    <Li><Mic />Fasholatan lengkap & ‘Aqo’id 50</Li>
                                </ul>
                            </div>
                        </div>
                    }
                    kurikulum={
                        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '5px' }}>
                            <Li><Check />Tafsir (Muhtashor Tafsir Ayatil Ahkam)</Li>
                            <Li><Check />Ilmu Tafsir (At-Tahbir)</Li>
                            <Li><Check />Hadits (Tahdzib Targhib Wat Tarhib)</Li>
                            <Li><Check />Ilmu Hadits (Alfiyah Suyuthi)</Li>
                            <Li><Check />Hadits Ahkam (‘Umdatul Ahkam)</Li>
                            <Li><Check />Ilmu Tauhid (Mafahim YA)</Li>
                            <Li><Check />Ilmu Fiqh (Al-Mahalli)</Li>
                            <Li><Check />Fiqh Muwathonah (Fikih Kebangsaan)</Li>
                            <Li><Check />Ushul Fiqh (Syarhu Jam’il Jawami’)</Li>
                            <Li><Check />Qoidah Ushuliyah wa Fiqhiyah</Li>
                            <Li><Check />Ilmu Akhlaq (Mauidhotul Mu'minin)</Li>
                            <Li><Check />Salalimul Fudlola' & Risalah Aswaja</Li>
                            <Li><Check />Kawakibul Lama’ah</Li>
                            <Li><Check />Ilmu Balaghah (‘Uqudul Juman)</Li>
                            <Li><Check />Ilmu Falak (Tashilul Amtsilah)</Li>
                        </ul>
                    }
                />

                <BentoMateriCard
                    title="MA'HAD ALY - MARHALAH TSANIYAH"
                    size="materi-item-large"
                    materi={
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div>
                                <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>UJIAN TULIS:</h4>
                                <ul>
                                    <Li><Edit />Fikih Kebangsaan (2 soal uraian)</Li>
                                </ul>
                            </div>
                            <div>
                                <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>UJIAN LISAN:</h4>
                                <ul>
                                    <Li><Mic />Kitab Kanzurroghibin</Li>
                                    <Li><Mic />Munaqosyah Fikih Kebangsaan</Li>
                                    <Li><Mic />Psikotest</Li>
                                    <Li><Mic />Hafalan Qur'an 3 juz*</Li>
                                    <Li><Mic />Hafalan 150 Hadits Jami’ul ‘Ulum*</Li>
                                </ul>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>*Mahasantri baru non-lulusan Marhalah Ula Lirboyo</p>
                            </div>
                        </div>
                    }
                    kurikulum={
                        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '5px' }}>
                            <Li><Check />Tafsir (Rowa'iul Bayan)</Li>
                            <Li><Check />Ilmu Tafsir (Al-Itqon)</Li>
                            <Li><Check />Hadits (Syarah Umdatul Ahkam)</Li>
                            <Li><Check />Ilmu Hadits (Muqoddimah ibn Sholah)</Li>
                            <Li><Check />Fiqh Muwathonah (3 Kitab)</Li>
                            <Li><Check />Ushul Fiqh (Al-Kaukab As-Sathi’)</Li>
                            <Li><Check />Qoidah Ushuliyah (Qowaidul Ahkam)</Li>
                            <Li><Check />Metode Penelitian & Filsafat Islam</Li>
                            <Li><Check />Sejarah Peradaban Islam</Li>
                            <Li><Check />Sosiologi & Psikologi Islam</Li>
                        </ul>
                    }
                />

                {/* --- CATEGORY: MIU --- */}
                <div className="materi-category-header reveal fade-left">
                    <h2>Madrasah Ihya' Ulumiddin (MIU)</h2>
                </div>

                <BentoMateriCard
                    title="MIU - Kelas I Ula"
                    size="materi-item-med"
                    materi={<div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)' }}>Tanpa ujian.</div>}
                    kurikulum={
                        <ul>
                            <Li><Check />Al-Qur’an</Li>
                            <Li><Check />Hadis (Arba’in An-Nahdliyah)</Li>
                            <Li><Check />Mukhtar Al-Hadis As-Syarif</Li>
                            <Li><Check />Tauhid (Zadul Mubtadi)</Li>
                            <Li><Check />Fiqh (Fasholatan)</Li>
                            <Li><Check />Ilmu Tajwid (Tajwid Jawan)</Li>
                            <Li><Check />Fathur Rohman</Li>
                            <Li><Check />Hidayatus Shibyan</Li>
                            <Li><Check />Akhlaq (Nadzm Alala)</Li>
                            <Li><Check />Ta’lim Al-Muta’allim</Li>
                            <Li><Check />Kitabah (Pegon I)</Li>
                            <Li><Check />Tarikh (Pedoman Ke-NU-an I)</Li>
                        </ul>
                    }
                />

                <BentoMateriCard
                    title="MIU - Kelas II Ula"
                    size="materi-item-med"
                    materi={
                        <>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>UJIAN TULIS:</h4>
                            <ul>
                                <Li><Edit />Tauhid (Zadul Al-Mubtadi’ I)</Li>
                                <Li><Edit />Fiqh (Safinat As-Sholah)</Li>
                                <Li><Edit />Imla’ (Pegon I)</Li>
                            </ul>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem', marginTop: '1rem' }}>UJIAN LISAN:</h4>
                            <ul>
                                <Li><Mic />‘Aqo’id 50</Li>
                                <Li><Mic />Fasholatan lengkap</Li>
                                <Li><Mic />Surat pendek (An-Naas s.d. At-Takatsur)</Li>
                            </ul>
                        </>
                    }
                    kurikulum={
                        <ul>
                            <Li><Check />Al-Qur’an & Tauhid (Zadul Mubtadi’)</Li>
                            <Li><Check />Ilmu Tajwid (Fathur Rohman)</Li>
                            <Li><Check />Fiqh (Safinatun Naja)</Li>
                            <Li><Check />Akhlaq (Nadzm Al-Mathlab)</Li>
                            <Li><Check />Ilmu Nahwu (Nadzm Jurumiyah Jawan)</Li>
                            <Li><Check />Kitabah (Pegon II)</Li>
                            <Li><Check />Tarikh (Pedoman Ke-NU-an II)</Li>
                        </ul>
                    }
                />

                <BentoMateriCard
                    title="MIU - Kelas III Ula"
                    size="materi-item-med"
                    materi={
                        <>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>UJIAN TULIS:</h4>
                            <ul>
                                <Li><Edit />Tauhid (Zadul Al-Mubtadi’ II)</Li>
                                <Li><Edit />Fiqh (Safina)</Li>
                                <Li><Edit />Nahwu (Jawan)</Li>
                                <Li><Edit />Imla’ (Pegon II)</Li>
                            </ul>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem', marginTop: '1rem' }}>UJIAN LISAN:</h4>
                            <ul>
                                <Li><Mic /> ‘Aqo’id 50</Li>
                                <Li><Mic />Fasholatan lengkap</Li>
                                <Li><Mic />Surat pendek (An-Naas s.d. Al-‘Alaq)</Li>
                            </ul>
                        </>
                    }
                    kurikulum={
                        <ul>
                            <Li><Check />Al-Qur’an & Tauhid (Aqidatul ‘Awam)</Li>
                            <Li><Check />Ilmu Tajwid (Hidayatus Shibyan)</Li>
                            <Li><Check />Fiqh (Hidayatul Mubtadi)</Li>
                            <Li><Check />Akhlaq (Taisir Al-Kholoq)</Li>
                            <Li><Check />Ilmu Nahwu (‘Awamil & Al-Jurumiyah)</Li>
                            <Li><Check />Ilmu Shorof (Qoidah Natsar)</Li>
                            <Li><Check />Kitabah (Pegon III)</Li>
                            <Li><Check />Tarikh (Pedoman Ke-NU-an III)</Li>
                        </ul>
                    }
                />

                <BentoMateriCard
                    title="MIU - Kelas I Wustho"
                    size="materi-item-med"
                    materi={
                        <>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>UJIAN TULIS:</h4>
                            <ul>
                                <Li><Edit />Tauhid (‘Aqidat Al-‘Awam)</Li>
                                <Li><Edit />Nahwu (Ajurumiyah & ‘Awamil)</Li>
                                <Li><Edit />Shorof (Natsar)</Li>
                                <Li><Edit />Imla’ (Pegon III)</Li>
                            </ul>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem', marginTop: '1rem' }}>UJIAN LISAN:</h4>
                            <ul>
                                <Li><Mic />‘Aqo’id 50</Li>
                                <Li><Mic />Fasholatan lengkap</Li>
                                <Li><Mic />Tashrif Istilahi (Bab I–VI)</Li>
                                <Li><Mic />Surat An-Naas s.d. Ad-Dhuha</Li>
                            </ul>
                        </>
                    }
                    kurikulum={
                        <ul style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '5px' }}>
                            <Li><Check />Al-Qur’an & Tafsir Al-Jalalain</Li>
                            <Li><Check />Hadis (Arba’in Nawawi & Bulughul Marom)</Li>
                            <Li><Check />Tauhid (Matn Ibrohim & Khoridatul Bahiyyah)</Li>
                            <Li><Check />Tajwid (Tuhfatul Athfal & Al-Jazariyah)</Li>
                            <Li><Check />Fiqh (Sullam At-Taufiq & Fathul Qorib)</Li>
                            <Li><Check />Akhlaq (Ta’lim Muta’allim & Washoya)</Li>
                            <Li><Check />Nahwu (Jurumiyah, Fushul Fikriyah, Imrithi)</Li>
                            <Li><Check />Shorof (Amtsilah, I’lal, Maqshud)</Li>
                            <Li><Check />Imla’ (Qowaid) & Tarikh (Fath Al-Mubin)</Li>
                        </ul>
                    }
                />

                <BentoMateriCard
                    title="MIU - Kelas I Ulya"
                    size="materi-item-med"
                    materi={
                        <>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>UJIAN TULIS:</h4>
                            <ul>
                                <Li><Edit />Tauhid (Sanusiyyah)</Li>
                                <Li><Edit />Nahwu (Nadzm Al-‘Imrithy)</Li>
                                <Li><Edit />Shorof (Maqshud & Amtsilah)</Li>
                                <Li><Edit />Imla’ (Arab)</Li>
                            </ul>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem', marginTop: '1rem' }}>UJIAN LISAN:</h4>
                            <ul>
                                <Li><Mic />Fasholatan lengkap & ‘Aqo’id 50</Li>
                                <Li><Mic />Fiqh (Fath Al-Qorib)</Li>
                                <Li><Mic />Hafalan Alfiyah (250 bait)</Li>
                                <Li><Mic />Membaca Al-Qur’an & Surat Pendek</Li>
                            </ul>
                        </>
                    }
                    kurikulum={
                        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '5px' }}>
                            <Li><Check />Al-Qur’an & Tafsir Jalalain</Li>
                            <Li><Check />Hadis (Riyad As-Sholihin)</Li>
                            <Li><Check />Tauhid (Jawahir & Kifayatul ‘Awam)</Li>
                            <Li><Check />Fiqh (Fath Al-Mu’in)</Li>
                            <Li><Check />Ushul Fiqh (Al-Waroqot)</Li>
                            <Li><Check />Qoidah Fiqh (Faroid Al-Bahiyyah)</Li>
                            <Li><Check />Ilmu Mawaris (‘Uddat Al-Farid)</Li>
                            <Li><Check />Akhlaq (Mau’idzot & Minhaj)</Li>
                            <Li><Check />Nahwu (Alfiyah & Qowa’id Al-I’rob)</Li>
                            <Li><Check />Balaghah (Jauhar) & Hadis (Baiquniyah)</Li>
                            <Li><Check />Ilmu Tafsir (Imam Ad-Dirayah)</Li>
                        </ul>
                    }
                />

                <BentoMateriCard
                    title="MIU - Kelas I'dadiyah"
                    size="materi-item-med"
                    materi={
                        <>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>UJIAN TULIS:</h4>
                            <ul>
                                <Li><Edit />Imla’ (Pegon & Memaknai)</Li>
                            </ul>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem', marginTop: '1rem' }}>UJIAN LISAN:</h4>
                            <ul>
                                <Li><Mic />‘Aqo’id 50</Li>
                                <Li><Mic />Fasholatan lengkap</Li>
                                <Li><Mic />Surat pendek (An-Naas s.d. Al-‘Alaq)</Li>
                            </ul>
                        </>
                    }
                    kurikulum={
                        <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)' }}>Penguatan Kitabah Pegon dan Pemaknaan Kitab.</div>
                    }
                />
            </div>
        </div>
    );
}
