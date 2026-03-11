"use client";

import "@/app/styles/ppdb.css";
import Link from "next/link";

export default function PPDBPage() {
    // Ganti URL ini dengan link Google Form Anda
    const googleFormUrl = "https://forms.gle/199ST2wLBqZ52f1V9"; 

    return (
        <div style={{ backgroundColor: 'var(--bg-body)', minHeight: '100vh', paddingBottom: '4rem' }}>
            {/* HERO SECTION */}
            <section className="info-hero-section">
                <div className="reveal active">
                    <span className="ornament-icon"><i className="fas fa-edit"></i></span>
                    <h1 className="page-hero-title">
                        <span className="text-dark">Formulir</span> <span className="text-primary">Pendaftaran</span>
                    </h1>
                    <p className="page-hero-subtitle">
                        Pendaftaran santri baru kini lebih mudah diakses melalui Google Form kami.
                    </p>
                </div>
            </section>

            <main className="ppdb-main-luxury" style={{ maxWidth: '800px', margin: '0 auto', marginTop: '-4rem', position: 'relative', zIndex: 10 }}>
                <div className="form-card-luxury" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                    <div className="header-icon-box" style={{ margin: '0 auto 1.5rem', width: '80px', height: '80px', fontSize: '2.5rem' }}>
                        <i className="fas fa-clipboard-list"></i>
                    </div>
                    
                    <h2 style={{ color: 'var(--primary-dark)', marginBottom: '1rem', fontSize: '1.8rem' }}>Pendaftaran Online Tersedia!</h2>
                    
                    <p style={{ color: '#4b5563', marginBottom: '2rem', lineHeight: '1.7', fontSize: '1.1rem' }}>
                        Untuk memudahkan proses pendaftaran dan memastikan data Anda tersimpan dengan aman, 
                        kami telah beralih menggunakan sistem pendaftaran terintegrasi. 
                        Silakan klik tombol di bawah ini untuk mengisi formulir pendaftaran.
                    </p>

                    <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '12px', marginBottom: '2.5rem', border: '1px solid #e2e8f0', textAlign: 'left' }}>
                        <h4 style={{ color: '#1e293b', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <i className="fas fa-info-circle" style={{ color: 'var(--primary)' }}></i> Informasi Penting:
                        </h4>
                        <ul style={{ color: '#4b5563', paddingLeft: '1.5rem', margin: 0, lineHeight: '1.6' }}>
                            <li>Pastikan Anda menyiapkan berkas seperti <strong>Kartu Keluarga (KK)</strong> dan <strong>Ijazah Terakhir</strong>.</li>
                            <li>Gunakan <strong>email yang aktif</strong> saat mengisi formulir.</li>
                            <li>Bukti pendaftaran akan otomatis <strong>dikirim ke email Anda</strong> setelah formulir selesai disubmit.</li>
                        </ul>
                    </div>

                    <a 
                        href={googleFormUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-luxe btn-luxe-primary"
                        style={{ display: 'inline-flex', padding: '1rem 2.5rem', fontSize: '1.1rem', justifyContent: 'center', boxShadow: '0 10px 25px rgba(11, 88, 59, 0.3)' }}
                    >
                        Mulai Mendaftar Sekarang <i className="fas fa-external-link-alt" style={{ marginLeft: '0.5rem' }}></i>
                    </a>
                </div>
            </main>
        </div>
    );
}
