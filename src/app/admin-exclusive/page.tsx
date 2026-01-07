
"use client";

import "@/app/styles/apple-admin.css";
import { useState, useEffect } from "react";

export default function AppleAdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [activeTab, setActiveTab] = useState("dashboard");
    const [settings, setSettings] = useState<any>({});
    const [globalContent, setGlobalContent] = useState<any[]>([]);
    const [registrations, setRegistrations] = useState<any[]>([]);
    const [gallery, setGallery] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSantri, setSelectedSantri] = useState<any>(null);

    useEffect(() => {
        if (isLoggedIn) {
            fetchData();
        }
    }, [isLoggedIn]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [contentRes, santriRes] = await Promise.all([
                fetch("/api/content/all"),
                fetch("/api/get-santri")
            ]);

            const contentData = await contentRes.json();
            const santriData = await santriRes.json();

            setSettings(contentData.settings || {});
            const flattened = Object.values(contentData.content || {}).flat() as any[];
            setGlobalContent(flattened);
            setGallery(contentData.gallery || []);
            setRegistrations(santriData || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveSettings = async () => {
        setSaving(true);
        try {
            await fetch("/api/content/update-settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ settings })
            });
            alert("System metadata synchronized.");
        } catch (err) { alert("Sync failed."); }
        finally { setSaving(false); }
    };

    const handleUpdateGlobalItem = (id: number, field: string, value: any) => {
        setGlobalContent(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const handleSaveGlobal = async (slug: string) => {
        setSaving(true);
        const items = globalContent.filter(i => i.section_slug === slug);
        try {
            await fetch("/api/content/update-global", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items })
            });
            alert(`Section ${slug} updated.`);
        } catch (err) { alert("Update failed."); }
        finally { setSaving(false); }
    };

    const handleUpdateSantriStatus = async (id: number, status: string, catatan: string) => {
        setSaving(true);
        try {
            const res = await fetch("/api/manage-santri", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: 'update_status', id, status, catatan })
            });
            if (res.ok) {
                alert("Status updated.");
                fetchData();
                setSelectedSantri(null);
            }
        } catch (err) { alert("Action failed."); }
        finally { setSaving(false); }
    };

    const handleDeleteSantri = async (id: number) => {
        if (!confirm("Permanent delete? This cannot be undone.")) return;
        setSaving(true);
        try {
            await fetch("/api/manage-santri", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: 'delete', id })
            });
            fetchData();
        } catch (err) { alert("Delete failed."); }
        finally { setSaving(false); }
    };

    const filteredSantri = registrations.filter(s =>
        s.nama_depan?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.nik?.includes(searchQuery)
    );

    if (!isLoggedIn) {
        return (
            <div className="apple-admin-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="apple-card" style={{ width: '400px', textAlign: 'center', padding: '3rem' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <img
                            src="https://res.cloudinary.com/dceamfy3n/image/upload/v1766596001/logo_zdenyr.png"
                            alt="Logo"
                            style={{ width: '80px', height: 'auto', margin: '0 auto' }}
                        />
                    </div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>Management Portal</h2>
                    <p style={{ color: 'var(--apple-text-secondary)', marginBottom: '2rem' }}>Authenticate to access system controls.</p>
                    <input
                        type="password"
                        className="apple-input"
                        placeholder="System Password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && passwordInput === 'sekretary25' && setIsLoggedIn(true)}
                        style={{ marginBottom: '1.2rem', textAlign: 'center' }}
                    />
                    <button className="apple-btn-primary" style={{ width: '100%' }} onClick={() => passwordInput === 'sekretary25' && setIsLoggedIn(true)}>
                        Unlock System
                    </button>
                    <div style={{ marginTop: '2rem', fontSize: '0.75rem', color: 'var(--apple-text-secondary)' }}>
                        <i className="fas fa-lock"></i> Secured Layer Active
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="apple-admin-body">
            {/* Sidebar */}
            <aside className="apple-sidebar">
                <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                        src="https://res.cloudinary.com/dceamfy3n/image/upload/v1766596001/logo_zdenyr.png"
                        alt="Logo"
                        style={{ width: '45px', height: 'auto' }}
                    />
                    <span style={{ letterSpacing: '-0.03em' }}>Console</span>
                </div>

                <nav style={{ flex: 1 }}>
                    <a href="#" className={`apple-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
                        <i className="fas fa-chart-pie"></i> <span className="apple-nav-text">Overview</span>
                    </a>
                    <a href="#" className={`apple-nav-item ${activeTab === 'registrations' ? 'active' : ''}`} onClick={() => setActiveTab('registrations')}>
                        <i className="fas fa-users"></i> <span className="apple-nav-text">Registrar</span>
                    </a>
                    <a href="#" className={`apple-nav-item ${activeTab === 'general' ? 'active' : ''}`} onClick={() => setActiveTab('general')}>
                        <i className="fas fa-cog"></i> <span className="apple-nav-text">Settings</span>
                    </a>
                    <a href="#" className={`apple-nav-item ${activeTab === 'content' ? 'active' : ''}`} onClick={() => setActiveTab('content')}>
                        <i className="fas fa-feather"></i> <span className="apple-nav-text">Content</span>
                    </a>
                    <a href="#" className={`apple-nav-item ${activeTab === 'curriculum' ? 'active' : ''}`} onClick={() => setActiveTab('curriculum')}>
                        <i className="fas fa-graduation-cap"></i> <span className="apple-nav-text">Curriculum</span>
                    </a>
                    <a href="#" className={`apple-nav-item ${activeTab === 'gallery' ? 'active' : ''}`} onClick={() => setActiveTab('gallery')}>
                        <i className="fas fa-images"></i> <span className="apple-nav-text">Media Hub</span>
                    </a>
                    <a href="#" className={`apple-nav-item ${activeTab === 'finance' ? 'active' : ''}`} onClick={() => setActiveTab('finance')}>
                        <i className="fas fa-credit-card"></i> <span className="apple-nav-text">Financial Hub</span>
                    </a>
                </nav>

                <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '20px' }}>
                    <a href="/" className="apple-nav-item">
                        <i className="fas fa-globe"></i> <span className="apple-nav-text">Public Site</span>
                    </a>
                    <button onClick={() => setIsLoggedIn(false)} className="apple-nav-item" style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left' }}>
                        <i className="fas fa-sign-out-alt"></i> <span className="apple-nav-text">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="apple-main-content">
                <header className="apple-header">
                    <div>
                        <p style={{ color: 'var(--apple-text-secondary)', marginBottom: '4px', fontWeight: 500, fontSize: '0.9rem' }}>Secure Admin Console</p>
                        <h1 className="apple-title-large">System Control</h1>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="apple-btn-primary" style={{ background: 'white', color: 'black', border: '1px solid #ddd' }} onClick={fetchData}>
                            <i className="fas fa-sync-alt"></i>
                        </button>
                    </div>
                </header>

                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
                        <i className="fas fa-spinner fa-spin fa-2x" style={{ color: 'var(--apple-blue)' }}></i>
                    </div>
                ) : (
                    <>
                        {activeTab === 'dashboard' && (
                            <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                                <div className="apple-card">
                                    <h3 style={{ marginBottom: '20px', fontWeight: 700 }}>Registration Stats</h3>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>{registrations.length}</div>
                                            <div style={{ color: 'var(--apple-text-secondary)', fontSize: '0.9rem' }}>Total Applicants</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ color: '#34c759', fontWeight: 700 }}>{registrations.filter(r => r.status === 'Terverifikasi').length} Verified</div>
                                            <div style={{ color: '#ff9500', fontWeight: 700 }}>{registrations.filter(r => r.status === 'Pending').length} Pending</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="apple-card" style={{ background: 'var(--apple-blue)', color: 'white' }}>
                                    <h3 style={{ marginBottom: '15px', fontWeight: 700 }}>System Integrity</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <i className="fas fa-shield-alt fa-2x"></i>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>All Systems Nominal</div>
                                            <div style={{ opacity: 0.8, fontSize: '0.85rem' }}>Cloudflare D1 + KV + Images</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'registrations' && (
                            <div className="apple-card" style={{ padding: '0' }}>
                                <div style={{ padding: '24px', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Registrar Hub</h2>
                                    <input
                                        className="apple-input"
                                        style={{ width: '300px', padding: '10px 15px' }}
                                        placeholder="Search by name or NIK..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div className="apple-table-container">
                                    <table className="apple-table">
                                        <thead>
                                            <tr>
                                                <th style={{ paddingLeft: '24px' }}>Name</th>
                                                <th>Niche/Level</th>
                                                <th>Origin</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredSantri.map(s => (
                                                <tr key={s.id}>
                                                    <td style={{ paddingLeft: '24px' }}>
                                                        <div style={{ fontWeight: 700 }}>{s.nama_depan} {s.nama_belakang}</div>
                                                        <div style={{ fontSize: '0.75rem', color: 'var(--apple-text-secondary)' }}>NIK: {s.nik}</div>
                                                    </td>
                                                    <td>{s.jenjang_kelas}</td>
                                                    <td>{s.alamat_kota}</td>
                                                    <td>
                                                        <span className={`apple-badge ${s.status === 'Terverifikasi' ? 'badge-blue' : 'badge-gray'}`} style={{
                                                            background: s.status === 'Terverifikasi' ? 'rgba(52, 199, 89, 0.1)' : s.status === 'Ditolak' ? 'rgba(255, 59, 48, 0.1)' : 'rgba(255, 149, 0, 0.1)',
                                                            color: s.status === 'Terverifikasi' ? '#34c759' : s.status === 'Ditolak' ? '#ff3b30' : '#ff9500'
                                                        }}>
                                                            {s.status || 'Pending'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button onClick={() => setSelectedSantri(s)} className="apple-btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: '8px' }}>Manage</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'general' && (
                            <div className="apple-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' }}>
                                    <h2 style={{ fontSize: '1.6rem', fontWeight: 700 }}>System Configuration</h2>
                                    <button className="apple-btn-primary" onClick={handleSaveSettings} disabled={saving}>
                                        {saving ? <i className="fas fa-spinner fa-spin"></i> : "Synchronize"}
                                    </button>
                                </div>

                                <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
                                    <div>
                                        <label className="apple-label">Institutional Contacts</label>
                                        <div className="apple-input-group">
                                            <input className="apple-input" placeholder="WhatsApp Hub" value={settings.whatsapp_number || ""} onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })} />
                                        </div>
                                        <div className="apple-input-group">
                                            <input className="apple-input" placeholder="Academic Target" value={settings.ta_info || ""} onChange={(e) => setSettings({ ...settings, ta_info: e.target.value })} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="apple-label">Search Engine Optimization (SEO)</label>
                                        <div className="apple-input-group">
                                            <input className="apple-input" placeholder="Global Meta Title" value={settings.meta_title || ""} onChange={(e) => setSettings({ ...settings, meta_title: e.target.value })} />
                                        </div>
                                        <div className="apple-input-group">
                                            <textarea className="apple-input" placeholder="Meta Description" rows={2} value={settings.meta_description || ""} onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })} />
                                        </div>
                                    </div>
                                </div>

                                <label className="apple-label">Hero Experience</label>
                                <div className="apple-input-group">
                                    <input className="apple-input" placeholder="Title Primary" value={settings.hero_title || ""} onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })} />
                                </div>
                                <div className="apple-input-group" style={{ marginTop: '10px' }}>
                                    <input className="apple-input" placeholder="Title Gradient" value={settings.hero_title_gradient || ""} onChange={(e) => setSettings({ ...settings, hero_title_gradient: e.target.value })} />
                                </div>
                                <div className="apple-input-group">
                                    <textarea className="apple-input" placeholder="System Subtitle" rows={2} value={settings.hero_subtitle || ""} onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })} />
                                </div>
                            </div>
                        )}

                        {activeTab === 'content' && (
                            <div className="apple-card" style={{ padding: '0', overflow: 'hidden' }}>
                                <div style={{ padding: '24px', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Dynamic Assets</h2>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--apple-text-secondary)', marginTop: '4px' }}>Global list items and descriptors.</p>
                                    </div>
                                </div>
                                <div className="apple-table-container">
                                    <table className="apple-table">
                                        <thead>
                                            <tr>
                                                <th style={{ paddingLeft: '24px' }}>Block</th>
                                                <th>Content Label</th>
                                                <th>Icon Asset</th>
                                                <th style={{ textAlign: 'center' }}>Live Preview</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {globalContent
                                                .filter(item => !item.section_slug.includes('pembayaran') && !item.section_slug.includes('biaya'))
                                                .map((item, idx) => (
                                                    <tr key={item.id || idx}>
                                                        <td style={{ paddingLeft: '24px' }}>
                                                            <span className="apple-badge badge-gray" style={{ fontSize: '0.7rem' }}>{item.section_slug}</span>
                                                        </td>
                                                        <td>
                                                            <input className="apple-input" style={{ padding: '8px 12px', fontSize: '0.9rem', width: '250px' }} value={item.label} onChange={(e) => handleUpdateGlobalItem(item.id, 'label', e.target.value)} />
                                                        </td>
                                                        <td>
                                                            <input className="apple-input" style={{ padding: '8px 12px', fontSize: '0.9rem', width: '150px' }} value={item.icon || ""} onChange={(e) => handleUpdateGlobalItem(item.id, 'icon', e.target.value)} />
                                                        </td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <div style={{ width: '35px', height: '35px', borderRadius: '8px', background: '#f5f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                                                                <i className={item.icon || "fas fa-circle"} style={{ color: 'var(--apple-blue)' }}></i>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <button onClick={() => handleSaveGlobal(item.section_slug)} className="apple-btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: '8px' }}>Sync</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'gallery' && (
                            <div className="apple-card">
                                <h2 style={{ marginBottom: '20px' }}>Media Vault</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                                    {gallery.map(item => (
                                        <div key={item.id} className="apple-card" style={{ padding: '10px', margin: 0 }}>
                                            <div style={{ width: '100%', height: '120px', borderRadius: '10px', overflow: 'hidden', marginBottom: '10px' }}>
                                                <img src={item.image_url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                            <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{item.category}</div>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--apple-text-secondary)' }}>Index: {item.order_index}</div>
                                        </div>
                                    ))}
                                    <div className="apple-card" style={{ padding: '10px', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #ddd', cursor: 'pointer' }}>
                                        <i className="fas fa-plus fa-2x" style={{ color: '#ddd' }}></i>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'curriculum' && (
                            <div className="apple-card">
                                <h2 style={{ marginBottom: '20px' }}>Curriculum Center</h2>
                                <p style={{ color: 'var(--apple-text-secondary)', marginBottom: '30px' }}>Management of entrance exams and study materials.</p>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                                    <div className="apple-card" style={{ background: '#f5f5f7', border: 'none' }}>
                                        <i className="fas fa-book-open fa-2x" style={{ color: 'var(--apple-blue)', marginBottom: '15px' }}></i>
                                        <h4 style={{ fontWeight: 700 }}>Madrasah Diniyah</h4>
                                        <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Manage Ula, Wustho, and Ulya materials.</p>
                                    </div>
                                    <div className="apple-card" style={{ background: '#f5f5f7', border: 'none' }}>
                                        <i className="fas fa-quran fa-2x" style={{ color: '#34c759', marginBottom: '15px' }}></i>
                                        <h4 style={{ fontWeight: 700 }}>Tahfidz Program</h4>
                                        <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Manage Qur'an testing requirements.</p>
                                    </div>
                                    <div className="apple-card" style={{ background: '#f5f5f7', border: '2px dashed #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ color: '#999', fontSize: '0.9rem' }}>+ Add New Category</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'finance' && (
                            <div>
                                {['pembayaran-tahunan-baru', 'pembayaran-tahunan-lama', 'pembayaran-bulanan'].map(slug => (
                                    <div key={slug} className="apple-card" style={{ marginBottom: '30px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                            <h3 style={{ textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '0.1em', color: 'var(--apple-text-secondary)' }}>
                                                {slug.replace(/-/g, ' ')}
                                            </h3>
                                            <button className="apple-btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }} onClick={() => handleSaveGlobal(slug)}>Sync</button>
                                        </div>
                                        <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
                                            {globalContent.filter(i => i.section_slug === slug).map(item => (
                                                <div key={item.id} style={{ background: 'white', padding: '15px', borderRadius: '15px', border: '1px solid rgba(0,0,0,0.03)' }}>
                                                    <label className="apple-label" style={{ fontSize: '0.7rem' }}>{item.label}</label>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '5px' }}>
                                                        <span style={{ fontWeight: 600, color: 'var(--apple-text-secondary)', fontSize: '1rem' }}>Rp</span>
                                                        <input className="apple-input" style={{ border: 'none', padding: '0', fontSize: '1.2rem', fontWeight: 700 }} value={item.amount || "0"} onChange={(e) => handleUpdateGlobalItem(item.id, 'amount', e.target.value)} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* Registration Detail Modal */}
                {selectedSantri && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                        <div className="apple-card" style={{ width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
                            <button onClick={() => setSelectedSantri(null)} style={{ position: 'absolute', top: '20px', right: '20px', border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>

                            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '5px' }}>Registration Summary</h2>
                            <p style={{ color: 'var(--apple-text-secondary)', marginBottom: '30px' }}>Review applicant credentials and verify files.</p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '40px' }}>
                                <div>
                                    <section style={{ marginBottom: '30px' }}>
                                        <h4 className="apple-label" style={{ color: 'var(--apple-blue)', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Personal Profile</h4>
                                        <DetailRow label="Full Name" value={`${selectedSantri.nama_depan} ${selectedSantri.nama_belakang}`} />
                                        <DetailRow label="NIK / NISN" value={`${selectedSantri.nik} / ${selectedSantri.nisn}`} />
                                        <DetailRow label="Gender / Religion" value={`${selectedSantri.jenis_kelamin} / ${selectedSantri.agama}`} />
                                        <DetailRow label="Origin" value={`${selectedSantri.alamat_kota}, ${selectedSantri.alamat_provinsi}`} />
                                    </section>

                                    <section>
                                        <h4 className="apple-label" style={{ color: 'var(--apple-blue)', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Parental Info</h4>
                                        <DetailRow label="Father" value={selectedSantri.nama_ayah_depan} />
                                        <DetailRow label="Mother" value={selectedSantri.nama_ibu_depan} />
                                    </section>
                                </div>

                                <div>
                                    <div className="apple-card" style={{ background: '#f5f5f7', border: 'none' }}>
                                        <h4 className="apple-label">System Control</h4>
                                        <div className="apple-input-group">
                                            <label className="apple-label" style={{ fontSize: '0.65rem' }}>Update Status</label>
                                            <select
                                                className="apple-input"
                                                style={{ fontSize: '0.9rem' }}
                                                value={selectedSantri.status}
                                                onChange={(e) => handleUpdateSantriStatus(selectedSantri.id, e.target.value, selectedSantri.catatan_admin)}
                                            >
                                                <option value="Pending">Pending Audit</option>
                                                <option value="Terverifikasi">Verified / Admitted</option>
                                                <option value="Ditolak">Rejected</option>
                                            </select>
                                        </div>
                                        <div className="apple-input-group">
                                            <label className="apple-label" style={{ fontSize: '0.65rem' }}>Admin Notes</label>
                                            <textarea
                                                className="apple-input"
                                                rows={3}
                                                placeholder="Enter review notes..."
                                                value={selectedSantri.catatan_admin || ""}
                                                onChange={(e) => setSelectedSantri({ ...selectedSantri, catatan_admin: e.target.value })}
                                            />
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button className="apple-btn-primary" style={{ flex: 1 }} onClick={() => handleUpdateSantriStatus(selectedSantri.id, selectedSantri.status, selectedSantri.catatan_admin)}>Save</button>
                                            <button className="apple-btn-primary" style={{ background: '#ff3b30' }} onClick={() => handleDeleteSantri(selectedSantri.id)}><i className="fas fa-trash"></i></button>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '20px' }}>
                                        <h4 className="apple-label">Documents</h4>
                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                            {selectedSantri.foto_santri && <DocumentBadge label="Photo" url={selectedSantri.foto_santri} />}
                                            {selectedSantri.scan_kk && <DocumentBadge label="KK" url={selectedSantri.scan_kk} />}
                                            {selectedSantri.scan_ijazah && <DocumentBadge label="Diploma" url={selectedSantri.scan_ijazah} />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <footer style={{ marginTop: '60px', paddingBottom: '40px', textAlign: 'center', color: 'var(--apple-text-secondary)', fontSize: '0.85rem' }}>
                    &copy; 2026 PP. Darussalam Lirboyo Management Console. All rights reserved.
                </footer>
            </main>
        </div>
    );
}

function DetailRow({ label, value }: { label: string, value: string }) {
    return (
        <div style={{ margin: '12px 0', display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
            <span style={{ color: 'var(--apple-text-secondary)' }}>{label}</span>
            <span style={{ fontWeight: 600 }}>{value || '-'}</span>
        </div>
    );
}

function DocumentBadge({ label, url }: { label: string, url: string }) {
    return (
        <a href={url} target="_blank" className="apple-badge badge-blue" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <i className="fas fa-file-alt"></i> {label}
        </a>
    );
}
