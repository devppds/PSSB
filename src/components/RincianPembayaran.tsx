
export default function RincianPembayaran() {
    return (
        <section className="section-wrapper" style={{ background: "#f8fafc" }} id="pembayaran">
            <h2 className="section-title">RINCIAN PEMBAYARAN</h2>
            {/* Simplified for migration */}
            <div className="header-content" style={{ padding: 0, display: "block" }}>
                {/* Payment Summary Card */}
                <div className="payment-summary-card reveal zoom-in">
                    <h3
                        style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "var(--primary-dark)", marginBottom: "1rem" }}>
                        Estimasi Biaya Awal
                    </h3>
                    <p style={{ color: "var(--text-muted)", marginBottom: "2rem", fontSize: "1.1rem" }}>
                        Ringkasan pembayaran yang harus disiapkan saat pendaftaran (Biaya tahunan + 3 bulan pertama).
                    </p>
                    <div className="grid-2" style={{ gap: "2rem" }}>
                        <div className="glass-card" style={{ borderColor: "var(--accent-gold)", background: "rgba(197, 160, 89, 0.05)" }}>
                            <span style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: 600 }}>SANTRI BARU</span>
                            <h4 style={{ fontSize: "2rem", color: "var(--primary-dark)", marginTop: "0.5rem" }}>Rp. 383.500</h4>
                        </div>
                        <div className="glass-card" style={{ borderColor: "var(--accent-gold)", background: "rgba(197, 160, 89, 0.05)" }}>
                            <span style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: 600 }}>SANTRI LAMA</span>
                            <h4 style={{ fontSize: "2rem", color: "var(--primary-dark)", marginTop: "0.5rem" }}>Rp. 329.500</h4>
                        </div>
                    </div>
                    <p style={{ marginTop: "2rem", fontSize: "0.9rem", color: "var(--text-muted)", fontStyle: "italic" }}>
                        *Belum termasuk uang gedung santri baru (Rp. 500.000), infaq maklumat (Rp. 200.000), dan biaya lainnya yang
                        tertera di keterangan lengkap.
                    </p>
                </div>
            </div>
        </section>
    )
}
