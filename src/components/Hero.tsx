import Link from 'next/link';

export default function Hero() {
    return (
        <section className="hero-section" id="beranda">
            <div className="hero-content">
                <h1 className="hero-title">Pondok Pesantren<br /><span className="text-gradient">Darussalam Lirboyo</span></h1>
                <p className="hero-subtitle">Mencetak Generasi Bertakwa, Berakhlak Qur'ani dan As-Sunnah dan Berilmu dengan
                    Memadukan Tradisi Salaf dan Modern.</p>
                <div className="hero-cta-group reveal fade-bottom delay-200">
                    <Link href="/ppdb" className="btn-primary"><i className="fas fa-user-plus"></i> Daftar Sekarang</Link>
                    <Link href="/materi-ujian" className="btn-secondary">Materi Ujian</Link>
                </div>
            </div>
        </section>
    );
}
