
'use client';
export default function ProgramTambahan({ onOpenGallery, list }: { onOpenGallery: (title: string) => void, list?: any[] }) {
    const defaultPrograms = [
        { label: "Pengajian Bandongan/Kilatan", icon: "fa-book-reader" },
        { label: "Bahtsul Masa'il Kubro", icon: "fa-users" },
        { label: "Takhossus Arab (Nahwu Shorof)", icon: "fa-spell-check" },
        { label: "Ziaroh Wali & Ulama", icon: "fa-praying-hands" }
    ];

    const displayList = list && list.length > 0 ? list : defaultPrograms;

    return (
        <section className="section-wrapper" style={{ background: "#f8fafc" }} id="program-tambahan">
            <h2 className="section-title">Program Tambahan</h2>
            <div className="header-content grid-2" style={{ padding: 0 }}>
                {displayList.map((item, idx) => (
                    <div key={item.id || idx} className={`glass-card reveal ${idx % 2 === 0 ? 'fade-right' : 'fade-left'} delay-${Math.floor(idx / 2 + 1) * 100}`}
                        style={{ display: "flex", alignItems: "center", gap: "1rem", cursor: "pointer" }}
                        onClick={() => onOpenGallery(item.label)}>
                        <div className="feature-icon-medium" style={{ color: idx % 2 === 0 ? "var(--primary)" : "var(--accent)", marginBottom: 0 }}>
                            <i className={`fas ${item.icon || 'fa-star'}`}></i>
                        </div>
                        <div>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>{item.label}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
