
export default function RincianPembayaran() {
    return (
        <section className="section-wrapper" style={{ background: "var(--bg-body)", position: 'relative' }} id="pembayaran">
            <div className="reveal active">
                <h2 className="section-title">Estimasi Biaya</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem' }}>Ringkasan transparansi biaya administrasi pendaftaran awal santri.</p>
            </div>

            <div className="header-content" style={{ padding: 0, display: "block" }}>
                <div className="payment-summary-card reveal zoom-in" style={{ border: 'none', background: 'white' }}>
                    <div className="step-header-luxury" style={{ marginBottom: '2rem' }}>
                        <div className="header-icon-box" style={{ background: 'var(--gold-gradient)', color: 'white' }}><i className="fas fa-wallet"></i></div>
                        <div>
                            <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "2rem", color: "var(--primary-dark)", margin: 0 }}>Rincian Pembayaran</h3>
                            <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>Estimasi biaya pendaftaran (Keuangan tahunan + SPP 3 bulan).</p>
                        </div>
                    </div>

                    <div className="grid-2" style={{ gap: "1.5rem" }}>
                        <div className="glass-card" style={{ borderColor: "var(--gold-main)", background: "var(--grad-premium)", display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <span className="gold-accent-text" style={{ fontSize: '0.75rem' }}>PENDIRIAN AWAL / BARU</span>
                            <h4 style={{ fontSize: "2.5rem", color: "var(--primary-dark)", margin: "0.5rem 0", fontFamily: 'var(--font-playfair)' }}>Rp. 383.500</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Lengkap dengan administrasi & iuran awal.</p>
                        </div>
                        <div className="glass-card" style={{ borderColor: 'var(--border-color)', background: "rgba(255,255,255,0.7)" }}>
                            <span style={{ color: "var(--text-light)", fontSize: "0.75rem", fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>REGISTRASI ULANG</span>
                            <h4 style={{ fontSize: "2.5rem", color: "var(--text-muted)", marginTop: "0.5rem", fontFamily: 'var(--font-playfair)' }}>Rp. 329.500</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Bagi santri lama yang melanjutkan pendidikan.</p>
                        </div>
                    </div>

                    <div className="status-alert" style={{ background: 'var(--gold-light)', border: 'none', color: 'var(--gold-deep)', marginTop: '2rem' }}>
                        <i className="fas fa-info-circle"></i>
                        <span style={{ marginLeft: '10px', fontSize: '0.9rem' }}>
                            Belum termasuk uang gedung santri baru (Rp 500rb) dan infaq maklumat (Rp 200rb).
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}
