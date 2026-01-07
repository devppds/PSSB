
import "@/app/styles/informasi.css";

export const metadata = {
    title: "Informasi Pendaftaran - PSSB Darussalam Lirboyo",
    description: "Panduan lengkap cara pendaftaran santri baru di Madrasah Hidayatul Mubtadi'in Pondok Pesantren Lirboyo secara online.",
};

export default function InformasiPage() {
    return (
        <>
            {/* HERO SECTION */}
            <section className="info-hero">
                <div className="reveal fade-bottom">
                    <h1 className="hero-title">Informasi <span className="text-gradient">Pendaftaran</span></h1>
                    <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto" }}>
                        Panduan resmi tata cara pendaftaran santri baru Pondok Pesantren Darussalam Lirboyo.
                    </p>
                </div>
            </section>

            {/* CONTENT SECTION */}
            <div className="info-container">

                {/* INTRO CARD */}
                <div className="info-card reveal fade-bottom">
                    <p className="lead-text">
                        Kini, teknologi dan media digital seakan menjadi barang yang wajib guna memenuhi berbagai kebutuhan.
                        Oleh karenanya, <strong>Pondok Pesantren Darussalam Lirboyo</strong> menyediakan sebuah layanan digital untuk mempermudah wali santri ketika mendaftarkan putranya ke
                        Pondok Pesantren Darussalam Lirboyo.
                    </p>
                    <p style={{ lineHeight: 1.8, color: "var(--text-muted)" }}>
                        Kurikulum di lingkungan Pondok Pesantren Lirboyo lebih kompleks, tata administrasi lebih
                        spesifik serta jumlah siswa yang menimba ilmu di Pondok Lirboyo semakin banyak dan berasal dari
                        hampir seluruh daerah di Indonesia, bahkan ada yang berasal dari negara tetangga seperti Malaysia,
                        Thailand dan negara ASEAN yang lain.
                        <br /><br />
                        Sehingga melihat realita yang demikian, Pondok Pesantren Darussalam Lirboyo mendukung program
                        Digitalisasi Pesantren Lirboyo Induk Terkait Pendaftaran Santri Baru, yang mana memberikan wadah
                        yang
                        bisa memudahkan para pengembara ilmu itu untuk bisa mengakses pendidikan di Pondok Pesantren
                        Darussalam (Khususnya) Lirboyo (Umumnya) meski harus dari jarak yang jauh dengan memanfaatkan
                        perkembangan teknologi.
                    </p>
                </div>

                {/* HOW TO REGISTER CARD */}
                <div className="info-card reveal fade-bottom">
                    <h2 style={{ marginBottom: "1.5rem", color: "var(--primary-dark)" }}><i className="fas fa-laptop-code"
                        style={{ marginRight: "10px" }}></i> Cara Mendaftar di PSSB Online</h2>
                    <p style={{ marginBottom: "2rem" }}>
                        Untuk kenyamanan saat melakukan pendaftaran online, kami menganjurkan anda untuk menggunakan
                        Aplikasi <strong>Google Chrome</strong>. Ikuti langkah-langkah di bawah ini dengan seksama.
                    </p>

                    <div className="step-list">
                        <div className="step-item">
                            <h4 style={{ color: "var(--primary-dark)" }}>Identitas & Data Pribadi</h4>
                            <p style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}>
                                Memasukkan DATA PRIBADI sesuai dengan Kartu Keluarga (KK) dan menyertakan Pas Foto terbaru
                                sesuai ketentuan.
                            </p>

                            {/* PHOTO REQUIREMENTS */}
                            <div className="photo-requirements">
                                <h5 style={{ marginBottom: "1rem", color: "var(--primary-dark)" }}><i className="fas fa-camera"></i> Ketentuan Foto yang Diunggah:</h5>
                                <div className="requirement-list">
                                    <div className="requirement-item"><i className="fas fa-check-circle"></i> Ukuran File Maksimal 5 MB</div>
                                    <div className="requirement-item"><i className="fas fa-check-circle"></i> Ukuran foto 3x4</div>
                                    <div className="requirement-item"><i className="fas fa-check-circle"></i> Foto Berwarna</div>
                                    <div className="requirement-item"><i className="fas fa-check-circle"></i> Background BIRU POLOS</div>
                                    <div className="requirement-item"><i className="fas fa-check-circle"></i> Baju Putih Polos Berkerah</div>
                                    <div className="requirement-item"><i className="fas fa-check-circle"></i> Kopyah Hitam Polos</div>
                                    <div className="requirement-item"><i className="fas fa-check-circle"></i> Rambut Pendek (Rapi)</div>
                                </div>
                            </div>
                        </div>

                        <div className="step-item">
                            <h4 style={{ color: "var(--primary-dark)" }}>Verifikasi Berkas</h4>
                            <p style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}>
                                Unggah pindaian (scan) dokumen pendukung seperti Akta Kelahiran, Kartu Keluarga, dan Ijazah
                                terakhir jika diperlukan.
                            </p>
                        </div>

                        <div className="step-item">
                            <h4 style={{ color: "var(--primary-dark)" }}>Penyelesaian & Verifikasi</h4>
                            <p style={{ fontSize: "1rem", color: "var(--text-muted)" }}>
                                Lakukan finalisasi data dan verifikasi
                                fisik di Pondok Pesantren Darussalam Lirboyo.
                            </p>
                        </div>
                    </div>
                </div>

                {/* MENU FUNCTION CARD */}
                <div className="info-card reveal fade-bottom">
                    <h2 style={{ marginBottom: "1.5rem", color: "var(--primary-dark)" }}><i className="fas fa-th-large"
                        style={{ marginRight: "10px" }}></i> Fungsi Menu PSSB Darussalam Lirboyo</h2>

                    <div className="menu-function-grid">
                        <div className="menu-item">
                            <i className="fas fa-home"></i>
                            <h4>Beranda</h4>
                            <p>Berisi ringkasan informasi terbaru, selamat datang, dan pengumuman penting mengenai portal
                                PSSB Darussalam Lirboyo.</p>
                        </div>
                        <div className="menu-item">
                            <i className="fas fa-info-circle"></i>
                            <h4>Informasi</h4>
                            <p>Panduan lengkap, persyaratan dokumen, dan prosedur teknis pendaftaran santri baru MHM
                                Lirboyo.</p>
                        </div>
                        <div className="menu-item">
                            <i className="fas fa-folder-open"></i>
                            <h4>Materi Ujian</h4>
                            <p>Daftar lengkap materi ujian tulis dan lisan sesuai tingkatan kelas sebagai persiapan
                                menghadapi seleksi.</p>
                        </div>
                        <div className="menu-item">
                            <i className="fas fa-user-plus"></i>
                            <h4>Daftar Online</h4>
                            <p>Formulir elektronik mandiri untuk mengisi data, mengunggah berkas, dan memproses pendaftaran.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
