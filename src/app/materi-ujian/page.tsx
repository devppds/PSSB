"use client";
import "@/app/styles/materi-ujian.css";
import ClassCard from "@/components/ClassCard";
import { useEffect } from "react";

export default function MateriUjianPage() {
    useEffect(() => {
        // Animation Observer (Shared logic, could be a hook)
        const observerOptions = { threshold: 0.05, rootMargin: "0px 0px -50px 0px" };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                } else {
                    entry.target.classList.remove('active');
                }
            });
        }, observerOptions);
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, []);

    return (
        <>
            <main>
                {/* HERO SECTION */}
                <section className="materi-hero">
                    <div className="reveal fade-bottom">
                        <h1 className="hero-title" style={{ marginBottom: "1rem", color: "var(--primary-dark)" }}>Materi & <span className="text-gradient">Kurikulum</span>
                        </h1>
                        <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", maxWidth: "700px", margin: "0 auto" }}>
                            Informasi lengkap rincian materi ujian masuk, kurikulum kitab salaf, dan batas usia minimal santri.
                        </p>
                    </div>
                </section>

                {/* CONTENT SECTION */}
                <section className="section-wrapper" style={{ paddingTop: 0 }}>

                    {/* MADRASAH HIDAYATUL MUBTADI'IN (MHM) */}
                    <h2 className="materi-section-title reveal fade-left">Madrasah Hidayatul Mubtadi&apos;in <small>(MHM)</small></h2>

                    <div className="grid-3">
                        {/* KELAS I IBTIDAIYAH MHM */}
                        <ClassCard
                            title="MHM - I IBTIDAIYAH"
                            materiContent={<div className="no-exam-text">Tidak ada.</div>}
                            kurikulumContent={
                                <ul className="info-list">
                                    <li className="info-item"><i className="fas fa-check-circle"></i> CTBQ An-Nahdliyah</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Ilmu Tauhid I</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Fasholatan I</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Ilmu Akhlaq I</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Ta’limul Lughah I</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Terampil Menulis Arab dan Pegon I</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Hidayatul Mubtadi’ I</li>
                                    <li className="info-item"><i className="fas fa-graduation-cap"></i> Indo I</li>
                                    <li className="info-item"><i className="fas fa-graduation-cap"></i> Daerah I</li>
                                    <li className="info-item"><i className="fas fa-graduation-cap"></i> MTK I</li>
                                    <li className="info-item"><i className="fas fa-graduation-cap"></i> PKN I</li>
                                </ul>
                            }
                            usiaMinimal="6 tahun."
                        />

                        {/* KELAS II IBTIDAIYAH MHM */}
                        <ClassCard
                            title="MHM - II IBTIDAIYAH"
                            materiContent={<div className="no-exam-text">Tidak ada.</div>}
                            kurikulumContent={
                                <ul className="info-list">
                                    <li className="info-item"><i className="fas fa-check-circle"></i> CTBQ An-Nahdliyah</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Ilmu Tauhid II</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Hidayatul Mubtadi’ II</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Fasholatan II</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Ilmu Akhlaq II</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Ta’limul Lughah II</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Terampil Menulis Arab dan Pegon II</li>
                                    <li className="info-item"><i className="fas fa-graduation-cap"></i> Indo II</li>
                                    <li className="info-item"><i className="fas fa-graduation-cap"></i> Daerah II</li>
                                    <li className="info-item"><i className="fas fa-graduation-cap"></i> MTK II</li>
                                    <li className="info-item"><i className="fas fa-graduation-cap"></i> PKN II</li>
                                </ul>
                            }
                            usiaMinimal="7 tahun."
                        />

                        {/* KELAS III IBTIDAIYAH MHM */}
                        <ClassCard
                            title="MHM - III IBTIDAIYAH"
                            materiContent={<div className="no-exam-text">Tidak ada.</div>}
                            kurikulumContent={
                                <ul className="info-list">
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Al-Qur’an</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Tauhid Jawan</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Fasholatan III</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Hidayatul Mubtadi’ III</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Ngudi Susilo</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Tarikh Nabi Muhammad SAW</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Ro’sul Sirah</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Pegon I</li>
                                    <li className="info-item"><i className="fas fa-graduation-cap"></i> Indo III</li>
                                    <li className="info-item"><i className="fas fa-graduation-cap"></i> Daerah III</li>
                                    <li className="info-item"><i className="fas fa-graduation-cap"></i> PKN III</li>
                                    <li className="info-item"><i className="fas fa-graduation-cap"></i> Matematika III</li>
                                </ul>
                            }
                            usiaMinimal="8 tahun."
                        />

                        {/* KELAS IV IBTIDAIYAH MHM */}
                        <ClassCard
                            title="MHM - IV IBTIDAIYAH"
                            materiContent={<div className="no-exam-text">Tidak ada.</div>}
                            kurikulumContent={
                                <ul className="info-list">
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Al-Qur’an</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Zadul Mubtadi’</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Fasholatan IV</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Hidayatul Mubtadi’ IV</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Nadhmul Akhlaq Alala</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Bahasa Arab Dasar</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Tarikhul Anbiya’</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Isra’ Mi’raj</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Pegon II</li>
                                    <li className="info-item"><i className="fas fa-graduation-cap"></i> Indo IV</li>
                                    <li className="info-item"><i className="fas fa-graduation-cap"></i> Daerah IV</li>
                                    <li className="info-item"><i className="fas fa-graduation-cap"></i> PKN IV</li>
                                    <li className="info-item"><i className="fas fa-graduation-cap"></i> Matematika IV</li>
                                </ul>
                            }
                            usiaMinimal="9 tahun."
                        />

                        {/* KELAS V IBTIDAIYAH MHM */}
                        <ClassCard
                            title="MHM - V IBTIDAIYAH"
                            materiContent={
                                <>
                                    <h4 style={{ color: "var(--primary)", marginBottom: "1rem" }}>UJIAN TULIS:</h4>
                                    <ul className="info-list" style={{ marginBottom: "1.5rem" }}>
                                        <li className="info-item"><i className="fas fa-edit"></i> Tauhid (Zadul Mubtadi’)</li>
                                        <li className="info-item"><i className="fas fa-edit"></i> Fiqh (Hidayatul Mubtadi’ IV)</li>
                                        <li className="info-item"><i className="fas fa-edit"></i> Imla’ (Pegon)</li>
                                    </ul>
                                    <h4 style={{ color: "var(--primary)", marginBottom: "1rem" }}>UJIAN LISAN:</h4>
                                    <ul className="info-list">
                                        <li className="info-item"><i className="fas fa-microphone"></i> Fasholatan lengkap</li>
                                        <li className="info-item"><i className="fas fa-microphone"></i> Surat pendek (An-Naas s.d. Al-Kafirun)</li>
                                        <li className="info-item"><i className="fas fa-microphone"></i> Aqo’id 50</li>
                                    </ul>
                                </>
                            }
                            kurikulumContent={
                                <ul className="info-list">
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Al-Qur’an</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Al-Arba’in An-Nahdliyah</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> ‘Aqidatul ‘Awam</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Fathur Rohman</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Safinatun Naja</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Nadhom Al-Ajurumiyah Jawan</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Nadhmul Mathlab</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Ta’limul Lughoh Al-‘Arobiyah</li>
                                    <li className="info-item"><i className="fas fa-graduation-cap"></i> Pegon III</li>
                                    <li className="info-item"><i className="fas fa-graduation-cap"></i> Ke-NU-an I</li>
                                    <li className="info-item"><i className="fas fa-graduation-cap"></i> Indo V</li>
                                    <li className="info-item"><i className="fas fa-graduation-cap"></i> Daerah V</li>
                                    <li className="info-item"><i className="fas fa-graduation-cap"></i> MTK V</li>
                                    <li className="info-item"><i className="fas fa-graduation-cap"></i> PKN V</li>
                                </ul>
                            }
                            usiaMinimal="10 tahun."
                        />

                        <ClassCard
                            title="MHM - VI IBTIDAIYAH"
                            materiContent={
                                <>
                                    <h4 style={{ color: "var(--primary)", marginBottom: "1rem" }}>UJIAN TULIS:</h4>
                                    <ul className="info-list" style={{ marginBottom: "1.5rem" }}>
                                        <li className="info-item"><i className="fas fa-edit"></i> Fiqh (Safinatun Naja)</li>
                                        <li className="info-item"><i className="fas fa-edit"></i> Tauhid (‘Aqidatul ‘Awam)</li>
                                        <li className="info-item"><i className="fas fa-edit"></i> Nadzom Al-Ajurumiyah Jawan</li>
                                        <li className="info-item"><i className="fas fa-edit"></i> Imla’ (Pegon)</li>
                                    </ul>
                                    <h4 style={{ color: "var(--primary)", marginBottom: "1rem" }}>UJIAN LISAN:</h4>
                                    <ul className="info-list">
                                        <li className="info-item"><i className="fas fa-microphone"></i> Fasholatan lengkap</li>
                                        <li className="info-item"><i className="fas fa-microphone"></i> Surat pendek (An-Naas s.d. Al-Quraisy)</li>
                                        <li className="info-item"><i className="fas fa-microphone"></i> Aqo’id 50</li>
                                    </ul>
                                </>
                            }
                            kurikulumContent={
                                <ul className="info-list">
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Al-Qur’an</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Mukhtarul Hadits As-Syarif</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Taisirul Kholaq</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Tanwirul Hija</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Matnu Al-Ajurumiyah</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Al-‘Awamil</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Qoidah Natsar</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Al-Amtsilah At-Tashrifiyah</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Zaaduththulab</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Hidayatus Shibyan</li>
                                    <li className="info-item"><i className="fas fa-graduation-cap"></i> Ke-NU-an II</li>
                                    <li className="info-item"><i className="fas fa-graduation-cap"></i> PKN VI</li>
                                </ul>
                            }
                            usiaMinimal="11 tahun."
                        />

                        <ClassCard
                            title="MHM - I TSANAWIYAH"
                            materiContent={
                                <>
                                    <h4 style={{ color: "var(--primary)", marginBottom: "1rem" }}>UJIAN TULIS:</h4>
                                    <ul className="info-list" style={{ marginBottom: "1.5rem" }}>
                                        <li className="info-item"><i className="fas fa-edit"></i> Shorof (Qo’idah Natsar)</li>
                                        <li className="info-item"><i className="fas fa-edit"></i> Nahwu (Matnu Al-Ajurumiyah)</li>
                                        <li className="info-item"><i className="fas fa-edit"></i> Imla’ (Pegon)</li>
                                    </ul>
                                    <h4 style={{ color: "var(--primary)", marginBottom: "1rem" }}>UJIAN LISAN:</h4>
                                    <ul className="info-list">
                                        <li className="info-item"><i className="fas fa-microphone"></i> Asy-Syamsy</li>
                                        <li className="info-item"><i className="fas fa-microphone"></i> Aqo’id 50</li>
                                        <li className="info-item"><i className="fas fa-microphone"></i> Tashrif bab I–VI</li>
                                        <li className="info-item"><i className="fas fa-microphone"></i> Fasholatan lengkap</li>
                                        <li className="info-item"><i className="fas fa-microphone"></i> Surat An-Naas s.d. At-Takatsur</li>
                                    </ul>
                                </>
                            }
                            kurikulumContent={
                                <ul className="info-list">
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Al-Qur’an</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Al-Arba’in An-Nawawiyah</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Matnu Ibrohim Al-Bajuri</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Sullamut Taufiq</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Al-Ajurumiyah</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Al-Qowa’id As-Shorfiyah</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Al-Amtsilah At-Tashrifiyah</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Al-I’lal</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Tuhfatul Athfal</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Fathul Mubin I</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Washoya</li>
                                    <li className="info-item"><i className="fas fa-graduation-cap"></i> Ke-NU-an III</li>
                                </ul>
                            }
                            usiaMinimal="12 tahun."
                        />

                        <ClassCard
                            title="MHM - ALIYAH"
                            materiContent={
                                <>
                                    <h4 style={{ color: "var(--primary)", marginBottom: "1rem" }}>UJIAN TULIS:</h4>
                                    <ul className="info-list" style={{ marginBottom: "1.5rem" }}>
                                        <li className="info-item"><i className="fas fa-edit"></i> Nahwu (Nadzom Al-‘Amrithi)</li>
                                        <li className="info-item"><i className="fas fa-edit"></i> Shorof (Nadzom Al-Maqshud & Amtsilah At-Tashrifiyah)
                                        </li>
                                        <li className="info-item"><i className="fas fa-edit"></i> Imla’ (Arab)</li>
                                    </ul>
                                    <h4 style={{ color: "var(--primary)", marginBottom: "1rem" }}>UJIAN LISAN:</h4>
                                    <ul className="info-list">
                                        <li className="info-item"><i className="fas fa-microphone"></i> Membaca Fathul Qorib</li>
                                        <li className="info-item"><i className="fas fa-microphone"></i> Hafalan Alfiyah Ibnu Malik 350 bait</li>
                                        <li className="info-item"><i className="fas fa-microphone"></i> Uji Fasholatan lengkap</li>
                                    </ul>
                                </>
                            }
                            kurikulumContent={
                                <ul className="info-list">
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Tafsir (Tafsirul Jalalain)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Hadits (Riyadlus Sholihin)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Ilmu Hadits (al-Qowaidul Asasiyah fi Ilmi Hadits)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Ilmu Tauhid (Jauharoh at-Tauhid)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Ilmu Fiqh (Fathul Mu&apos;in)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Ushul Fiqh (Mabadi&apos; Ushul Fiqh wa Qowaidihi, al-Waroqot)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Ilmu Nahwu (Alfiyah Ibnu Malik, Qawa&apos;idul I&apos;rob, al-I&apos;rob)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Ilmu Akhlaq (Ta&apos;limul Muta&apos;allim)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Tarikh (Manaqib Aimmatil Arba&apos;ah)</li>
                                </ul>
                            }
                            usiaMinimal="15 tahun."
                        />

                        <ClassCard
                            title="MADRASAH I'DADIYAH (PERSIAPAN MHM)"
                            materiContent={<div className="no-exam-text">-</div>}
                            kurikulumContent={
                                <div className="grid-2">
                                    <ul className="info-list">
                                        <li className="info-item"><i className="fas fa-check-circle"></i> Al-Qur&apos;an</li>
                                        <li className="info-item"><i className="fas fa-check-circle"></i> Hadits (Arba&apos;in An-Nawawi)</li>
                                        <li className="info-item"><i className="fas fa-check-circle"></i> Mukhtarul Hadits As-Syarif</li>
                                        <li className="info-item"><i className="fas fa-check-circle"></i> Tauhid (Matnu Sanusi)</li>
                                        <li className="info-item"><i className="fas fa-check-circle"></i> Tauhid (Matnu Bajuri)</li>
                                        <li className="info-item"><i className="fas fa-check-circle"></i> Tauhid (&apos;Aqidatul &apos;Awam)</li>
                                        <li className="info-item"><i className="fas fa-check-circle"></i> Fiqh (Fathul Qorib)</li>
                                        <li className="info-item"><i className="fas fa-check-circle"></i> Fiqh (Sullamut Taufiq)</li>
                                        <li className="info-item"><i className="fas fa-check-circle"></i> Fiqh (Safinatun Naja)</li>
                                        <li className="info-item"><i className="fas fa-check-circle"></i> Nahwu (Al-Amrithi)</li>
                                        <li className="info-item"><i className="fas fa-check-circle"></i> Nahwu (Al-Ajurumiyah)</li>
                                        <li className="info-item"><i className="fas fa-check-circle"></i> Nahwu (Al-&apos;Awamil)</li>
                                    </ul>
                                    <ul className="info-list">
                                        <li className="info-item"><i className="fas fa-check-circle"></i> Shorof (Al-Maqshud)</li>
                                        <li className="info-item"><i className="fas fa-check-circle"></i> Shorof (Amtsilah At-Tashrifiyah)</li>
                                        <li className="info-item"><i className="fas fa-check-circle"></i> Shorof (Al-I’lal)</li>
                                        <li className="info-item"><i className="fas fa-check-circle"></i> Akhlaq (Tahliyah wa Targhib)</li>
                                        <li className="info-item"><i className="fas fa-check-circle"></i> Akhlaq (Taisirul Kholaq)</li>
                                        <li className="info-item"><i className="fas fa-check-circle"></i> Akhlaq (Nadhmul Mathlab)</li>
                                        <li className="info-item"><i className="fas fa-check-circle"></i> Tajwid (Tuhfatul Athfal)</li>
                                        <li className="info-item"><i className="fas fa-check-circle"></i> Tajwid (Hidayatus Shibyan)</li>
                                        <li className="info-item"><i className="fas fa-check-circle"></i> Ilmu Imla&apos; Arab</li>
                                        <li className="info-item"><i className="fas fa-check-circle"></i> Kitabah Pegon</li>
                                    </ul>
                                </div>
                            }
                        />
                    </div>

                    {/* MA'HAD ALY SECTION */}
                    <h2 className="materi-section-title reveal fade-left">Ma’had Aly <small>(Lirboyo)</small></h2>
                    <div className="grid-2">
                        <ClassCard
                            title="MA'HAD ALY - MARHALAH ULA"
                            materiContent={
                                <>
                                    <h4 style={{ color: "var(--primary)", marginBottom: "0.5rem", fontSize: "0.95rem" }}>UJIAN TULIS:</h4>
                                    <ul className="info-list" style={{ marginBottom: "1rem" }}>
                                        <li className="info-item"><i className="fas fa-edit"></i> Balaghah (Al-Jauharul Maknun)</li>
                                        <li className="info-item"><i className="fas fa-edit"></i> Nahwu Shorof (Alfiyah Ibn Malik)</li>
                                        <li className="info-item"><i className="fas fa-edit"></i> Ushul Fiqh (Lubbul Ushul)</li>
                                        <li className="info-item"><i className="fas fa-edit"></i> Imla&apos; (Arab)</li>
                                    </ul>
                                    <h4 style={{ color: "var(--primary)", marginBottom: "0.5rem", fontSize: "0.95rem" }}>UJIAN LISAN:</h4>
                                    <ul className="info-list">
                                        <li className="info-item"><i className="fas fa-microphone"></i> Fiqh (membaca Fathul Mu’in)</li>
                                        <li className="info-item"><i className="fas fa-microphone"></i> Hafalan Qur&apos;an (Juz 1)</li>
                                        <li className="info-item"><i className="fas fa-microphone"></i> Hadits Jami’ul ‘Ulum (1-25)</li>
                                        <li className="info-item"><i className="fas fa-microphone"></i> Fasholatan lengkap</li>
                                        <li className="info-item"><i className="fas fa-microphone"></i> ‘Aqo’id 50</li>
                                    </ul>
                                </>
                            }
                            kurikulumContent={
                                <ul className="info-list">
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Tafsir (Muhtashor Tafsir Ayatil Ahkam)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Ilmu Tafsir (At-Tahbir)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Hadits (Tahdzibut Targhib Wat Tarhib)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Ilmu Hadits (Alfiyah Suyuthi)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Hadits Ahkam (‘Umdatul Ahkam)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Ilmu Tauhid (Mafahim YA)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Ilmu Fiqh (Al-Mahalli)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Fiqh Muwathonah (Fikih Kebangsaan)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Ushul Fiqh (Syarhu Jam’il Jawami’)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Qoidah Ushuliyah wa Fiqhiyah (Muhtashor min Qowa’idul ‘Alla’i wa Kalaamil Asnawi)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Ilmu Akhlaq (Mauidhotul Mu'minin)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Salalimul Fudlola&apos;</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Aswaja (Risalah Aswaja)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Kawakibul Lama’ah</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Ilmu Balaghah (‘Uqudul Juman)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Ilmu Falak (Tashilul Amtsilah)</li>
                                </ul>
                            }
                        />

                        <ClassCard
                            title="MA'HAD ALY - MARHALAH TSANIYAH"
                            materiContent={
                                <>
                                    <h4 style={{ color: "var(--primary)", marginBottom: "1rem" }}>UJIAN TULIS:</h4>
                                    <ul className="info-list" style={{ marginBottom: "1.5rem" }}>
                                        <li className="info-item"><i className="fas fa-edit"></i> Fikih Kebangsaan (2 soal uraian)</li>
                                    </ul>
                                    <h4 style={{ color: "var(--primary)", marginBottom: "1rem" }}>UJIAN LISAN:</h4>
                                    <ul className="info-list">
                                        <li className="info-item"><i className="fas fa-microphone"></i> Kitab Kanzurroghibin (Syarh Al-Mahalli ‘alal Minhaj)</li>
                                        <li className="info-item"><i className="fas fa-microphone"></i> Munaqosyah Fikih Kebangsaan</li>
                                        <li className="info-item"><i className="fas fa-microphone"></i> Psikotest</li>
                                        <li className="info-item"><i className="fas fa-microphone"></i> Hafalan Qur&apos;an 3 juz*</li>
                                        <li className="info-item"><i className="fas fa-microphone"></i> Hafalan 150 Hadits Jami’ul ‘Ulum*</li>
                                    </ul>
                                    <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "1rem" }}>*Bagi mahasantri baru non-lulusan
                                        Marhalah Ula Ma'had Aly Lirboyo</p>
                                </>
                            }
                            kurikulumContent={
                                <ul className="info-list">
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Tafsir (Rowa&apos;iul Bayan)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Ilmu Tafsir (Al-Itqon Fi Ulum Al-Qur&apos;an)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Hadits (Syarah Umdatul Ahkam)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Ilmu Hadits (Muqoddimah ibn Sholah)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Fiqh Muwathonah (Nasjul Wi&apos;am Wata&apos;shilil Wahdah al ijtima&apos;iyah)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Fiqh Muwathonah (Nasyru Rahmatil Islam)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Fiqh Muwathonah (Al Jihad wa Wathoniyatu Ghoiril Muslim)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Ushul Fiqh (Al-Kaukab As-Sathi’)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Qoidah Ushuliyah wa Fiqhiyah (Qowaidul Ahkam)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Ilmu Akhlaq (Metode Penelitian)</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Metode Penelitian</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Sejarah Peradaban Islam</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Sosiologi</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Psikologi Islam</li>
                                    <li className="info-item"><i className="fas fa-check-circle"></i> Pengantar Filsafat Islam</li>
                                </ul>
                            }
                        />
                    </div>

                    {/* MADRASAH IHYA' ULUMIDDIN (MIU) */}
                    <h2 className="materi-section-title reveal fade-left">Madrasah Ihya' Ulumiddin <small>(MIU)</small></h2>
                    <div className="grid-3">
                        <ClassCard
                            title="MIU - Kelas I Ula"
                            materiContent={<div className="no-exam-text">Tanpa ujian.</div>}
                            kurikulumContent={<div className="no-exam-text">Sesuai kurikulum MIU.</div>}
                        />
                    </div>

                </section>
            </main>
        </>
    );
}
