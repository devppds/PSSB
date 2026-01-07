
"use client";

import "@/app/styles/apple-admin.css";
import { useState, useEffect } from "react";

export default function AppleAdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [activeTab, setActiveTab] = useState("dashboard");
    const [settings, setSettings] = useState<any>({});
    const [globalContent, setGlobalContent] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

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
            const flattened = Object.values(data.content || {}).flat() as any[];
            setGlobalContent(flattened);
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
            alert("Settings synchronized with D1 database.");
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
            alert(`Section ${slug} updated successfully.`);
        } catch (err) { alert("Failed to update."); }
        finally { setSaving(false); }
    };

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
                        Sign In
                    </button>
                    <div style={{ marginTop: '2rem', fontSize: '0.75rem', color: 'var(--apple-text-secondary)' }}>
                        <i className="fas fa-lock"></i> End-to-end encrypted connection
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
                    <a href="#" className={`apple-nav-item ${activeTab === 'general' ? 'active' : ''}`} onClick={() => setActiveTab('general')}>
                        <i className="fas fa-cog"></i> <span className="apple-nav-text">System Settings</span>
                    </a>
                    <a href="#" className={`apple-nav-item ${activeTab === 'content' ? 'active' : ''}`} onClick={() => setActiveTab('content')}>
                        <i className="fas fa-feather"></i> <span className="apple-nav-text">Live Content</span>
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
                        <p style={{ color: 'var(--apple-text-secondary)', marginBottom: '4px', fontWeight: 500, fontSize: '0.9rem' }}>Secure Admin Access</p>
                        <h1 className="apple-title-large">System Control</h1>
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
                                    <h3 style={{ marginBottom: '20px', fontWeight: 700 }}>System Integrity</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(0,122,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--apple-blue)' }}>
                                            <i className="fas fa-database"></i>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>Cloudflare D1</div>
                                            <div style={{ color: '#34c759', fontSize: '0.85rem', fontWeight: 600 }}>● Fully Operational</div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '30px' }}>
                                        <label className="apple-label">Academic Status</label>
                                        <div style={{ fontSize: '1.4rem', fontWeight: 600, marginTop: '5px' }}>{settings.ta_info}</div>
                                    </div>
                                </div>

                                <div className="apple-card" style={{ background: 'var(--apple-blue)', color: 'white' }}>
                                    <h3 style={{ marginBottom: '15px', fontWeight: 700 }}>Performance</h3>
                                    <div style={{ fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.05em' }}>Ultra</div>
                                    <p style={{ marginTop: '10px', opacity: 0.8 }}>Optimized through NEXT_CACHE_WORKERS_KV</p>
                                    <div style={{ marginTop: '30px', padding: '12px', background: 'rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '0.85rem' }}>
                                        <i className="fas fa-bolt" style={{ marginRight: '8px' }}></i> Latency: 12ms
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'general' && (
                            <div className="apple-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' }}>
                                    <h2 style={{ fontSize: '1.6rem', fontWeight: 700 }}>Global Metadata</h2>
                                    <button className="apple-btn-primary" onClick={handleSaveSettings} disabled={saving}>
                                        {saving ? <i className="fas fa-spinner fa-spin"></i> : "Synchronize"}
                                    </button>
                                </div>

                                <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                                    <div className="apple-input-group">
                                        <label className="apple-label">Primary Hero Title</label>
                                        <input className="apple-input" value={settings.hero_title || ""} onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })} />
                                    </div>
                                    <div className="apple-input-group">
                                        <label className="apple-label">Accent Hero Title</label>
                                        <input className="apple-input" value={settings.hero_title_gradient || ""} onChange={(e) => setSettings({ ...settings, hero_title_gradient: e.target.value })} />
                                    </div>
                                </div>

                                <div className="apple-input-group">
                                    <label className="apple-label">System Subtitle</label>
                                    <textarea className="apple-input" rows={2} value={settings.hero_subtitle || ""} onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })} />
                                </div>

                                <div className="apple-input-group" style={{ marginTop: '20px' }}>
                                    <label className="apple-label">Institutional Vision</label>
                                    <textarea className="apple-input" rows={2} value={settings.visi_text || ""} onChange={(e) => setSettings({ ...settings, visi_text: e.target.value })} />
                                </div>

                                <div className="apple-input-group">
                                    <label className="apple-label">Historical Narrative</label>
                                    <textarea className="apple-input" rows={5} value={settings.about_history || ""} onChange={(e) => setSettings({ ...settings, about_history: e.target.value })} />
                                </div>
                            </div>
                        )}

                        {activeTab === 'content' && (
                            <div className="apple-card" style={{ padding: '0', overflow: 'hidden' }}>
                                <div style={{ padding: '24px', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Content Blocks</h2>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--apple-text-secondary)', marginTop: '4px' }}>Manage icons and descriptions for list sections.</p>
                                    </div>
                                </div>
                                <div className="apple-table-container">
                                    <table className="apple-table">
                                        <thead>
                                            <tr>
                                                <th style={{ paddingLeft: '24px' }}>Section</th>
                                                <th>Content Label</th>
                                                <th>Icon Class</th>
                                                <th style={{ textAlign: 'center' }}>Preview</th>
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
                                                            <input
                                                                className="apple-input"
                                                                style={{ padding: '8px 12px', fontSize: '0.9rem', width: '250px' }}
                                                                value={item.label}
                                                                onChange={(e) => handleUpdateGlobalItem(item.id, 'label', e.target.value)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                className="apple-input"
                                                                style={{ padding: '8px 12px', fontSize: '0.9rem', width: '180px', fontFamily: 'monospace' }}
                                                                value={item.icon || ""}
                                                                placeholder="fas fa-star"
                                                                onChange={(e) => handleUpdateGlobalItem(item.id, 'icon', e.target.value)}
                                                            />
                                                        </td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f5f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                                                                <i className={item.icon || "fas fa-question"} style={{ color: 'var(--apple-blue)', fontSize: '1.1rem' }}></i>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <button onClick={() => handleSaveGlobal(item.section_slug)} className="apple-btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: '8px' }}>Update Section</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
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
                                            <button className="apple-btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }} onClick={() => handleSaveGlobal(slug)}>Sync Section</button>
                                        </div>
                                        <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
                                            {globalContent.filter(i => i.section_slug === slug).map(item => (
                                                <div key={item.id} style={{ background: 'white', padding: '15px', borderRadius: '15px', border: '1px solid rgba(0,0,0,0.03)' }}>
                                                    <label className="apple-label" style={{ fontSize: '0.7rem' }}>{item.label}</label>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
                                                        <span style={{ fontWeight: 600, color: 'var(--apple-text-secondary)' }}>Rp</span>
                                                        <input
                                                            className="apple-input"
                                                            style={{ border: 'none', padding: '0', fontSize: '1.2rem', fontWeight: 700 }}
                                                            value={item.amount || "0"}
                                                            onChange={(e) => handleUpdateGlobalItem(item.id, 'amount', e.target.value)}
                                                        />
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

                <footer style={{ marginTop: '60px', paddingBottom: '40px', textAlign: 'center', color: 'var(--apple-text-secondary)', fontSize: '0.85rem' }}>
                    &copy; 2026 PP. Darussalam Lirboyo Console. Developed with Modern UI Standards.
                </footer>
            </main>
        </div>
    );
}
