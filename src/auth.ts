import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnPpdb = nextUrl.pathname.startsWith("/ppdb");
      if (isOnPpdb) {
        if (isLoggedIn) return true;
        return false; // Redirect to login
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});
