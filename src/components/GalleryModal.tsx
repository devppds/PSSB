"use client";
import { useEffect } from 'react';

type GalleryModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    images: string[];
};

export default function GalleryModal({ isOpen, onClose, title, images }: GalleryModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div id="gallery-modal" className="modal-overlay active" onClick={onClose} style={{ display: 'flex' }}>
            <button className="close-modal" onClick={onClose}>&times;</button>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3 id="modal-title" className="modal-title">{title}</h3>
                <div id="modal-image-container" className="gallery-container">
                    {images.map((src, i) => (
                        <img key={i} src={src} alt={title} className="gallery-item-img" />
                    ))}
                </div>
            </div>
        </div>
    )
}
