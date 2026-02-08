"use client";

import "@/app/styles/ppdb.css";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

// Interfaces for Region Data
interface Region {
    id: string;
    name: string;
}

const STEPS = [
    { id: 1, title: "Data Santri", icon: "fa-user-graduate" },
    { id: 2, title: "Jenjang & Minat", icon: "fa-school" },
    { id: 3, title: "Orang Tua", icon: "fa-users" },
    { id: 4, title: "Alamat", icon: "fa-map-marker-alt" },
    { id: 5, title: "Berkas", icon: "fa-file-upload" }
];

interface RegistrationFormData {
    Name_First?: string;
    Name_Last?: string;
    Number?: string;
    Number1?: string;
    Number2?: string;
    Dropdown?: string;
    SingleLine?: string;
    SingleLine1?: string;
    SingleLine2?: string;
    Date?: string;
    Dropdown1?: string;
    Dropdown2?: string;
    Dropdown3?: string;
    Name1_First?: string;
    Name1_Last?: string;
    Number3?: string;
    PhoneNumber_countrycode?: string;
    Dropdown4?: string;
    Dropdown6?: string;
    Dropdown8?: string;
    Name2_First?: string;
    Name2_Last?: string;
    Number4?: string;
    PhoneNumber1_countrycode?: string;
    Dropdown5?: string;
    Dropdown7?: string;
    Dropdown9?: string;
    Address1_AddressLine1?: string;
    Address1_AddressLine2?: string;
    Address1_City?: string;
    Address1_Region?: string;
    Address1_ZipCode?: string;
    Address1_Country?: string;
    Address1_Village?: string;
    FileUpload?: File;
    FileUpload1?: File;
    FileUpload2?: File;
    confirm_email?: string;
    other_agama?: string;
    other_pendidikan_ayah?: string;
    other_pekerjaan_ayah?: string;
    other_pendidikan_ibu?: string;
    other_pekerjaan_ibu?: string;
    [key: string]: string | File | undefined;
}

