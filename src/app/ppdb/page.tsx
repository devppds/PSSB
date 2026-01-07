"use client";
import "@/app/styles/ppdb.css";
import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";

export default function PPDBPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const [errors, setErrors] = useState<any>({});
    const [otherFields, setOtherFields] = useState({
        agama: false,
        pendidikanAyah: false,
        pekerjaanAyah: false,
        pendidikanIbu: false,
        pekerjaanIbu: false
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev: any) => ({ ...prev, [name]: null }));
        }

        // Handle "Lainnya" toggle
        if (name === "Dropdown2") setOtherFields(p => ({ ...p, agama: value === "Lainnya" }));
        if (name === "Dropdown8") setOtherFields(p => ({ ...p, pendidikanAyah: value === "Lainnya" }));
        if (name === "Dropdown4") setOtherFields(p => ({ ...p, pekerjaanAyah: value === "Lainnya" }));
        if (name === "Dropdown9") setOtherFields(p => ({ ...p, pendidikanIbu: value === "Lainnya" }));
        if (name === "Dropdown5") setOtherFields(p => ({ ...p, pekerjaanIbu: value === "Lainnya" }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setFormData((prev: any) => ({ ...prev, [name]: files[0] }));
            if (errors[name]) {
                setErrors((prev: any) => ({ ...prev, [name]: null }));
            }
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // TODO: Implement Validation and API Call

        // Mock success
        setTimeout(() => {
            setIsLoading(false);
            alert("Pendaftaran Berhasil Dikirim! (Simulasi - Backend belum terhubung)");
        }, 2000);
    };

    return (
        <>
            <div className="section-wrapper">
                <div className="ppdb-hero">
                    <h1>Pendaftaran Santri</h1>
                    <p>Bergabunglah dengan keluarga besar Pondok Pesantren Darussalam Lirboyo</p>
                </div>

                <div className="zf-templateWidth">
                    <form onSubmit={handleSubmit} className="zf-templateWrapper">

                        {/* Form Header */}
                        <div className="zf-tempHeadContBdr">
                            <h2 className="zf-frmTitle">Formulir Pendaftaran</h2>
                            <p className="zf-frmDesc">Tahun Ajaran 2026-2027</p>
                        </div>

                        <div className="zf-subContWrap zf-topAlign">
                            {/* SECTION 1: DATA PRIBADI */}
                            <div className="form-section-card">
                                <div className="section-header">
                                    <div className="section-icon"><i className="fas fa-user-graduate"></i></div>
                                    <h3>Data Pribadi Calon Santri</h3>
                                </div>

                                <div className="zf-tempFrmWrapper">
                                    <label className="zf-labelName">Nama Lengkap <em className="zf-important">*</em></label>
                                    <div className="zf-nameWrapper">
                                        <input type="text" name="Name_First" placeholder="Nama Depan" onChange={handleInputChange} required />
                                        <input type="text" name="Name_Last" placeholder="Nama Belakang" onChange={handleInputChange} required />
                                    </div>
                                </div>

                                <div className="custom-grid">
                                    <div className="zf-tempFrmWrapper">
                                        <label className="zf-labelName">NIK Santri <em className="zf-important">*</em></label>
                                        <div className="zf-tempContDiv">
                                            <input type="text" name="Number" maxLength={18} placeholder="Sesuai Kartu Keluarga" onChange={handleInputChange} required />
                                        </div>
                                    </div>
                                    <div className="zf-tempFrmWrapper">
                                        <label className="zf-labelName">No. Kartu Keluarga <em className="zf-important">*</em></label>
                                        <div className="zf-tempContDiv">
                                            <input type="text" name="Number1" maxLength={18} placeholder="16 Digit No. KK" onChange={handleInputChange} required />
                                        </div>
                                    </div>
                                </div>

                                <div className="custom-grid">
                                    <div className="zf-tempFrmWrapper">
                                        <label className="zf-labelName">NISN <em className="zf-important">*</em></label>
                                        <div className="zf-tempContDiv">
                                            <input type="text" name="Number2" maxLength={18} placeholder="Nomor Induk Sekolah Nasional" onChange={handleInputChange} required />
                                        </div>
                                    </div>
                                    <div className="zf-tempFrmWrapper">
                                        <label className="zf-labelName">Jenis Kelamin <em className="zf-important">*</em></label>
                                        <div className="zf-tempContDiv">
                                            <select className="zf-form-sBox" name="Dropdown" onChange={handleInputChange} required>
                                                <option value="">Pilih Jenis Kelamin</option>
                                                <option value="Laki-Laki">Laki-Laki</option>
                                                <option value="Perempuan">Perempuan</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="custom-grid">
                                    <div className="zf-tempFrmWrapper">
                                        <label className="zf-labelName">Tempat Lahir <em className="zf-important">*</em></label>
                                        <div className="zf-tempContDiv">
                                            <input type="text" name="SingleLine2" placeholder="Kota Kelahiran" onChange={handleInputChange} required />
                                        </div>
                                    </div>
                                    <div className="zf-tempFrmWrapper">
                                        <label className="zf-labelName">Tanggal Lahir <em className="zf-important">*</em></label>
                                        <div className="zf-tempContDiv">
                                            <input type="date" name="Date" onChange={handleInputChange} required />
                                        </div>
                                    </div>
                                </div>

                                <div className="custom-grid">
                                    <div className="zf-tempFrmWrapper">
                                        <label className="zf-labelName">Agama <em className="zf-important">*</em></label>
                                        <div className="zf-tempContDiv">
                                            <select className="zf-form-sBox" name="Dropdown2" onChange={handleInputChange} required>
                                                <option value="">Pilih Agama</option>
                                                <option value="Islam">Islam</option>
                                                <option value="Protestan">Protestan</option>
                                                <option value="Katolik">Katolik</option>
                                                <option value="Hindu">Hindu</option>
                                                <option value="Buddha">Buddha</option>
                                                <option value="Konghucu">Konghucu</option>
                                                <option value="Lainnya">Lainnya</option>
                                            </select>
                                            {otherFields.agama && (
                                                <div style={{ marginTop: "1rem" }}>
                                                    <input type="text" name="other_agama" placeholder="Sebutkan Agama" onChange={handleInputChange} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="zf-tempFrmWrapper">
                                        <label className="zf-labelName">Pendidikan Terakhir <em className="zf-important">*</em></label>
                                        <div className="zf-tempContDiv">
                                            <select className="zf-form-sBox" name="Dropdown1" onChange={handleInputChange} required>
                                                <option value="">Pilih Pendidikan Terakhir</option>
                                                <option value="SD/MI">SD/MI</option>
                                                <option value="SMP/MTS">SMP/MTS</option>
                                                <option value="SMA/MA">SMA/MA</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* SECTION 2: MINAT & TUJUAN */}
                            <div className="form-section-card">
                                <div className="section-header">
                                    <div className="section-icon"><i className="fas fa-school"></i></div>
                                    <h3>Jenjang & Minat</h3>
                                </div>
                                <div className="zf-tempFrmWrapper">
                                    <label className="zf-labelName">Akan Masuk Kelas <em className="zf-important">*</em></label>
                                    <div className="zf-tempContDiv">
                                        <select className="zf-form-sBox" name="Dropdown3" onChange={handleInputChange} required>
                                            <option value="">Pilih Jenjang/Kelas</option>
                                            <optgroup label="MIU (Santri Sekolah Formal)">
                                                <option value="I Ula">I Ula</option>
                                                <option value="II Ula">II Ula</option>
                                                <option value="III Ula">III Ula</option>
                                                <option value="I Wustho">I Wustho</option>
                                                <option value="I Ulya">I Ulya</option>
                                            </optgroup>
                                            <optgroup label="MHM (Santri Salaf)">
                                                <option value="V Ibtida'iyyah">V Ibtida'iyyah</option>
                                                <option value="VI Ibtida'iyyah">VI Ibtida'iyyah</option>
                                                <option value="I Tsanawiyyah">I Tsanawiyyah</option>
                                                <option value="I Aliyyah">I Aliyyah</option>
                                                <option value="I Ma'had Aly">I Ma'had Aly</option>
                                                <option value="II Ma'had Aly">II Ma'had Aly</option>
                                            </optgroup>
                                        </select>
                                        <p className="zf-instruction"><i className="fas fa-info-circle"></i> <Link href="/materi-ujian" style={{ color: "#3b82f6", textDecoration: "underline" }}>Lihat Materi Ujian</Link>
                                        </p>
                                    </div>
                                </div>
                                <div className="custom-grid">
                                    <div className="zf-tempFrmWrapper">
                                        <label className="zf-labelName">Hobi <em className="zf-important">*</em></label>
                                        <div className="zf-tempContDiv">
                                            <input type="text" name="SingleLine" placeholder="Kegemaran" onChange={handleInputChange} required />
                                        </div>
                                    </div>
                                    <div className="zf-tempFrmWrapper">
                                        <label className="zf-labelName">Cita-Cita <em className="zf-important">*</em></label>
                                        <div className="zf-tempContDiv">
                                            <input type="text" name="SingleLine1" placeholder="Tujuan Masa Depan" onChange={handleInputChange} required />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* SECTION 3: DATA ORANG TUA / WALI */}
                            <div className="form-section-card">
                                <div className="section-header">
                                    <div className="section-icon"><i className="fas fa-users"></i></div>
                                    <h3>Data Orang Tua / Wali</h3>
                                </div>

                                {/* Ayah */}
                                <div className="zf-tempFrmWrapper">
                                    <label className="zf-labelName">Nama Lengkap Ayah/Wali <em className="zf-important">*</em></label>
                                    <div className="zf-nameWrapper">
                                        <input type="text" name="Name1_First" placeholder="Nama Depan" onChange={handleInputChange} required />
                                        <input type="text" name="Name1_Last" placeholder="Nama Belakang" onChange={handleInputChange} required />
                                    </div>
                                </div>

                                <div className="custom-grid">
                                    <div className="zf-tempFrmWrapper">
                                        <label className="zf-labelName">NIK Ayah <em className="zf-important">*</em></label>
                                        <div className="zf-tempContDiv">
                                            <input type="text" name="Number3" maxLength={18} placeholder="16 Digit NIK Ayah" onChange={handleInputChange} required />
                                        </div>
                                    </div>
                                    <div className="zf-tempFrmWrapper">
                                        <label className="zf-labelName">Nomor HP/WA <em className="zf-important">*</em></label>
                                        <div className="zf-tempContDiv">
                                            <input type="text" name="PhoneNumber_countrycode" placeholder="+62" onChange={handleInputChange} required />
                                        </div>
                                    </div>
                                </div>

                                <div className="custom-grid">
                                    <div className="zf-tempFrmWrapper">
                                        <label className="zf-labelName">Pendidikan Ayah <em className="zf-important">*</em></label>
                                        <div className="zf-tempContDiv">
                                            <select className="zf-form-sBox" name="Dropdown8" onChange={handleInputChange} required>
                                                <option value="">Pilih Pendidikan</option>
                                                <option value="SD/MI">SD/MI</option>
                                                <option value="SMP/MTS">SMP/MTS</option>
                                                <option value="SMA/MA">SMA/MA</option>
                                                <option value="S1 (Sarjana)">S1 (Sarjana)</option>
                                                <option value="S2 (Magister)">S2 (Magister)</option>
                                                <option value="S3 (Doctor)">S3 (Doctor)</option>
                                                <option value="Lainnya">Lainnya</option>
                                            </select>
                                            {otherFields.pendidikanAyah && (
                                                <div style={{ marginTop: "1rem" }}>
                                                    <input type="text" name="other_pendidikan_ayah" placeholder="Sebutkan Pendidikan" onChange={handleInputChange} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="zf-tempFrmWrapper">
                                        <label className="zf-labelName">Pekerjaan Ayah <em className="zf-important">*</em></label>
                                        <div className="zf-tempContDiv">
                                            <select className="zf-form-sBox" name="Dropdown4" onChange={handleInputChange} required>
                                                <option value="">Pilih Pekerjaan</option>
                                                <option value="Wiraswasta">Wiraswasta</option>
                                                <option value="Karyawan Swasta">Karyawan Swasta</option>
                                                <option value="Pegawai Negeri Sipil">Pegawai Negeri Sipil</option>
                                                <option value="Lainnya">Lainnya</option>
                                            </select>
                                            {otherFields.pekerjaanAyah && (
                                                <div style={{ marginTop: "1rem" }}>
                                                    <input type="text" name="other_pekerjaan_ayah" placeholder="Sebutkan Pekerjaan" onChange={handleInputChange} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="zf-tempFrmWrapper">
                                    <label className="zf-labelName">Penghasilan Ayah/Wali <em className="zf-important">*</em></label>
                                    <div className="zf-tempContDiv">
                                        <select className="zf-form-sBox" name="Dropdown6" onChange={handleInputChange} required>
                                            <option value="">Pilih Rentang Penghasilan</option>
                                            <option value="< Rp 3.000.000">&lt; Rp 3.000.000</option>
                                            <option value="Rp 3.000.000 - Rp 5.000.000">Rp 3.000.000 - Rp 5.000.000</option>
                                            <option value="Rp 5.000.000 - Rp 7.000.000">Rp 5.000.000 - Rp 7.000.000</option>
                                            <option value="Rp 7.000.000 - Rp 10.000.000">Rp 7.000.000 - Rp 10.000.000</option>
                                            <option value="> Rp 10.000.000">&gt; Rp 10.000.000</option>
                                        </select>
                                    </div>
                                </div>

                                <hr style={{ border: "none", borderTop: "1px solid #f1f5f9", margin: "2rem 0" }} />

                                {/* Ibu */}
                                <div className="zf-tempFrmWrapper">
                                    <label className="zf-labelName">Nama Lengkap Ibu <em className="zf-important">*</em></label>
                                    <div className="zf-nameWrapper">
                                        <input type="text" name="Name2_First" placeholder="Nama Depan" onChange={handleInputChange} required />
                                        <input type="text" name="Name2_Last" placeholder="Nama Belakang" onChange={handleInputChange} required />
                                    </div>
                                </div>

                                <div className="custom-grid">
                                    <div className="zf-tempFrmWrapper">
                                        <label className="zf-labelName">NIK Ibu <em className="zf-important">*</em></label>
                                        <div className="zf-tempContDiv">
                                            <input type="text" name="Number4" maxLength={18} placeholder="16 Digit NIK Ibu" onChange={handleInputChange} required />
                                        </div>
                                    </div>
                                    <div className="zf-tempFrmWrapper">
                                        <label className="zf-labelName">Nomor HP/WA Ibu <em className="zf-important">*</em></label>
                                        <div className="zf-tempContDiv">
                                            <input type="text" name="PhoneNumber1_countrycode" placeholder="+62" onChange={handleInputChange} required />
                                        </div>
                                    </div>
                                </div>
                                {/* More Ibu fields if needed... similar pattern */}
                            </div>

                            {/* SECTION 4: ALAMAT LENGKAP */}
                            <div className="form-section-card">
                                <div className="section-header">
                                    <div className="section-icon"><i className="fas fa-map-marker-alt"></i></div>
                                    <h3>Alamat Lengkap Domisili</h3>
                                </div>
                                <div className="zf-tempFrmWrapper">
                                    <label className="zf-labelName">Jalan / Desa / RT & RW <em className="zf-important">*</em></label>
                                    <input type="text" name="Address1_AddressLine1" placeholder="Nama Jalan, Nama Desa/Dusun, RT/RW" onChange={handleInputChange} required />
                                </div>
                                <div className="custom-grid" style={{ marginTop: "1rem" }}>
                                    <div className="zf-tempFrmWrapper">
                                        <label className="zf-labelName">Provinsi <em className="zf-important">*</em></label>
                                        <select className="zf-form-sBox" name="Address1_Region" onChange={handleInputChange}>
                                            <option value="">Pilih Provinsi (Manual Input for now)</option>
                                            <option value="Jawa Timur">Jawa Timur</option>
                                            <option value="Jawa Tengah">Jawa Tengah</option>
                                            {/* Add more or use API */}
                                        </select>
                                    </div>
                                    <div className="zf-tempFrmWrapper">
                                        <label className="zf-labelName">Kota/Kabupaten <em className="zf-important">*</em></label>
                                        <input type="text" name="Address1_City" placeholder="Kota/Kabupaten" onChange={handleInputChange} required />
                                    </div>
                                </div>
                                <div className="custom-grid" style={{ marginTop: "1rem" }}>
                                    <div className="zf-tempFrmWrapper">
                                        <label className="zf-labelName">Kecamatan <em className="zf-important">*</em></label>
                                        <input type="text" name="Address1_AddressLine2" placeholder="Kecamatan" onChange={handleInputChange} required />
                                    </div>
                                    <div className="zf-tempFrmWrapper">
                                        <label className="zf-labelName">Kode Pos <em className="zf-important">*</em></label>
                                        <input type="text" name="Address1_ZipCode" placeholder="Kode Pos" onChange={handleInputChange} required />
                                    </div>
                                </div>
                            </div>

                            {/* SECTION 5: BERKAS PENDUKUNG */}
                            <div className="form-section-card">
                                <div className="section-header">
                                    <div className="section-icon"><i className="fas fa-file-alt"></i></div>
                                    <h3>Berkas Pendukung</h3>
                                </div>
                                <div className="custom-grid">
                                    <div className="zf-tempFrmWrapper">
                                        <label className="zf-labelName">Foto Santri <em className="zf-important">*</em></label>
                                        <div className="file-upload-container">
                                            <input type="file" name="FileUpload" accept="image/*" onChange={handleFileChange} style={{ opacity: 0, position: "absolute", inset: 0, width: "100%", height: "100%", cursor: "pointer" }} required />
                                            <p>{formData.FileUpload ? formData.FileUpload.name : "Klik untuk unggah foto"}</p>
                                            <p className="zf-instruction">- Berbaju putih & Berkerah<br />- Memakai kopyah Hitam</p>
                                        </div>
                                    </div>
                                    <div className="zf-tempFrmWrapper">
                                        <label className="zf-labelName">Scan KK <em className="zf-important">*</em></label>
                                        <div className="file-upload-container">
                                            <input type="file" name="FileUpload1" accept="image/*, application/pdf" onChange={handleFileChange} style={{ opacity: 0, position: "absolute", inset: 0, width: "100%", height: "100%", cursor: "pointer" }} required />
                                            <p>{formData.FileUpload1 ? formData.FileUpload1.name : "Klik untuk unggah KK"}</p>
                                            <p className="zf-instruction">Terlihat Jelas, Tidak Blur</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="zf-fmFooter">
                            <button type="submit" className="zf-submitColor" disabled={isLoading}>
                                {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Kirim Pendaftaran"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
