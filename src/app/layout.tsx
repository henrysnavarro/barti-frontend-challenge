'use client';

import localFont from 'next/font/local';
import './globals.css';
import Layout from '@/components/layout';

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

/**
 * The RootLayout component is the top-level component of a NextJS application.
 * It wraps the entire application with a consistent structure, including
 * an HTML document with a body that contains the Layout component.
 * The Layout component is a pattern used for NextJS web applications.
 *
 * @param {Readonly<{ children: React.ReactNode }>} props - The children nodes to be rendered within the layout.
 * @returns {JSX.Element} The complete root layout with the provided children.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
