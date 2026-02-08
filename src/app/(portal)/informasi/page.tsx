"use client";

import "@/app/styles/informasi.css";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Step {
    label: string;
    description: string;
}

interface PhotoReq {
    label: string;
}

interface PaymentKetentuan {
    label: string;
}

interface PageData {
    settings: Record<string, string>;
    content: {
        alur?: Step[];
        'syarat-foto'?: PhotoReq[];
        'pembayaran-ketentuan'?: PaymentKetentuan[];
    };
}

export default function InformasiPage() {
    const [data, setData] = useState<PageData | null>(null);
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
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
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
                        {(content?.alur || []).map((step, idx: number) => (
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
                        {(content?.['syarat-foto'] || []).map((item, idx: number) => (
                            <div key={idx} className="photo-badge"><i className="fas fa-check-circle"></i> {item.label}</div>
                        ))}
                    </div>
                </div>

                {/* 5. DOCUMENT REQS (LARGE) */}
                <div className="glass-card bento-item-large reveal fade-bottom">
                    <span className="gold-accent-text">Persyaratan Berkas</span>
                    <h2 className="card-title-luxury">
                        <i className="fas fa-file-invoice"></i> Dokumen Administrasi
                    </h2>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Dokumen fisik yang wajib dibawa saat kedatangan santri:</p>

                    <ul className="doc-list-premium" style={{ listStyle: 'none', padding: 0, marginTop: '1.5rem', display: 'grid', gap: '12px' }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
                            <i className="fas fa-check-circle" style={{ color: 'var(--gold-main)' }}></i> Fotocopy Kartu Keluarga (KK) - 3 Lembar
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
                            <i className="fas fa-check-circle" style={{ color: 'var(--gold-main)' }}></i> Fotocopy Akta Kelahiran - 3 Lembar
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
                            <i className="fas fa-check-circle" style={{ color: 'var(--gold-main)' }}></i> Surat Keterangan Sehat asli dari Dokter/Puskesmas
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
                            <i className="fas fa-check-circle" style={{ color: 'var(--gold-main)' }}></i> Ijazah Asli & Fotocopy (Dilegalisir) - 3 Lembar
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
                            <i className="fas fa-check-circle" style={{ color: 'var(--gold-main)' }}></i> NISN yang terverifikasi (dari sekolah asal)
                        </li>
                    </ul>
                </div>

                {/* 6. PAYMENTS (FULL) */}
                <div className="glass-card bento-item-full reveal fade-bottom">
                    <span className="gold-accent-text">Estimasi Biaya</span>
                    <h2 className="card-title-luxury">
                        <i className="fas fa-wallet"></i> Rincian Pembayaran Santri
                    </h2>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                        <div className="payment-tier-card">
                            <h4 style={{ color: 'var(--primary)', marginBottom: '1rem', borderBottom: '2px solid var(--gold-light)', paddingBottom: '10px' }}>Santri Baru (Estimasi)</h4>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                                    <span>Uang Pangkal & Gedung</span>
                                    <strong>Rp. {settings?.estimasi_baru || '383.500'}*</strong>
                                </div>
                                <p style={{ fontSize: '0.75rem', marginTop: '10px', fontStyle: 'italic' }}>* Belum termasuk iuran MIU/MHM dan kas fariyah lainnya.</p>
                            </div>
                        </div>

                        <div className="payment-tier-card">
                            <h4 style={{ color: 'var(--primary-dark)', marginBottom: '1rem', borderBottom: '2px solid var(--gold-light)', paddingBottom: '10px' }}>Ketentuan Pembayaran</h4>
                            <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'grid', gap: '8px' }}>
                                {(content?.['pembayaran-ketentuan'] || []).map((item, idx: number) => (
                                    <li key={idx}>{item.label}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 7. QUICK MENU (SMALL) */}
                <div className="glass-card bento-item-small reveal fade-bottom" style={{ background: 'var(--gold-gradient)', border: 'none' }}>
                    <span className="gold-accent-text" style={{ color: 'rgba(255,255,255,0.8)' }}>Akses Cepat</span>
                    <h3 style={{ color: 'white', fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Menu Portal</h3>

                    <div style={{ display: 'grid', gap: '10px' }}>
                        <Link href="/" style={{ padding: '12px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <i className="fas fa-home"></i> Beranda
                        </Link>
                        <Link href="/materi-ujian" style={{ padding: '12px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <i className="fas fa-book"></i> Materi Ujian
                        </Link>
                        <Link href="/ppdb" style={{ padding: '12px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <i className="fas fa-user-plus"></i> Daftar Online
                        </Link>
                    </div>
                </div>

                {/* 8. HELP & CONTACT (SMALL) - Bento Style */}
                <div className="glass-card bento-item-small reveal fade-bottom">
                    <span className="gold-accent-text">Bantuan</span>
                    <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', marginBottom: '1rem' }}>Layanan Terpadu</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Hubungi panitia jika mengalami kendala pendaftaran:</p>
                    <a href="https://wa.me/6281234567890" target="_blank" className="btn-luxury-sm" style={{ display: 'block', textAlign: 'center', background: '#25d366', color: 'white', borderRadius: '50px', padding: '10px', fontWeight: 700 }}>
                        <i className="fab fa-whatsapp"></i> WhatsApp Panitia
                    </a>
                </div>

            </div>
        </div>
    );
}
