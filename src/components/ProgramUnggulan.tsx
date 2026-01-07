
'use client';
export default function ProgramUnggulan({ onOpenGallery }: { onOpenGallery: (title: string) => void }) {
    return (
        <section className="section-wrapper" id="program">
            <h2 className="section-title">Program Unggulan</h2>
            <div className="header-content grid-3" style={{ padding: 0 }}>
                <div className="glass-card reveal fade-bottom delay-100" style={{ textAlign: "center", cursor: "pointer" }}
                    onClick={() => onOpenGallery('Bahtsul Masa\'il')}>
                    <div className="feature-icon-large" style={{ color: "var(--primary)" }}><i className="fas fa-quran"></i></div>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>Bahtsul Masa'il</h3>
                    <p style={{ color: "var(--text-muted)" }}>Program Musyawaroh berbagai masalah yang dihadapi oleh masyarakat.</p>
                </div>
                <div className="glass-card reveal fade-bottom delay-200" style={{ textAlign: "center", cursor: "pointer" }}
                    onClick={() => onOpenGallery('Kitab Kuning')}>
                    <div className="feature-icon-large" style={{ color: "var(--accent)" }}><i className="fas fa-book-open"></i></div>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>Kitab Kuning</h3>
                    <p style={{ color: "var(--text-muted)" }}>Kajian kitab-kitab mu'tabaroh dibarengi dengan sorogan.</p>
                </div>
                <div className="glass-card reveal fade-bottom delay-300" style={{ textAlign: "center", cursor: "pointer" }}
                    onClick={() => onOpenGallery('Formal dan Non-Formal')}>
                    <div className="feature-icon-large" style={{ color: "var(--primary-dark)" }}><i className="fas fa-graduation-cap"></i></div>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>Formal dan Non-Formal</h3>
                    <p style={{ color: "var(--text-muted)" }}>Pendidikan formal mengikuti Madrasah Ihya' Ulumiddin (MIU) Sementara
                        Pendidikan non-formal Madrasah Hidayatul Mubtadiin (MHH)</p>
                </div>
            </div>
        </section>
    )
}
