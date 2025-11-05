import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'InstaLite',
  description: 'A lightweight Instagram-like demo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <div className="max-w-2xl mx-auto min-h-screen flex flex-col">
          <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200">
            <div className="px-4 py-3 flex items-center justify-between">
              <Link href="/" className="font-bold text-xl">InstaLite</Link>
              <nav className="flex items-center gap-4 text-sm">
                <Link href="/new" className="hover:text-brand-600">New</Link>
                <Link href="/profile/me" className="hover:text-brand-600">Profile</Link>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-gray-200 text-center text-xs py-6 text-gray-500">Built for demo purposes</footer>
        </div>
      </body>
    </html>
  );
}
