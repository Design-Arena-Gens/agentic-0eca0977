"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export function Navbar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  return (
    <nav className="flex gap-6 text-sm">
      {[
        { href: '/', label: 'Feed' },
        { href: '/new', label: 'New' },
        { href: '/profile/me', label: 'Profile' },
      ].map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={clsx('hover:text-brand-600', isActive(item.href) && 'text-brand-700 font-medium')}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
