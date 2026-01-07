"use client";

import "@/app/styles/informasi.css";
import { useEffect } from "react";

export default function InformasiPage() {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Staggered delay implementation
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, index * 100);
                } else {
                    entry.target.classList.remove('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });
    }, []);

    return (
        <div style={{ backgroundColor: 'var(--bg-body)' }}>
            {/* LUXURY HERO SECTION */}
            <section className="info-hero-section">
                <div className="reveal fade-bottom">
                    <span className="ornament-icon"><i className="fas fa-scroll"></i></span>
                    <h1 className="page-hero-title">
                        <span className="text-dark">Informasi</span> <span className="text-primary">Pendaftaran</span>
                    </h1>
                    <p className="page-hero-subtitle">
                        Panduan resmi tata cara pendaftaran santri baru Pondok Pesantren Darussalam Lirboyo Tahun Pelajaran 2025/2026.
                    </p>
                </div>
            </section>

            {/* BENTO CONTENT GRID */}
            <div className="bento-grid">

                {/* 1. INTRO (LARGE) - Bento Style */}
                <div className="glass-card bento-item-large reveal fade-bottom">
                    <span className="gold-accent-text">Sambutan Pendaftaran</span>
                    <h2 className="card-title-luxury">
                        Digitalisasi Pesantren
                    </h2>
                    <p className="lead-text" style={{ fontSize: '1rem', color: 'var(--text-main)' }}>
                        Kini, teknologi dan media digital menjadi sarana penting guna memenuhi berbagai kebutuhan.
                        <strong> Pondok Pesantren Darussalam Lirboyo</strong> menghadirkan layanan digital untuk mempermudah pendaftaran dari mana saja.
                    </p>
                    <p style={{ lineHeight: 1.8, color: "var(--text-muted)", fontSize: '0.95rem' }}>
                        Mengingat jumlah pendaftar yang terus meningkat dari seluruh penjuru nusantara hingga mancanegara, sistem online ini hadir sebagai solusi administrasi yang cepat, akurat, dan transparan bagi para calon pengembara ilmu.
                    </p>
                </div>

                {/* 2. STATS/HIGHLIGHT (SMALL) - Bento Style */}
                <div className="glass-card bento-item-small reveal fade-bottom" style={{ background: 'var(--primary-dark)', color: 'white' }}>
                    <span className="gold-accent-text" style={{ color: 'var(--accent)' }}>Target & Kuota</span>
                    <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>Global</h3>
                    <p style={{ opacity: 0.9, fontSize: '0.9rem' }}>
                        Menerima santri baru dari tingkat Ibtidaiyah hingga Tsanawiyah dengan kuota terbatas setiap tahunnya.
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
                        <div className="bento-step-card">
                            <div className="step-number-luxury">01</div>
                            <h4 style={{ marginBottom: '10px', color: 'var(--primary-dark)' }}>Isi Data Diri</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Mendaftarkan akun dan mengisi biodata lengkap sesuai KK dan dokumen resmi.</p>
                        </div>
                        <div className="bento-step-card">
                            <div className="step-number-luxury">02</div>
                            <h4 style={{ marginBottom: '10px', color: 'var(--primary-dark)' }}>Unggah Berkas</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Melampirkan pas foto, scan kartu keluarga, dan akta kelahiran.</p>
                        </div>
                        <div className="bento-step-card">
                            <div className="step-number-luxury">03</div>
                            <h4 style={{ marginBottom: '10px', color: 'var(--primary-dark)' }}>Verifikasi</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Proses validasi data oleh tim sekretariat dan penerbitan nomor ujian.</p>
                        </div>
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
                        <div className="photo-badge"><i className="fas fa-check-circle"></i> Background Biru Polos</div>
                        <div className="photo-badge"><i className="fas fa-check-circle"></i> Baju Putih Berkerah</div>
                        <div className="photo-badge"><i className="fas fa-check-circle"></i> Kopyah Hitam Polos</div>
                        <div className="photo-badge"><i className="fas fa-check-circle"></i> Ukuran 3x4 (Maks 5MB)</div>
                        <div className="photo-badge"><i className="fas fa-check-circle"></i> Rambut Rapi (Pendek)</div>
                        <div className="photo-badge"><i className="fas fa-check-circle"></i> Kualitas Gambar Jelas</div>
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
