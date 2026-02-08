"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages: Record<string, string> = {
    Configuration: "Ada masalah dengan konfigurasi server. Silakan hubungi administrator.",
    AccessDenied: "Akses ditolak. Anda tidak memiliki izin untuk mengakses halaman ini.",
    Verification: "Token verifikasi sudah kadaluarsa atau tidak valid.",
    Default: "Terjadi kesalahan saat login. Silakan coba lagi.",
  };

  const message = errorMessages[error || "Default"] || errorMessages.Default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Kesalahan Login
          </h2>
          <p className="text-gray-600 mb-6">{message}</p>
          
          {error && (
            <div className="bg-gray-50 rounded p-4 mb-6 text-left">
              <p className="text-sm text-gray-500 mb-1">Kode Error:</p>
              <p className="text-sm font-mono text-gray-800">{error}</p>
            </div>
          )}

          <div className="space-y-3">
            <Link
              href="/auth/signin"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-150"
            >
              Coba Login Lagi
            </Link>
            <Link
              href="/"
              className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition duration-150"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