export default function PPDBPage() {
    const { data: session } = useSession();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmEmail, setConfirmEmail] = useState("");

    // Set confirmEmail once session is available
    useEffect(() => {
        if (session?.user?.email) {
            setConfirmEmail(session.user.email);
        }
    }, [session]);

    // State to hold all form data matching legacy naming conventions
    const [formData, setFormData] = useState<RegistrationFormData>({
        Dropdown: "", // Jenis Kelamin
        Dropdown1: "", // Pendidikan Terakhir Santri
        Dropdown2: "", // Agama
        Dropdown3: "", // Kelas Tujuan
        Dropdown4: "", // Pekerjaan Ayah
        Dropdown5: "", // Pekerjaan Ibu
        Dropdown6: "", // Penghasilan Ayah
        Dropdown7: "", // Penghasilan Ibu
        Dropdown8: "", // Pendidikan Ayah
        Dropdown9: "", // Pendidikan Ibu
        Address1_Country: "Indonesia"
    });

    const [otherFields, setOtherFields] = useState({
        agama: false,
        pendidikanAyah: false,
        pekerjaanAyah: false,
        pendidikanIbu: false,
        pekerjaanIbu: false
    });

    // Region Data State
    const [provinces, setProvinces] = useState<Region[]>([]);
    const [regencies, setRegencies] = useState<Region[]>([]);
    const [districts, setDistricts] = useState<Region[]>([]);
    const [villages, setVillages] = useState<Region[]>([]);

    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedRegency, setSelectedRegency] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedVillage, setSelectedVillage] = useState("");

    // Fetch Provinces
    useEffect(() => {
        fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
            .then(res => res.json())
            .then(data => setProvinces(data))
            .catch(err => console.error("Gagal ambil provinsi", err));
    }, []);

    // Fetch Regencies
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

    // Fetch Districts
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

    // Fetch Villages
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

    const handleRegionChange = async (e: ChangeEvent<HTMLSelectElement>, type: 'prov' | 'reg' | 'dis' | 'vil') => {
        const { value, options, selectedIndex } = e.target;
        const label = options[selectedIndex].text;

        if (type === 'prov') {
            setSelectedProvince(value);
            setFormData((prev) => ({ ...prev, Address1_Region: label }));
        } else if (type === 'reg') {
            setSelectedRegency(value);
            setFormData((prev) => ({ ...prev, Address1_City: label }));
        } else if (type === 'dis') {
            setSelectedDistrict(value);
            setFormData((prev) => ({ ...prev, Address1_AddressLine2: label }));
        } else if (type === 'vil') {
            setSelectedVillage(value);
            setFormData((prev) => ({ ...prev, Address1_Village: label }));

            // Fetch Postal Code automatically
            try {
                const districtName = formData.Address1_AddressLine2 || "";
                const response = await fetch(`https://kodepos.vercel.app/search/?q=${label}`);
                const data = await response.json();
                if (data && data.data && data.data.length > 0) {
                    // Try to find the exact match for district if possible, else take first
                    const match = data.data.find((item: { subdistrict: string; urban: string; postalcode: string }) =>
                        item.subdistrict.toLowerCase().includes(districtName.toLowerCase()) ||
                        item.urban.toLowerCase() === label.toLowerCase()
                    ) || data.data[0];

                    setFormData((prev) => ({ ...prev, Address1_ZipCode: match.postalcode }));
                }
            } catch (err) {
                console.error("Gagal ambil kode pos", err);
            }
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Toggle "Lainnya" fields
        if (name === "Dropdown2") setOtherFields(p => ({ ...p, agama: value === "Lainnya" }));
        if (name === "Dropdown8") setOtherFields(p => ({ ...p, pendidikanAyah: value === "Lainnya" }));
        if (name === "Dropdown4") setOtherFields(p => ({ ...p, pekerjaanAyah: value === "Lainnya" }));
        if (name === "Dropdown9") setOtherFields(p => ({ ...p, pendidikanIbu: value === "Lainnya" }));
        if (name === "Dropdown5") setOtherFields(p => ({ ...p, pekerjaanIbu: value === "Lainnya" }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
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

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Prefill dengan email jika ada (tapi biasanya pendaftar baru tidak ada email di form awal, jadi kosongkan atau ambil dari data jika ada field email)
        setConfirmEmail("");
        setShowConfirmModal(true);
    };

    const executeSubmit = async () => {
        setIsLoading(true);
        setShowConfirmModal(false);

        const uploadData = new FormData();
        Object.keys(formData).forEach(key => {
            const value = formData[key];
            if (value !== undefined) {
                uploadData.append(key, value);
            }
        });
        // Tambahkan nomor konfirmasi Email
        uploadData.append('confirm_email', confirmEmail);

        try {
            const response = await fetch('/api/submit-registration', {
                method: 'POST',
                body: uploadData,
            });

            if (response.ok) {
                setIsSuccess(true);
                // Beri waktu lebih lama agar user bisa baca dan cek WA
                setTimeout(() => {
                    window.location.href = "/";
                }, 10000);
            } else {
                const err = await response.json();
                alert(err.message || "Terjadi kesalahan saat mengirim data.");
                setShowConfirmModal(false);
            }
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan jaringan.");
            setShowConfirmModal(false);
        } finally {
            setIsLoading(false);
        }
    };

    // Helper for Select Options
    const incomeOptions = [
        "< Rp 3.000.000",
        "Rp 3.000.000 - Rp 5.000.000",
        "Rp 5.000.000 - Rp 7.000.000",
        "Rp 7.000.000 - Rp 10.000.000",
        "> Rp 10.000.000"
    ];

    const educationOptions = ["SD/MI", "SMP/MTS", "SMA/MA", "S1 (Sarjana)", "S2 (Magister)", "S3 (Doctor)", "Lainnya"];
    const jobOptions = ["Wiraswasta", "Karyawan Swasta", "Pegawai Negeri Sipil", "Rumah Tangga", "Lainnya"];
    const religionOptions = ["Islam", "Protestan", "Katolik", "Hindu", "Buddha", "Konghucu", "Lainnya"];

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
                                {currentStep > step.id ? <i className="fas fa-check"></i> : <i className={`fas ${step.icon}`}></i>}
                            </div>
                            <span className="step-label-luxury">{step.title}</span>
                            {step.id < STEPS.length && <div className="step-line-luxury"></div>}
                        </div>
                    ))}
                </div>

                {/* USER LOGGED IN BADGE */}
                {session?.user && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginBottom: '1rem',
                        gap: '10px',
                        alignItems: 'center'
                    }}>
                        <div className="glass-card" style={{
                            padding: '0.5rem 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: 'white',
                            borderRadius: '50px',
                            border: '1px solid var(--primary-light)',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                        }}>
                            <Image 
                                src={session.user?.image || "https://res.cloudinary.com/dceamfy3n/image/upload/v1738424582/default-avatar.png"} 
                                alt="User" 
                                width={24} 
                                height={24} 
                                style={{ borderRadius: '50%' }} 
                            />
                            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{session.user?.name}</span>
                            <button 
                                onClick={() => signOut({ callbackUrl: "/" })}
                                style={{
                                    border: 'none',
                                    background: 'none',
                                    color: '#ef4444',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem',
                                    padding: '2px 5px',
                                    marginLeft: '5px'
                                }}
                            >
                                <i className="fas fa-sign-out-alt"></i> Logout
                            </button>
                        </div>
                    </div>
                )}

                {/* FORM CONTENT LUXE */}
                <form onSubmit={handleSubmit} className="form-card-luxury">

                    {/* STEP 1: DATA PRIBADI SANTRI */}
                    <div className={`step-content ${currentStep === 1 ? 'show' : 'hide'}`}>
                        <div className="step-header-luxury">
                            <div className="header-icon-box"><i className="fas fa-user-graduate"></i></div>
                            <div>
                                <h2>Data Pribadi Santri</h2>
                                <p>Isi identitas calon santri sesuai dengan Kartu Keluarga (KK).</p>
                            </div>
                        </div>

                        <div className="form-grid-luxury">
                            <div className="input-luxury">
                                <label>Nama Depan</label>
                                <input type="text" name="Name_First" placeholder="Nama Depan" onChange={handleInputChange} />
                            </div>
                            <div className="input-luxury">
                                <label>Nama Belakang</label>
                                <input type="text" name="Name_Last" placeholder="Nama Belakang" onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="form-grid-luxury">
                            <div className="input-luxury">
                                <label>NIK Santri</label>
                                <input type="text" name="Number" maxLength={16} placeholder="16 Digit NIK" onChange={handleInputChange} />
                            </div>
                            <div className="input-luxury">
                                <label>No. Kartu Keluarga</label>
                                <input type="text" name="Number1" maxLength={16} placeholder="16 Digit No. KK" onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="form-grid-luxury">
                            <div className="input-luxury">
                                <label>NISN *</label>
                                <input type="text" name="Number2" maxLength={10} placeholder="10 Digit NISN (jika ada)" onChange={handleInputChange} />
                            </div>
                            <div className="input-luxury">
                                <label>Jenis Kelamin</label>
                                <select name="Dropdown" onChange={handleInputChange}>
                                    <option value="">Pilih Jenis Kelamin</option>
                                    <option value="Laki-Laki">Laki-Laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-grid-luxury">
                            <div className="input-luxury">
                                <label>Tempat Lahir</label>
                                <input type="text" name="SingleLine2" placeholder="Kota Kelahiran" onChange={handleInputChange} />
                            </div>
                            <div className="input-luxury">
                                <label>Tanggal Lahir</label>
                                <input type="date" name="Date" onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="form-grid-luxury">
                            <div className="input-luxury">
                                <label>Agama</label>
                                <select name="Dropdown2" onChange={handleInputChange}>
                                    <option value="">Pilih Agama</option>
                                    {religionOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                                {otherFields.agama && (
                                    <input type="text" name="other_agama" placeholder="Sebutkan agama..." className="mt-2" />
                                )}
                            </div>
                            <div className="input-luxury">
                                <label>Pendidikan Terakhir</label>
                                <select name="Dropdown1" onChange={handleInputChange}>
                                    <option value="">Pilih Pendidikan</option>
                                    <option value="SD/MI">SD/MI</option>
                                    <option value="SMP/MTS">SMP/MTS</option>
                                    <option value="SMA/MA">SMA/MA</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* STEP 2: JENJANG & MINAT */}
                    <div className={`step-content ${currentStep === 2 ? 'show' : 'hide'}`}>
                        <div className="step-header-luxury">
                            <div className="header-icon-box"><i className="fas fa-school"></i></div>
                            <div>
                                <h2>Jenjang Pendidikan & Minat</h2>
                                <p>Pilih kelas yang akan dituju dan informasi minat santri.</p>
                            </div>
                        </div>

                        <div className="input-luxury">
                            <label>Akan Masuk Kelas</label>
                            <select name="Dropdown3" onChange={handleInputChange}>
                                <option value="">Pilih Jenjang/Kelas</option>
                                <optgroup label="MIU (Santri Sekolah Formal)">
                                    <option value="I Ula">I Ula</option>
                                    <option value="II Ula">II Ula</option>
                                    <option value="III Ula">III Ula</option>
                                    <option value="I Wustho">I Wustho</option>
                                    <option value="I Ulya">I Ulya</option>
                                </optgroup>
                                <optgroup label="MHM (Santri Salaf)">
                                    <option value="V Ibtida&apos;iyyah">V Ibtida&apos;iyyah</option>
                                    <option value="VI Ibtida&apos;iyyah">VI Ibtida&apos;iyyah</option>
                                    <option value="I Tsanawiyyah">I Tsanawiyyah</option>
                                    <option value="I Aliyyah">I Aliyyah</option>
                                    <option value="I Ma&apos;had Aly">I Ma&apos;had Aly</option>
                                    <option value="II Ma&apos;had Aly">II Ma&apos;had Aly</option>
                                </optgroup>
                            </select>
                        </div>

                        <div className="form-grid-luxury">
                            <div className="input-luxury">
                                <label>Hobi</label>
                                <input type="text" name="SingleLine" placeholder="Kegemaran" onChange={handleInputChange} />
                            </div>
                            <div className="input-luxury">
                                <label>Cita-Cita</label>
                                <input type="text" name="SingleLine1" placeholder="Tujuan Masa Depan" onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>

                    {/* STEP 3: DATA ORANG TUA / WALI */}
                    <div className={`step-content ${currentStep === 3 ? 'show' : 'hide'}`}>
                        <div className="step-header-luxury">
                            <div className="header-icon-box"><i className="fas fa-users"></i></div>
                            <div>
                                <h2>Data Orang Tua / Wali</h2>
                                <p>Informasi lengkap mengenai orang tua atau wali santri.</p>
                            </div>
                        </div>

                        {/* AYAH */}
                        <h3 className="section-label-gold">Data Ayah</h3>
                        <div className="form-grid-luxury">
                            <div className="input-luxury">
                                <label>Nama Depan Ayah</label>
                                <input type="text" name="Name1_First" placeholder="Nama Depan" onChange={handleInputChange} />
                            </div>
                            <div className="input-luxury">
                                <label>Nama Belakang Ayah</label>
                                <input type="text" name="Name1_Last" placeholder="Nama Belakang" onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="form-grid-luxury">
                            <div className="input-luxury">
                                <label>NIK Ayah</label>
                                <input type="text" name="Number3" maxLength={16} placeholder="16 Digit NIK" onChange={handleInputChange} />
                            </div>
                            <div className="input-luxury">
                                <label>No. HP/WA Ayah</label>
                                <input type="text" name="PhoneNumber_countrycode" placeholder="+62" onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="form-grid-luxury">
                            <div className="input-luxury">
                                <label>Pendidikan Ayah</label>
                                <select name="Dropdown8" onChange={handleInputChange}>
                                    <option value="">Pilih Pendidikan</option>
                                    {educationOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                                {otherFields.pendidikanAyah && <input type="text" name="other_pendidikan_ayah" placeholder="Sebutkan..." className="mt-2" />}
                            </div>
                            <div className="input-luxury">
                                <label>Pekerjaan Ayah</label>
                                <select name="Dropdown4" onChange={handleInputChange}>
                                    <option value="">Pilih Pekerjaan</option>
                                    {jobOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                                {otherFields.pekerjaanAyah && <input type="text" name="other_pekerjaan_ayah" placeholder="Sebutkan..." className="mt-2" />}
                            </div>
                        </div>
                        <div className="input-luxury">
                            <label>Penghasilan Ayah</label>
                            <select name="Dropdown6" onChange={handleInputChange}>
                                <option value="">Pilih Rentang Penghasilan</option>
                                {incomeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>

                        <div className="divider-h"></div>

                        {/* IBU */}
                        <h3 className="section-label-gold">Data Ibu</h3>
                        <div className="form-grid-luxury">
                            <div className="input-luxury">
                                <label>Nama Depan Ibu</label>
                                <input type="text" name="Name2_First" placeholder="Nama Depan" onChange={handleInputChange} />
                            </div>
                            <div className="input-luxury">
                                <label>Nama Belakang Ibu</label>
                                <input type="text" name="Name2_Last" placeholder="Nama Belakang" onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="form-grid-luxury">
                            <div className="input-luxury">
                                <label>NIK Ibu</label>
                                <input type="text" name="Number4" maxLength={16} placeholder="16 Digit NIK" onChange={handleInputChange} />
                            </div>
                            <div className="input-luxury">
                                <label>No. HP/WA Ibu</label>
                                <input type="text" name="PhoneNumber1_countrycode" placeholder="+62" onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="form-grid-luxury">
                            <div className="input-luxury">
                                <label>Pendidikan Ibu</label>
                                <select name="Dropdown9" onChange={handleInputChange}>
                                    <option value="">Pilih Pendidikan</option>
                                    {educationOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                                {otherFields.pendidikanIbu && <input type="text" name="other_pendidikan_ibu" placeholder="Sebutkan..." className="mt-2" />}
                            </div>
                            <div className="input-luxury">
                                <label>Pekerjaan Ibu</label>
                                <select name="Dropdown5" onChange={handleInputChange}>
                                    <option value="">Pilih Pekerjaan</option>
                                    {jobOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                                {otherFields.pekerjaanIbu && <input type="text" name="other_pekerjaan_ibu" placeholder="Sebutkan..." className="mt-2" />}
                            </div>
                        </div>
                        <div className="input-luxury">
                            <label>Penghasilan Ibu</label>
                            <select name="Dropdown7" onChange={handleInputChange}>
                                <option value="">Pilih Rentang Penghasilan</option>
                                {incomeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* STEP 4: ALAMAT LENGKAP */}
                    <div className={`step-content ${currentStep === 4 ? 'show' : 'hide'}`}>
                        <div className="step-header-luxury">
                            <div className="header-icon-box"><i className="fas fa-map-marker-alt"></i></div>
                            <div>
                                <h2>Alamat Domisili</h2>
                                <p>Alamat lengkap tempat tinggal wali santri.</p>
                            </div>
                        </div>

                        <div className="input-luxury">
                            <label>Jalan / Desa / RT & RW</label>
                            <input type="text" name="Address1_AddressLine1" placeholder="Nama Jalan, Nama Desa/Dusun, RT/RW" onChange={handleInputChange} />
                        </div>

                        <div className="form-grid-luxury">
                            <div className="input-luxury">
                                <label>Provinsi</label>
                                <select value={selectedProvince} onChange={(e) => handleRegionChange(e, 'prov')}>
                                    <option value="">Pilih Provinsi</option>
                                    {provinces.map(prov => (
                                        <option key={prov.id} value={prov.id}>{prov.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-luxury">
                                <label>Kota / Kabupaten</label>
                                <select value={selectedRegency} onChange={(e) => handleRegionChange(e, 'reg')} disabled={!selectedProvince}>
                                    <option value="">Pilih Kota/Kabupaten</option>
                                    {regencies.map(reg => (
                                        <option key={reg.id} value={reg.id}>{reg.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-grid-luxury">
                            <div className="input-luxury">
                                <label>Kecamatan</label>
                                <select value={selectedDistrict} onChange={(e) => handleRegionChange(e, 'dis')} disabled={!selectedRegency}>
                                    <option value="">Pilih Kecamatan</option>
                                    {districts.map(dis => (
                                        <option key={dis.id} value={dis.id}>{dis.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-luxury">
                                <label>Desa / Kelurahan</label>
                                <select value={selectedVillage} onChange={(e) => handleRegionChange(e, 'vil')} disabled={!selectedDistrict}>
                                    <option value="">Pilih Desa/Kelurahan</option>
                                    {villages.map(vil => (
                                        <option key={vil.id} value={vil.id}>{vil.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-grid-luxury">
                            <div className="input-luxury">
                                <label>Kode Pos</label>
                                <input
                                    type="text"
                                    name="Address1_ZipCode"
                                    placeholder="Otomatis terisi..."
                                    value={formData.Address1_ZipCode || ""}
                                    readOnly
                                    style={{ backgroundColor: '#f1f5f9', cursor: 'not-allowed' }}
                                />
                            </div>
                            <div className="input-luxury">
                                <label>Negara</label>
                                <select name="Address1_Country" disabled>
                                    <option value="Indonesia">Indonesia</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* STEP 5: BERKAS PENDUKUNG */}
                    <div className={`step-content ${currentStep === 5 ? 'show' : 'hide'}`}>
                        <div className="step-header-luxury">
                            <div className="header-icon-box"><i className="fas fa-file-upload"></i></div>
                            <div>
                                <h2>Berkas Pendukung</h2>
                                <p>Unggah dokumen yang diperlukan untuk verifikasi pendaftaran.</p>
                            </div>
                        </div>

                        <div className="form-grid-luxury">
                            <div className="input-luxury">
                                <label>Foto Santri (3x4)</label>
                                <div className="upload-box-luxury">
                                    <input type="file" name="FileUpload" accept="image/*" onChange={handleFileChange} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                                    <i className="fas fa-camera"></i>
                                    <p style={{ fontSize: '0.8rem' }}>{formData.FileUpload ? formData.FileUpload.name : "Klik untuk Pilih Foto"}</p>
                                </div>
                                <small className="text-muted">Berbaju putih, berkerah & berkopyah hitam.</small>
                            </div>
                            <div className="input-luxury">
                                <label>Scan Kartu Keluarga</label>
                                <div className="upload-box-luxury">
                                    <input type="file" name="FileUpload1" accept="image/*,application/pdf" onChange={handleFileChange} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                                    <i className="fas fa-id-card"></i>
                                    <p style={{ fontSize: '0.8rem' }}>{formData.FileUpload1 ? formData.FileUpload1.name : "Klik untuk Pilih KK"}</p>
                                </div>
                                <small className="text-muted">Terlihat jelas, tidak blur.</small>
                            </div>
                        </div>

                        <div className="input-luxury" style={{ marginTop: '1rem' }}>
                            <label>Scan Ijazah Terakhir</label>
                            <div className="upload-box-luxury">
                                <input type="file" name="FileUpload2" accept="image/*,application/pdf" onChange={handleFileChange} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                                <i className="fas fa-certificate"></i>
                                <p style={{ fontSize: '0.8rem' }}>{formData.FileUpload2 ? formData.FileUpload2.name : "Klik untuk Pilih Scan Ijazah"}</p>
                            </div>
                            <small className="text-muted">Terlihat jelas, tidak blur.</small>
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

            {/* WA CONFIRMATION MODAL */}
            {showConfirmModal && (
                <div className="modal-overlay">
                    <div className={`modal-luxury ${isSuccess ? 'success-pulse' : ''}`}>
                        {!isSuccess ? (
                            <>
                                <div className="modal-wa-icon" style={{ backgroundColor: '#1e3a8a' }}>
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <h3>Konfirmasi Email Bukti</h3>
                                <p>
                                    Pendaftaran Anda hampir selesai. Kami akan mengirimkan <b>File PDF Bukti Pendaftaran</b> resmi ke email Anda.
                                </p>

                                <div className="input-luxury">
                                    <label>Masukkan Email Penerima</label>
                                    <input
                                        type="email"
                                        className="input-wa-premium"
                                        value={confirmEmail}
                                        onChange={(e) => setConfirmEmail(e.target.value)}
                                        placeholder="contoh@email.com"
                                        autoFocus
                                        required
                                    />
                                </div>

                                <div className="modal-btns">
                                    <button
                                        type="button"
                                        className="btn-luxe btn-wa-confirm"
                                        style={{ backgroundColor: '#1e3a8a' }}
                                        onClick={executeSubmit}
                                        disabled={!confirmEmail || isLoading}
                                    >
                                        {isLoading ? <><i className="fas fa-spinner fa-spin"></i> Memproses...</> : "Konfirmasi & Kirim Bukti"}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn-luxe btn-luxe-secondary"
                                        onClick={() => setShowConfirmModal(false)}
                                        style={{ width: '100%', justifyContent: 'center' }}
                                        disabled={isLoading}
                                    >
                                        Periksa Kembali Data
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="success-state-luxe">
                                <div className="success-check-icon">
                                    <i className="fas fa-check-circle"></i>
                                </div>
                                <h3>Pendaftaran Berhasil!</h3>
                                <p>
                                    Terima kasih telah mendaftar. <br />
                                    <b>Bukti pendaftaran (PDF)</b> sedang dikirim otomatis ke email <b>{confirmEmail}</b>. Mohon cek inbox atau folder spam Anda.
                                </p>
                                <div className="loading-bar-container">
                                    <div className="loading-bar-fill" style={{ animationDuration: '10s' }}></div>
                                </div>
                                <p className="redirect-text">Mengalihkan ke halaman utama dalam 10 detik...</p>
                                <button
                                    type="button"
                                    className="btn-luxe btn-luxe-primary"
                                    onClick={() => window.location.href = "/"}
                                    style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}
                                >
                                    Selesai & Ke Beranda
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
