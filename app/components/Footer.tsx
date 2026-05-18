"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-black text-gray-400">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div>
            <img src="/logo1.png" alt="Eatery Suites & Lodge" className="h-16 mb-4" />
            <p className="text-sm leading-relaxed">
              Experience luxury and comfort at Eatery Suites & Lodge. Your perfect getaway in Johannesburg.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-amber-500 transition duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="hover:text-amber-500 transition duration-300">
                  Our Rooms
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-amber-500 transition duration-300">
                  Special Offers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-500 transition duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-amber-500 transition duration-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-amber-500 transition duration-300">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt text-amber-500 mt-1"></i>
                <span>Johannesburg, South Africa</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-phone-alt text-amber-500"></i>
                <a href="tel:+27794001549" className="hover:text-amber-500 transition">
                  +27 79 400 1549
                </a>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-envelope text-amber-500"></i>
                <a href="mailto:reservations@eaterysuites.co.za" className="hover:text-amber-500 transition break-all">
                  reservations@eaterysuites.co.za
                </a>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-clock text-amber-500"></i>
                <span>24/7 Customer Support</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Stay Updated</h3>
            <p className="text-sm mb-3">Subscribe to get special offers and updates</p>
            <form onSubmit={handleSubscribe} className="mb-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-amber-500"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-semibold transition"
                >
                  Subscribe
                </button>
              </div>
            </form>
            {subscribed && (
              <p className="text-green-500 text-xs">✓ Thanks for subscribing!</p>
            )}
            
            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-white font-semibold text-sm mb-3">Follow Us</h4>
              <div className="flex gap-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-amber-500 rounded-full flex items-center justify-center transition duration-300"
                >
                  <i className="fab fa-facebook-f text-white"></i>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-amber-500 rounded-full flex items-center justify-center transition duration-300"
                >
                  <i className="fab fa-instagram text-white"></i>
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-amber-500 rounded-full flex items-center justify-center transition duration-300"
                >
                  <i className="fab fa-twitter text-white"></i>
                </a>
                <a 
                  href="https://wa.me/27794001549" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-amber-500 rounded-full flex items-center justify-center transition duration-300"
                >
                  <i className="fab fa-whatsapp text-white"></i>
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-amber-500 rounded-full flex items-center justify-center transition duration-300"
                >
                  <i className="fab fa-linkedin-in text-white"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <p>&copy; {new Date().getFullYear()} Eatery Suites & Lodge. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-amber-500 transition text-xs">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-amber-500 transition text-xs">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="hover:text-amber-500 transition text-xs">
                Sitemap
              </Link>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-xs text-gray-600 tracking-wider">
              COMFORT • HOSPITALITY • MEMORIES
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}