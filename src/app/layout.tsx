import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NextAuthProvider from './context/NextAuthProvider';
import { ProtectedLayout } from './components/layouts/ProtectedLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Workflow App',
  description:
    'A simple workflow application that helps to make outgoing API calls',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <NextAuthProvider>
          <ProtectedLayout>{children}</ProtectedLayout>
        </NextAuthProvider>
      </body>
    </html>
  );
}
