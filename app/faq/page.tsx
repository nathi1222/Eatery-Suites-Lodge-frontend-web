"use client";

import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { id: 1, question: "What time is check-in and check-out?", answer: "Check-in is from 2:00 PM and check-out is by 11:00 AM. Early check-in and late check-out can be arranged upon request subject to availability.", category: "General" },
    { id: 2, question: "Is parking available?", answer: "Yes, we offer secure, free on-site parking for all our guests with 24/7 CCTV surveillance.", category: "Facilities" },
    { id: 3, question: "Do you allow pets?", answer: "Yes, we are pet-friendly! Please notify us in advance and a small fee may apply. We provide pet beds and bowls upon request.", category: "Policies" },
    { id: 4, question: "Is breakfast included?", answer: "Breakfast packages are available as an add-on. We offer both continental and full English breakfast options served from 7:00 AM to 10:00 AM.", category: "Dining" },
    { id: 5, question: "Do you have airport shuttle service?", answer: "Yes, we offer airport transfers to/from O.R. Tambo and Lanseria airports for an additional fee. Please request at least 24 hours in advance.", category: "Transport" },
    { id: 6, question: "What payment methods do you accept?", answer: "We accept credit cards (Visa, Mastercard, American Express), bank transfers, and cash upon arrival.", category: "Payments" },
    { id: 7, question: "Is there Wi-Fi available?", answer: "Yes, free high-speed Wi-Fi is available throughout the property.", category: "Facilities" },
    { id: 8, question: "Do you have a restaurant on site?", answer: "Yes, our Eatery Food Spot offers delicious meals throughout the day, including breakfast, lunch, dinner, and 24/7 room service.", category: "Dining" },
  ];

  const categories = ['All', 'General', 'Facilities', 'Dining', 'Policies', 'Transport', 'Payments'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredFaqs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      General: 'bg-blue-100 text-blue-700',
      Facilities: 'bg-green-100 text-green-700',
      Dining: 'bg-amber-100 text-amber-700',
      Policies: 'bg-purple-100 text-purple-700',
      Transport: 'bg-cyan-100 text-cyan-700',
      Payments: 'bg-pink-100 text-pink-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-64 md:h-80 bg-gradient-to-r from-green-900 to-green-800 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-base sm:text-lg md:text-xl">Find answers to common questions about our services</p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full transition ${
                selectedCategory === cat 
                  ? 'bg-green-900 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div key={faq.id} className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-6 text-left bg-white hover:bg-gray-50 transition"
              >
                <div className="flex-1">
                  <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(faq.category)} mb-2 inline-block`}>
                    {faq.category}
                  </span>
                  <span className="font-semibold text-green-800 text-base sm:text-lg block mt-2">{faq.question}</span>
                </div>
                <i className={`fas fa-chevron-${openIndex === index ? 'up' : 'down'} text-amber-600 transition ml-4`}></i>
              </button>
              {openIndex === index && (
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  <div className="flex gap-4 mt-4 pt-4 border-t">
                    <button className="text-sm text-green-600 hover:text-green-800 flex items-center gap-1">
                      <i className="fas fa-thumbs-up"></i> Helpful
                    </button>
                    <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
                      <i className="fas fa-flag"></i> Report
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 text-center p-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl">
          <i className="fas fa-question-circle text-4xl text-green-600 mb-3"></i>
          <h3 className="text-xl font-bold text-green-900 mb-2">Still have questions?</h3>
          <p className="text-gray-600 mb-4">Contact our friendly team for personalized assistance</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact" className="inline-block bg-green-900 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-semibold transition">
              Contact Us
            </Link>
            <a href="https://wa.me/27794001549" target="_blank" className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition">
              <i className="fab fa-whatsapp mr-2"></i> WhatsApp
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}