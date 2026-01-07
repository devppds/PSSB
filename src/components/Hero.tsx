import Link from 'next/link';

export default function Hero() {
    return (
        <section className="hero-section" id="beranda" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
            <div className="hero-content reveal active">
                <span className="ornament-icon" style={{ marginBottom: '1rem', display: 'inline-block' }}>
                    <i className="fas fa-mosque"></i>
                </span>
                <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', lineHeight: 1.1 }}>
                    Pondok Pesantren <br />
                    <span className="text-gradient" style={{ display: 'inline-block' }}>Darussalam Lirboyo</span>
                </h1>

                <p className="hero-subtitle" style={{ maxWidth: '700px', margin: '1.5rem auto 2.5rem', fontSize: '1.2rem', opacity: 0.9 }}>
                    Mencetak Generasi Bertakwa, Berakhlak Qur'ani dan As-Sunnah dengan
                    memadukan khazanah tradisi Salaf dan kualitas Modern.
                </p>

                <div className="hero-cta-group reveal fade-bottom delay-200" style={{ gap: '1.5rem' }}>
                    <Link href="/ppdb" className="btn-primary" style={{ padding: '1rem 2.5rem', borderRadius: '50px', fontWeight: 800 }}>
                        <i className="fas fa-user-plus"></i> Daftar Sekarang
                    </Link>
                    <Link href="/informasi" className="btn-secondary" style={{ padding: '1rem 2.5rem', borderRadius: '50px', fontWeight: 700 }}>
                        Alur Pendaftaran
                    </Link>
                </div>
            </div>

            {/* Background Mesh/Glow for Premium Feel */}
            <div className="hero-glow-effect"></div>
        </section>
    );
}
