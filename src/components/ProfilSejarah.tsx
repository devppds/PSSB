
export default function ProfilSejarah() {
    return (
        <section className="section-wrapper" style={{ background: "#f8fafc", position: "relative" }} id="profil">
            {/* Wave Divider Top */}
            <div className="wave-divider-top">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="shape-fill"></path>
                </svg>
            </div>

            <h2 className="section-title">Sejarah &amp; Profil</h2>
            <div className="timeline-wrapper">
                <div className="timeline-line"></div>
                <div className="timeline-item reveal fade-left" data-animate="" data-year="2002">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                        <span>20 Februari 2002</span>
                        <h3>Pendirian Pondok</h3>
                        <p style={{ color: "var(--text-muted)" }}>Pesantren yang biasa disebut dengan PPDS ini, terletak sekitar
                            500 M di selatan Pondok Pesantren Lirboyo induk. PPDS diasuh
                            langsung oleh KH. Ahmad Mahin Thoha, Pesantren ini menjadi
                            Unit Lirboyo tepat pada tanggal 8 Dzulhijah 1422 H. /20 Februari
                            2002 M. Pondok Pesantren Darussalam merupakan pendidikan
                            non-formal yang masih mempertahankan kurikulum kesalafan
                            di era modernisasi ini. Selain khusus mempelajari kitab - kitab
                            salaf, para santri juga diberikan kesempatan untuk merangkap
                            pendidikan formal (SD/MI, SMP/MTs, SMA/SMK dan Perguruan
                            Tinggi) di luar Pondok. Bagi santri yang merangkap pendidikan
                            formal, dibuatkan wadah tersendiri dengan nama “Madrasah
                            Ihya Ulumiddin” untuk menunjang pembelajaran Ilmu Agama.</p>
                    </div>
                    <div className="timeline-image-container">
                        <img src="/images/romo-yai.webp" alt="Foto Lama" />
                    </div>
                </div>
                <div className="timeline-item reveal fade-right" data-animate="" data-year="2025">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                        <span>Masa Kini</span>
                        <h3>Pendidikan Modern</h3>
                        <p style={{ color: "var(--text-muted)" }}>SSistem pendidkan yang ada di Pondok Pesantren Lirboyo
                            Darussalam pada dasarnya dibagi menjadi dua kategori.
                            Pertama, bagi santri yang tidak merangkap pendidikan formal
                            wajib mengikuti pendidikan di MHM(Madrasah Hidayatul
                            Mubtadiin). Kedua, bagi santri yang merangkap pendidikan
                            formal wajib mengikuti pendidikan di MIU (madrasah Ihya'
                            Ulumiddin). </p>
                    </div>
                    <div className="timeline-image-container">
                        <img src="/images/gus-amin.webp" alt="Foto Baru" />
                    </div>
                </div>
            </div>
        </section>
    );
}
