"use client";
import { useState, useEffect } from 'react';
import Hero from './Hero';
import VisiMisi from './VisiMisi';
import ProfilSejarah from './ProfilSejarah';
import VideoProfil from './VideoProfil';
import ProgramUnggulan from './ProgramUnggulan';
import ProgramTambahan from './ProgramTambahan';
import Ekstrakurikuler from './Ekstrakurikuler';
import RincianPembayaran from './RincianPembayaran';
import CallToAction from './CallToAction';
import GalleryModal from './GalleryModal';

export default function HomeClient() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState({ isOpen: false, title: '', images: [] as string[] });

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const res = await fetch('/api/content/all');
                const json = await res.json();
                setData(json);
            } catch (err) {
                console.error("Gagal load data home", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();

        // Animation Logic
        const observerOptions = { threshold: 0.05, rootMargin: "0px 0px -50px 0px" };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('active');
                else entry.target.classList.remove('active');
            });
        }, observerOptions);

        if (!loading) {
            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        }
    }, [loading]);

    const openGallery = (title: string) => {
        const imgs = data?.gallery?.[title] || ['https://res.cloudinary.com/dceamfy3n/image/upload/v1766596060/pendidikan_cuvjxk.webp'];
        setModal({ isOpen: true, title, images: imgs });
    };

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-body)' }}>
                <i className="fas fa-spinner fa-spin fa-3x" style={{ color: 'var(--primary)' }}></i>
            </div>
        );
    }

    return (
        <>
            <Hero settings={data?.settings} />
            <VisiMisi text={data?.settings?.visi_text} list={data?.content?.misi} />
            <ProfilSejarah history={data?.settings?.about_history} />
            <VideoProfil url={data?.settings?.video_url} />
            <ProgramUnggulan onOpenGallery={openGallery} list={data?.content?.['program-unggulan']} />
            <ProgramTambahan onOpenGallery={openGallery} list={data?.content?.['program-tambahan']} />
            <Ekstrakurikuler list={data?.content?.ekskul} />
            <RincianPembayaran data={data?.content} />
            <CallToAction settings={data?.settings} />
            <GalleryModal isOpen={modal.isOpen} onClose={() => setModal({ ...modal, isOpen: false })} title={modal.title} images={modal.images} />
        </>
    );
}
