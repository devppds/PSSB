
export default function Ekstrakurikuler() {
    return (
        <section className="section-wrapper" id="ekstrakulikuler">
            <h2 className="section-title">Ekstrakulikuler</h2>
            <div className="header-content" style={{ padding: 0, display: "block" }}>
                <p style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 3rem auto", color: "var(--text-muted)" }}>
                    Untuk mendukung terealisasinya tujuan pendidikan, Pondok Pesantren Darussalam Lirboyo menyelenggarakan berbagai
                    program ekstrakurikuler yang dirancang untuk mengembangkan bakat, kreativitas, serta kompetensi santri dalam
                    bidang keilmuan dan keterampilan.
                </p>
                <div className="grid-3">
                    <div className="glass-card reveal fade-bottom delay-100">
                        <ul className="misi-list" style={{ margin: 0 }}>
                            <li><i className="fas fa-check-circle check-icon"></i> Pembinaan Organisasi</li>
                            <li><i className="fas fa-check-circle check-icon"></i> Seni Baca Al-Qur’an</li>
                            <li><i className="fas fa-check-circle check-icon"></i> Pelatihan Rebana</li>
                        </ul>
                    </div>
                    <div className="glass-card reveal fade-bottom delay-200">
                        <ul className="misi-list" style={{ margin: 0 }}>
                            <li><i className="fas fa-check-circle check-icon"></i> Pelatihan Khitobah</li>
                            <li><i className="fas fa-check-circle check-icon"></i> Pelatihan Public Speaking</li>
                            <li><i className="fas fa-check-circle check-icon"></i> Pelatihan Komputer</li>
                        </ul>
                    </div>
                    <div className="glass-card reveal fade-bottom delay-300"
                        style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "center" }}>
                        <div style={{ fontSize: "3rem", color: "var(--accent)", marginBottom: "1rem" }}><i className="fas fa-star"></i></div>
                        <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Takhosus Kitab Kuning</h3>
                        <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>(Nahwu – Shorof)</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
