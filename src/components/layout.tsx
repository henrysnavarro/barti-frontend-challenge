'use client';
import React from 'react';
import AppBar from './app-bar';
import Footer from './footer';
import useAppState from '@/hooks/useAppState';
import useFetch from '@/hooks/useFetch';

/**
 * Layout component that wraps the application with a consistent
 * structure including an AppBar and Footer. This top layout component
 * is a pattern used for NextJS web applications.
 *
 * @param {Readonly<{ children: React.ReactNode }>} props - The children nodes to be rendered within the layout.
 * @returns {JSX.Element} The complete layout with the provided children.
 */
const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  useFetch();
  const appState = useAppState();
  return (
    <div className="flex flex-col w-full h-full items-center justify-items-center min-h-screen p-6 pt-0 pb-10 font-[family-name:var(--font-geist-sans)]">
      <AppBar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
