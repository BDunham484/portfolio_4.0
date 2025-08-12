import type { Metadata } from 'next';
// eslint-disable-next-line camelcase
import { Geist, Geist_Mono } from 'next/font/google';
import { SpaceInvadersProvider } from '../context/SpaceInvadersContext';
import FramerMotionWrapper from './Components/FramerMotionWrapper';
import Header from './Components/Header/Header';
import './globals.css';
import GhostGrid from './Components/GhostGrid/GhostGrid';

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
    <SpaceInvadersProvider>
      <html lang='en'>
        <body className={`${geistSans.variable} ${geistMono.variable} global-bg`}>
          <GhostGrid />
          <Header />
          <FramerMotionWrapper>
            {children}
          </FramerMotionWrapper>
        </body>
      </html>
    </SpaceInvadersProvider>
  );
}
