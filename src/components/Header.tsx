"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dateInfo, setDateInfo] = useState({ masehi: '', hijri: '' });
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Date Logic
        const today = new Date();
        const masehi = new Intl.DateTimeFormat('id-ID', { dateStyle: 'full' }).format(today);
        const hijri = new Intl.DateTimeFormat('id-ID', { calendar: 'islamic-umalqura', day: 'numeric', month: 'long', year: 'numeric' }).format(today);

        setDateInfo({
            masehi: masehi,
            hijri: hijri.replace('AH', 'H')
        });

        // Scroll Logic
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path: string) => pathname === path ? 'active' : '';

    return (
        <header className={`header-wrapper ${scrolled ? 'scrolled' : ''}`} style={{ position: 'fixed', width: '100%', top: 0, zIndex: 9999 }}>
            <div className="header-top-row">
                <div className="header-inner">
                    <div className="header-logo-section">
                        <Link href="/" className="header-logo-link">
                            <img
                                src="https://res.cloudinary.com/dceamfy3n/image/upload/v1766596060/header_prrubf.png"
                                alt="Logo"
                                className="header-logo-img"
                            />
                        </Link>
                    </div>

                    <div className="header-status-badge">
                        <span id="ta-info">TA. 1446 - 1447 H. / 2025 - 2026 M.</span>
                    </div>

                    <button
                        className="mobile-menu-toggle"
                        aria-label="Toggle Menu"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                </div>
            </div>

            <div className="header-nav-row">
                <div className="header-inner">
                    <nav className="header-nav">
                        <Link href="/" className={`nav-link ${isActive('/')}`}>
                            <i className="fas fa-home"></i> BERANDA
                        </Link>
                        <Link href="/informasi" className={`nav-link ${isActive('/informasi')}`}>
                            <i className="fas fa-info-circle"></i> INFORMASI PENDAFTARAN
                        </Link>
                        <Link href="/materi-ujian" className={`nav-link ${isActive('/materi-ujian')}`}>
                            <i className="fas fa-folder-open"></i> MATERI UJIAN
                        </Link>
                        <Link href="/ppdb" className={`nav-link ${isActive('/ppdb')}`}>
                            <i className="fas fa-edit"></i> DAFTAR ONLINE
                        </Link>
                    </nav>

                    <div className="header-date-display" id="header-date-display">
                        <span id="date-masehi">{dateInfo.masehi}</span> | <span id="date-hijri">{dateInfo.hijri}</span>
                    </div>
                </div>
            </div>

            <div className={`mobile-menu-overlay ${mobileMenuOpen ? "active" : ""}`}>
                <div className="mobile-menu-content">
                    <button
                        className="mobile-menu-close"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <i className="fas fa-times"></i>
                    </button>
                    <nav className="mobile-nav">
                        <Link href="/" className={`mobile-nav-link ${isActive('/')}`} onClick={() => setMobileMenuOpen(false)}>
                            Beranda
                        </Link>
                        <Link href="/informasi" className={`mobile-nav-link ${isActive('/informasi')}`} onClick={() => setMobileMenuOpen(false)}>
                            Informasi Pendaftaran
                        </Link>
                        <Link href="/materi-ujian" className={`mobile-nav-link ${isActive('/materi-ujian')}`} onClick={() => setMobileMenuOpen(false)}>
                            Materi Ujian
                        </Link>
                        <Link href="/ppdb" className={`mobile-nav-link ${isActive('/ppdb')}`} onClick={() => setMobileMenuOpen(false)}>
                            Daftar Online
                        </Link>
                    </nav>
                    <div className="mobile-calendar">
                        <p id="mobile-date-masehi">{dateInfo.masehi}</p>
                        <p id="mobile-date-hijri">{dateInfo.hijri}</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
