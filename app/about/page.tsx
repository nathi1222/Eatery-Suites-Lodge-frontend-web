"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { value: "500+", label: "Happy Guests", icon: "fa-smile" },
    { value: "5", label: "Luxury Suites", icon: "fa-bed" },
    { value: "24/7", label: "Guest Support", icon: "fa-headset" },
    { value: "4.8★", label: "Guest Rating", icon: "fa-star" },
  ];

  const values = [
    {
      title: "Excellence",
      description: "We strive for perfection in everything we do, from room cleanliness to guest service.",
      icon: "fa-trophy",
      color: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    {
      title: "Integrity",
      description: "Honesty and transparency guide our actions and business practices.",
      icon: "fa-handshake",
      color: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Innovation",
      description: "Continuously improving our services with modern amenities and technology.",
      icon: "fa-lightbulb",
      color: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Hospitality",
      description: "Warm, personalized service that makes every guest feel at home.",
      icon: "fa-heart",
      color: "bg-pink-50",
      iconColor: "text-pink-600",
    },
  ];

  const team = [
    {
      name: "Lungiswa Ndaba",
      role: "Founder",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format",
      bio: "15+ years of hospitality experience",
    },
    {
      name: "Nkosinathi Ndaba",
      role: "Operations Director",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format",
      bio: "Expert in luxury guest experiences",
    },
    {
      name: "Rupert Nzama",
      role: "Executive Chef",
      image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=300&auto=format",
      bio: "Award-winning culinary artist",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-r from-green-900 to-green-800 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="text-center text-white px-4 z-10 animate-fadeIn">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">About Us</h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto">
            Discover the story behind Eatery Suites & Lodge
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <p className="uppercase tracking-[0.3em] text-amber-600 font-semibold mb-2 text-sm">Our Story</p>
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">A Legacy of Excellence</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded by <span className="font-semibold text-green-700">Lungiswa Ndaba</span>, Eatery Suites & Lodge was born from a vision to create a sanctuary where modern luxury meets genuine hospitality. 
              Located in the heart of Johannesburg, our establishment offers a unique blend of comfort, style, and exceptional service.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              With over 15 years of experience in the hospitality industry, Lungiswa has assembled a team of dedicated professionals 
              who share her passion for creating unforgettable guest experiences. From our operations director to our award-winning executive chef, 
              every team member is committed to excellence.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Since our opening, we've welcomed thousands of guests from around the world, each leaving with unforgettable memories. 
              Our commitment to excellence has earned us recognition as one of the premier lodging destinations in South Africa.
            </p>
          </div>
          <div className={`rounded-2xl overflow-hidden shadow-xl transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <img 
              src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format" 
              alt="Eatery Suites & Lodge" 
              className="w-full h-[400px] object-cover hover:scale-105 transition duration-500"
            />
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-r from-green-900 to-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center text-white transform hover:scale-110 transition duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <i className={`fas ${stat.icon} text-4xl mb-3 text-amber-400`}></i>
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="uppercase tracking-[0.3em] text-amber-600 font-semibold mb-2 text-sm">Core Values</p>
            <h2 className="text-3xl md:text-4xl font-bold text-green-900">What We Stand For</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-3 rounded-full"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Our values guide everything we do, from guest interactions to business decisions
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={index}
                className={`${value.color} rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                <div className={`w-16 h-16 ${value.iconColor} bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md`}>
                  <i className={`fas ${value.icon} text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="uppercase tracking-[0.3em] text-amber-600 font-semibold mb-2 text-sm">Our Leadership</p>
            <h2 className="text-3xl md:text-4xl font-bold text-green-900">Meet The Team</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-3 rounded-full"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Dedicated professionals committed to making your stay exceptional
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={index}
                className="group bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden h-80">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-center pb-6">
                    <div className="flex gap-3">
                      <a href="#" className="bg-white rounded-full p-2 hover:bg-amber-500 transition">
                        <i className="fab fa-linkedin-in text-gray-800 hover:text-white text-sm"></i>
                      </a>
                      <a href="#" className="bg-white rounded-full p-2 hover:bg-amber-500 transition">
                        <i className="fab fa-twitter text-gray-800 hover:text-white text-sm"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-green-900 mb-1">{member.name}</h3>
                  <p className="text-amber-600 font-semibold text-sm mb-2">{member.role}</p>
                  <p className="text-gray-500 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Message Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-amber-500 rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-green-600 rounded-full opacity-20"></div>
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format" 
                  alt="Lungiswa Ndaba - Founder" 
                  className="rounded-2xl shadow-xl relative z-10 w-full h-[400px] object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="uppercase tracking-[0.3em] text-amber-600 font-semibold mb-2 text-sm">Founder's Message</p>
              <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">A Word From Our Founder</h2>
              <div className="mb-6">
                <i className="fas fa-quote-left text-4xl text-amber-500 opacity-50 mb-4 block"></i>
                <p className="text-gray-600 leading-relaxed mb-4 italic">
                  "I envisioned a place where travelers could experience the warmth of African hospitality combined with world-class luxury. 
                  Every detail at Eatery Suites & Lodge is designed with our guests' comfort and satisfaction in mind."
                </p>
                <p className="text-gray-600 leading-relaxed">
                  <span className="font-semibold text-green-800">- Lungiswa Ndaba</span>
                  <br />
                  <span className="text-sm text-gray-500">Founder, Eatery Suites & Lodge</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400&auto=format" 
                  alt="Luxury Room" 
                  className="rounded-2xl shadow-lg hover:scale-105 transition duration-500"
                />
                <img 
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400&auto=format" 
                  alt="Dining" 
                  className="rounded-2xl shadow-lg mt-8 hover:scale-105 transition duration-500"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="uppercase tracking-[0.3em] text-amber-600 font-semibold mb-2 text-sm">Why Choose Us</p>
              <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">The Eatery Difference</h2>
              <div className="space-y-4 mb-8">
                {[
                  "Prime location in Johannesburg's business district",
                  "Award-winning service and hospitality",
                  "Modern amenities and smart room features",
                  "24/7 dedicated guest support",
                  "Complimentary breakfast and premium dining",
                  "Secure parking and airport transfers",
                  "Led by experienced hospitality professionals",
                  "Executive chef with international culinary training",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-green-600 text-xl"></i>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <Link 
                href="/rooms" 
                className="inline-block bg-green-900 hover:bg-green-800 text-white px-8 py-3 rounded-xl font-semibold transition"
              >
                Explore Our Suites
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-amber-500">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Experience Luxury?</h2>
          <p className="text-lg mb-6 opacity-90">
            Book your stay today and discover why guests love Eatery Suites & Lodge
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/rooms" 
              className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold transition"
            >
              Book Now
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-white text-white hover:bg-white hover:text-amber-600 px-8 py-3 rounded-xl font-semibold transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Add animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
    </div>
  );
}