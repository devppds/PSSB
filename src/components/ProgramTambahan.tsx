'use client';
export default function ProgramTambahan({ onOpenGallery }: { onOpenGallery: (title: string) => void }) {
    return (
        <section className="section-wrapper" style={{ background: "#f8fafc" }} id="program-tambahan">
            <h2 className="section-title">Program Tambahan</h2>
            <div className="header-content grid-2" style={{ padding: 0 }}>
                <div className="glass-card reveal fade-right delay-100"
                    style={{ display: "flex", alignItems: "center", gap: "1rem", cursor: "pointer" }}
                    onClick={() => onOpenGallery('Pengajian Bandongan/Kilatan')}>
                    <div className="feature-icon-medium" style={{ color: "var(--primary)", marginBottom: 0 }}><i
                        className="fas fa-book-reader"></i></div>
                    <div>
                        <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Pengajian Bandongan/Kilatan</h3>
                    </div>
                </div>
                <div className="glass-card reveal fade-left delay-100"
                    style={{ display: "flex", alignItems: "center", gap: "1rem", cursor: "pointer" }}
                    onClick={() => onOpenGallery('Bahtsul Masa\'il Kubro')}>
                    <div className="feature-icon-medium" style={{ color: "var(--accent)", marginBottom: 0 }}><i className="fas fa-users"></i>
                    </div>
                    <div>
                        <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Bahtsul Masa'il Kubro</h3>
                    </div>
                </div>
                <div className="glass-card reveal fade-right delay-200"
                    style={{ display: "flex", alignItems: "center", gap: "1rem", cursor: "pointer" }}
                    onClick={() => onOpenGallery('Takhossus Arab (Nahwu Shorof)')}>
                    <div className="feature-icon-medium" style={{ color: "var(--primary-dark)", marginBottom: 0 }}><i
                        className="fas fa-spell-check"></i></div>
                    <div>
                        <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Takhossus Arab (Nahwu Shorof)</h3>
                    </div>
                </div>
                <div className="glass-card reveal fade-left delay-200"
                    style={{ display: "flex", alignItems: "center", gap: "1rem", cursor: "pointer" }}
                    onClick={() => onOpenGallery('Ziaroh Wali & Ulama')}>
                    <div className="feature-icon-medium" style={{ color: "var(--primary)", marginBottom: 0 }}><i
                        className="fas fa-praying-hands"></i></div>
                    <div>
                        <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Ziaroh Wali &amp; Ulama</h3>
                    </div>
                </div>
            </div>
        </section>
    )
}
