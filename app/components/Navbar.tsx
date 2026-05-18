"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/rooms', label: 'Rooms' },
    { href: '/about', label: 'About' },
    { href: '/offers', label: 'Offers' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
    router.refresh();
  };

  // Don't show navbar for admin users (they have their own layout)
  if (session?.user?.role === 'admin') {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-gray-700 hover:text-green-700 transition">
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-3">
                <Link href="./my-booking" className="text-green-900 text-sm font-medium hover:text-green-700">
                  My Bookings
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition"
                >
                  <i className="fas fa-sign-out-alt mr-1"></i>
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/auth/login" className="bg-green-900 hover:bg-green-800 text-white px-4 py-2 rounded-lg text-sm transition">
                <i className="fas fa-sign-in-alt mr-1"></i>
                Login / Register
              </Link>
            )}
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-600 text-2xl"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700">
                {link.label}
              </Link>
            ))}
            {!session && (
              <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-green-700 font-semibold">
                Login / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}