
'use client';
export default function ProgramUnggulan({ onOpenGallery, list }: { onOpenGallery: (title: string) => void, list?: any[] }) {
    const defaultPrograms = [
        { label: "Bahtsul Masa'il", description: "Program Musyawaroh berbagai masalah yang dihadapi oleh masyarakat.", icon: "fa-quran" },
        { label: "Kitab Kuning", description: "Kajian kitab-kitab mu'tabaroh dibarengi dengan sorogan.", icon: "fa-book-open" },
        { label: "Formal dan Non-Formal", description: "Pendidikan formal mengikuti Madrasah Ihya' Ulumiddin (MIU) Sementara Pendidikan non-formal Madrasah Hidayatul Mubtadiin (MHH)", icon: "fa-graduation-cap" }
    ];

    const displayList = list && list.length > 0 ? list : defaultPrograms;

    return (
        <section className="section-wrapper" id="program">
            <h2 className="section-title">Program Unggulan</h2>
            <div className="header-content grid-3" style={{ padding: 0 }}>
                {displayList.map((item, idx) => (
                    <div key={item.id || idx} className={`glass-card reveal fade-bottom delay-${(idx + 1) * 100}`} style={{ textAlign: "center", cursor: "pointer" }}
                        onClick={() => onOpenGallery(item.label)}>
                        <div className="feature-icon-large" style={{ color: idx % 2 === 0 ? "var(--primary)" : "var(--accent)" }}>
                            <i className={`fas ${item.icon || 'fa-star'}`}></i>
                        </div>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>{item.label}</h3>
                        <p style={{ color: "var(--text-muted)" }}>{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
