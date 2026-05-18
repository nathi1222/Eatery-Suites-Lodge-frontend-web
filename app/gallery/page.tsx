"use client";

import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [category, setCategory] = useState('all');

  const images = [
    { id: 1, src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format", title: "Luxury Suite", category: "Rooms", description: "Elegant bedroom with modern amenities" },
    { id: 2, src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format", title: "Deluxe Bedroom", category: "Rooms", description: "Spacious room with city view" },
    { id: 3, src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&auto=format", title: "Executive Suite", category: "Rooms", description: "Premium suite with panoramic views" },
    { id: 4, src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format", title: "Family Suite", category: "Rooms", description: "Perfect for families" },
    { id: 5, src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800&auto=format", title: "Presidential Suite", category: "Rooms", description: "Ultimate luxury experience" },
    { id: 6, src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format", title: "Fine Dining", category: "Dining", description: "Exquisite culinary experience" },
    { id: 7, src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format", title: "Lobby Lounge", category: "Facilities", description: "Elegant waiting area" },
    { id: 8, src: "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=800&auto=format", title: "Swimming Pool", category: "Facilities", description: "Outdoor heated pool" },
    { id: 9, src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800&auto=format", title: "Spa", category: "Facilities", description: "Relaxing spa treatments" },
  ];

  const filteredImages = category === 'all' ? images : images.filter(img => img.category === category);
  const categories = ['all', 'Rooms', 'Dining', 'Facilities'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-64 md:h-80 bg-gradient-to-r from-green-900 to-green-800 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
          <p className="text-base sm:text-lg md:text-xl">Explore the beauty of Eatery Suites & Lodge</p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="sticky top-16 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2 rounded-full transition ${
                  category === cat 
                    ? 'bg-green-900 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat === 'all' ? 'All Photos' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div 
              key={image.id} 
              className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative overflow-hidden h-64">
                <img 
                  src={image.src} 
                  alt={image.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <i className="fas fa-search-plus text-white text-3xl"></i>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-green-900">{image.title}</h3>
                <p className="text-sm text-gray-500">{image.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white text-3xl hover:text-amber-500 transition"
            >
              &times;
            </button>
            <img src={selectedImage.src} alt={selectedImage.title} className="w-full rounded-lg shadow-2xl" />
            <div className="mt-4 text-white text-center">
              <h3 className="text-xl font-bold">{selectedImage.title}</h3>
              <p className="text-gray-300 mt-1">{selectedImage.description}</p>
              <p className="text-sm text-gray-400 mt-2">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}