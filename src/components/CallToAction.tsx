import Link from 'next/link';

export default function CallToAction() {
    return (
        <section className="cta-premium-section"
            style={{
                background: "radial-gradient(circle at center, #1e3a8a 0%, #0f172a 100%)",
                position: "relative",
                marginTop: "5rem",
                padding: '8rem 2rem',
                overflow: 'hidden'
            }}>

            {/* Background Ornament */}
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', fontSize: '20rem', color: 'rgba(255,255,255,0.03)', transform: 'rotate(-20deg)' }}>
                <i className="fas fa-paper-plane"></i>
            </div>

            <div className="section-wrapper"
                style={{ textAlign: "center", color: "white", position: "relative", zIndex: 2, maxWidth: '900px', margin: '0 auto' }}>
                <div className="reveal zoom-in">
                    <span className="gold-accent-text" style={{ fontSize: '1rem', letterSpacing: '0.2em', display: 'block', marginBottom: '1rem' }}>MARI BERGABUNG</span>
                    <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 900, marginBottom: "1.5rem", fontFamily: 'var(--font-playfair)', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Siapkan Masa Depan Gemilang
                    </h2>
                    <p style={{ fontSize: "1.25rem", opacity: 0.8, maxWidth: "600px", margin: "0 auto 3rem", lineHeight: 1.8 }}>
                        Wujudkan generasi yang tidak hanya cerdas akalnya, tetapi juga luhur budinya bersama keluarga besar Pondok Pesantren Darussalam Lirboyo.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <Link href="/ppdb" className="btn-luxe btn-luxe-gold" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem' }}>
                            <i className="fas fa-rocket" style={{ marginRight: "10px" }}></i> Daftar Sekarang
                        </Link>
                        <Link href="/informasi" className="btn-luxe btn-luxe-secondary" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
                            <i className="fas fa-info-circle" style={{ marginRight: "10px" }}></i> Informasi
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
