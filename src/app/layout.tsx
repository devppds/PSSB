
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/app/globals.css";
import "@/app/styles/style.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"]
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800"]
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/content/settings`, { cache: 'no-store' });
    const settings = await res.json();
    return {
      title: settings.meta_title || "Pondok Pesantren Darussalam Lirboyo",
      description: settings.meta_description || "Mencetak Generasi Bertakwa, Berakhlak Qur'ani dan As-Sunnah...",
    };
  } catch (e) {
    return {
      title: "Pondok Pesantren Darussalam Lirboyo",
      description: "Mencetak Generasi Bertakwa, Berakhlak Qur'ani dan As-Sunnah...",
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
