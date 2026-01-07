
export default function Ekstrakurikuler({ list }: { list?: any[] }) {
    const defaultEkskul = [
        { label: 'Pembinaan Organisasi' },
        { label: 'Seni Baca Al-Qur’an' },
        { label: 'Pelatihan Rebana' },
        { label: 'Pelatihan Khitobah' },
        { label: 'Pelatihan Public Speaking' },
        { label: 'Pelatihan Komputer' }
    ];

    const displayList = list && list.length > 0 ? list : defaultEkskul;

    // Split into 2 chunks for the first 2 cards
    const chunk1 = displayList.slice(0, 3);
    const chunk2 = displayList.slice(3, 6);

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
                            {chunk1.map((item, idx) => (
                                <li key={idx}><i className="fas fa-check-circle check-icon"></i> {item.label}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="glass-card reveal fade-bottom delay-200">
                        <ul className="misi-list" style={{ margin: 0 }}>
                            {chunk2.map((item, idx) => (
                                <li key={idx}><i className="fas fa-check-circle check-icon"></i> {item.label}</li>
                            ))}
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
