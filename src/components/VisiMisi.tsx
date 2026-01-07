export default function VisiMisi() {
    return (
        <section className="section-wrapper" id="visi-misi" style={{ position: "relative", paddingBottom: "8rem" }}>
            <div className="reveal fade-left">
                <h2 className="section-title">Visi &amp; Misi</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem' }}>Falsafah pendidikan yang mendasari setiap langkah perjuangan lahiriah dan batiniah.</p>
            </div>

            <div className="bento-grid" style={{ margin: '0' }}>
                {/* VISI - Large Module */}
                <div className="glass-card reveal fade-left" style={{ gridColumn: 'span 7', background: 'var(--grad-premium)', border: 'none' }}>
                    <span className="gold-accent-text">Tujuan Utama</span>
                    <h3 className="card-title-luxury" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Visi</h3>
                    <p style={{ fontSize: "1.4rem", color: "var(--primary-dark)", lineHeight: 1.4, fontWeight: 600, fontFamily: 'var(--font-playfair)' }}>
                        "Mencetak insan bertaqwa, berakhlak Al-Qur'an dan As-Sunnah, serta berilmu luas dengan pijakan tradisi salafus shalih."
                    </p>
                </div>

                {/* MISI - Right Side Module */}
                <div className="glass-card reveal fade-right delay-100" style={{ gridColumn: 'span 5' }}>
                    <span className="gold-accent-text">Langkah Strategis</span>
                    <h3 className="card-title-luxury">Misi</h3>
                    <ul className="misi-list" style={{ marginTop: '1.5rem' }}>
                        <li style={{ marginBottom: '1rem', display: 'flex', gap: '12px' }}>
                            <i className="fas fa-check-circle" style={{ color: 'var(--gold-main)', marginTop: '4px' }}></i>
                            <span>Mengembangkan ilmu agama berbasis pada kitab-kitab mu'tabaroh (Kitab Kuning).</span>
                        </li>
                        <li style={{ marginBottom: '1rem', display: 'flex', gap: '12px' }}>
                            <i className="fas fa-check-circle" style={{ color: 'var(--gold-main)', marginTop: '4px' }}></i>
                            <span>Menumbuhkan kecintaan membaca, menulis, dan berkarya ilmiah bagi para santri.</span>
                        </li>
                        <li style={{ display: 'flex', gap: '12px' }}>
                            <i className="fas fa-check-circle" style={{ color: 'var(--gold-main)', marginTop: '4px' }}></i>
                            <span>Membangun karakter disiplin, bertanggung jawab, dan taat pada norma agama.</span>
                        </li>
                    </ul>
                </div>

                {/* ADDITIONAL INFO - Small Module */}
                <div className="glass-card reveal fade-bottom delay-200" style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--primary-dark)', color: 'white' }}>
                    <h4 style={{ color: 'var(--accent)', fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>1910</h4>
                    <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Sejarah panjang pengabdian dalam mencetak ulama sejak era pendiri Lirboyo.</p>
                </div>

                {/* TARGET LULUSAN - Med Module */}
                <div className="glass-card reveal fade-bottom delay-300" style={{ gridColumn: 'span 8' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div className="header-icon-box" style={{ background: 'var(--grad-premium)' }}><i className="fas fa-award"></i></div>
                        <div>
                            <h4 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.3rem', color: 'var(--primary-dark)' }}>Target Lulusan</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Kombinasi kedalaman spiritual, keluhuran budi pekerti, dan kesiapan menghadapi tantangan zaman.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wave Divider Bottom */}
            <div className="wave-divider">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="shape-fill"></path>
                </svg>
            </div>
        </section>
    );
}
