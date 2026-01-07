
export default function ProfilSejarah({ history }: { history?: string }) {
    return (
        <section className="section-wrapper" id="profil" style={{ backgroundColor: "#f8fafc" }}>
            <h2 className="section-title">Tentang Kami</h2>
            <div className="header-content" style={{ padding: 0 }}>
                <div className="glass-card reveal zoom-in">
                    <p style={{
                        lineHeight: "2",
                        textAlign: "justify",
                        fontSize: "1.05rem",
                        color: "var(--text-main)",
                        whiteSpace: "pre-line"
                    }}>
                        {history || `Pondok Pesantren Darussalam Lirboyo didirikan dengan semangat perjuangan menyebarkan syiar Islam ala Ahlussunnah wal Jama'ah. Berlokasi di Mojoroto, Kediri, kami berkomitmen menjadi wadah pembentukan generasi santri yang tidak hanya unggul dalam keilmuan agama (tafakkuh fid-din), tetapi juga memiliki akhlakul karimah yang kokoh.

                        Di bawah naungan bimbingan para Masyayikh yang istiqomah dalam tradisi salaf, Pesantren Darussalam terus beradaptasi dengan tantangan zaman tanpa meninggalkan nilai-nilai luhur kepesantrenan. Kami membekali para santri dengan kurikulum terintegrasi, mulai dari pendalaman kitab kuning hingga pelatihan keterampilan modern, guna mencetak pribadi yang mandiri, bermanfaat bagi masyarakat, serta berkontribusi nyata bagi bangsa dan negara.`}
                    </p>
                </div>
            </div>
        </section>
    );
}
