import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  theme: {
    colorScheme: 'light',
    // brandColor: "", // Hex color code
    // logo: "", // Absolute URL to image
    // buttonText: "" // Hex color code
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
