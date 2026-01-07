import Link from 'next/link';

export default function CallToAction() {
    return (
        <section className="cta-premium-section"
            style={{ background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)", position: "relative", marginTop: "5rem" }}>
            <div className="section-wrapper"
                style={{ padding: "6rem 2rem", textAlign: "center", color: "white", position: "relative", zIndex: 2 }}>
                <div className="reveal zoom-in">
                    <h2
                        style={{ fontSize: "3rem", fontWeight: 900, marginBottom: "1.5rem", color: "white", textShadow: "0 10px 20px rgba(0,0,0,0.1)" }}>
                        Mari Bergabung Bersama Kami</h2>
                    <p style={{ fontSize: "1.25rem", opacity: 0.9, maxWidth: "600px", margin: "0 auto 3rem", lineHeight: 1.8 }}>
                        Wujudkan masa depan cerah putra-putri Anda dengan pendidikan salafiyah yang berkualitas di era modern.
                    </p>
                    <Link href="/ppdb" className="btn-primary"
                        style={{ background: "#ffffff", color: "var(--primary)", padding: "1.25rem 3rem", fontSize: "1.2rem", borderRadius: "50px", boxShadow: "0 15px 35px rgba(0,0,0,0.2)", border: "none" }}>
                        <i className="fas fa-rocket" style={{ marginRight: "10px" }}></i> Daftar Online Sekarang
                    </Link>
                </div>
            </div>
        </section>
    )
}
