"use client";

import { signIn } from "next-auth/react";
import "@/app/styles/style.css";
import Image from "next/image";

export default function SignInPage() {
    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
            padding: "2rem"
        }}>
            <div className="glass-card" style={{
                maxWidth: "400px",
                width: "100%",
                textAlign: "center",
                padding: "3rem 2rem"
            }}>
                <Image 
                    src="https://res.cloudinary.com/dceamfy3n/image/upload/v1766596001/logo_zdenyr.png" 
                    alt="Logo" 
                    width={80}
                    height={80}
                    style={{ margin: "0 auto 2rem", objectFit: "contain" }}
                />
                <h2 style={{ marginBottom: "1rem", color: "var(--primary-dark)" }}>Pendaftaran Online</h2>
                <p style={{ marginBottom: "2.5rem", color: "var(--text-muted)", fontSize: "0.95rem" }}>
                    Silakan login menggunakan akun Google/Gmail Anda untuk memulai proses pendaftaran santri baru.
                </p>

                <button 
                    onClick={() => signIn("google", { callbackUrl: "/ppdb" })}
                    className="btn-primary"
                    style={{
                        width: "100%",
                        padding: "1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "12px",
                        fontSize: "1rem"
                    }}
                >
                    <i className="fab fa-google" style={{ fontSize: "1.2rem" }}></i>
                    Login dengan Google
                </button>

                <p style={{ marginTop: "2rem", fontSize: "0.8rem", color: "#94a3b8" }}>
                    Dengan login, Anda menyetujui ketentuan layanan dan kebijakan privasi kami.
                </p>
            </div>
        </div>
    );
}
