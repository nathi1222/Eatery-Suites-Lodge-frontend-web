"use client";

import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="relative h-64 md:h-80 bg-gradient-to-r from-green-900 to-green-800 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-base sm:text-lg md:text-xl">We'd love to hear from you</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-green-900 mb-6">Get in Touch</h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <i className="fas fa-map-marker-alt text-2xl text-amber-500"></i>
                <div><p className="font-semibold">Address</p><p className="text-gray-600">Johannesburg, South Africa</p></div>
              </div>
              <div className="flex items-start gap-4">
                <i className="fas fa-phone-alt text-2xl text-amber-500"></i>
                <div><p className="font-semibold">Phone</p><p className="text-gray-600">+27 79 400 1549</p></div>
              </div>
              <div className="flex items-start gap-4">
                <i className="fas fa-envelope text-2xl text-amber-500"></i>
                <div><p className="font-semibold">Email</p><p className="text-gray-600">reservations@eaterysuites.co.za</p></div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden h-64">
              <iframe className="w-full h-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229173.2263848952!2d27.918863219369305!3d-26.174090399999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950c1e8e7e7e7f%3A0x2b8b8b8b8b8b8b8b!2sJohannesburg!5e0!3m2!1sen!2sza!4v1700000000000!5m2!1sen!2sza" allowFullScreen loading="lazy" title="Location"></iframe>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-green-900 mb-6">Send us a Message</h2>
            {submitted && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-xl text-sm">
                Thank you! We'll get back to you soon.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Full Name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none" />
              <input type="email" placeholder="Email Address" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none" />
              <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none" />
              <textarea rows={5} placeholder="Message" required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"></textarea>
              <button type="submit" className="w-full bg-green-900 hover:bg-green-800 text-white py-3 rounded-xl font-semibold transition">Send Message</button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}