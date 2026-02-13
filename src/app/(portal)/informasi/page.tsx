"use client";

import "@/app/styles/informasi.css";
import { useEffect, useState } from "react";

export default function InformasiPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await fetch('/api/content/all');
                const json = await res.json();
                setData(json);
            } catch (err) {
                console.error("Gagal load informasi", err);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();

        const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, index * 100);
                } else {
                    entry.target.classList.remove('active');
                }
            });
        }, observerOptions);

        if (!loading) {
            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        }
    }, [loading]);

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-body)' }}>
                <i className="fas fa-spinner fa-spin fa-3x" style={{ color: 'var(--primary)' }}></i>
            </div>
        );
    }

    const { settings, content } = data || {};

    return (
        <div style={{ backgroundColor: 'var(--bg-body)' }}>
            {/* LUXURY HERO SECTION */}
            <section className="info-hero-section">
                <div className="reveal fade-bottom">
                    <span className="ornament-icon"><i className="fas fa-scroll"></i></span>
                    <h1 className="page-hero-title">
                        {settings?.info_hero_title?.includes(' ') ? (
                            <>
                                <span className="text-dark">{settings.info_hero_title.split(' ')[0]}</span>{' '}
                                <span className="text-primary">{settings.info_hero_title.split(' ').slice(1).join(' ')}</span>
                            </>
                        ) : (
                            <span className="text-primary">{settings?.info_hero_title || "Informasi Pendaftaran"}</span>
                        )}
                    </h1>
                    <p className="page-hero-subtitle">
                        {settings?.info_hero_subtitle || "Panduan resmi tata cara pendaftaran santri baru Pondok Pesantren Darussalam Lirboyo."}
                    </p>
                </div>
            </section>

            {/* BENTO CONTENT GRID */}
            <div className="bento-grid">

                {/* 1. INTRO (LARGE) - Bento Style */}
                <div className="glass-card bento-item-large reveal fade-bottom">
                    <span className="gold-accent-text">Sambutan Pendaftaran</span>
                    <h2 className="card-title-luxury">
                        {settings?.info_intro_title || "Digitalisasi Pesantren"}
                    </h2>
                    <p className="lead-text" style={{ fontSize: '1rem', color: 'var(--text-main)' }}>
                        {settings?.info_intro_lead}
                    </p>
                    <p style={{ lineHeight: 1.8, color: "var(--text-muted)", fontSize: '0.95rem', whiteSpace: 'pre-line' }}>
                        {settings?.info_intro_text}
                    </p>
                </div>

                {/* 2. STATS/HIGHLIGHT (SMALL) - Bento Style */}
                <div className="glass-card bento-item-small reveal fade-bottom" style={{ background: 'var(--primary-dark)', color: 'white' }}>
                    <span className="gold-accent-text" style={{ color: 'var(--accent)' }}>Target & Kuota</span>
                    <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>
                        {settings?.info_quota_target || "Global"}
                    </h3>
                    <p style={{ opacity: 0.9, fontSize: '0.9rem' }}>
                        {settings?.info_quota_desc || "Menerima santri baru dengan kuota terbatas setiap tahunnya."}
                    </p>
                    <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Ibtidaiyah</span>
                            <strong>Sudah Dibuka</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Tsanawiyah</span>
                            <strong>Sudah Dibuka</strong>
                        </div>
                    </div>
                </div>

                {/* 3. STEPS (FULL) - Bento Style */}
                <div className="glass-card bento-item-full reveal fade-bottom">
                    <span className="gold-accent-text">Alur Pendaftaran</span>
                    <h2 className="card-title-luxury">
                        <i className="fas fa-project-diagram"></i> Tahapan Pendaftaran Online
                    </h2>

                    <div className="bento-steps">
                        {(content?.alur || []).map((step: any, idx: number) => (
                            <div key={idx} className="bento-step-card">
                                <div className="step-number-luxury">{String(idx + 1).padStart(2, '0')}</div>
                                <h4 style={{ marginBottom: '10px', color: 'var(--primary-dark)' }}>{step.label}</h4>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. PHOTO REQS (LARGE) */}
                <div className="glass-card bento-item-large reveal fade-bottom">
                    <span className="gold-accent-text">Persyaratan Visual</span>
                    <h2 className="card-title-luxury">
                        <i className="fas fa-camera-retro"></i> Ketentuan Foto Resmi
                    </h2>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Mohon pastikan foto yang diunggah memenuhi kriteria berikut agar proses validasi lancar:</p>

                    <div className="photo-grid-premium">
                        {(content?.['syarat-foto'] || []).map((item: any, idx: number) => (
                            <div key={idx} className="photo-badge"><i className="fas fa-check-circle"></i> {item.label}</div>
                        ))}
                    </div>
                </div>

                {/* 5. QUICK MENU (SMALL) */}
                <div className="glass-card bento-item-small reveal fade-bottom" style={{ background: 'var(--gold-gradient)', border: 'none' }}>
                    <span className="gold-accent-text" style={{ color: 'rgba(255,255,255,0.8)' }}>Akses Cepat</span>
                    <h3 style={{ color: 'white', fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Menu Portal</h3>

                    <div style={{ display: 'grid', gap: '10px' }}>
                        <a href="/" style={{ padding: '12px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <i className="fas fa-home"></i> Beranda
                        </a>
                        <a href="/materi-ujian" style={{ padding: '12px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <i className="fas fa-book"></i> Materi Ujian
                        </a>
                        <a href="/ppdb" style={{ padding: '12px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <i className="fas fa-user-plus"></i> Daftar Online
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}
