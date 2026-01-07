"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
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
                        <Link href="/" className="nav-link">
                            <i className="fas fa-home"></i> BERANDA
                        </Link>
                        <Link href="/informasi" className="nav-link">
                            <i className="fas fa-info-circle"></i> INFORMASI PENDAFTARAN
                        </Link>
                        <Link href="/materi-ujian" className="nav-link">
                            <i className="fas fa-folder-open"></i> MATERI UJIAN
                        </Link>
                        <Link href="/ppdb" className="nav-link">
                            <i className="fas fa-info-circle"></i> DAFTAR ONLINE
                        </Link>
                    </nav>

                    <div className="header-date-display" id="header-date-display">
                        <span id="date-masehi"></span> | <span id="date-hijri"></span>
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
                        <Link href="/" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                            Beranda
                        </Link>
                        <Link href="/informasi" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                            Informasi Pendaftaran
                        </Link>
                        <Link href="/materi-ujian" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                            Materi Ujian
                        </Link>
                        <Link href="/ppdb" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                            Daftar Online
                        </Link>
                    </nav>
                    <div className="mobile-calendar">
                        <p id="mobile-date-masehi"></p>
                        <p id="mobile-date-hijri"></p>
                    </div>
                </div>
            </div>
        </>
    );
}
