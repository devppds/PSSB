import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Informasi Pendaftaran - PSSB Darussalam Lirboyo",
    description: "Panduan lengkap cara pendaftaran santri baru di Madrasah Hidayatul Mubtadi'in Pondok Pesantren Lirboyo secara online.",
};

export default function InformasiLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
