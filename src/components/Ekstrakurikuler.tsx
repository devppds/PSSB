export default function Ekstrakurikuler() {
    return (
        <section className="section-wrapper" id="ekstrakulikuler" style={{ paddingBottom: '6rem' }}>
            <div className="reveal active">
                <h2 className="section-title">Ekstrakurikuler</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '4rem', fontSize: '1.1rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
                    Wadah pengembangan bakat dan kreativitas santri di luar jam pendidikan formal.
                </p>
            </div>

            <div className="bento-grid" style={{ margin: '0' }}>
                {/* 1. SENI & KETERAMPILAN - Large */}
                <div className="glass-card reveal fade-bottom delay-100" style={{ gridColumn: 'span 6', display: 'flex', flexDirection: 'column' }}>
                    <div className="step-header-luxury" style={{ marginBottom: '1.5rem' }}>
                        <div className="header-icon-box" style={{ background: 'var(--gold-light)', color: 'var(--gold-main)' }}>
                            <i className="fas fa-palette"></i>
                        </div>
                        <div>
                            <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.4rem', color: 'var(--primary-dark)', margin: 0 }}>Seni & Keterampilan</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Mengasah rasa estetika dan skill praktis.</p>
                        </div>
                    </div>
                    <ul className="misi-list">
                        <li><i className="fas fa-check-circle check-icon"></i> Seni Baca Al-Qur’an (Qiro'ah)</li>
                        <li><i className="fas fa-check-circle check-icon"></i> Pelatihan Rebana & Hadrah</li>
                        <li><i className="fas fa-check-circle check-icon"></i> Kaligrafi & Desain Grafis</li>
                        <li><i className="fas fa-check-circle check-icon"></i> Pelatihan Komputer & IT</li>
                    </ul>
                </div>

                {/* 2. PUBLIC SPEAKING - Med */}
                <div className="glass-card reveal fade-bottom delay-200" style={{ gridColumn: 'span 6' }}>
                    <div className="step-header-luxury" style={{ marginBottom: '1.5rem' }}>
                        <div className="header-icon-box" style={{ background: 'var(--grad-premium)', color: 'var(--primary)' }}>
                            <i className="fas fa-microphone-alt"></i>
                        </div>
                        <div>
                            <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.4rem', color: 'var(--primary-dark)', margin: 0 }}>Retorika & Dakwah</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Mempersiapkan da'i yang komunikatif.</p>
                        </div>
                    </div>
                    <ul className="misi-list">
                        <li><i className="fas fa-check-circle check-icon"></i> Muhadhoroh (Latihan Pidato)</li>
                        <li><i className="fas fa-check-circle check-icon"></i> Public Speaking & MC</li>
                        <li><i className="fas fa-check-circle check-icon"></i> Pelatihan Khitobah 3 Bahasa</li>
                        <li><i className="fas fa-check-circle check-icon"></i> Diskusi & Musyawarah (Bahtsul Masail)</li>
                    </ul>
                </div>

                {/* 3. ORGANISASI - Full */}
                <div className="glass-card reveal fade-bottom delay-300" style={{ gridColumn: 'span 12', background: 'var(--primary-dark)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2.5rem' }}>
                    <div>
                        <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.8rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>Organisasi Santri</h3>
                        <p style={{ opacity: 0.9, maxWidth: '600px' }}>Melatih kepemimpinan dan manajerial melalui keterlibatan aktif dalam kepengurusan pondok dan panitia kegiatan besar.</p>
                    </div>
                    <div style={{ fontSize: '3rem', color: 'var(--gold-main)', opacity: 0.3 }}>
                        <i className="fas fa-users-cog"></i>
                    </div>
                </div>
            </div>
        </section>
    )
}
