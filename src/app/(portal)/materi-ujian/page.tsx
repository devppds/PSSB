"use client";

import "@/app/styles/materi-ujian.css";
import { useEffect, useState } from "react";

// Utility Icons Mapping
const IconMap: any = {
    check: () => <i className="fas fa-check-circle" style={{ color: 'var(--gold-main)', marginRight: '8px' }}></i>,
    edit: () => <i className="fas fa-edit" style={{ color: 'var(--primary)', marginRight: '8px' }}></i>,
    mic: () => <i className="fas fa-microphone" style={{ color: 'var(--primary)', marginRight: '8px' }}></i>,
    cap: () => <i className="fas fa-graduation-cap" style={{ color: 'var(--text-light)', marginRight: '8px' }}></i>,
};

// Utility Component for Class Cards in Bento Style
const BentoMateriCard = ({ title, materi, kurikulum, age, size = "materi-item-med", description }: any) => {
    const [activeTab, setActiveTab] = useState("kurikulum"); // default to kurikulum

    const headerParts = title.includes(' - ') ? title.split(' - ') : [title, ""];
    const categoryName = headerParts[0];
    const subTitle = headerParts[1] || "";

    const renderList = (items: any[]) => {
        if (!items || items.length === 0) {
            return <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)' }}>{description || "-"}</div>;
        }

        // Group by group_title if exists
        const groups: any = {};
        items.forEach(it => {
            const g = it.group_title || 'default';
            if (!groups[g]) groups[g] = [];
            groups[g].push(it);
        });

        return Object.keys(groups).map((groupKey, idx) => (
            <div key={groupKey} style={{ marginTop: idx > 0 ? '1rem' : 0 }}>
                {groupKey !== 'default' && (
                    <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{groupKey}:</h4>
                )}
                <ul>
                    {groups[groupKey].map((li: any) => (
                        <li className="materi-li" key={li.id} style={{ fontSize: '0.9rem' }}>
                            {IconMap[li.icon_type] ? IconMap[li.icon_type]() : null}
                            {li.label}
                        </li>
                    ))}
                </ul>
            </div>
        ));
    };

    return (
        <div className={`glass-card-materi ${size} reveal fade-bottom`}>
            {subTitle ? (
                <>
                    <span className="gold-accent-text">{categoryName}</span>
                    <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>
                        {subTitle}
                    </h3>
                </>
            ) : (
                <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>
                    {title}
                </h3>
            )}

            <div className="materi-tabs">
                <button
                    className={`materi-tab-btn ${activeTab === 'kurikulum' ? 'active' : ''}`}
                    onClick={() => setActiveTab('kurikulum')}
                >
                    <i className="fas fa-book-open"></i> Kurikulum
                </button>
                <button
                    className={`materi-tab-btn ${activeTab === 'materi' ? 'active' : ''}`}
                    onClick={() => setActiveTab('materi')}
                >
                    <i className="fas fa-file-signature"></i> Materi Ujian
                </button>
            </div>

            <div className="tab-content-anim" key={activeTab}>
                <div className="materi-list">
                    {activeTab === 'kurikulum' ? renderList(kurikulum) : renderList(materi)}
                </div>
            </div>

            {age && (
                <div className="age-badge">
                    <i className="fas fa-birthday-cake"></i> Usia Minimal: {age}
                </div>
            )}
        </div>
    );
};

export default function MateriUjianPage() {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/content/materi');
                const data = await res.json();
                if (!res.ok) throw new Error(data.error);
                setCategories(data);
            } catch (err) {
                console.error("Gagal ambil data materi", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!loading) {
            const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('active');
                        }, index * 50);
                    } else {
                        entry.target.classList.remove('active');
                    }
                });
            }, observerOptions);
            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        }
    }, [loading]);

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-body)' }}>
                <div className="loading-spinner">
                    <i className="fas fa-spinner fa-spin fa-3x" style={{ color: 'var(--primary)' }}></i>
                    <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Memuat Kurikulum...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: 'var(--bg-body)', minHeight: '100vh' }}>
            {/* LUXURY HERO SECTION */}
            <section className="info-hero-section">
                <div className="reveal fade-bottom active">
                    <span className="ornament-icon"><i className="fas fa-book-reader"></i></span>
                    <h1 className="page-hero-title">
                        <span className="text-dark">Materi &</span> <span className="text-primary">Kurikulum</span>
                    </h1>
                    <p className="page-hero-subtitle">
                        Informasi lengkap rincian materi ujian masuk, kurikulum kitab salaf, dan batas usia minimal santri Pondok Pesantren Darussalam Lirboyo.
                    </p>
                </div>
            </section>

            <div className="materi-grid">
                {categories.map((cat: any) => (
                    <div key={cat.id} style={{ display: 'contents' }}>
                        <div className="materi-category-header reveal fade-left">
                            <h2>{cat.name}</h2>
                        </div>
                        {cat.items.map((item: any) => (
                            <BentoMateriCard
                                key={item.id}
                                title={item.title}
                                age={item.age}
                                size={item.size}
                                description={item.description}
                                kurikulum={item.kurikulum}
                                materi={item.materi}
                            />
                        ))}
                    </div>
                ))}

                {categories.length === 0 && (
                    <div className="bento-item-full" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                        <i className="fas fa-database fa-3x" style={{ marginBottom: '1rem', opacity: 0.3 }}></i>
                        <p>Data belum tersedia di Database D1. Silakan jalankan seed data.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
