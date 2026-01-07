
export default function ProfilSejarah() {
    return (
        <section className="section-wrapper" style={{ background: "var(--bg-body)", position: "relative", padding: '6rem 1.5rem' }} id="profil">
            {/* Wave Divider Top */}
            <div className="wave-divider-top">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        style={{ fill: 'white' }}></path>
                </svg>
            </div>

            <div className="reveal active">
                <h2 className="section-title">Jejak Sejarah</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '4rem', fontSize: '1.1rem', textAlign: 'center' }}>Perjalanan panjang pengabdian dalam mencetak kader ulama.</p>
            </div>

            <div className="timeline-wrapper">
                <div className="timeline-line"></div>

                {/* TIMELINE 1: 2002 */}
                <div className="timeline-item reveal fade-left" data-year="2002">
                    <div className="timeline-dot" style={{ background: 'var(--gold-main)', border: '4px solid white', boxShadow: '0 0 0 4px rgba(217, 119, 6, 0.2)' }}></div>
                    <div className="glass-card timeline-content" style={{ padding: '2rem', borderTop: '4px solid var(--gold-main)' }}>
                        <span className="gold-accent-text">20 Februari 2002</span>
                        <h3 className="card-title-luxury" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Pendirian & Peresmian</h3>
                        <p style={{ color: "var(--text-muted)", fontSize: '0.95rem', lineHeight: 1.6 }}>
                            Diresmikan langsung oleh KH. Ahmad Mahin Thoha sebagai unit resmi Pondok Pesantren Lirboyo (PPDS).
                            Lembaga ini hadir untuk menjawab kebutuhan santri yang ingin memadukan tradisi salaf dengan pendidikan formal modern.
                        </p>
                    </div>
                </div>

                {/* TIMELINE 2: ERA MODERN */}
                <div className="timeline-item reveal fade-right" data-year="2025">
                    <div className="timeline-dot" style={{ background: 'var(--primary)', border: '4px solid white', boxShadow: '0 0 0 4px rgba(37, 99, 235, 0.2)' }}></div>
                    <div className="glass-card timeline-content" style={{ padding: '2rem', borderTop: '4px solid var(--primary)' }}>
                        <span className="gold-accent-text" style={{ color: 'var(--primary)' }}>Era Kontemporer</span>
                        <h3 className="card-title-luxury" style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary-dark)' }}>Integrasi Sistem</h3>
                        <p style={{ color: "var(--text-muted)", fontSize: '0.95rem', lineHeight: 1.6 }}>
                            Pengembangan dua pilar utama pendidikan: <strong>Madrasah Hidayatul Mubtadiin (MHM)</strong> untuk fokus salafiyah murni
                            dan <strong>Madrasah Ihya' Ulumiddin (MIU)</strong> bagi santri yang menempuh jalur formal (sekolah/kuliah), menciptakan lulusan yang adaptif dan berwawasan luas.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
