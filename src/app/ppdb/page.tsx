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
    { id: 1, title: "Santri", icon: "fa-user-graduate" },
    { id: 2, title: "Sekolah", icon: "fa-school" },
    { id: 3, title: "Wali", icon: "fa-users" },
    { id: 4, title: "Alamat", icon: "fa-map-marker-alt" },
    { id: 5, title: "Berkas", icon: "fa-file-upload" }
];

export default function PPDBPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<any>({});

    const [otherFields, setOtherFields] = useState({
        agama: false,
        pendidikanAyah: false,
        pekerjaanAyah: false,
        pendidikanIbu: false,
        pekerjaanIbu: false
    });

    const [provinces, setProvinces] = useState<Region[]>([]);
    const [regencies, setRegencies] = useState<Region[]>([]);
    const [districts, setDistricts] = useState<Region[]>([]);
    const [villages, setVillages] = useState<Region[]>([]);

    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedRegency, setSelectedRegency] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedVillage, setSelectedVillage] = useState("");

    useEffect(() => {
        fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
            .then(res => res.json())
            .then(data => setProvinces(data))
            .catch(err => console.error("Gagal ambil provinsi", err));
    }, []);

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
        <div style={{ backgroundColor: 'var(--bg-body)', minHeight: '100vh' }}>
            {/* HERO SECTION */}
            <section className="info-hero-section">
                <div className="reveal active">
                    <span className="ornament-icon"><i className="fas fa-edit"></i></span>
                    <h1 className="page-hero-title">
                        <span className="text-dark">Formulir</span> <span className="text-primary">Pendaftaran</span>
                    </h1>
                    <p className="page-hero-subtitle">
                        Silakan lengkapi formulir pendaftaran di bawah ini dengan data yang valid dan benar.
                    </p>
                </div>
            </section>

            <main className="ppdb-main-luxury">
                {/* PROGRESS TRACKER LUXE */}
                <div className="stepper-glass">
                    {STEPS.map((step) => (
                        <div key={step.id} className={`step-item-luxury ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}>
                            <div className="step-circle-luxury">
                                {currentStep > step.id ? <i className="fas fa-check"></i> : step.id}
                            </div>
                            <span className="step-label-luxury">{step.title}</span>
                            {step.id < STEPS.length && <div className="step-line-luxury"></div>}
                        </div>
                    ))}
                </div>

                {/* FORM CONTENT LUXE */}
                <form onSubmit={handleSubmit} className="form-card-luxury">

                    {/* STEP 1: DATA PRIBADI */}
                    <div className={`step-content ${currentStep === 1 ? 'show' : 'hide'}`}>
                        <div className="step-header-luxury">
                            <div className="header-icon-box"><i className="fas fa-user-graduate"></i></div>
                            <div>
                                <h2>Data Pribadi Santri</h2>
                                <p>Informasi dasar calon santri sesuai identitas resmi kartu keluarga.</p>
                            </div>
                        </div>

                        <div className="form-grid-luxury">
                            <div className="input-luxury">
                                <label>Nama Depan *</label>
                                <input type="text" name="Name_First" placeholder="Contoh: Ahmad" onChange={handleInputChange} required />
                            </div>
                            <div className="input-luxury">
                                <label>Nama Belakang *</label>
                                <input type="text" name="Name_Last" placeholder="Contoh: Fauzi" onChange={handleInputChange} required />
                            </div>
                        </div>

                        <div className="form-grid-luxury">
                            <div className="input-luxury">
                                <label>NIK Santri *</label>
                                <input type="text" name="Number" maxLength={16} placeholder="16 Digit NIK" onChange={handleInputChange} required />
                            </div>
                            <div className="input-luxury">
                                <label>No. Kartu Keluarga *</label>
                                <input type="text" name="Number1" maxLength={16} placeholder="16 Digit No. KK" onChange={handleInputChange} required />
                            </div>
                        </div>

                        <div className="form-grid-luxury">
                            <div className="input-luxury">
                                <label>NISN *</label>
                                <input type="text" name="Number2" maxLength={10} placeholder="10 Digit NISN (jika ada)" onChange={handleInputChange} />
                            </div>
                            <div className="input-luxury">
                                <label>Jenis Kelamin *</label>
                                <select name="Dropdown" onChange={handleInputChange} required>
                                    <option value="">Pilih...</option>
                                    <option value="Laki-Laki">Laki-Laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-grid-luxury">
                            <div className="input-luxury">
                                <label>Tempat Lahir *</label>
                                <input type="text" name="SingleLine2" placeholder="Kota Kelahiran" onChange={handleInputChange} required />
                            </div>
                            <div className="input-luxury">
                                <label>Tanggal Lahir *</label>
                                <input type="date" name="Date" onChange={handleInputChange} required />
                            </div>
                        </div>

                        <div className="form-grid-luxury">
                            <div className="input-luxury">
                                <label>Agama *</label>
                                <select name="Dropdown2" onChange={handleInputChange} required>
                                    <option value="Islam">Islam</option>
                                    <option value="Lainnya">Lainnya</option>
                                </select>
                            </div>
                            <div className="input-luxury">
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

                    {/* STEP 2: JENJANG */}
                    <div className={`step-content ${currentStep === 2 ? 'show' : 'hide'}`}>
                        <div className="step-header-luxury">
                            <div className="header-icon-box"><i className="fas fa-school"></i></div>
                            <div>
                                <h2>Jenjang Pendidikan</h2>
                                <p>Pilih tingkatan kelas yang akan diikuti di pesantren.</p>
                            </div>
                        </div>

                        <div className="input-luxury">
                            <label>Akan Masuk Kelas *</label>
                            <select name="Dropdown3" onChange={handleInputChange} required>
                                <option value="">Pilih Jenjang/Kelas</option>
                                <optgroup label="MIU (Madrasah Ihya Ulumiddin)">
                                    <option value="I Ula">I Ula</option>
                                    <option value="II Ula">II Ula</option>
                                    <option value="III Ula">III Ula</option>
                                </optgroup>
                                <optgroup label="MHM (Madrasah Hidayatul Mubtadiin)">
                                    <option value="V Ibtida'iyyah">V Ibtida'iyyah</option>
                                    <option value="VI Ibtida'iyyah">VI Ibtida'iyyah</option>
                                    <option value="I Tsanawiyyah">I Tsanawiyyah</option>
                                    <option value="I Aliyyah">I Aliyyah</option>
                                </optgroup>
                            </select>
                        </div>

                        <div className="form-grid-luxury">
                            <div className="input-luxury">
                                <label>Hobi *</label>
                                <input type="text" name="SingleLine" placeholder="Contoh: Membaca" onChange={handleInputChange} />
                            </div>
                            <div className="input-luxury">
                                <label>Cita-Cita *</label>
                                <input type="text" name="SingleLine1" placeholder="Contoh: Guru" onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>

                    {/* STEP 3: ORANG TUA */}
                    <div className={`step-content ${currentStep === 3 ? 'show' : 'hide'}`}>
                        <div className="step-header-luxury">
                            <div className="header-icon-box"><i className="fas fa-users"></i></div>
                            <div>
                                <h2>Data Orang Tua / Wali</h2>
                                <p>Pastikan data wali dapat dihubungi untuk keperluan administrasi.</p>
                            </div>
                        </div>

                        <div className="form-grid-luxury">
                            <div className="input-luxury">
                                <label>Nama Ayah *</label>
                                <input type="text" name="Name1_First" placeholder="Nama Lengkap Ayah" onChange={handleInputChange} required />
                            </div>
                            <div className="input-luxury">
                                <label>Nomor HP Ayah / WA *</label>
                                <input type="text" name="PhoneNumber_countrycode" placeholder="08xxxx" onChange={handleInputChange} required />
                            </div>
                        </div>

                        <div className="form-grid-luxury">
                            <div className="input-luxury">
                                <label>Nama Ibu *</label>
                                <input type="text" name="Name2_First" placeholder="Nama Lengkap Ibu" onChange={handleInputChange} required />
                            </div>
                            <div className="input-luxury">
                                <label>Pekerjaan Ayah *</label>
                                <input type="text" name="Dropdown4" placeholder="Contoh: Petani" onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>

                    {/* STEP 4: ALAMAT */}
                    <div className={`step-content ${currentStep === 4 ? 'show' : 'hide'}`}>
                        <div className="step-header-luxury">
                            <div className="header-icon-box"><i className="fas fa-map-marker-alt"></i></div>
                            <div>
                                <h2>Alamat Domisili</h2>
                                <p>Alamat lengkap tempat tinggal wali santri saat ini.</p>
                            </div>
                        </div>

                        <div className="form-grid-luxury">
                            <div className="input-luxury">
                                <label>Provinsi *</label>
                                <select value={selectedProvince} onChange={(e) => handleRegionChange(e, 'prov')} required>
                                    <option value="">Pilih Provinsi</option>
                                    {provinces.map(prov => (
                                        <option key={prov.id} value={prov.id}>{prov.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-luxury">
                                <label>Kota / Kabupaten *</label>
                                <select value={selectedRegency} onChange={(e) => handleRegionChange(e, 'reg')} disabled={!selectedProvince} required>
                                    <option value="">Pilih...</option>
                                    {regencies.map(reg => (
                                        <option key={reg.id} value={reg.id}>{reg.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="input-luxury">
                            <label>Alamat Lengkap (Dusun/RT/RW/No. Rumah) *</label>
                            <input type="text" name="Address1_AddressLine1" placeholder="Contoh: Dusun Lirboyo RT 01 RW 02" onChange={handleInputChange} required />
                        </div>
                    </div>

                    {/* STEP 5: BERKAS */}
                    <div className={`step-content ${currentStep === 5 ? 'show' : 'hide'}`}>
                        <div className="step-header-luxury">
                            <div className="header-icon-box"><i className="fas fa-file-upload"></i></div>
                            <div>
                                <h2>Berkas Pendukung</h2>
                                <p>Unggah foto dan dokumen kartu keluarga untuk validasi data.</p>
                            </div>
                        </div>

                        <div className="form-grid-luxury">
                            <div className="input-luxury">
                                <label>Fas Foto Santri (3x4) *</label>
                                <div className="upload-box-luxury">
                                    <input type="file" name="FileUpload" accept="image/*" onChange={handleFileChange} required style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                                    <i className="fas fa-camera"></i>
                                    <p style={{ fontSize: '0.8rem' }}>{formData.FileUpload ? formData.FileUpload.name : "Klik untuk Pilih Foto"}</p>
                                </div>
                            </div>
                            <div className="input-luxury">
                                <label>Scan Kartu Keluarga *</label>
                                <div className="upload-box-luxury">
                                    <input type="file" name="FileUpload1" accept="image/*,application/pdf" onChange={handleFileChange} required style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                                    <i className="fas fa-id-card"></i>
                                    <p style={{ fontSize: '0.8rem' }}>{formData.FileUpload1 ? formData.FileUpload1.name : "Klik untuk Pilih KK"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="footer-btns-luxury">
                        {currentStep > 1 && (
                            <button type="button" onClick={prevStep} className="btn-luxe btn-luxe-secondary">
                                <i className="fas fa-chevron-left"></i> Kembali
                            </button>
                        )}
                        <div style={{ marginLeft: 'auto' }}>
                            {currentStep < STEPS.length ? (
                                <button type="button" onClick={nextStep} className="btn-luxe btn-luxe-primary">
                                    Selanjutnya <i className="fas fa-arrow-right"></i>
                                </button>
                            ) : (
                                <button type="submit" className="btn-luxe btn-luxe-gold" disabled={isLoading}>
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
