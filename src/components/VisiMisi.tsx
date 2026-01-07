
export default function VisiMisi() {
    return (
        <section className="section-wrapper" id="visi-misi" style={{ position: "relative", paddingBottom: "6rem" }}>
            <h2 className="section-title">Visi &amp; Misi</h2>
            <div className="header-content" style={{ padding: 0 }}>
                <div className="grid-2">
                    <div className="glass-card reveal fade-left">
                        <h3 className="header-title" style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Visi</h3>
                        <p style={{ fontSize: "1.1rem", color: "var(--text-muted)" }}>Mencetak insan bertaqwa, berakhlak Al Qur'an dan As
                            Sunnah.</p>
                    </div>
                    <div className="glass-card reveal fade-right delay-100">
                        <h3 className="header-title" style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Misi</h3>
                        <ul className="misi-list">
                            <li><i className="fas fa-check-circle check-icon"></i> Mengembangkan ilmu agama berbasis pada kitab mu'tabaroh
                            </li>
                            <li><i className="fas fa-check-circle check-icon"></i> Menumbuhkan kecintaan membaca, menulis dan berkarya</li>
                            <li><i className="fas fa-check-circle check-icon"></i> Membangun karakter bertanggung jawab dan taat pada norma
                                sosial dan agama</li>
                        </ul>
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
