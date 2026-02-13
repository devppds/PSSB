"use client";
import "@/app/styles/data-santri.css";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function DataSantriPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [loginError, setLoginError] = useState(false);

    interface Santri {
        id: number;
        nama_depan: string;
        nama_belakang: string;
        jenis_kelamin: string;
        jenjang_kelas: string;
        alamat_kota: string;
        created_at: string;
        // ... add other fields as needed
        nik?: string;
        nisn?: string;
        tempat_lahir?: string;
        tanggal_lahir?: string;
        agama?: string;
        nama_ayah_depan?: string;
        nama_ayah_belakang?: string;
        pekerjaan_ayah?: string;
        no_hp_ayah?: string;
        nama_ibu_depan?: string;
        nama_ibu_belakang?: string;
        no_hp_ibu?: string;
        alamat_jalan?: string;
        foto_santri?: string;
        scan_kk?: string;
        scan_ijazah?: string;
    }

    const [dataSantri, setDataSantri] = useState<Santri[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedSantri, setSelectedSantri] = useState<Santri | null>(null);

    const handleLogin = () => {
        if (passwordInput === "sekretary25") {
            setIsLoggedIn(true);
            setLoginError(false);
        } else {
            setLoginError(true);
        }
    };

    const fetchSantriData = async () => {
        setIsLoading(true);
        try {
            // Mock Data for UI Testing (Replace with actual API call)
            // const res = await fetch('/api/get_santri'); 
            // const data = await res.json();

            // FIXME: Use real API
            const mockData: Santri[] = [];
            setDataSantri(mockData);
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchSantriData();
        }
    }, [isLoggedIn]);

    const handleVerify = (id: number) => {
        if (confirm("Konfirmasi: Apakah data santri ini sudah valid dan akan dipindahkan ke Database Pusat?")) {
            alert("Fitur verifikasi belum terhubung ke backend.");
        }
    };

    const handleDelete = (id: number) => {
        if (confirm("PERINGATAN: Hapus data ini?")) {
            alert("Fitur hapus belum terhubung ke backend.");
        }
    };

    if (!isLoggedIn) {
        return (
            <div id="login-overlay">
                <div className="login-box">
                    <img src="https://res.cloudinary.com/dceamfy3n/image/upload/v1766596001/logo_zdenyr.png" alt="Logo" style={{ width: 80, marginBottom: "1rem" }} />
                    <h2 style={{ color: "var(--primary)", marginBottom: "10px" }}>Akses Terbatas</h2>
                    <p style={{ fontSize: "0.9rem", color: "#666" }}>Halaman Khusus Admin PPDS Lirboyo</p>

                    <input
                        type="password"
                        className="login-input"
                        placeholder="Masukkan Kode Akses"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    />
                    <button onClick={handleLogin} className="login-btn">BUKA DATA</button>
                    {loginError && <p style={{ color: "red", marginTop: "10px", fontSize: "0.9rem" }}>Kode Salah!</p>}
                </div>
            </div>
        );
    }

    return (
        <div id="main-content">
            <div className="header-bar">
                <div className="header-title">
                    <h1>Data Santri Baru 2026</h1>
                    <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Real-time database monitoring</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => window.location.href = '/admin-exclusive'} className="refresh-btn" style={{ background: 'var(--secondary)', color: 'white' }}>
                        <i className="fas fa-edit"></i> Edit Konten Web
                    </button>
                    <button onClick={fetchSantriData} className="refresh-btn">
                        <i className="fas fa-sync-alt"></i> Refresh Data
                    </button>
                </div>
            </div>

            <div className="table-container">
                <table id="santri-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>ID Reg</th>
                            <th>Nama Lengkap</th>
                            <th>L/P</th>
                            <th>Jenjang</th>
                            <th>Asal Kota</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan={8} className="loading"><i className="fas fa-spinner fa-spin"></i> Mengambil data...</td></tr>
                        ) : dataSantri.length === 0 ? (
                            <tr><td colSpan={8} style={{ textAlign: "center", padding: "20px" }}>Belum ada data pendaftar.</td></tr>
                        ) : (
                            dataSantri.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td style={{ fontSize: "0.9rem", color: "#666" }}>#{item.id}</td>
                                    <td style={{ fontWeight: 600, color: "var(--primary)" }}>{item.nama_depan} {item.nama_belakang}</td>
                                    <td>{item.jenis_kelamin || '-'}</td>
                                    <td><span style={{ color: "var(--secondary)", fontWeight: 500 }}>{item.jenjang_kelas || '-'}</span></td>
                                    <td>{item.alamat_kota || '-'}</td>
                                    <td><span className="badge badge-pending">Menunggu</span></td>
                                    <td>
                                        <div style={{ display: "flex", gap: "5px" }}>
                                            <button onClick={() => setSelectedSantri(item)} title="Lihat Detail" style={{ background: "#3b82f6", color: "white", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer" }}>
                                                <i className="fas fa-eye"></i>
                                            </button>
                                            <button onClick={() => handleVerify(item.id)} title="Verifikasi & Pindah DB" style={{ background: "#10b981", color: "white", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer" }}>
                                                <i className="fas fa-check"></i>
                                            </button>
                                            <button onClick={() => handleDelete(item.id)} title="Hapus Data" style={{ background: "#ef4444", color: "white", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer" }}>
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* DETAIL MODAL */}
            {selectedSantri && (
                <div className="modal-overlay" onClick={() => setSelectedSantri(null)}>
                    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setSelectedSantri(null)}>&times;</button>
                        <h2 style={{ color: "var(--primary)", borderBottom: "2px solid var(--accent)", paddingBottom: "10px", marginBottom: "20px" }}>Detail Data Santri</h2>

                        <div id="modal-content">
                            <h3 style={{ color: "#d4af37", margin: "15px 0 10px", borderBottom: "1px solid #d4af37" }}>Data Pribadi</h3>
                            <DetailField label="Nama Lengkap" value={`${selectedSantri.nama_depan} ${selectedSantri.nama_belakang}`} />
                            <DetailField label="NIK" value={selectedSantri.nik} />
                            <DetailField label="NISN" value={selectedSantri.nisn} />
                            <DetailField label="Tempat/Tgl Lahir" value={`${selectedSantri.tempat_lahir || ''}, ${selectedSantri.tanggal_lahir || ''}`} />
                            <DetailField label="Jenis Kelamin" value={selectedSantri.jenis_kelamin} />
                            <DetailField label="Agama" value={selectedSantri.agama} />
                            <DetailField label="Jenjang Dituju" value={selectedSantri.jenjang_kelas} />

                            <h3 style={{ color: "#d4af37", margin: "20px 0 10px", borderBottom: "1px solid #d4af37" }}>Data Orang Tua</h3>
                            <DetailField label="Nama Ayah" value={`${selectedSantri.nama_ayah_depan} ${selectedSantri.nama_ayah_belakang}`} />
                            <DetailField label="Pekerjaan Ayah" value={selectedSantri.pekerjaan_ayah} />
                            <DetailField label="No. HP Ayah" value={selectedSantri.no_hp_ayah} />
                            <br />
                            <DetailField label="Nama Ibu" value={`${selectedSantri.nama_ibu_depan} ${selectedSantri.nama_ibu_belakang}`} />
                            <DetailField label="No. HP Ibu" value={selectedSantri.no_hp_ibu} />

                            <h3 style={{ color: "#d4af37", margin: "20px 0 10px", borderBottom: "1px solid #d4af37" }}>Alamat</h3>
                            <DetailField label="Jalan" value={selectedSantri.alamat_jalan} />
                            <DetailField label="Kota/Kab" value={selectedSantri.alamat_kota} />

                            <h3 style={{ color: "#d4af37", margin: "20px 0 10px", borderBottom: "1px solid #d4af37" }}>Berkas</h3>
                            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                                {selectedSantri.foto_santri && <a href={selectedSantri.foto_santri} target="_blank" style={{ padding: "8px 15px", background: "#1e3a8a", color: "white", borderRadius: "5px", textDecoration: "none" }}>Foto Santri</a>}
                                {selectedSantri.scan_kk && <a href={selectedSantri.scan_kk} target="_blank" style={{ padding: "8px 15px", background: "#1e3a8a", color: "white", borderRadius: "5px", textDecoration: "none" }}>Scan KK</a>}
                                {selectedSantri.scan_ijazah && <a href={selectedSantri.scan_ijazah} target="_blank" style={{ padding: "8px 15px", background: "#1e3a8a", color: "white", borderRadius: "5px", textDecoration: "none" }}>Ijazah</a>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function DetailField({ label, value }: { label: string, value?: string }) {
    return (
        <div style={{ marginBottom: "8px", display: "flex", borderBottom: "1px solid #eee", paddingBottom: "5px" }}>
            <strong style={{ width: "180px", color: "#1e3a8a" }}>{label}</strong>
            <span style={{ flex: 1, color: "#333" }}>: {value || '-'}</span>
        </div>
    );
}
