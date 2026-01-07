"use client";
import "@/app/styles/ppdb.css";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Link from "next/link";

// Interfaces for Region Data
interface Region {
    id: string;
    name: string;
}

const STEPS = [
    { id: 1, title: "Data Santri", icon: "fa-user-graduate" },
    { id: 2, title: "Pendidikan", icon: "fa-school" },
    { id: 3, title: "Orang Tua", icon: "fa-users" },
    { id: 4, title: "Alamat", icon: "fa-map-marker-alt" },
    { id: 5, title: "Berkas", icon: "fa-file-upload" }
];

export default function PPDBPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<any>({});

    // Validasi Field "Lainnya"
    const [otherFields, setOtherFields] = useState({
        agama: false,
        pendidikanAyah: false,
        pekerjaanAyah: false,
        pendidikanIbu: false,
        pekerjaanIbu: false
    });

    // --- STATE WILAYAH (API INDONESIA) ---
    const [provinces, setProvinces] = useState<Region[]>([]);
    const [regencies, setRegencies] = useState<Region[]>([]);
    const [districts, setDistricts] = useState<Region[]>([]);
    const [villages, setVillages] = useState<Region[]>([]);

    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedRegency, setSelectedRegency] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedVillage, setSelectedVillage] = useState("");

    // 1. Fetch Provinces on Mount
    useEffect(() => {
        fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
            .then(res => res.json())
            .then(data => setProvinces(data))
            .catch(err => console.error("Gagal ambil provinsi", err));
    }, []);

    // 2. Fetch Regencies (Kab/Kota) when Province changes
    useEffect(() => {
        if (selectedProvince) {
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`)
                .then(res => res.json())
                .then(data => setRegencies(data))
                .catch(err => console.error("Gagal ambil kabupaten", err));
        } else {
            setRegencies([]);
        }
        setDistricts([]);
        setVillages([]);
    }, [selectedProvince]);

    // 3. Fetch Districts (Kecamatan) when Regency changes
    useEffect(() => {
        if (selectedRegency) {
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedRegency}.json`)
                .then(res => res.json())
                .then(data => setDistricts(data))
                .catch(err => console.error("Gagal ambil kecamatan", err));
        } else {
            setDistricts([]);
        }
        setVillages([]);
    }, [selectedRegency]);

    // 4. Fetch Villages (Desa/Kelurahan) when District changes
    useEffect(() => {
        if (selectedDistrict) {
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedDistrict}.json`)
                .then(res => res.json())
                .then(data => setVillages(data))
                .catch(err => console.error("Gagal ambil desa", err));
        } else {
            setVillages([]);
        }
    }, [selectedDistrict]);

    // HANDLERS
    const handleRegionChange = (e: ChangeEvent<HTMLSelectElement>, type: 'prov' | 'reg' | 'dis' | 'vil') => {
        const { value, options, selectedIndex } = e.target;
        const label = options[selectedIndex].text;

        if (type === 'prov') {
            setSelectedProvince(value);
            setFormData((prev: any) => ({ ...prev, Address1_Region: label }));
        } else if (type === 'reg') {
            setSelectedRegency(value);
            setFormData((prev: any) => ({ ...prev, Address1_City: label }));
        } else if (type === 'dis') {
            setSelectedDistrict(value);
            setFormData((prev: any) => ({ ...prev, Address1_AddressLine2: label }));
        } else if (type === 'vil') {
            setSelectedVillage(value);
            setFormData((prev: any) => ({ ...prev, Address1_Village: label }));
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));

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
        }
    };

    const nextStep = () => {
        setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const uploadData = new FormData();
        Object.keys(formData).forEach(key => {
            uploadData.append(key, formData[key]);
        });

        try {
            const response = await fetch('/api/submit-registration', {
                method: 'POST',
                body: uploadData,
            });

            if (response.ok) {
                alert("Pendaftaran Berhasil Dikirim!");
                window.location.href = "/";
            } else {
                alert("Terjadi kesalahan saat mengirim data.");
            }
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan jaringan.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="ppdb-container">
            {/* HERO SECTION */}
            <header className="ppdb-header">
                <div className="header-content">
                    <Link href="/" className="back-link">
                        <i className="fas fa-arrow-left"></i> Kembali
                    </Link>
                    <h1>Pendaftaran Santri Baru</h1>
                    <p>Lengkapi formulir pendaftaran TA 2026-2027</p>
                </div>
            </header>

            <main className="ppdb-main">
                {/* PROGRESS TRACKER */}
                <div className="stepper">
                    {STEPS.map((step) => (
                        <div key={step.id} className={`step-item ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}>
                            <div className="step-circle">
                                {currentStep > step.id ? <i className="fas fa-check"></i> : <i className={`fas ${step.icon}`}></i>}
                            </div>
                            <span className="step-label">{step.title}</span>
                            {step.id < STEPS.length && <div className="step-line"></div>}
                        </div>
                    ))}
                </div>

                {/* FORM CONTENT */}
                <form onSubmit={handleSubmit} className="ppdb-form-card">
                    {/* STEP 1: DATA PRIBADI */}
                    <div className={`step-content ${currentStep === 1 ? 'show' : 'hide'}`}>
                        <div className="step-header">
                            <h2><i className="fas fa-user-graduate"></i> Data Pribadi Santri</h2>
                            <p>Informasi dasar calon santri sesuai identitas resmi.</p>
                        </div>

                        <div className="form-grid">
                            <div className="input-group">
                                <label>Nama Depan *</label>
                                <input type="text" name="Name_First" placeholder="Contoh: Ahmad" onChange={handleInputChange} required />
                            </div>
                            <div className="input-group">
                                <label>Nama Belakang *</label>
                                <input type="text" name="Name_Last" placeholder="Contoh: Fauzi" onChange={handleInputChange} required />
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="input-group">
                                <label>NIK Santri *</label>
                                <input type="text" name="Number" maxLength={16} placeholder="16 Digit NIK" onChange={handleInputChange} required />
                            </div>
                            <div className="input-group">
                                <label>No. Kartu Keluarga *</label>
                                <input type="text" name="Number1" maxLength={16} placeholder="16 Digit No. KK" onChange={handleInputChange} required />
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="input-group">
                                <label>NISN *</label>
                                <input type="text" name="Number2" maxLength={10} placeholder="10 Digit NISN" onChange={handleInputChange} required />
                            </div>
                            <div className="input-group">
                                <label>Jenis Kelamin *</label>
                                <select name="Dropdown" onChange={handleInputChange} required>
                                    <option value="">Pilih...</option>
                                    <option value="Laki-Laki">Laki-Laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="input-group">
                                <label>Tempat Lahir *</label>
                                <input type="text" name="SingleLine2" placeholder="Kota Kelahiran" onChange={handleInputChange} required />
                            </div>
                            <div className="input-group">
                                <label>Tanggal Lahir *</label>
                                <input type="date" name="Date" onChange={handleInputChange} required />
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="input-group">
                                <label>Agama *</label>
                                <select name="Dropdown2" onChange={handleInputChange} required>
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
                                    <input type="text" name="other_agama" placeholder="Sebutkan Agama" className="mt-2" onChange={handleInputChange} />
                                )}
                            </div>
                            <div className="input-group">
                                <label>Pendidikan Terakhir *</label>
                                <select name="Dropdown1" onChange={handleInputChange} required>
                                    <option value="">Pilih...</option>
                                    <option value="SD/MI">SD/MI</option>
                                    <option value="SMP/MTS">SMP/MTS</option>
                                    <option value="SMA/MA">SMA/MA</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* STEP 2: JENJANG & MINAT */}
                    <div className={`step-content ${currentStep === 2 ? 'show' : 'hide'}`}>
                        <div className="step-header">
                            <h2><i className="fas fa-school"></i> Jenjang & Minat</h2>
                            <p>Pilih jenjang pendidikan yang ingin diikuti di Lirboyo.</p>
                        </div>

                        <div className="input-group">
                            <label>Akan Masuk Kelas *</label>
                            <select name="Dropdown3" onChange={handleInputChange} required>
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
                            <span className="hint-text"><i className="fas fa-info-circle"></i> <Link href="/materi-ujian" target="_blank">Lihat rincian materi ujian</Link></span>
                        </div>

                        <div className="form-grid">
                            <div className="input-group">
                                <label>Hobi *</label>
                                <input type="text" name="SingleLine" placeholder="Kegemaran" onChange={handleInputChange} required />
                            </div>
                            <div className="input-group">
                                <label>Cita-Cita *</label>
                                <input type="text" name="SingleLine1" placeholder="Tujuan Masa Depan" onChange={handleInputChange} required />
                            </div>
                        </div>
                    </div>

                    {/* STEP 3: DATA ORANG TUA */}
                    <div className={`step-content ${currentStep === 3 ? 'show' : 'hide'}`}>
                        <div className="step-header">
                            <h2><i className="fas fa-users"></i> Data Orang Tua</h2>
                            <p>Informasi Ayah dan Ibu atau Wali santri.</p>
                        </div>

                        {/* DATA AYAH */}
                        <div className="sub-section">
                            <h3>Informasi Ayah / Wali</h3>
                            <div className="form-grid">
                                <div className="input-group">
                                    <label>Nama Depan Ayah *</label>
                                    <input type="text" name="Name1_First" onChange={handleInputChange} required />
                                </div>
                                <div className="input-group">
                                    <label>Nama Belakang Ayah *</label>
                                    <input type="text" name="Name1_Last" onChange={handleInputChange} required />
                                </div>
                            </div>
                            <div className="form-grid">
                                <div className="input-group">
                                    <label>NIK Ayah *</label>
                                    <input type="text" name="Number3" maxLength={16} onChange={handleInputChange} required />
                                </div>
                                <div className="input-group">
                                    <label>No. HP / WA *</label>
                                    <input type="text" name="PhoneNumber_countrycode" placeholder="08xx..." onChange={handleInputChange} required />
                                </div>
                            </div>
                            <div className="form-grid">
                                <div className="input-group">
                                    <label>Pendidikan Ayah *</label>
                                    <select name="Dropdown8" onChange={handleInputChange} required>
                                        <option value="">Pilih...</option>
                                        <option value="SD/MI">SD/MI</option>
                                        <option value="SMP/MTS">SMP/MTS</option>
                                        <option value="SMA/MA">SMA/MA</option>
                                        <option value="S1 (Sarjana)">S1 (Sarjana)</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>
                                    {otherFields.pendidikanAyah && <input type="text" name="other_pendidikan_ayah" className="mt-2" placeholder="Sebutkan..." onChange={handleInputChange} />}
                                </div>
                                <div className="input-group">
                                    <label>Pekerjaan Ayah *</label>
                                    <select name="Dropdown4" onChange={handleInputChange} required>
                                        <option value="">Pilih...</option>
                                        <option value="Wiraswasta">Wiraswasta</option>
                                        <option value="Petani">Petani</option>
                                        <option value="PNS">PNS</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>
                                    {otherFields.pekerjaanAyah && <input type="text" name="other_pekerjaan_ayah" className="mt-2" placeholder="Sebutkan..." onChange={handleInputChange} />}
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Penghasilan Bulanan *</label>
                                <select name="Dropdown6" onChange={handleInputChange} required>
                                    <option value="">Pilih Rentang...</option>
                                    <option value="< Rp 2.000.000">&lt; Rp 2.000.000</option>
                                    <option value="Rp 2jt - 5jt">Rp 3.000.000 - Rp 5.000.000</option>
                                    <option value="> Rp 5.000.000">&gt; Rp 5.000.000</option>
                                </select>
                            </div>
                        </div>

                        <hr className="divider" />

                        {/* DATA IBU */}
                        <div className="sub-section">
                            <h3>Informasi Ibu</h3>
                            <div className="form-grid">
                                <div className="input-group">
                                    <label>Nama Depan Ibu *</label>
                                    <input type="text" name="Name2_First" onChange={handleInputChange} required />
                                </div>
                                <div className="input-group">
                                    <label>Nama Belakang Ibu *</label>
                                    <input type="text" name="Name2_Last" onChange={handleInputChange} required />
                                </div>
                            </div>
                            <div className="form-grid">
                                <div className="input-group">
                                    <label>NIK Ibu *</label>
                                    <input type="text" name="Number4" maxLength={16} onChange={handleInputChange} required />
                                </div>
                                <div className="input-group">
                                    <label>No. HP / WA Ibu *</label>
                                    <input type="text" name="PhoneNumber1_countrycode" placeholder="08xx..." onChange={handleInputChange} required />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* STEP 4: ALAMAT LENGKAP */}
                    <div className={`step-content ${currentStep === 4 ? 'show' : 'hide'}`}>
                        <div className="step-header">
                            <h2><i className="fas fa-map-marker-alt"></i> Alamat Domisili</h2>
                            <p>Tentukan lokasi tempat tinggal saat ini.</p>
                        </div>

                        <div className="form-grid">
                            <div className="input-group">
                                <label>Provinsi *</label>
                                <select value={selectedProvince} onChange={(e) => handleRegionChange(e, 'prov')} required>
                                    <option value="">Pilih Provinsi</option>
                                    {provinces.map(prov => (
                                        <option key={prov.id} value={prov.id}>{prov.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Kota / Kabupaten *</label>
                                <select value={selectedRegency} onChange={(e) => handleRegionChange(e, 'reg')} disabled={!selectedProvince} required>
                                    <option value="">Pilih...</option>
                                    {regencies.map(reg => (
                                        <option key={reg.id} value={reg.id}>{reg.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="input-group">
                                <label>Kecamatan *</label>
                                <select value={selectedDistrict} onChange={(e) => handleRegionChange(e, 'dis')} disabled={!selectedRegency} required>
                                    <option value="">Pilih...</option>
                                    {districts.map(dis => (
                                        <option key={dis.id} value={dis.id}>{dis.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Desa / Kelurahan *</label>
                                <select value={selectedVillage} onChange={(e) => handleRegionChange(e, 'vil')} disabled={!selectedDistrict} required>
                                    <option value="">Pilih...</option>
                                    {villages.map(vil => (
                                        <option key={vil.id} value={vil.id}>{vil.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="input-group">
                                <label>Jalan / Dusun / RT & RW *</label>
                                <input type="text" name="Address1_AddressLine1" placeholder="Contoh: Jl. Lirboyo No. 1, RT 01 RW 02" onChange={handleInputChange} required />
                            </div>
                            <div className="input-group">
                                <label>Kode Pos</label>
                                <input type="text" name="Address1_ZipCode" placeholder="64xxx" onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>

                    {/* STEP 5: BERKAS PENDUKUNG */}
                    <div className={`step-content ${currentStep === 5 ? 'show' : 'hide'}`}>
                        <div className="step-header">
                            <h2><i className="fas fa-file-upload"></i> Berkas Pendukung</h2>
                            <p>Unggah dokumen fisik calon santri (Foto, KK, Ijazah).</p>
                        </div>

                        <div className="upload-grid">
                            <div className="upload-box">
                                <label>Pas Foto Santri *</label>
                                <div className="file-drop-area">
                                    <input type="file" name="FileUpload" accept="image/*" onChange={handleFileChange} required />
                                    <div className="file-info">
                                        <i className="fas fa-camera"></i>
                                        <span>{formData.FileUpload ? formData.FileUpload.name : "Klik untuk pilih foto"}</span>
                                        <p>Baju putih, kopyah hitam, background polos</p>
                                    </div>
                                </div>
                            </div>

                            <div className="upload-box">
                                <label>Scan Kartu Keluarga *</label>
                                <div className="file-drop-area">
                                    <input type="file" name="FileUpload1" accept="image/*,application/pdf" onChange={handleFileChange} required />
                                    <div className="file-info">
                                        <i className="fas fa-id-card"></i>
                                        <span>{formData.FileUpload1 ? formData.FileUpload1.name : "Klik untuk pilih KK"}</span>
                                        <p>Pastikan tulisan terbaca jelas</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FORM FOOTER / NAVIGATION */}
                    <div className="form-footer">
                        {currentStep > 1 && (
                            <button type="button" onClick={prevStep} className="btn-secondary">
                                <i className="fas fa-chevron-left"></i> Sebelumnya
                            </button>
                        )}
                        <div style={{ marginLeft: 'auto' }}>
                            {currentStep < STEPS.length ? (
                                <button type="button" onClick={nextStep} className="btn-primary">
                                    Lanjut <i className="fas fa-chevron-right"></i>
                                </button>
                            ) : (
                                <button type="submit" className="btn-success" disabled={isLoading}>
                                    {isLoading ? <><i className="fas fa-spinner fa-spin"></i> Memproses...</> : <>Kirim Pendaftaran <i className="fas fa-paper-plane"></i></>}
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}
