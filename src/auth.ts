import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  debug: false, // Set ke true jika ingin lihat log detail
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnPpdb = nextUrl.pathname.startsWith("/ppdb");
      if (isOnPpdb) {
        if (isLoggedIn) return true;
        return false;
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error", // Halaman error kustom
  },
});
