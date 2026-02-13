import React from 'react';

export default function RincianPembayaran({ data }: { data?: any }) {
    // Hardcoded data based on user request
    const listBaru = [
        { label: "Uang Gedung Santri Baru", amount: "545.000", period: "/Tahun" },
        { label: "Uang Pangkal Santri Baru", amount: "25.000", period: "/Tahun" },
        { label: "Buku Tata Tertib", amount: "3.000", period: "/Tahun" },
        { label: "Buku Istighotsah", amount: "15.000", period: "/Tahun" },
        { label: "Administrasi", amount: "5.000", period: "/Tahun" },
        { label: "Pendidikan", amount: "5.000", period: "/Tahun" },
        { label: "Jam’iyyah Pusat", amount: "16.000", period: "/Tahun" },
        { label: "Jam’iyyah Far’iyyah", amount: "17.000", period: "/Tahun" },
        { label: "Kalender", amount: "25.000", period: "/Tahun" },
        { label: "Buku 3 Tokoh", amount: "16.000", period: "/Tahun" },
        { label: "LBM", amount: "16.500", period: "/Tahun" },
        { label: "Kas Keuangan", amount: "1.500", period: "/Tahun" },
        { label: "Haul Haflah*", amount: "15.000", period: "/Tahun" },
        { label: "Ta’dhim Maulid", amount: "15.000", period: "/Tahun" },
    ];

    const listLama = [
        { label: "Uang Gedung Santri Lama", amount: "35.000", period: "/Tahun" },
        { label: "Administrasi", amount: "5.000", period: "/Tahun" },
        { label: "Pendidikan", amount: "5.000", period: "/Tahun" },
        { label: "Jam’iyyah Pusat", amount: "16.000", period: "/Tahun" },
        { label: "Jam’iyyah Far’iyyah", amount: "17.000", period: "/Tahun" },
        { label: "Kalender", amount: "25.000", period: "/Tahun" },
        { label: "LBM", amount: "16.500", period: "/Tahun" },
        { label: "Kas Keuangan", amount: "1.500", period: "/Tahun" },
        { label: "Haul Haflah*", amount: "15.000", period: "/Tahun" },
        { label: "Ta’dhim Maulid", amount: "15.000", period: "/Tahun" },
    ];

    const listBulanan = [
        { label: "Perawatan Sarana", amount: "5.000", period: "/Bulan" },
        { label: "Syahriyah", amount: "9.000", period: "/Bulan" },
        { label: "Pembangunan", amount: "30.000", period: "/Bulan" },
        { label: "Listrik dan Pengairan", amount: "12.500", period: "/Bulan" },
        { label: "KBR", amount: "2.000", period: "/Bulan" },
        { label: "Kesehatan", amount: "1.000", period: "/Bulan" },
        { label: "Kas Yayasan", amount: "500", period: "/Bulan" },
    ];

    // Fixed totals as per request
    const totalBaru = 720000;
    const totalLama = 151000;
    const totalBulanan = 60000;

    const formatCurrency = (val: number) => val.toLocaleString('id-ID');

    return (
        <section className="section-wrapper" style={{ background: "#f8fafc" }} id="pembayaran">
            <h2 className="section-title">RINCIAN PEMBAYARAN</h2>

            <div className="header-content" style={{ padding: 0, display: "block" }}>

                <div className="glass-card reveal zoom-in" style={{ marginBottom: "3rem" }}>

                    <h3 style={{ textAlign: "center", fontSize: "1.8rem", fontWeight: 800, color: "var(--primary-dark)", textTransform: "uppercase", letterSpacing: "1px" }}>
                        A. Iuran Syahriyah
                    </h3>

                    {/* 1. Pembayaran Pondok Pertahun */}
                    <div style={{ marginTop: "2.5rem" }}>
                        <h4 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1.5rem", color: "var(--primary)" }}>
                            1. Pembayaran Pondok Pertahun
                        </h4>

                        {/* a. Santri Baru */}
                        <div style={{ marginBottom: "2rem" }}>
                            <h5 style={{ fontSize: "1.2rem", fontWeight: 600, margin: "1rem 0 0.5rem" }}>
                                a. Santri Baru
                            </h5>
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
                                        {listBaru.map((item, idx) => (
                                            <tr key={idx}>
                                                <td>{idx + 1}</td>
                                                <td>{item.label}</td>
                                                <td style={{ textAlign: "right" }}>Rp. {item.amount}</td>
                                                <td>{item.period}</td>
                                            </tr>
                                        ))}
                                        <tr className="total-row">
                                            <td colSpan={2}>TOTAL PERTAHUN SANTRI BARU</td>
                                            <td style={{ textAlign: "right" }}>Rp. {formatCurrency(totalBaru)}</td>
                                            <td>/Tahun</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "0.5rem", fontStyle: "italic" }}>
                                *Khusus MHM
                            </p>
                        </div>

                        {/* b. Santri Lama */}
                        <div style={{ marginBottom: "2rem" }}>
                            <h5 style={{ fontSize: "1.2rem", fontWeight: 600, margin: "1rem 0 0.5rem" }}>
                                b. Santri Lama
                            </h5>
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
                                        {listLama.map((item, idx) => (
                                            <tr key={idx}>
                                                <td>{idx + 1}</td>
                                                <td>{item.label}</td>
                                                <td style={{ textAlign: "right" }}>Rp. {item.amount}</td>
                                                <td>{item.period}</td>
                                            </tr>
                                        ))}
                                        <tr className="total-row">
                                            <td colSpan={2}>TOTAL PERTAHUN SANTRI LAMA</td>
                                            <td style={{ textAlign: "right" }}>Rp. {formatCurrency(totalLama)}</td>
                                            <td>/Tahun</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "0.5rem", fontStyle: "italic" }}>
                                *Khusus MHM
                            </p>
                        </div>
                    </div>

                    {/* 2. Pembayaran Pondok Perbulan */}
                    <div style={{ marginTop: "3rem" }}>
                        <h4 style={{ fontSize: "1.4rem", fontWeight: 700, margin: "2rem 0 1rem", color: "var(--primary)" }}>
                            2. Pembayaran Pondok Perbulan
                        </h4>
                        <div className="table-container">
                            <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Jenis Pembayaran</th>
                                            <th style={{ textAlign: "right" }}>Nominal</th>
                                            <th>Ket</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listBulanan.map((item, idx) => (
                                            <tr key={idx}>
                                                <td>{idx + 1}</td>
                                                <td>{item.label}</td>
                                                <td style={{ textAlign: "right" }}>Rp. {item.amount}</td>
                                                <td>{item.period}</td>
                                            </tr>
                                        ))}
                                        <tr className="total-row">
                                            <td colSpan={2}>TOTAL PERBULAN</td>
                                            <td style={{ textAlign: "right" }}>Rp. {formatCurrency(totalBulanan)}</td>
                                            <td>/Bulan</td>
                                        </tr>
                                    </tbody>
                                </table>
                        </div>
                    </div>

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
                                    Rp. {formatCurrency(totalBaru + (totalBulanan * 3))}
                                </h4>
                            </div>
                            <div className="glass-card" style={{ textAlign: 'center', borderColor: "var(--accent-gold)", background: "white" }}>
                                <span style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: 600 }}>SANTRI LAMA</span>
                                <h4 style={{ fontSize: "2rem", color: "var(--primary-dark)", marginTop: "0.5rem" }}>
                                    Rp. {formatCurrency(totalLama + (totalBulanan * 3))}
                                </h4>
                            </div>
                        </div>
                        <p style={{ marginTop: "2rem", fontSize: "0.9rem", color: "var(--text-muted)", fontStyle: "italic", textAlign: 'center' }}>
                            *Estimasi di atas mencakup 1 tahun pembayaran tahunan + 3 bulan pertama pembayaran bulanan.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    )
}
