
export default function RincianPembayaran({ data }: { data?: any }) {
    const listBaru = data?.['pembayaran-tahunan-baru'] || [];
    const listLama = data?.['pembayaran-tahunan-lama'] || [];
    const listBulanan = data?.['pembayaran-bulanan'] || [];
    const listKetentuan = data?.['pembayaran-ketentuan'] || [];

    const calculateTotal = (list: any[]) => {
        const total = list.reduce((sum, item) => {
            const val = parseFloat(item.amount?.replace(/\./g, '') || '0');
            return sum + val;
        }, 0);
        return total.toLocaleString('id-ID');
    };

    return (
        <section className="section-wrapper" style={{ background: "#f8fafc" }} id="pembayaran">
            <h2 className="section-title">RINCIAN PEMBAYARAN</h2>

            <div className="header-content" style={{ padding: 0, display: "block" }}>

                <div className="glass-card reveal zoom-in" style={{ marginBottom: "3rem" }}>

                    <h3 style={{ textAlign: "center", fontSize: "1.6rem", fontWeight: 700, color: "var(--primary-dark)" }}>
                        RINCIAN BIAYA PENDIDIKAN
                    </h3>

                    {/* 1. Per Tahun Baru */}
                    <h4 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "2rem 0 1rem" }}>
                        1. Pembayaran Pondok Per Tahun (Santri Baru)
                    </h4>
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Jenis Pembayaran</th>
                                    <th style={{ textAlign: "right" }}>Nominal</th>
                                    <th>Keterangan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listBaru.map((item: any, idx: number) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{item.label}</td>
                                        <td style={{ textAlign: "right" }}>Rp. {item.amount}</td>
                                        <td>/tahun</td>
                                    </tr>
                                ))}
                                <tr className="total-row">
                                    <td colSpan={2}>TOTAL PER TAHUN</td>
                                    <td style={{ textAlign: "right" }}>Rp. {calculateTotal(listBaru)}</td>
                                    <td>/tahun</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 2. Per Tahun Lama */}
                    <h4 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "3rem 0 1rem" }}>
                        2. Pembayaran Pondok Per Tahun (Santri Lama)
                    </h4>
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Jenis Pembayaran</th>
                                    <th style={{ textAlign: "right" }}>Nominal</th>
                                    <th>Keterangan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listLama.map((item: any, idx: number) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{item.label}</td>
                                        <td style={{ textAlign: "right" }}>Rp. {item.amount}</td>
                                        <td>/tahun</td>
                                    </tr>
                                ))}
                                <tr className="total-row">
                                    <td colSpan={2}>TOTAL PER TAHUN</td>
                                    <td style={{ textAlign: "right" }}>Rp. {calculateTotal(listLama)}</td>
                                    <td>/tahun</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 3. Per Bulan */}
                    <h4 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "3rem 0 1rem" }}>
                        3. Pembayaran Pondok Per Bulan
                    </h4>
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Jenis Pembayaran</th>
                                    <th style={{ textAlign: "right" }}>Nominal</th>
                                    <th>Keterangan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listBulanan.map((item: any, idx: number) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{item.label}</td>
                                        <td style={{ textAlign: "right" }}>Rp. {item.amount}</td>
                                        <td>/bulan</td>
                                    </tr>
                                ))}
                                <tr className="total-row">
                                    <td colSpan={2}>TOTAL PER BULAN</td>
                                    <td style={{ textAlign: "right" }}>Rp. {calculateTotal(listBulanan)}</td>
                                    <td>/bulan</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* KETERANGAN */}
                    {listKetentuan.length > 0 && (
                        <>
                            <h4 style={{ fontSize: "1.3rem", fontWeight: 800, margin: "3rem 0 1rem" }}>
                                KETERANGAN
                            </h4>
                            <ol style={{ paddingLeft: "1.2rem", lineHeight: 1.9, color: "var(--text-muted)" }}>
                                {listKetentuan.map((item: any, idx: number) => (
                                    <li key={idx}>{item.label}</li>
                                ))}
                            </ol>
                        </>
                    )}

                    {/* Payment Summary Card */}
                    <div className="payment-summary-card reveal zoom-in" style={{ marginTop: '3rem', background: 'rgba(var(--primary-rgb), 0.03)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(var(--primary-rgb), 0.1)' }}>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "var(--primary-dark)", marginBottom: "1rem", textAlign: 'center' }}>
                            Estimasi Biaya Awal
                        </h3>
                        <p style={{ color: "var(--text-muted)", marginBottom: "2rem", fontSize: "1.1rem", textAlign: 'center' }}>
                            Ringkasan pembayaran yang harus disiapkan saat pendaftaran (Biaya tahunan + 3 bulan pertama).
                        </p>
                        <div className="grid-2" style={{ gap: "2rem" }}>
                            <div className="glass-card" style={{ textAlign: 'center', borderColor: "var(--accent-gold)", background: "white" }}>
                                <span style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: 600 }}>SANTRI BARU</span>
                                <h4 style={{ fontSize: "2rem", color: "var(--primary-dark)", marginTop: "0.5rem" }}>
                                    Rp. {(
                                        parseFloat(calculateTotal(listBaru).replace(/\./g, '')) +
                                        (parseFloat(calculateTotal(listBulanan).replace(/\./g, '')) * 3)
                                    ).toLocaleString('id-ID')}
                                </h4>
                            </div>
                            <div className="glass-card" style={{ textAlign: 'center', borderColor: "var(--accent-gold)", background: "white" }}>
                                <span style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: 600 }}>SANTRI LAMA</span>
                                <h4 style={{ fontSize: "2rem", color: "var(--primary-dark)", marginTop: "0.5rem" }}>
                                    Rp. {(
                                        parseFloat(calculateTotal(listLama).replace(/\./g, '')) +
                                        (parseFloat(calculateTotal(listBulanan).replace(/\./g, '')) * 3)
                                    ).toLocaleString('id-ID')}
                                </h4>
                            </div>
                        </div>
                        <p style={{ marginTop: "2rem", fontSize: "0.9rem", color: "var(--text-muted)", fontStyle: "italic", textAlign: 'center' }}>
                            *Nominal di atas adalah kalkulasi otomatis dari tabel rincian biaya. Belum termasuk uang gedung santri baru, infaq maklumat, dan iuran lainnya.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    )
}
