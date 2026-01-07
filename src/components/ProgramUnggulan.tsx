'use client';
export default function ProgramUnggulan({ onOpenGallery }: { onOpenGallery: (title: string) => void }) {
    return (
        <section className="section-wrapper" id="program">
            <div className="reveal active">
                <h2 className="section-title">Program Unggulan</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem' }}>Kurikulum integratif yang menggabungkan kedalaman turast salaf dengan wawasan masa depan.</p>
            </div>

            <div className="bento-grid" style={{ margin: '0' }}>
                {/* PROGRAM 1: KITAB KUNING (LARGE) */}
                <div className="glass-card reveal fade-bottom delay-100"
                    style={{ gridColumn: 'span 8', cursor: "pointer" }}
                    onClick={() => onOpenGallery('Kitab Kuning')}>
                    <div className="header-icon-box" style={{ background: 'var(--gold-gradient)', color: 'white' }}>
                        <i className="fas fa-book-open"></i>
                    </div>
                    <h3 className="card-title-luxury" style={{ marginTop: '1.5rem' }}>Kajian Kitab Kuning (Sorogan & Bandongan)</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: '1rem', lineHeight: 1.6 }}>
                        Metode pendidikan tradisional yang telah teruji dalam mentransfer sanad keilmuan secara langsung dari guru ke murid. Menjamin kedalaman pemahaman teks turast secara akurat.
                    </p>
                    <div style={{ marginTop: '1.5rem', display: 'flex', gap: '10px' }}>
                        <span className="age-badge">Sanad Terjaga</span>
                        <span className="age-badge">Sistem Klasikal</span>
                    </div>
                </div>

                {/* PROGRAM 2: BAHTSUL MASA'IL (MED) */}
                <div className="glass-card reveal fade-bottom delay-200"
                    style={{ gridColumn: 'span 4', cursor: "pointer", display: 'flex', flexDirection: 'column' }}
                    onClick={() => onOpenGallery('Bahtsul Masa\'il')}>
                    <div className="header-icon-box"><i className="fas fa-comments"></i></div>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 800, margin: "1rem 0", fontFamily: 'var(--font-playfair)', color: 'var(--primary-dark)' }}>Bahtsul Masa'il</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: '0.9rem', flexGrow: 1 }}>
                        Latihan musyawarah tingkat tinggi untuk memecahkan problematika umat kontemporer berbasis dalil-dalil fiqh mu'tabar.
                    </p>
                    <div className="gold-accent-text" style={{ marginTop: '1rem', fontSize: '0.7rem' }}>KLIK UNTUK LIHAT GALERI <i className="fas fa-arrow-right"></i></div>
                </div>

                {/* PROGRAM 3: FORMAL (MED) */}
                <div className="glass-card reveal fade-bottom delay-300"
                    style={{ gridColumn: 'span 12', cursor: "pointer" }}
                    onClick={() => onOpenGallery('Formal dan Non-Formal')}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '2rem', alignItems: 'center' }}>
                        <div className="header-icon-box" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                            <i className="fas fa-university"></i>
                        </div>
                        <div>
                            <h3 className="card-title-luxury" style={{ marginBottom: '0.5rem' }}>Integrasi Formal & Non-Formal</h3>
                            <p style={{ color: "var(--text-muted)" }}>
                                Sinergi antara Madrasah Ihya' Ulumiddin (MIU) untuk pendidikan sekolah dan Madrasah Hidayatul Mubtadiin (MHM) untuk pendalaman salafiyah murni.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
