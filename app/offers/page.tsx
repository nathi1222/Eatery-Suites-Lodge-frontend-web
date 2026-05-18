"use client";

import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function OffersPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);

  const offers = [
    { 
      id: 1, 
      title: "Early Bird Special", 
      discount: "20% OFF", 
      description: "Book 14 days in advance and save big on your stay", 
      validUntil: "2025-12-31", 
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=600&auto=format", 
      code: "EARLY20",
      terms: "Minimum 2 nights stay. Cannot be combined with other offers.",
    },
    { 
      id: 2, 
      title: "Stay Longer, Save More", 
      discount: "1 Night Free", 
      description: "Book 3+ nights and get one night free", 
      validUntil: "2025-12-31", 
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format", 
      code: "STAY3FREE1",
      terms: "Free night applies to lowest priced night. Minimum 3 nights booking.",
    },
    { 
      id: 3, 
      title: "Honeymoon Package", 
      discount: "15% OFF", 
      description: "Romantic getaway with champagne and late checkout", 
      validUntil: "2025-12-31", 
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format", 
      code: "HONEYMOON15",
      terms: "Valid for honeymoon couples. Must provide proof of marriage.",
    },
    { 
      id: 4, 
      title: "Business Traveler", 
      discount: "10% OFF", 
      description: "Special rates for business travelers", 
      validUntil: "2025-12-31", 
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=600&auto=format", 
      code: "BUSINESS10",
      terms: "Business ID required at check-in.",
    },
    { 
      id: 5, 
      title: "Weekend Getaway", 
      discount: "25% OFF", 
      description: "Perfect weekend escape for couples", 
      validUntil: "2025-12-31", 
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format", 
      code: "WEEKEND25",
      terms: "Valid Friday to Sunday bookings only.",
    },
    { 
      id: 6, 
      title: "Group Booking", 
      discount: "30% OFF", 
      description: "Special rates for groups of 5+ rooms", 
      validUntil: "2025-12-31", 
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=600&auto=format", 
      code: "GROUP30",
      terms: "Minimum 5 rooms required. Contact group sales for details.",
    },
  ];

  const handleViewOffer = (offer: any) => {
    setSelectedOffer(offer);
    setShowModal(true);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Promo code ${code} copied to clipboard!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-64 md:h-80 bg-gradient-to-r from-green-900 to-green-800 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Special Offers</h1>
          <p className="text-base sm:text-lg md:text-xl">Exclusive deals for an unforgettable stay</p>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition group">
              <div className="relative h-48 overflow-hidden">
                <img src={offer.image} alt={offer.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {offer.discount}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-900 mb-2">{offer.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{offer.description}</p>
                <div className="mb-4 p-3 bg-gray-100 rounded-lg">
                  <p className="text-xs text-gray-500">Promo Code:</p>
                  <div className="flex items-center justify-between">
                    <code className="font-mono font-bold text-green-900 text-lg">{offer.code}</code>
                    <button 
                      onClick={() => handleCopyCode(offer.code)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <i className="fas fa-copy"></i> Copy
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-4">Valid until {offer.validUntil}</p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleViewOffer(offer)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm text-center transition"
                  >
                    View Details
                  </button>
                  <Link 
                    href="/admin/login" 
                    className="flex-1 bg-green-900 hover:bg-green-800 text-white py-2 rounded-xl text-sm text-center transition"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Offer Details Modal */}
      {showModal && selectedOffer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-48">
              <img src={selectedOffer.image} alt={selectedOffer.title} className="w-full h-full object-cover" />
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-green-900">{selectedOffer.title}</h2>
                <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">{selectedOffer.discount}</span>
              </div>
              <p className="text-gray-600 mb-4">{selectedOffer.description}</p>
              <div className="mb-4 p-3 bg-gray-100 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-2">Promo Code:</p>
                <div className="flex items-center justify-between">
                  <code className="font-mono font-bold text-green-900 text-xl">{selectedOffer.code}</code>
                  <button onClick={() => handleCopyCode(selectedOffer.code)} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">
                    Copy Code
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-1">Terms & Conditions:</p>
                <p className="text-sm text-gray-600">{selectedOffer.terms}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-1">Valid Until:</p>
                <p className="text-sm text-gray-600">{selectedOffer.validUntil}</p>
              </div>
              <Link 
                href="/admin/login" 
                className="block w-full bg-green-900 hover:bg-green-800 text-white py-3 rounded-xl font-semibold text-center transition"
              >
                Book Now with {selectedOffer.code}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Newsletter Section */}
      <section className="py-16 bg-amber-500">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Get Exclusive Offers</h2>
          <p className="mb-6">Subscribe to our newsletter and get special deals straight to your inbox</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input type="email" placeholder="Your email address" className="flex-1 px-4 py-3 rounded-xl text-gray-900 outline-none" />
            <button className="bg-green-900 hover:bg-green-800 px-6 py-3 rounded-xl font-semibold transition">Subscribe</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}