
export default function RincianPembayaran() {
    return (
        <section className="section-wrapper" style={{ background: "#f8fafc" }} id="pembayaran">
            <h2 className="section-title">RINCIAN PEMBAYARAN</h2>

            <div className="header-content" style={{ padding: 0, display: "block" }}>

                {/* A. IURAN SYAHRIYAH */}
                <div className="glass-card reveal zoom-in" style={{ marginBottom: "3rem" }}>

                    <h3 style={{ textAlign: "center", fontSize: "1.6rem", fontWeight: 700, color: "var(--primary-dark)" }}>
                        A. IURAN SYAHRIYAH
                    </h3>
                    <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "2rem" }}>
                        Rincian biaya pendidikan santri
                    </p>

                    {/* 1. Per Tahun */}
                    <h4 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "1rem" }}>
                        1. Pembayaran Pondok Per Tahun
                    </h4>

                    {/* a. Santri Baru */}
                    <h5 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>
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
                                <tr>
                                    <td>1</td>
                                    <td>Uang Gedung Santri Baru</td>
                                    <td style={{ textAlign: "right" }}>Rp. 45.000</td>
                                    <td>/tahun</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Uang Pangkal Santri Baru</td>
                                    <td style={{ textAlign: "right" }}>Rp. 25.000</td>
                                    <td>/tahun</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Buku Tata Tertib</td>
                                    <td style={{ textAlign: "right" }}>Rp. 3.000</td>
                                    <td>/tahun</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Administrasi</td>
                                    <td style={{ textAlign: "right" }}>Rp. 5.000</td>
                                    <td>/tahun</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>Pendidikan</td>
                                    <td style={{ textAlign: "right" }}>Rp. 5.000</td>
                                    <td>/tahun</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>Jam’iyyah Pusat</td>
                                    <td style={{ textAlign: "right" }}>Rp. 16.000</td>
                                    <td>/tahun</td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>Jam’iyyah Fariyah</td>
                                    <td style={{ textAlign: "right" }}>Rp. 17.000</td>
                                    <td>/tahun</td>
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td>Kalender</td>
                                    <td style={{ textAlign: "right" }}>Rp. 25.000</td>
                                    <td>/tahun</td>
                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td>Buku 3 Tokoh</td>
                                    <td style={{ textAlign: "right" }}>Rp. 16.000</td>
                                    <td>/tahun</td>
                                </tr>
                                <tr>
                                    <td>10</td>
                                    <td>LBM</td>
                                    <td style={{ textAlign: "right" }}>Rp. 16.500</td>
                                    <td>/tahun</td>
                                </tr>
                                <tr>
                                    <td>11</td>
                                    <td>Kas Keuangan</td>
                                    <td style={{ textAlign: "right" }}>Rp. 1.500</td>
                                    <td>/tahun</td>
                                </tr>
                                <tr>
                                    <td>12</td>
                                    <td>Haul Haflah</td>
                                    <td style={{ textAlign: "right" }}>Rp. 15.000</td>
                                    <td>/tahun</td>
                                </tr>
                                <tr>
                                    <td>13</td>
                                    <td>Ta’dhim Maulid</td>
                                    <td style={{ textAlign: "right" }}>Rp. 15.000</td>
                                    <td>/tahun</td>
                                </tr>
                                <tr className="total-row">
                                    <td colSpan={2}>TOTAL PER TAHUN</td>
                                    <td style={{ textAlign: "right" }}>Rp. 205.000</td>
                                    <td>/tahun</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* b. Santri Lama */}
                    <h5 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "2rem 0 1rem" }}>
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
                                <tr>
                                    <td>1</td>
                                    <td>Uang Gedung Santri Lama</td>
                                    <td style={{ textAlign: "right" }}>Rp. 35.000</td>
                                    <td>/tahun</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Administrasi</td>
                                    <td style={{ textAlign: "right" }}>Rp. 5.000</td>
                                    <td>/tahun</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Pendidikan</td>
                                    <td style={{ textAlign: "right" }}>Rp. 5.000</td>
                                    <td>/tahun</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Jam’iyyah Pusat</td>
                                    <td style={{ textAlign: "right" }}>Rp. 16.000</td>
                                    <td>/tahun</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>Jam’iyyah Fariyah</td>
                                    <td style={{ textAlign: "right" }}>Rp. 17.000</td>
                                    <td>/tahun</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>Kalender</td>
                                    <td style={{ textAlign: "right" }}>Rp. 25.000</td>
                                    <td>/tahun</td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>LBM</td>
                                    <td style={{ textAlign: "right" }}>Rp. 16.500</td>
                                    <td>/tahun</td>
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td>Kas Keuangan</td>
                                    <td style={{ textAlign: "right" }}>Rp. 1.500</td>
                                    <td>/tahun</td>
                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td>Haul Haflah</td>
                                    <td style={{ textAlign: "right" }}>Rp. 15.000</td>
                                    <td>/tahun</td>
                                </tr>
                                <tr>
                                    <td>10</td>
                                    <td>Ta’dhim Maulid</td>
                                    <td style={{ textAlign: "right" }}>Rp. 15.000</td>
                                    <td>/tahun</td>
                                </tr>
                                <tr className="total-row">
                                    <td colSpan={2}>TOTAL PER TAHUN</td>
                                    <td style={{ textAlign: "right" }}>Rp. 151.000</td>
                                    <td>/tahun</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 2. Per Bulan */}
                    <h4 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "3rem 0 1rem" }}>
                        2. Pembayaran Pondok Per Bulan
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
                                <tr>
                                    <td>1</td>
                                    <td>Perawatan Sarana</td>
                                    <td style={{ textAlign: "right" }}>Rp. 5.000</td>
                                    <td>/bulan</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Syahriyah</td>
                                    <td style={{ textAlign: "right" }}>Rp. 9.000</td>
                                    <td>/bulan</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Pembangunan</td>
                                    <td style={{ textAlign: "right" }}>Rp. 30.000</td>
                                    <td>/bulan</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Listrik dan Pengairan</td>
                                    <td style={{ textAlign: "right" }}>Rp. 12.500</td>
                                    <td>/bulan</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>KBR</td>
                                    <td style={{ textAlign: "right" }}>Rp. 2.000</td>
                                    <td>/bulan</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>Kesehatan</td>
                                    <td style={{ textAlign: "right" }}>Rp. 1.000</td>
                                    <td>/bulan</td>
                                </tr>
                                <tr className="total-row">
                                    <td colSpan={2}>TOTAL PER BULAN</td>
                                    <td style={{ textAlign: "right" }}>Rp. 59.500</td>
                                    <td>/bulan</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* KETENTUAN */}
                    <h4 style={{ fontSize: "1.3rem", fontWeight: 800, margin: "3rem 0 1rem" }}>
                        KETERANGAN
                    </h4>

                    <ol style={{ paddingLeft: "1.2rem", lineHeight: 1.9, color: "var(--text-muted)" }}>
                        <li>
                            Setiap santri wajib membayar syahriyah 3 bulan pertama + syahriyah pertahun.
                            Untuk santri baru sebesar <strong>Rp. 383.500</strong> dan untuk santri lama
                            sebesar <strong>Rp. 329.500</strong>.
                        </li>
                        <li>
                            Santri dikenakan iuran maklumat sebesar <strong>Rp. 200.000</strong> yang akan
                            disalurkan untuk pembelian tanah di sekitar komplek Pondok Pesantren
                            Darussalam Lirboyo.
                        </li>
                        <li>
                            Pembayaran dana pembangunan, maklumat, dan pembelian tanah dihitung
                            per <strong>KK</strong>.
                        </li>
                        <li>
                            Dalam satu tahun syahriyah dibayarkan dalam <strong>3 tahap</strong>:
                            <ol style={{ marginTop: "0.5rem", paddingLeft: "1.2rem" }}>
                                <li>
                                    Bulan Syawal (Syahriyah Bulan Syawal s.d. Syahriyah Akhir);
                                </li>
                                <li>
                                    Bulan Muharram (Syahriyah Bulan Muharram s.d. Rabi’ul Akhir);
                                </li>
                                <li>
                                    Bulan Jumadil Ula (Syahriyah Bulan Jumadil Ula s.d. Syaban).
                                </li>
                            </ol>
                        </li>
                        <li>
                            Iuran pembayaran di atas belum termasuk pembayaran
                            <strong>MHM, MIU, Iuran Daerah, dan kas kamar</strong>.
                        </li>
                        <li>
                            Santri Tamatan (MA smt. 6, 3 Ilya, dan 3 Wustho) dikenakan iuran tambahan
                            <strong>Haul Haflah</strong> sebesar <strong>Rp. 100.000</strong>
                            (MHM ke bendahara pondok dan MIU ke bendahara madrasah).
                        </li>
                        <li>
                            Setiap santri dikenakan iuran Yayasan Lirboyo sebesar
                            <strong>Rp. 500/bulan</strong>.
                        </li>
                        <li>
                            Setiap santri dikenakan biaya Buku Istighosah sebesar
                            <strong>Rp. 15.000</strong>.
                        </li>
                        <li>
                            Setiap santri baru dikenakan sumbangan uang Gedung sebesar
                            <strong>Rp. 500.000</strong>.
                        </li>
                    </ol>

                    {/* Payment Summary Card */}
                    <div className="payment-summary-card reveal zoom-in">
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "var(--primary-dark)", marginBottom: "1rem" }}>
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
                            tertera di keterangan.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    )
}
