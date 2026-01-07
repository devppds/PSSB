"use client";
import { useState } from 'react';

type ClassCardProps = {
    title: string;
    materiContent: React.ReactNode;
    kurikulumContent: React.ReactNode;
    usiaMinimal?: string; // Optional
};

export default function ClassCard({ title, materiContent, kurikulumContent, usiaMinimal }: ClassCardProps) {
    const [activeTab, setActiveTab] = useState<'materi' | 'kurikulum'>('materi');

    return (
        <div className="class-card reveal fade-bottom">
            <div className="class-card-header">
                <h3>{title}</h3>
            </div>
            <div className="inner-tab-switcher">
                <button
                    className={`inner-tab-btn ${activeTab === 'materi' ? 'active' : ''}`}
                    onClick={() => setActiveTab('materi')}
                >
                    <i className="fas fa-book-open"></i> Materi Ujian
                </button>
                <button
                    className={`inner-tab-btn ${activeTab === 'kurikulum' ? 'active' : ''}`}
                    onClick={() => setActiveTab('kurikulum')}
                >
                    <i className="fas fa-scroll"></i> Kurikulum
                </button>
            </div>

            {activeTab === 'materi' && (
                <div className="inner-tab-content active">
                    {materiContent}
                </div>
            )}

            {activeTab === 'kurikulum' && (
                <div className="inner-tab-content active">
                    {kurikulumContent}
                </div>
            )}

            {usiaMinimal && (
                <div className="status-alert">
                    <i className="fas fa-user-clock"></i> Usia Minimal: <strong>{usiaMinimal}</strong>
                </div>
            )}
        </div>
    );
}
