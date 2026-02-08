import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    // Menggunakan cara otomatis agar lebih stabil di Cloudflare Edge
    Google,
  ],
  // Wajib untuk Cloudflare
  trustHost: true,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnPpdb = nextUrl.pathname.startsWith("/ppdb");
      if (isOnPpdb) {
        if (isLoggedIn) return true;
        return false; // Redirect ke sign-in
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});
