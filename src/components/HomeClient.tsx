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

const galleryData: { [key: string]: string[] } = {
    "Bahtsul Masa'il": [
        "https://res.cloudinary.com/dceamfy3n/image/upload/v1766710616/BAHSTU_2_llh7iy.webp",
        "https://res.cloudinary.com/dceamfy3n/image/upload/v1766710605/BAHSTU_3_z4rxnv.webp",
        "https://res.cloudinary.com/dceamfy3n/image/upload/v1766710621/BAHSTU_lfvf3u.webp"
    ],
    "Kitab Kuning": [
        "https://res.cloudinary.com/dceamfy3n/image/upload/v1766710610/NGAJI_1_oshwpt.webp",
        "https://res.cloudinary.com/dceamfy3n/image/upload/v1766710606/NGAJI_dmoez6.webp",
        "https://res.cloudinary.com/dceamfy3n/image/upload/v1766710607/JAM_IYYAH_1_tuvkbi.webp"
    ],
    "Ziaroh Wali & Ulama": [
        "https://res.cloudinary.com/dceamfy3n/image/upload/v1766710632/ZIAROH_ellm9c.webp",
        "https://res.cloudinary.com/dceamfy3n/image/upload/v1766710620/ZIAROH_3_c0y56r.webp",
        "https://res.cloudinary.com/dceamfy3n/image/upload/v1766710619/ZIAROH_4_uyk0ek.webp"
    ],
    "Takhossus Arab (Nahwu Shorof)": [
        "https://res.cloudinary.com/dceamfy3n/image/upload/v1766710601/UJIAN_2_bnjzxh.webp",
        "https://res.cloudinary.com/dceamfy3n/image/upload/v1766710613/UJIAN_1_klqwqz.webp",
        "https://res.cloudinary.com/dceamfy3n/image/upload/v1766710614/UJIAN_oa3ucc.webp"
    ],
    "Pengajian Bandongan/Kilatan": [
        "https://res.cloudinary.com/dceamfy3n/image/upload/v1766710610/NGAJI_1_oshwpt.webp",
        "https://res.cloudinary.com/dceamfy3n/image/upload/v1766710606/NGAJI_dmoez6.webp",
        "https://res.cloudinary.com/dceamfy3n/image/upload/v1766710607/JAM_IYYAH_1_tuvkbi.webp"
    ],
    "Bahtsul Masa'il Kubro": [
        "https://res.cloudinary.com/dceamfy3n/image/upload/v1766710616/BAHSTU_2_llh7iy.webp",
        "https://res.cloudinary.com/dceamfy3n/image/upload/v1766710605/BAHSTU_3_z4rxnv.webp",
        "https://res.cloudinary.com/dceamfy3n/image/upload/v1766710621/BAHSTU_lfvf3u.webp"
    ]
};

export default function HomeClient() {
    const [modal, setModal] = useState({ isOpen: false, title: '', images: [] as string[] });

    const openGallery = (title: string) => {
        const imgs = galleryData[title] || ['https://res.cloudinary.com/dceamfy3n/image/upload/v1766596060/pendidikan_cuvjxk.webp'];
        setModal({ isOpen: true, title, images: imgs });
    };

    useEffect(() => {
        // Animation Logic
        const observerOptions = {
            threshold: 0.05,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                } else {
                    entry.target.classList.remove('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });
    }, []);

    return (
        <>
            <Hero />
            <VisiMisi />
            <ProfilSejarah />
            <VideoProfil />
            <ProgramUnggulan onOpenGallery={openGallery} />
            <ProgramTambahan onOpenGallery={openGallery} />
            <Ekstrakurikuler />
            <RincianPembayaran />
            <CallToAction />
            <GalleryModal isOpen={modal.isOpen} onClose={() => setModal({ ...modal, isOpen: false })} title={modal.title} images={modal.images} />
        </>
    );
}
