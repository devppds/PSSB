
"use client";

import "@/app/styles/admin-content.css";
import { useState, useEffect } from "react";

export default function AdminContentPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [loginError, setLoginError] = useState(false);

    const [activeTab, setActiveTab] = useState("settings");
    const [settings, setSettings] = useState<any>({});
    const [globalContent, setGlobalContent] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleLogin = () => {
        if (passwordInput === "sekretary25") {
            setIsLoggedIn(true);
            setLoginError(false);
        } else {
            setLoginError(true);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchData();
        }
    }, [isLoggedIn]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/content/all");
            const data = await res.json();
            setSettings(data.settings || {});
            // Flatten global content for editing
            const flattened = Object.values(data.content || {}).flat() as any[];
            setGlobalContent(flattened);
        } catch (err) {
            console.error("Gagal ambil data", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveSettings = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/content/update-settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ settings })
            });
            if (res.ok) alert("Pengaturan Berhasil Disimpan!");
            else throw new Error("Gagal simpan settings");
        } catch (error: any) {
            alert(error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleUpdateGlobalItem = (id: number, field: string, value: any) => {
        setGlobalContent(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const handleSaveGlobal = async (sectionSlug?: string) => {
        setSaving(true);
        const itemsToSave = sectionSlug
            ? globalContent.filter(item => item.section_slug === sectionSlug)
            : globalContent;

        try {
            const res = await fetch("/api/content/update-global", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: itemsToSave })
            });
            if (res.ok) alert("Konten Berhasil Diperbarui!");
            else throw new Error("Gagal perbarui konten");
        } catch (error: any) {
            alert(error.message);
        } finally {
            setSaving(false);
        }
    };

    if (!isLoggedIn) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f4f8' }}>
                <div style={{ background: 'white', padding: '2.5rem', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                    <h2 style={{ color: '#1e3a8a', marginBottom: '1rem' }}>Manajemen Konten</h2>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Masukkan kode akses untuk mengelola konten website</p>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Kode Akses"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                        style={{ marginBottom: '1rem' }}
                    />
                    <button onClick={handleLogin} className="save-btn" style={{ width: '100%', justifyContent: 'center' }}>BUKA EDITOR</button>
                    {loginError && <p style={{ color: "red", marginTop: "10px", fontSize: "0.9rem" }}>Kode Salah!</p>}
                </div>
            </div>
        );
    }

    return (
        <div className="admin-container">
            <header className="admin-header">
                <div className="admin-title">
                    <h1>Sistem Manajemen Konten</h1>
                    <p style={{ color: 'var(--admin-text-light)' }}>Update teks dan informasi website secara real-time</p>
                </div>
                <button className="save-btn" onClick={() => window.location.href = '/data-santri'} style={{ background: 'var(--admin-accent)' }}>
                    <i className="fas fa-users"></i> Data Santri
                </button>
            </header>

            <div className="admin-tabs">
                <button className={`admin-tab-btn ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
                    <i className="fas fa-cog"></i> Pengaturan Umum
                </button>
                <button className={`admin-tab-btn ${activeTab === 'pages' ? 'active' : ''}`} onClick={() => setActiveTab('pages')}>
                    <i className="fas fa-file-alt"></i> Konten Halaman
                </button>
                <button className={`admin-tab-btn ${activeTab === 'payments' ? 'active' : ''}`} onClick={() => setActiveTab('payments')}>
                    <i className="fas fa-money-bill-wave"></i> Rincian Biaya
                </button>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '5rem' }}>
                    <i className="fas fa-spinner fa-spin fa-3x" style={{ color: 'var(--admin-primary)' }}></i>
                    <p>Memuat Data...</p>
                </div>
            ) : (
                <div className="admin-card">
                    {activeTab === 'settings' && (
                        <div>
                            <h2 style={{ marginBottom: '1.5rem', color: 'var(--admin-primary)' }}>Hero & Teks Beranda</h2>
                            <div className="grid-2">
                                <div className="form-group">
                                    <label>Judul Hero (Baris 1)</label>
                                    <input className="form-control" value={settings.hero_title || ""} onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Judul Hero - Gradient (Baris 2)</label>
                                    <input className="form-control" value={settings.hero_title_gradient || ""} onChange={(e) => setSettings({ ...settings, hero_title_gradient: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Subtitle Hero</label>
                                <textarea className="form-control" rows={2} value={settings.hero_subtitle || ""} onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })} />
                            </div>

                            <hr style={{ margin: '2rem 0', opacity: 0.1 }} />

                            <h2 style={{ marginBottom: '1.5rem', color: 'var(--admin-primary)' }}>Informasi PPDB</h2>
                            <div className="grid-2">
                                <div className="form-group">
                                    <label>WhatsApp Center</label>
                                    <input className="form-control" value={settings.whatsapp_number || ""} onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Tahun Ajaran</label>
                                    <input className="form-control" value={settings.ta_info || ""} onChange={(e) => setSettings({ ...settings, ta_info: e.target.value })} />
                                </div>
                            </div>

                            <h2 style={{ marginBottom: '1.5rem', color: 'var(--admin-primary)', marginTop: '2rem' }}>Visi & Sejarah</h2>
                            <div className="form-group">
                                <label>Teks Visi</label>
                                <textarea className="form-control" rows={2} value={settings.visi_text || ""} onChange={(e) => setSettings({ ...settings, visi_text: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Sejarah Singkat</label>
                                <textarea className="form-control" rows={5} value={settings.about_history || ""} onChange={(e) => setSettings({ ...settings, about_history: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>URL Video Profil (YouTube Embed)</label>
                                <input className="form-control" value={settings.video_url || ""} onChange={(e) => setSettings({ ...settings, video_url: e.target.value })} />
                            </div>

                            <button className="save-btn" onClick={handleSaveSettings} disabled={saving}>
                                {saving ? <><i className="fas fa-spinner fa-spin"></i> Menyimpan...</> : <><i className="fas fa-save"></i> Simpan Pengaturan</>}
                            </button>
                        </div>
                    )}

                    {activeTab === 'pages' && (
                        <div>
                            <h2 style={{ marginBottom: '1.5rem', color: 'var(--admin-primary)' }}>List Konten (Misi, Program, Ekskul)</h2>
                            <p style={{ color: 'var(--admin-text-light)', marginBottom: '2rem' }}>Edit item-item list yang muncul di berbagai bagian halaman.</p>

                            {['misi', 'program-unggulan', 'program-tambahan', 'ekskul', 'alur', 'syarat-foto'].map(slug => (
                                <section key={slug} style={{ marginBottom: '3rem', padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h3 style={{ textTransform: 'capitalize' }}>{slug.replace('-', ' ')}</h3>
                                        <button className="save-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={() => handleSaveGlobal(slug)}>
                                            Update {slug}
                                        </button>
                                    </div>
                                    <div className="grid-1" style={{ gap: '1rem' }}>
                                        {globalContent.filter(item => item.section_slug === slug).map((item) => (
                                            <div key={item.id} className="glass-card" style={{ padding: '1rem', background: '#f8fafc' }}>
                                                <div className="grid-2" style={{ gap: '10px' }}>
                                                    <input className="form-control" placeholder="Label" value={item.label || ""} onChange={(e) => handleUpdateGlobalItem(item.id, 'label', e.target.value)} />
                                                    <input className="form-control" placeholder="Icon (fa-...)" value={item.icon || ""} onChange={(e) => handleUpdateGlobalItem(item.id, 'icon', e.target.value)} />
                                                </div>
                                                {slug.includes('program') || slug === 'alur' ? (
                                                    <textarea className="form-control" style={{ marginTop: '10px' }} placeholder="Deskripsi" rows={2} value={item.description || ""} onChange={(e) => handleUpdateGlobalItem(item.id, 'description', e.target.value)} />
                                                ) : null}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    )}

                    {activeTab === 'payments' && (
                        <div>
                            <h2 style={{ marginBottom: '1.5rem', color: 'var(--admin-primary)' }}>Rincian Biaya & Ketentuan</h2>
                            {['pembayaran-tahunan-baru', 'pembayaran-tahunan-lama', 'pembayaran-bulanan'].map(slug => (
                                <section key={slug} style={{ marginBottom: '2rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <h3 style={{ fontSize: '1.1rem' }}>{slug.replace(/-/g, ' ').toUpperCase()}</h3>
                                        <button className="save-btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }} onClick={() => handleSaveGlobal(slug)}>Simpan</button>
                                    </div>
                                    <div className="table-container">
                                        <table className="data-table" style={{ fontSize: '0.9rem' }}>
                                            <thead>
                                                <tr>
                                                    <th>Label</th>
                                                    <th style={{ width: '150px' }}>Nominal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {globalContent.filter(item => item.section_slug === slug).map(item => (
                                                    <tr key={item.id}>
                                                        <td><input className="form-control" style={{ padding: '5px' }} value={item.label || ""} onChange={(e) => handleUpdateGlobalItem(item.id, 'label', e.target.value)} /></td>
                                                        <td><input className="form-control" style={{ padding: '5px' }} value={item.amount || ""} onChange={(e) => handleUpdateGlobalItem(item.id, 'amount', e.target.value)} /></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </section>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
