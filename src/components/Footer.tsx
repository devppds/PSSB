"use client";
import React from 'react';
import Link from 'next/link';

export default function Footer() {
    const [waNumber, setWaNumber] = React.useState("6285156644026");

    React.useEffect(() => {
        fetch('/api/content/settings')
            .then(res => res.json())
            .then(data => {
                if (data.whatsapp_number) setWaNumber(data.whatsapp_number);
            })
            .catch(err => console.error("Gagal ambil footer settings", err));
    }, []);

    return (
        <footer>
            <div className="footer-wrapper">
                <div className="footer-content">
                    <div className="footer-main">
                        {/* Brand Section */}
                        <div className="footer-brand-section">
                            <div className="footer-pssb-logo">
                                <div className="logo-logos">
                                    <img src="https://res.cloudinary.com/dceamfy3n/image/upload/v1766596001/logo_zdenyr.png" alt="Darussalam Logo" />
                                </div>
                                <div className="logo-text">
                                    <h2 className="footer-pssb-title">PPDS Lirboyo</h2>
                                    <p className="footer-pssb-subtitle">Pondok Pesantren Darussalam</p>
                                </div>
                            </div>
                            <p className="footer-pssb-desc">
                                Berkhidmat untuk umat, mencetak kader ulama yang berakhlakul karimah dan berwawasan luas. Mencetak insan bertaqwa, berakhlak Al Qur'an dan As Sunnah.
                            </p>
                            <div className="footer-pssb-social">
                                <a href="https://www.instagram.com/pp.darussalamlirboyo/" target="_blank" aria-label="Instagram" title="Instagram"><i className="fab fa-instagram"></i></a>
                                <a href="https://www.tiktok.com/@bumidarussalam" target="_blank" aria-label="TikTok" title="TikTok"><i className="fab fa-tiktok"></i></a>
                                <a href="https://www.youtube.com/@bumidarussalamlirboyo5149" target="_blank" aria-label="YouTube" title="YouTube"><i className="fab fa-youtube"></i></a>
                                <a href={`https://wa.me/${waNumber}`} target="_blank" aria-label="WhatsApp" title="WhatsApp"><i className="fab fa-whatsapp"></i></a>
                            </div>
                        </div>

                        {/* Contact Section */}
                        <div className="footer-contact-section">
                            <h3 className="footer-pssb-section-title"><i className="fas fa-phone-volume"></i> Hubungi Kami</h3>
                            <ul className="footer-pssb-contact-list">
                                <li><i className="fas fa-mosque"></i><span>Pondok Pesantren Darussalam</span></li>
                                <li><i className="fas fa-map-marker-alt"></i><span>Jl. H. Winarto No.40, Campurejo<br />Kec. Mojoroto, Kediri, Jawa Timur</span></li>
                                <li><i className="fas fa-phone-alt"></i><a href="tel:+62354778176">(0354) 778176</a></li>
                                <li><i className="fas fa-envelope"></i><a href="mailto:ppdslirboyo@gmail.com">ppdslirboyo@gmail.com</a></li>
                                <li><i className="fas fa-globe"></i><a href="https://lirboyo.id/" target="_blank">lirboyo.id</a></li>
                            </ul>
                        </div>

                        {/* Links Section */}
                        <div className="footer-links-section">
                            <h3 className="footer-pssb-section-title"><i className="fas fa-compass"></i> Navigasi</h3>
                            <ul className="footer-pssb-links-list">
                                <li><Link href="/"><i className="fas fa-home"></i> Beranda</Link></li>
                                <li><Link href="/#profil"><i className="fas fa-info-circle"></i> Profil Pesantren</Link></li>
                                <li><Link href="/#program"><i className="fas fa-star"></i> Program Unggulan</Link></li>
                                <li><Link href="/materi-ujian"><i className="fas fa-book"></i> Materi Ujian</Link></li>
                                <li><Link href="/informasi"><i className="fas fa-bell"></i> Informasi Pendaftaran</Link></li>
                                <li><Link href="/ppdb"><i className="fas fa-user-plus"></i> Daftar Online</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-legal">
                    <div className="footer-legal-content">
                        <p>
                            <i className="far fa-copyright"></i>
                            <span id="year"> {new Date().getFullYear()}</span>
                            <Link href="/admin-exclusive" style={{ color: 'inherit', textDecoration: 'none' }}><strong> PPDS Lirboyo</strong></Link> - All Rights Reserved.
                        </p>
                        <a href="https://wa.me/6285171542025" target="_blank" className="dev-link">
                            <i className="fas fa-code"></i> Developed by Secretary - Cyber PPDS
                        </a>
                    </div>
                </div>
            </div>

            <div className="wa-button-group">
                <div className="whatsapp-bubble" id="waBubble">
                    Butuh Bantuan?
                </div>
                <button className="whatsapp-float" id="waFloatBtn" onClick={() => window.open(`https://wa.me/${waNumber}`, '_blank')}>
                    <i className="fab fa-whatsapp"></i>
                </button>
            </div>
        </footer>
    );
}
