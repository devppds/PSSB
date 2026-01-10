
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
    const [timeline, setTimeline] = useState<any[]>([]);
    const [curriculum, setCurriculum] = useState<{ categories: any[], items: any[], contents: any[] }>({ categories: [], items: [], contents: [] });
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [authLoading, setAuthLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSantri, setSelectedSantri] = useState<any>(null);
    const [toasts, setToasts] = useState<any[]>([]);
    const [confirmDialog, setConfirmDialog] = useState<any>(null);
    const [galleryModal, setGalleryModal] = useState<{ isOpen: boolean, item: any }>({ isOpen: false, item: null });

    const showToast = (title: string, message: string, type: 'success' | 'error' | 'info' = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, title, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.map(t => t.id === id ? { ...t, exit: true } : t));
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, 500);
        }, 3000);
    };

    const confirmAction = (title: string, message: string, onConfirm: () => void) => {
        setConfirmDialog({ title, message, onConfirm });
    };

    useEffect(() => {
        const session = localStorage.getItem('admin_session');
        if (session) {
            const { timestamp } = JSON.parse(session);
            const oneHour = 60 * 60 * 1000;
            if (Date.now() - timestamp < oneHour) {
                setIsLoggedIn(true);
            } else {
                localStorage.removeItem('admin_session');
            }
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            fetchData();
        }
    }, [isLoggedIn]);

    const handleLogin = async () => {
        setAuthLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: passwordInput })
            });
            const data = await res.json();
            if (data.success) {
                const sessionData = {
                    timestamp: Date.now(),
                    username: data.username,
                    token: data.token
                };
                localStorage.setItem('admin_session', JSON.stringify(sessionData));
                setIsLoggedIn(true);
                showToast("Selamat Datang", "Akses sistem diberikan.", "success");
            } else {
                showToast("Akses Ditolak", data.error || "Kredensial tidak valid.", "error");
            }
        } catch (err) {
            showToast("Koneksi Error", "Tidak dapat menghubungi server.", "error");
        } finally {
            setAuthLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_session');
        setIsLoggedIn(false);
        showToast("Sesi Berakhir", "Anda telah keluar dari sistem.");
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const [contentRes, santriRes, curriculumRes] = await Promise.all([
                fetch("/api/content/all"),
                fetch("/api/get-santri"),
                fetch("/api/curriculum")
            ]);

            const contentData = await contentRes.json();
            const santriData = await santriRes.json();
            const curriculumData = await curriculumRes.json();

            setSettings(contentData.settings || {});
            const flattened = Object.values(contentData.content || {}).flat() as any[];
            setGlobalContent(flattened);
            setGallery(contentData.gallery_list || []);
            setTimeline(contentData.timeline || []);
            setRegistrations(santriData || []);
            setCurriculum(curriculumData || { categories: [], items: [], contents: [] });
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
            showToast("Sinkronisasi Selesai", "Meta data sistem berhasil diperbarui.");
        } catch (err) { showToast("Gagal", "Sinkronisasi gagal.", "error"); }
        finally { setSaving(false); }
    };

    const handleUpdateGlobalItem = (id: number, field: string, value: any) => {
        setGlobalContent(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const handleSaveGlobal = async (slug: string) => {
        setSaving(true);
        // Filter items for this slug. For new items (string IDs), we map id to null so DB autocreates.
        const items = globalContent.filter(i => i.section_slug === slug).map(i => ({
            ...i,
            id: typeof i.id === 'string' ? null : i.id
        }));

        try {
            await fetch("/api/content/update-global", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items })
            });
            showToast("Data Disimpan", `Bagian ${slug} berhasil diperbarui.`);
            fetchData(); // Refresh to get real IDs
        } catch (err) { showToast("Gagal", "Gagal memperbarui konten.", "error"); }
        finally { setSaving(false); }
    };

    const handleAddGlobalItem = (slug: string) => {
        const newItem = {
            id: 'new-' + Date.now(),
            section_slug: slug,
            label: 'Item Baru',
            icon: 'fa-circle',
            order_index: globalContent.filter(i => i.section_slug === slug).length + 1
        };
        setGlobalContent([...globalContent, newItem]);
    };

    const handleDeleteGlobalItem = async (id: any) => {
        // If it's a new item (string ID), just remove from state
        if (typeof id === 'string') {
            setGlobalContent(prev => prev.filter(i => i.id !== id));
            return;
        }

        confirmAction("Hapus Item?", "Item akan dihapus permanen.", async () => {
            try {
                const res = await fetch("/api/content/update-global", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id })
                });
                if (res.ok) {
                    showToast("Terhapus", "Item berhasil dihapus.", "success");
                    setGlobalContent(prev => prev.filter(i => i.id !== id));
                }
            } catch (e) { showToast("Error", "Gagal menghapus item.", "error"); }
        });
    };

    // Gallery Handlers
    const handleSaveGalleryItem = async () => {
        try {
            setSaving(true);
            const res = await fetch('/api/content/gallery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(galleryModal.item)
            });
            if (res.ok) {
                showToast("Sukses", "Media berhasil disimpan.", "success");
                setGalleryModal({ isOpen: false, item: null });
                fetchData();
            }
        } catch (e) { showToast("Error", "Gagal menyimpan media.", "error"); }
        finally { setSaving(false); }
    };

    const handleDeleteGalleryItem = (id: number) => {
        confirmAction("Hapus Media?", "Media ini akan dihapus permanen.", async () => {
            try {
                await fetch('/api/content/gallery', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id })
                });
                showToast("Terhapus", "Media berhasil dihapus.", "success");
                setGallery(prev => prev.filter(p => p.id !== id));
            } catch (e) { showToast("Error", "Gagal menghapus media.", "error"); }
        });
    };

    // Timeline Handlers
    const handleUpdateTimeline = (id: any, field: string, value: any) => {
        setTimeline(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const handleSaveTimeline = async (item: any) => {
        setSaving(true);
        // If id is string (temp id), make it null for DB
        const payload = { ...item, id: typeof item.id === 'string' ? null : item.id };
        try {
            await fetch('/api/content/timeline', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            showToast("Sukses", "Data sejarah disimpan.", "success");
            fetchData();
        } catch (e) { showToast("Error", "Gagal menyimpan sejarah.", "error"); }
        finally { setSaving(false); }
    };

    const handleDeleteTimeline = (id: any) => {
        if (typeof id === 'string') {
            setTimeline(prev => prev.filter(i => i.id !== id));
            return;
        }
        confirmAction("Hapus Sejarah?", "Item ini akan dihapus permanen.", async () => {
            try {
                await fetch('/api/content/timeline', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id })
                });
                showToast("Terhapus", "Data berhasil dihapus.", "success");
                setTimeline(prev => prev.filter(i => i.id !== id));
            } catch (e) { showToast("Error", "Gagal menghapus.", "error"); }
        });
    };

    const handleAddTimeline = () => {
        setTimeline([...timeline, {
            id: 'new-' + Date.now(),
            year: new Date().getFullYear().toString(),
            date_label: 'Tanggal Peristiwa',
            title: 'Judul Peristiwa',
            content: '',
            image_url: ''
        }]);
    };

    // Curriculum Handlers
    const handleSaveCurriculum = async (type: 'category' | 'item' | 'content', data: any) => {
        setSaving(true);
        try {
            await fetch('/api/curriculum', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, data })
            });
            showToast("Sukses", "Data kurikulum disimpan.", "success");
            fetchData();
        } catch (e) {
            showToast("Error", "Gagal menyimpan kurikulum.", "error");
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteCurriculum = (type: 'category' | 'item' | 'content', id: any) => {
        if (typeof id === 'string' && id.startsWith('new-')) {
            if (type === 'category') {
                setCurriculum(prev => ({ ...prev, categories: prev.categories.filter(c => c.id !== id) }));
            } else if (type === 'item') {
                setCurriculum(prev => ({ ...prev, items: prev.items.filter(i => i.id !== id) }));
            } else {
                setCurriculum(prev => ({ ...prev, contents: prev.contents.filter(c => c.id !== id) }));
            }
            return;
        }
        confirmAction("Hapus Data?", "Data ini akan dihapus permanen.", async () => {
            try {
                await fetch('/api/curriculum', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type, id })
                });
                showToast("Terhapus", "Data berhasil dihapus.", "success");
                fetchData();
            } catch (e) {
                showToast("Error", "Gagal menghapus.", "error");
            }
        });
    };

    const handleAddCategory = () => {
        setCurriculum(prev => ({
            ...prev,
            categories: [...prev.categories, {
                id: 'new-' + Date.now(),
                name: 'Kategori Baru',
                order_index: prev.categories.length + 1
            }]
        }));
    };

    const handleAddItem = (categoryId: any) => {
        setCurriculum(prev => ({
            ...prev,
            items: [...prev.items, {
                id: 'new-' + Date.now(),
                category_id: categoryId,
                title: 'Tingkatan Baru',
                age: '',
                size: 'materi-item-med',
                order_index: prev.items.filter(i => i.category_id === categoryId).length + 1
            }]
        }));
    };

    const handleAddContent = (itemId: any) => {
        setCurriculum(prev => ({
            ...prev,
            contents: [...prev.contents, {
                id: 'new-' + Date.now(),
                item_id: itemId,
                section_type: 'kurikulum',
                icon_type: 'check',
                label: 'Materi Baru',
                order_index: prev.contents.filter(c => c.item_id === itemId).length + 1
            }]
        }));
    };

    const handleUpdateCurriculum = (type: 'category' | 'item' | 'content', id: any, field: string, value: any) => {
        if (type === 'category') {
            setCurriculum(prev => ({
                ...prev,
                categories: prev.categories.map(c => c.id === id ? { ...c, [field]: value } : c)
            }));
        } else if (type === 'item') {
            setCurriculum(prev => ({
                ...prev,
                items: prev.items.map(i => i.id === id ? { ...i, [field]: value } : i)
            }));
        } else {
            setCurriculum(prev => ({
                ...prev,
                contents: prev.contents.map(c => c.id === id ? { ...c, [field]: value } : c)
            }));
        }
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
                showToast("Status Diperbarui", "Data santri berhasil diverifikasi.");
                fetchData();
                setSelectedSantri(null);
            }
        } catch (err) { showToast("Gagal", "Aksi gagal dilakukan.", "error"); }
        finally { setSaving(false); }
    };

    const handleDeleteSantri = async (id: number) => {
        confirmAction("Hapus Permanen?", "Data ini akan dihapus selamanya dari server.", async () => {
            setSaving(true);
            try {
                await fetch("/api/manage-santri", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ action: 'delete', id })
                });
                showToast("Data Dihapus", "Santri telah dihapus dari sistem.");
                fetchData();
                setSelectedSantri(null);
            } catch (err) { showToast("Gagal", "Proses penghapusan gagal.", "error"); }
            finally { setSaving(false); }
        });
    };

    const filteredSantri = registrations.filter(s =>
        s.nama_depan?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.nik?.includes(searchQuery)
    );

    if (!isLoggedIn) {
        return (
            <>
                <div className="apple-admin-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="apple-card" style={{ width: '400px', textAlign: 'center', padding: '3rem' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <img
                                src="https://res.cloudinary.com/dceamfy3n/image/upload/v1766596001/logo_zdenyr.png"
                                alt="Logo"
                                style={{ width: '80px', height: 'auto', margin: '0 auto' }}
                            />
                        </div>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>Portal Manajemen</h2>
                        <p style={{ color: 'var(--apple-text-secondary)', marginBottom: '2rem' }}>Autentikasi untuk mengakses kontrol sistem.</p>
                        <input
                            type="password"
                            className="apple-input"
                            placeholder="Kata Sandi Sistem"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                            style={{ marginBottom: '1.2rem', textAlign: 'center' }}
                        />
                        <button className="apple-btn-primary" style={{ width: '100%' }} onClick={handleLogin} disabled={authLoading}>
                            {authLoading ? <i className="fas fa-spinner fa-spin"></i> : "Masuk Sistem"}
                        </button>
                        <div style={{ marginTop: '2rem', fontSize: '0.75rem', color: 'var(--apple-text-secondary)' }}>
                            <i className="fas fa-lock"></i> Sesi bertahan selama 1 jam
                        </div>
                    </div>
                </div>
                {/* Premium Toast Container */}
                <div className="apple-toast-container">
                    {toasts.map(t => (
                        <div key={t.id} className={`apple-toast ${t.type} ${t.exit ? 'exit' : ''}`}>
                            <i className={`fas ${t.type === 'success' ? 'fa-check-circle' : t.type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}`}></i>
                            <div className="apple-toast-content">
                                <div className="apple-toast-title">{t.title}</div>
                                <div className="apple-toast-message">{t.message}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    }

    return (
        <>
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
                            <i className="fas fa-chart-pie"></i> <span className="apple-nav-text">Ringkasan</span>
                        </a>
                        <a href="#" className={`apple-nav-item ${activeTab === 'registrations' ? 'active' : ''}`} onClick={() => setActiveTab('registrations')}>
                            <i className="fas fa-users"></i> <span className="apple-nav-text">Data Santri</span>
                        </a>
                        <a href="#" className={`apple-nav-item ${activeTab === 'general' ? 'active' : ''}`} onClick={() => setActiveTab('general')}>
                            <i className="fas fa-cog"></i> <span className="apple-nav-text">Pengaturan</span>
                        </a>
                        <a href="#" className={`apple-nav-item ${activeTab === 'content' ? 'active' : ''}`} onClick={() => setActiveTab('content')}>
                            <i className="fas fa-feather"></i> <span className="apple-nav-text">Konten Web</span>
                        </a>
                        <a href="#" className={`apple-nav-item ${activeTab === 'curriculum' ? 'active' : ''}`} onClick={() => setActiveTab('curriculum')}>
                            <i className="fas fa-graduation-cap"></i> <span className="apple-nav-text">Kurikulum</span>
                        </a>
                        <a href="#" className={`apple-nav-item ${activeTab === 'gallery' ? 'active' : ''}`} onClick={() => setActiveTab('gallery')}>
                            <i className="fas fa-images"></i> <span className="apple-nav-text">Galeri Media</span>
                        </a>
                        <a href="#" className={`apple-nav-item ${activeTab === 'finance' ? 'active' : ''}`} onClick={() => setActiveTab('finance')}>
                            <i className="fas fa-credit-card"></i> <span className="apple-nav-text">Keuangan</span>
                        </a>
                    </nav>

                    <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '20px' }}>
                        <a href="/" className="apple-nav-item">
                            <i className="fas fa-globe"></i> <span className="apple-nav-text">Lihat Situs Utama</span>
                        </a>
                        <button onClick={handleLogout} className="apple-nav-item" style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left' }}>
                            <i className="fas fa-sign-out-alt"></i> <span className="apple-nav-text">Keluar</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="apple-main-content">
                    <header className="apple-header">
                        <div>
                            <p style={{ color: 'var(--apple-text-secondary)', marginBottom: '4px', fontWeight: 500, fontSize: '0.9rem' }}>Konsol Admin Aman</p>
                            <h1 className="apple-title-large">Kontrol Sistem</h1>
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
                                <div className="grid-dashboard" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                                    <div className="apple-card" style={{ gridColumn: 'span 2' }}>
                                        <h3 style={{ marginBottom: '20px', fontWeight: 700, fontSize: '1.2rem' }}>Statistik Pendaftaran</h3>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--apple-blue)' }}>{registrations.length}</div>
                                                <div style={{ color: 'var(--apple-text-secondary)', fontSize: '1rem', fontWeight: 500 }}>Total Pendaftar</div>
                                            </div>
                                            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                <div className="apple-badge success" style={{ background: '#eafaf1', color: '#34c759', padding: '8px 16px', borderRadius: '12px', fontWeight: 700 }}>{registrations.filter(r => r.status === 'Terverifikasi').length} Terverifikasi</div>
                                                <div className="apple-badge warning" style={{ background: '#fff9e6', color: '#ff9500', padding: '8px 16px', borderRadius: '12px', fontWeight: 700 }}>{registrations.filter(r => r.status === 'Pending').length} Pending</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="apple-card" style={{ background: 'linear-gradient(135deg, #007aff 0%, #0056b3 100%)', color: 'white', gridColumn: 'span 2' }}>
                                        <h3 style={{ marginBottom: '15px', fontWeight: 700, fontSize: '1.2rem' }}>Integritas Sistem</h3>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '10px' }}>
                                            <div style={{ width: '60px', height: '60px', borderRadius: '18px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <i className="fas fa-shield-alt fa-2x"></i>
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 800, fontSize: '1.5rem' }}>Semua Sistem Normal</div>
                                                <div style={{ opacity: 0.9, fontSize: '0.9rem' }}>Database Cloudflare D1 + KV Storage + Media Hub</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="apple-card" style={{ gridColumn: 'span 4' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                            <h3 style={{ fontWeight: 700 }}>Aktivitas Terakhir</h3>
                                            <button className="apple-btn-secondary" style={{ padding: '8px 16px', background: '#f5f5f7', border: 'none', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>Lihat Semua</button>
                                        </div>
                                        <div style={{ color: 'var(--apple-text-secondary)', textAlign: 'center', padding: '40px 0' }}>
                                            <i className="fas fa-history fa-2x" style={{ marginBottom: '15px', opacity: 0.2 }}></i>
                                            <p>Belum ada aktivitas pendaftaran baru dalam 24 jam terakhir.</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'registrations' && (
                                <div className="apple-card" style={{ padding: '0' }}>
                                    <div style={{ padding: '24px', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Pusat Pendaftaran</h2>
                                        <input
                                            className="apple-input"
                                            style={{ width: '300px', padding: '10px 15px' }}
                                            placeholder="Cari nama atau NIK..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <div className="apple-table-container">
                                        <table className="apple-table">
                                            <thead>
                                                <tr>
                                                    <th style={{ paddingLeft: '24px' }}>Nama</th>
                                                    <th>Jenjang</th>
                                                    <th>Asal Kota</th>
                                                    <th>Status</th>
                                                    <th>Aksi</th>
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
                                                            <button onClick={() => setSelectedSantri(s)} className="apple-btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: '8px' }}>Kelola</button>
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
                                        <h2 style={{ fontSize: '1.6rem', fontWeight: 700 }}>Konfigurasi Sistem</h2>
                                        <button className="apple-btn-primary" onClick={handleSaveSettings} disabled={saving}>
                                            {saving ? <i className="fas fa-spinner fa-spin"></i> : "Sinkronisasi"}
                                        </button>
                                    </div>

                                    <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
                                        <div>
                                            <label className="apple-label">Gateway & Notifikasi</label>
                                            <div className="apple-input-group">
                                                <input className="apple-input" placeholder="WhatsApp Pusat" value={settings.whatsapp_number || ""} onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })} />
                                            </div>
                                            <div className="apple-input-group" style={{ border: '2px dashed #eee', padding: '15px', borderRadius: '12px', marginTop: '10px' }}>
                                                <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e3a8a', marginBottom: '10px' }}>
                                                    <i className="fas fa-envelope"></i> Konfigurasi Email (Resend)
                                                </p>
                                                <input className="apple-input" placeholder="Resend API Key" value={settings.email_gateway_api_key || ""} onChange={(e) => setSettings({ ...settings, email_gateway_api_key: e.target.value })} style={{ marginBottom: '8px' }} />
                                                <input className="apple-input" placeholder="Nama Pengirim (e.g. PPDB Darussalam)" value={settings.sender_name || ""} onChange={(e) => setSettings({ ...settings, sender_name: e.target.value })} />
                                            </div>
                                            <div className="apple-input-group" style={{ marginTop: '15px' }}>
                                                <input className="apple-input" placeholder="Fonnte API Key (WA Gateway)" value={settings.wa_gateway_api_key || ""} onChange={(e) => setSettings({ ...settings, wa_gateway_api_key: e.target.value })} />
                                            </div>
                                            <div className="apple-input-group">
                                                <textarea className="apple-input" placeholder="Template Notifikasi Bukti (Gunakan {nama}, {id}, {kelas})" rows={3} value={settings.wa_template_pendaftaran || "Assalamu'alaikum, Terima kasih {nama} telah mendaftar di PPDS Lirboyo. No. Pendaftaran Anda adalah #{id}. Jenjang: {kelas}. Mohon simpan bukti pendaftaran terlampir."} onChange={(e) => setSettings({ ...settings, wa_template_pendaftaran: e.target.value })} />
                                            </div>
                                            <div className="apple-input-group">
                                                <input className="apple-input" placeholder="Target Akademik" value={settings.ta_info || ""} onChange={(e) => setSettings({ ...settings, ta_info: e.target.value })} />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="apple-label">Optimasi Mesin Pencari (SEO)</label>
                                            <div className="apple-input-group">
                                                <input className="apple-input" placeholder="Judul Meta Global" value={settings.meta_title || ""} onChange={(e) => setSettings({ ...settings, meta_title: e.target.value })} />
                                            </div>
                                            <div className="apple-input-group">
                                                <textarea className="apple-input" placeholder="Deskripsi Meta" rows={2} value={settings.meta_description || ""} onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })} />
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

                                    {/* TIMELINE / SEJARAH & PROFIL MANAGEMENT */}
                                    <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                            <div>
                                                <h3 className="apple-label" style={{ fontSize: '1.1rem', margin: 0 }}>Sejarah & Profil</h3>
                                                <p style={{ fontSize: '0.8rem', color: 'var(--apple-text-secondary)', marginTop: '4px' }}>Timeline peristiwa penting dan video profil lembaga</p>
                                            </div>
                                            <button className="apple-badge badge-blue" style={{ border: 'none', cursor: 'pointer' }} onClick={handleAddTimeline}>+ Tambah Peristiwa</button>
                                        </div>

                                        {/* Video URL Section */}
                                        <div style={{ marginBottom: '20px', padding: '15px', background: '#f5f5f7', borderRadius: '12px' }}>
                                            <label className="apple-label" style={{ fontSize: '0.85rem' }}>URL Video Profil</label>
                                            <input
                                                className="apple-input"
                                                placeholder="https://www.youtube-nocookie.com/embed/..."
                                                value={settings.video_url || ""}
                                                onChange={(e) => setSettings({ ...settings, video_url: e.target.value })}
                                                style={{ marginTop: '8px' }}
                                            />
                                            <p style={{ fontSize: '0.7rem', color: 'var(--apple-text-secondary)', marginTop: '6px' }}>
                                                Video ini akan ditampilkan di halaman utama setelah timeline sejarah
                                            </p>
                                        </div>

                                        {/* Visi Text */}
                                        <div style={{ marginBottom: '20px', padding: '15px', background: '#f5f5f7', borderRadius: '12px' }}>
                                            <label className="apple-label" style={{ fontSize: '0.85rem' }}>Visi Pondok</label>
                                            <textarea
                                                className="apple-input"
                                                placeholder="Mencetak insan bertaqwa..."
                                                rows={2}
                                                value={settings.visi_text || ""}
                                                onChange={(e) => setSettings({ ...settings, visi_text: e.target.value })}
                                                style={{ marginTop: '8px' }}
                                            />
                                        </div>

                                        {/* Misi Management */}
                                        <div style={{ marginBottom: '20px', padding: '15px', background: '#f5f5f7', borderRadius: '12px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                                <label className="apple-label" style={{ fontSize: '0.85rem', margin: 0 }}>Misi Pondok</label>
                                                <button
                                                    className="apple-badge badge-blue"
                                                    style={{ border: 'none', cursor: 'pointer', fontSize: '0.7rem' }}
                                                    onClick={() => handleAddGlobalItem('misi')}
                                                >
                                                    + Tambah Misi
                                                </button>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                {globalContent.filter(item => item.section_slug === 'misi').map((item, idx) => (
                                                    <div key={item.id || idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                        <span style={{ fontSize: '0.8rem', color: 'var(--apple-text-secondary)', minWidth: '20px' }}>{idx + 1}.</span>
                                                        <input
                                                            className="apple-input"
                                                            value={item.label || ''}
                                                            onChange={e => handleUpdateGlobalItem(item.id, 'label', e.target.value)}
                                                            placeholder="Tulis misi..."
                                                            style={{ flex: 1, padding: '8px 12px', fontSize: '0.85rem' }}
                                                        />
                                                        <button
                                                            onClick={() => handleSaveGlobal('misi')}
                                                            className="apple-btn-primary"
                                                            style={{ padding: '6px 12px', fontSize: '0.7rem', borderRadius: '8px', whiteSpace: 'nowrap' }}
                                                        >
                                                            Simpan
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteGlobalItem(item.id)}
                                                            className="apple-btn-secondary"
                                                            style={{ padding: '6px 10px', fontSize: '0.7rem', borderRadius: '8px', color: '#ff3b30', background: 'rgba(255, 59, 48, 0.1)' }}
                                                        >
                                                            <i className="fas fa-trash"></i>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Timeline Table */}
                                        <div className="apple-table-container">
                                            <table className="apple-table">
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: '80px', paddingLeft: '24px' }}>Tahun</th>
                                                        <th style={{ width: '150px' }}>Label Tanggal</th>
                                                        <th style={{ width: '200px' }}>Judul</th>
                                                        <th>Konten & Gambar</th>
                                                        <th style={{ width: '100px' }}>Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {timeline.map((item, idx) => (
                                                        <tr key={item.id || idx}>
                                                            <td style={{ paddingLeft: '24px' }}>
                                                                <input className="apple-input" value={item.year || ''} onChange={e => handleUpdateTimeline(item.id, 'year', e.target.value)} placeholder="YYYY" style={{ width: '60px' }} />
                                                            </td>
                                                            <td>
                                                                <input className="apple-input" value={item.date_label || ''} onChange={e => handleUpdateTimeline(item.id, 'date_label', e.target.value)} placeholder="Contoh: 20 Feb 2002" />
                                                            </td>
                                                            <td>
                                                                <input className="apple-input" value={item.title || ''} onChange={e => handleUpdateTimeline(item.id, 'title', e.target.value)} placeholder="Judul..." />
                                                            </td>
                                                            <td>
                                                                <textarea className="apple-input" value={item.content || ''} onChange={e => handleUpdateTimeline(item.id, 'content', e.target.value)} placeholder="Deskripsi peristiwa..." rows={3} style={{ marginBottom: '8px' }} />
                                                                <input className="apple-input" value={item.image_url || ''} onChange={e => handleUpdateTimeline(item.id, 'image_url', e.target.value)} placeholder="URL Gambar..." style={{ fontSize: '0.8rem' }} />
                                                            </td>
                                                            <td>
                                                                <div style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
                                                                    <button className="apple-btn-primary" style={{ padding: '4px 8px', fontSize: '0.7rem' }} onClick={() => handleSaveTimeline(item)}>Simpan</button>
                                                                    <button className="apple-btn-secondary" style={{ padding: '4px 8px', fontSize: '0.7rem', color: 'red', background: '#fff0f0' }} onClick={() => handleDeleteTimeline(item.id)}>Hapus</button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'content' && (
                                <div className="apple-card" style={{ padding: '0', overflow: 'hidden' }}>
                                    <div style={{ padding: '24px', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Aset Dinamis</h2>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--apple-text-secondary)', marginTop: '4px' }}>Kelola daftar ikon dan deskripsi konten.</p>
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
                                                                <div style={{
                                                                    width: '45px',
                                                                    height: '45px',
                                                                    borderRadius: '12px',
                                                                    background: 'white',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    margin: '0 auto',
                                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                                                    border: '1px solid rgba(0,0,0,0.03)'
                                                                }}>
                                                                    <i
                                                                        className={(() => {
                                                                            if (!item.icon) return "fa-solid fa-circle";
                                                                            let icon = item.icon.trim();
                                                                            if (icon.includes(' ')) return icon; // Full classes provided
                                                                            if (!icon.startsWith('fa-')) icon = 'fa-' + icon;

                                                                            // Check for brands
                                                                            const brands = ['whatsapp', 'facebook', 'instagram', 'twitter', 'youtube', 'github', 'google', 'apple'];
                                                                            const isBrand = brands.some(b => icon.includes(b));

                                                                            return `${isBrand ? 'fa-brands' : 'fa-solid'} ${icon}`;
                                                                        })()}
                                                                        style={{ color: 'var(--apple-blue)', fontSize: '1.2rem' }}
                                                                    ></i>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                                    <button onClick={() => handleSaveGlobal(item.section_slug)} className="apple-btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: '8px' }}>Save</button>
                                                                    <button onClick={() => handleDeleteGlobalItem(item.id)} className="apple-btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: '8px', color: '#ff3b30', background: 'rgba(255, 59, 48, 0.1)' }}><i className="fas fa-trash"></i></button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div style={{ padding: '20px', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Tambah Item Baru:</span>
                                        {['program-unggulan', 'program-tambahan', 'ekskul', 'misi', 'alur-pendaftaran'].map(slug => (
                                            <button key={slug} onClick={() => handleAddGlobalItem(slug)} className="apple-badge badge-blue" style={{ border: 'none', cursor: 'pointer' }}>
                                                + {slug.replace(/-/g, ' ')}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'gallery' && (
                                <div className="apple-card">
                                    <h2 style={{ marginBottom: '20px' }}>Media Vault</h2>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                                        {Array.isArray(gallery) && gallery.map((item, idx) => (
                                            <div key={item.id || idx} className="apple-card" style={{ padding: '10px', margin: 0, position: 'relative' }}>
                                                <button
                                                    onClick={() => handleDeleteGalleryItem(item.id)}
                                                    style={{ position: 'absolute', top: '5px', right: '5px', background: '#ff3b30', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', zIndex: 10 }}>
                                                    &times;
                                                </button>
                                                <div
                                                    onClick={() => setGalleryModal({ isOpen: true, item })}
                                                    style={{ width: '100%', height: '120px', borderRadius: '10px', overflow: 'hidden', marginBottom: '10px', background: '#eee', cursor: 'pointer' }}>
                                                    {item.image_url ? (
                                                        <img src={item.image_url} alt={item.title || "Gallery Item"} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    ) : (
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}><i className="fas fa-image fa-2x" style={{ color: '#ccc' }}></i></div>
                                                    )}
                                                </div>
                                                <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{item.category || 'Uncategorized'}</div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--apple-text-secondary)' }}>Index: {item.order_index}</div>
                                            </div>
                                        ))}
                                        <div
                                            onClick={() => setGalleryModal({ isOpen: true, item: { category: 'Kegiatan Santri', image_url: '', order_index: gallery.length + 1 } })}
                                            className="apple-card"
                                            style={{ padding: '10px', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #ddd', cursor: 'pointer', minHeight: '180px' }}>
                                            <i className="fas fa-plus fa-2x" style={{ color: '#ddd' }}></i>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'curriculum' && (
                                <div>
                                    <div className="apple-card" style={{ marginBottom: '30px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>Manajemen Kurikulum</h2>
                                                <p style={{ color: 'var(--apple-text-secondary)' }}>Kelola kategori, tingkatan, dan materi ujian untuk setiap jenjang</p>
                                            </div>
                                            <button className="apple-badge badge-blue" style={{ border: 'none', cursor: 'pointer' }} onClick={handleAddCategory}>
                                                + Tambah Kategori
                                            </button>
                                        </div>
                                    </div>

                                    {curriculum.categories.map((category, catIdx) => (
                                        <div key={category.id} className="apple-card" style={{ marginBottom: '20px' }}>
                                            {/* Category Header */}
                                            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #eee' }}>
                                                <div style={{ flex: 1 }}>
                                                    <input
                                                        className="apple-input"
                                                        value={category.name || ''}
                                                        onChange={e => handleUpdateCurriculum('category', category.id, 'name', e.target.value)}
                                                        placeholder="Nama Kategori..."
                                                        style={{ fontSize: '1.2rem', fontWeight: 700, padding: '10px 15px' }}
                                                    />
                                                </div>
                                                <button
                                                    className="apple-btn-primary"
                                                    style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                                                    onClick={() => handleSaveCurriculum('category', category)}
                                                >
                                                    Simpan Kategori
                                                </button>
                                                <button
                                                    className="apple-badge badge-blue"
                                                    style={{ border: 'none', cursor: 'pointer' }}
                                                    onClick={() => handleAddItem(category.id)}
                                                >
                                                    + Tingkatan
                                                </button>
                                                <button
                                                    className="apple-btn-secondary"
                                                    style={{ padding: '8px 12px', fontSize: '0.85rem', color: '#ff3b30', background: 'rgba(255, 59, 48, 0.1)' }}
                                                    onClick={() => handleDeleteCurriculum('category', category.id)}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </div>

                                            {/* Items for this Category */}
                                            {curriculum.items.filter(item => item.category_id === category.id).map((item, itemIdx) => (
                                                <div key={item.id} style={{ marginBottom: '20px', padding: '20px', background: '#f5f5f7', borderRadius: '12px' }}>
                                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '15px' }}>
                                                        <input
                                                            className="apple-input"
                                                            value={item.title || ''}
                                                            onChange={e => handleUpdateCurriculum('item', item.id, 'title', e.target.value)}
                                                            placeholder="Nama Tingkatan..."
                                                            style={{ flex: 2, fontWeight: 600 }}
                                                        />
                                                        <input
                                                            className="apple-input"
                                                            value={item.age || ''}
                                                            onChange={e => handleUpdateCurriculum('item', item.id, 'age', e.target.value)}
                                                            placeholder="Usia (opsional)"
                                                            style={{ flex: 1 }}
                                                        />
                                                        <button
                                                            className="apple-btn-primary"
                                                            style={{ padding: '6px 12px', fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                                                            onClick={() => handleSaveCurriculum('item', item)}
                                                        >
                                                            Simpan
                                                        </button>
                                                        <button
                                                            className="apple-badge badge-blue"
                                                            style={{ border: 'none', cursor: 'pointer', fontSize: '0.7rem' }}
                                                            onClick={() => handleAddContent(item.id)}
                                                        >
                                                            + Materi
                                                        </button>
                                                        <button
                                                            className="apple-btn-secondary"
                                                            style={{ padding: '6px 10px', fontSize: '0.75rem', color: '#ff3b30', background: 'rgba(255, 59, 48, 0.1)' }}
                                                            onClick={() => handleDeleteCurriculum('item', item.id)}
                                                        >
                                                            <i className="fas fa-trash"></i>
                                                        </button>
                                                    </div>

                                                    {/* Contents for this Item */}
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                        {curriculum.contents.filter(content => content.item_id === item.id).map((content, contentIdx) => (
                                                            <div key={content.id} style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '10px', background: 'white', borderRadius: '8px' }}>
                                                                <span style={{ fontSize: '0.8rem', color: 'var(--apple-text-secondary)', minWidth: '20px' }}>{contentIdx + 1}.</span>
                                                                <select
                                                                    className="apple-input"
                                                                    value={content.icon_type || 'check'}
                                                                    onChange={e => handleUpdateCurriculum('content', content.id, 'icon_type', e.target.value)}
                                                                    style={{ width: '100px', padding: '6px', fontSize: '0.8rem' }}
                                                                >
                                                                    <option value="check">✓ Check</option>
                                                                    <option value="edit">✎ Edit</option>
                                                                    <option value="cap">🎓 Cap</option>
                                                                </select>
                                                                <input
                                                                    className="apple-input"
                                                                    value={content.label || ''}
                                                                    onChange={e => handleUpdateCurriculum('content', content.id, 'label', e.target.value)}
                                                                    placeholder="Nama materi..."
                                                                    style={{ flex: 1, padding: '6px 10px', fontSize: '0.85rem' }}
                                                                />
                                                                <button
                                                                    className="apple-btn-primary"
                                                                    style={{ padding: '4px 10px', fontSize: '0.7rem' }}
                                                                    onClick={() => handleSaveCurriculum('content', content)}
                                                                >
                                                                    Simpan
                                                                </button>
                                                                <button
                                                                    className="apple-btn-secondary"
                                                                    style={{ padding: '4px 8px', fontSize: '0.7rem', color: '#ff3b30', background: 'rgba(255, 59, 48, 0.1)' }}
                                                                    onClick={() => handleDeleteCurriculum('content', content.id)}
                                                                >
                                                                    <i className="fas fa-trash"></i>
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'finance' && (
                                <div>
                                    <div className="apple-card" style={{ marginBottom: '30px' }}>
                                        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>Manajemen Keuangan</h2>
                                        <p style={{ color: 'var(--apple-text-secondary)', marginBottom: '30px' }}>Kelola rincian pembayaran santri baru dan lama</p>
                                    </div>

                                    {['pembayaran-tahunan-baru', 'pembayaran-tahunan-lama', 'pembayaran-bulanan'].map(slug => (
                                        <div key={slug} className="apple-card" style={{ marginBottom: '30px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                                                <h3 style={{ textTransform: 'capitalize', fontSize: '1.2rem', fontWeight: 700, color: 'var(--apple-blue)' }}>
                                                    {slug.replace(/-/g, ' ')}
                                                </h3>
                                                <button
                                                    className="apple-badge badge-blue"
                                                    style={{ border: 'none', cursor: 'pointer' }}
                                                    onClick={() => handleAddGlobalItem(slug)}
                                                >
                                                    + Tambah Item
                                                </button>
                                            </div>
                                            <div className="apple-table-container">
                                                <table className="apple-table">
                                                    <thead>
                                                        <tr>
                                                            <th style={{ paddingLeft: '24px', width: '40px' }}>No</th>
                                                            <th>Jenis Pembayaran</th>
                                                            <th style={{ width: '180px' }}>Nominal (Rp)</th>
                                                            <th style={{ width: '120px' }}>Keterangan</th>
                                                            <th style={{ width: '150px' }}>Aksi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {globalContent.filter(i => i.section_slug === slug).map((item, idx) => (
                                                            <tr key={item.id || idx}>
                                                                <td style={{ paddingLeft: '24px', fontWeight: 600, color: 'var(--apple-text-secondary)' }}>{idx + 1}</td>
                                                                <td>
                                                                    <input
                                                                        className="apple-input"
                                                                        value={item.label || ''}
                                                                        onChange={e => handleUpdateGlobalItem(item.id, 'label', e.target.value)}
                                                                        placeholder="Nama item..."
                                                                        style={{ padding: '8px 12px', fontSize: '0.9rem' }}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        className="apple-input"
                                                                        value={item.amount || '0'}
                                                                        onChange={e => handleUpdateGlobalItem(item.id, 'amount', e.target.value)}
                                                                        placeholder="0"
                                                                        style={{ padding: '8px 12px', fontSize: '0.9rem', fontWeight: 600 }}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        className="apple-input"
                                                                        value={item.description || ''}
                                                                        onChange={e => handleUpdateGlobalItem(item.id, 'description', e.target.value)}
                                                                        placeholder="/tahun"
                                                                        style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <div style={{ display: 'flex', gap: '5px' }}>
                                                                        <button
                                                                            className="apple-btn-primary"
                                                                            style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                                                                            onClick={() => handleSaveGlobal(slug)}
                                                                        >
                                                                            Simpan
                                                                        </button>
                                                                        <button
                                                                            className="apple-btn-secondary"
                                                                            style={{ padding: '6px 10px', fontSize: '0.75rem', color: '#ff3b30', background: 'rgba(255, 59, 48, 0.1)' }}
                                                                            onClick={() => handleDeleteGlobalItem(item.id)}
                                                                        >
                                                                            <i className="fas fa-trash"></i>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Keterangan Section */}
                                    <div className="apple-card">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--apple-blue)' }}>Keterangan Pembayaran</h3>
                                            <button
                                                className="apple-badge badge-blue"
                                                style={{ border: 'none', cursor: 'pointer' }}
                                                onClick={() => handleAddGlobalItem('keterangan-pembayaran')}
                                            >
                                                + Tambah Keterangan
                                            </button>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            {globalContent.filter(item => item.section_slug === 'keterangan-pembayaran').map((item, idx) => (
                                                <div key={item.id || idx} style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '12px', background: '#f5f5f7', borderRadius: '10px' }}>
                                                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--apple-text-secondary)', minWidth: '25px' }}>{idx + 1}.</span>
                                                    <input
                                                        className="apple-input"
                                                        value={item.label || ''}
                                                        onChange={e => handleUpdateGlobalItem(item.id, 'label', e.target.value)}
                                                        placeholder="Tulis keterangan..."
                                                        style={{ flex: 1, padding: '8px 12px', fontSize: '0.9rem', background: 'white' }}
                                                    />
                                                    <button
                                                        onClick={() => handleSaveGlobal('keterangan-pembayaran')}
                                                        className="apple-btn-primary"
                                                        style={{ padding: '6px 12px', fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                                                    >
                                                        Simpan
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteGlobalItem(item.id)}
                                                        className="apple-btn-secondary"
                                                        style={{ padding: '6px 10px', fontSize: '0.75rem', color: '#ff3b30', background: 'rgba(255, 59, 48, 0.1)' }}
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* Registration Detail Modal */}
                    {selectedSantri && (
                        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                            <div className="apple-card" style={{ width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
                                <button onClick={() => setSelectedSantri(null)} style={{ position: 'absolute', top: '20px', right: '20px', border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>

                                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '5px' }}>Ringkasan Pendaftaran</h2>
                                <p style={{ color: 'var(--apple-text-secondary)', marginBottom: '30px' }}>Review dokumen pendaftar dan lakukan verifikasi data.</p>

                                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '40px' }}>
                                    <div>
                                        <section style={{ marginBottom: '30px' }}>
                                            <h4 className="apple-label" style={{ color: 'var(--apple-blue)', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Profil Pribadi</h4>
                                            <DetailRow label="Nama Lengkap" value={`${selectedSantri.nama_depan} ${selectedSantri.nama_belakang}`} />
                                            <DetailRow label="NIK / NISN" value={`${selectedSantri.nik} / ${selectedSantri.nisn}`} />
                                            <DetailRow label="Kelamin / Agama" value={`${selectedSantri.jenis_kelamin} / ${selectedSantri.agama}`} />
                                            <DetailRow label="Asal" value={`${selectedSantri.alamat_kota}, ${selectedSantri.alamat_provinsi}`} />
                                        </section>

                                        <section>
                                            <h4 className="apple-label" style={{ color: 'var(--apple-blue)', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Info Orang Tua</h4>
                                            <DetailRow label="Ayah" value={selectedSantri.nama_ayah_depan} />
                                            <DetailRow label="Ibu" value={selectedSantri.nama_ibu_depan} />
                                        </section>
                                    </div>

                                    <div>
                                        <div className="apple-card" style={{ background: '#f5f5f7', border: 'none' }}>
                                            <h4 className="apple-label">Kontrol Sistem</h4>
                                            <div className="apple-input-group">
                                                <label className="apple-label" style={{ fontSize: '0.65rem' }}>Perbarui Status</label>
                                                <select
                                                    className="apple-input"
                                                    style={{ fontSize: '0.9rem' }}
                                                    value={selectedSantri.status}
                                                    onChange={(e) => handleUpdateSantriStatus(selectedSantri.id, e.target.value, selectedSantri.catatan_admin)}
                                                >
                                                    <option value="Pending">Pending / Tinjau</option>
                                                    <option value="Terverifikasi">Diterima / Terverifikasi</option>
                                                    <option value="Ditolak">Ditolak</option>
                                                </select>
                                            </div>
                                            <div className="apple-input-group">
                                                <label className="apple-label" style={{ fontSize: '0.65rem' }}>Catatan Admin</label>
                                                <textarea
                                                    className="apple-input"
                                                    rows={3}
                                                    placeholder="Masukkan catatan tinjauan..."
                                                    value={selectedSantri.catatan_admin || ""}
                                                    onChange={(e) => setSelectedSantri({ ...selectedSantri, catatan_admin: e.target.value })}
                                                />
                                            </div>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <button className="apple-btn-primary" style={{ flex: 1 }} onClick={() => handleUpdateSantriStatus(selectedSantri.id, selectedSantri.status, selectedSantri.catatan_admin)}>Simpan</button>
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

            {/* Premium Toast Container */}
            <div className="apple-toast-container">
                {toasts.map(t => (
                    <div key={t.id} className={`apple-toast ${t.type} ${t.exit ? 'exit' : ''}`}>
                        <i className={`fas ${t.type === 'success' ? 'fa-check-circle' : t.type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}`}></i>
                        <div className="apple-toast-content">
                            <div className="apple-toast-title">{t.title}</div>
                            <div className="apple-toast-message">{t.message}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Gallery Modal - UPGRADED WITH UPLOAD */}
            {galleryModal.isOpen && (
                <div className="apple-modal-overlay" onClick={() => setGalleryModal({ isOpen: false, item: null })}>
                    <div className="apple-confirm-card" style={{ maxWidth: '550px' }} onClick={e => e.stopPropagation()}>
                        <div className="apple-confirm-title">Upload Media</div>

                        {/* File Upload Section */}
                        <div style={{ marginBottom: '20px' }}>
                            <label className="apple-label">Upload Gambar</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="apple-input"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;

                                    showToast("Uploading", "Sedang mengupload gambar...", "info");
                                    const formData = new FormData();
                                    formData.append('file', file);

                                    try {
                                        const res = await fetch('/api/upload', {
                                            method: 'POST',
                                            body: formData
                                        });
                                        const data = await res.json();
                                        if (data.url) {
                                            setGalleryModal({
                                                ...galleryModal,
                                                item: { ...galleryModal.item, image_url: data.url }
                                            });
                                            showToast("Sukses", "Gambar berhasil diupload!", "success");
                                        }
                                    } catch (err) {
                                        showToast("Error", "Gagal upload gambar", "error");
                                    }
                                }}
                            />
                            {galleryModal.item?.image_url && (
                                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                                    <img
                                        src={galleryModal.item.image_url}
                                        alt="Preview"
                                        style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', border: '1px solid #ddd' }}
                                    />
                                </div>
                            )}
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label className="apple-label">Judul / Caption</label>
                            <input className="apple-input" value={galleryModal.item?.title || ''} onChange={e => setGalleryModal({ ...galleryModal, item: { ...galleryModal.item, title: e.target.value } })} placeholder="Judul gambar..." />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label className="apple-label">Kategori</label>
                            <select
                                className="apple-input"
                                value={galleryModal.item?.category || ''}
                                onChange={e => setGalleryModal({ ...galleryModal, item: { ...galleryModal.item, category: e.target.value } })}
                            >
                                <option value="">Pilih Kategori...</option>
                                <option value="Bahtsul Masa'il">Bahtsul Masa'il</option>
                                <option value="Kitab Kuning">Kitab Kuning</option>
                                <option value="Formal dan Non-Formal">Formal dan Non-Formal</option>
                                <option value="Pengajian Bandongan/Kilatan">Pengajian Bandongan/Kilatan</option>
                                <option value="Bahtsul Masa'il Kubro">Bahtsul Masa'il Kubro</option>
                                <option value="Takhossus Arab (Nahwu Shorof)">Takhossus Arab (Nahwu Shorof)</option>
                                <option value="Ziaroh Wali & Ulama">Ziaroh Wali & Ulama</option>
                                <option value="Kegiatan Santri">Kegiatan Santri</option>
                                <option value="Asrama">Asrama</option>
                                <option value="Fasilitas">Fasilitas</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label className="apple-label">Urutan</label>
                            <input type="number" className="apple-input" value={galleryModal.item?.order_index || 0} onChange={e => setGalleryModal({ ...galleryModal, item: { ...galleryModal.item, order_index: parseInt(e.target.value) } })} />
                        </div>

                        <div className="apple-confirm-btns">
                            <button className="apple-confirm-btn btn-danger" style={{ background: 'var(--apple-blue)', color: 'white' }} onClick={handleSaveGalleryItem}>Simpan</button>
                            <button className="apple-confirm-btn btn-secondary" onClick={() => setGalleryModal({ isOpen: false, item: null })}>Batal</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Apple Style Confirm Modal */}
            {
                confirmDialog && (
                    <div className="apple-modal-overlay" onClick={() => setConfirmDialog(null)}>
                        <div className="apple-confirm-card" onClick={e => e.stopPropagation()}>
                            <div className="apple-confirm-title">{confirmDialog.title}</div>
                            <div className="apple-confirm-msg">{confirmDialog.message}</div>
                            <div className="apple-confirm-btns">
                                <button className="apple-confirm-btn btn-danger" onClick={() => { confirmDialog.onConfirm(); setConfirmDialog(null); }}>Lanjutkan</button>
                                <button className="apple-confirm-btn btn-secondary" onClick={() => setConfirmDialog(null)}>Batalkan</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
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
