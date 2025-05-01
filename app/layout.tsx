import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Multi-Search',
  description: 'Search across multiple APIs',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
