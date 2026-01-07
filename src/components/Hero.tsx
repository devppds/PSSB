"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Hero() {
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        fetch('/api/content/settings')
            .then(res => res.json())
            .then(data => setSettings(data))
            .catch(err => console.error("Gagal ambil settings hero", err));
    }, []);

    const titleBase = settings?.hero_title || "Pondok Pesantren";
    const titleGradient = settings?.hero_title_gradient || "Darussalam Lirboyo";
    const subtitle = settings?.hero_subtitle || "Mencetak Generasi Bertakwa, Berakhlak Qur'ani dan As-Sunnah dan Berilmu dengan Memadukan Tradisi Salaf dan Modern.";

    return (
        <section className="hero-section" id="beranda">
            <div className="hero-content">
                <h1 className="hero-title">
                    {titleBase}<br />
                    <span className="text-gradient">{titleGradient}</span>
                </h1>
                <p className="hero-subtitle">
                    {subtitle}
                </p>
                <div className="hero-cta-group reveal fade-bottom delay-200">
                    <Link href="/ppdb" className="btn-primary"><i className="fas fa-user-plus"></i> Daftar Sekarang</Link>
                    <Link href="/materi-ujian" className="btn-secondary">Materi Ujian</Link>
                </div>
            </div>
        </section>
    );
}
