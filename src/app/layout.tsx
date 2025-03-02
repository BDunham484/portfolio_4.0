import type { Metadata } from 'next';
// eslint-disable-next-line camelcase
import { Geist, Geist_Mono } from 'next/font/google';
import { ActiveSectionProvider } from '../context/ActiveSectionContext';
import Header from './Components/Header/Header';
// import ScrollNavigator from './Components/ScrollNavigator';
import './globals.css';
import { AnimatePresence } from 'framer-motion';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Brad Dunham: Developer',
  description: 'Brad Dunham is an innovative developer specializing in modern web technologies like Next.js, React, and TypeScript. Explore his portfolio to see creative projects that combine responsive design with clean, scalable code.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} global-bg`}>
        <ActiveSectionProvider>
          <Header />
          <AnimatePresence mode='wait' initial={false}>
            {children}
          </AnimatePresence>
          {/* <ScrollNavigator /> */}
        </ActiveSectionProvider>
      </body>
    </html>
  );
}
