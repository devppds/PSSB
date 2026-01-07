export default function ProfilSejarah({ history, timeline }: { history?: string, timeline?: any[] }) {
    // If we have DB timeline items, use them. Otherwise fallback to these defaults.
    // However, the user wants the DB to be THE source.
    // We kept the hardcoded strings inside the component before, but now we should prefer the timeline prop.

    const fallbackTimeline = [
        {
            year: '2002',
            date_label: '20 Februari 2002',
            title: 'Pendirian Pondok',
            content: history || `Pesantren yang biasa disebut dengan PPDS ini, terletak sekitar 500 M di selatan Pondok Pesantren Lirboyo induk. PPDS diasuh langsung oleh KH. Ahmad Mahin Thoha, Pesantren ini menjadi Unit Lirboyo tepat pada tanggal 8 Dzulhijah 1422 H. /20 Februari 2002 M.`,
            image_url: 'https://res.cloudinary.com/dceamfy3n/image/upload/v1766596062/romo-yai_jgcrqg.webp'
        },
        {
            year: '2025',
            date_label: 'Masa Kini',
            title: 'Pendidikan Modern',
            content: `Sistem pendidkan yang ada di Pondok Pesantren Lirboyo Darussalam pada dasarnya dibagi menjadi dua kategori. Pertama, bagi santri yang tidak merangkap pendidikan formal wajib mengikuti pendidikan di MHM(Madrasah Hidayatul Mubtadiin). Kedua, bagi santri yang merangkap pendidikan formal wajib mengikuti pendidikan di MIU (madrasah Ihya' Ulumiddin).`,
            image_url: 'https://res.cloudinary.com/dceamfy3n/image/upload/v1766596058/gus-amin_yiymmz.webp'
        }
    ];

    const items = (timeline && timeline.length > 0) ? timeline : fallbackTimeline;

    return (
        <section className="section-wrapper" style={{ background: "#f8fafc", position: "relative" }} id="profil">
            {/* Wave Divider Top */}
            <div className="wave-divider-top">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>

            <h2 className="section-title">Sejarah &amp; Profil</h2>
            <div className="timeline-wrapper">
                <div className="timeline-line"></div>

                {items.map((item, idx) => (
                    <div key={idx} className={`timeline-item reveal ${idx % 2 === 0 ? 'fade-left' : 'fade-right'}`} data-animate="true" data-year={item.year}>
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <span>{item.date_label}</span>
                            <h3>{item.title}</h3>
                            <p style={{ color: "var(--text-muted)", whiteSpace: "pre-line", textAlign: "justify" }}>
                                {item.content}
                            </p>
                        </div>
                        <div className="timeline-image-container">
                            {item.image_url ? (
                                <img src={item.image_url} alt={item.title} />
                            ) : (
                                <div style={{ width: '100%', height: '100%', background: '#ddd' }}></div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
