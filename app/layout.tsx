import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { AuthProvider } from '../contexts/AuthContext';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'A Board',
  description: 'A Board Web Application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <AuthProvider>
          <main className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
