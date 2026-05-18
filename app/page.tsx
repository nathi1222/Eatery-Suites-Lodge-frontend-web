"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import BookingWidget from './components/BookingWidget';
import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    { image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format", title: "Luxury Suites", subtitle: "Experience unparalleled comfort" },
    { image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format", title: "Fine Dining", subtitle: "Exquisite culinary experiences" },
    { image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format", title: "Relaxation", subtitle: "Rejuvenate your senses" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Redirect admin users to admin dashboard
  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "admin") {
      router.push("/admin/dashboard");
    }
  }, [session, status, router]);

  // Show loading spinner while checking auth
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Don't render homepage for admin users (they'll be redirected)
  if (session?.user?.role === "admin") {
    return null;
  }

  const rooms = [
    { id: 1, title: "Standard Suite", price: 650, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format", description: "Cozy modern suite with premium comfort.", amenities: ["Queen Bed", "Work Desk", "Free Wi-Fi"], size: "35m²", capacity: 2 },
    { id: 2, title: "Deluxe Suite", price: 950, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format", description: "Luxurious interiors with living area.", amenities: ["King Bed", "Living Area", "Mini Bar"], size: "45m²", capacity: 2 },
    { id: 3, title: "Executive Suite", price: 1250, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=600&auto=format", description: "Premium suite with panoramic views.", amenities: ["Super King Bed", "Jacuzzi", "Kitchenette"], size: "65m²", capacity: 3 },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Carousel */}
      <div className="relative h-screen pt-16 overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative h-full flex items-center justify-center text-center text-white px-4">
              <div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-lg sm:text-xl md:text-2xl mb-8">{slide.subtitle}</p>
                <Link
                  href="/rooms"
                  className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-amber-500 w-8' : 'bg-white/50 w-2'
              }`}
            />
          ))}
        </div>
      </div>
{/* Booking Widget */}
<div className="relative z-20">
  <BookingWidget variant="homepage" />
</div>
      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="uppercase tracking-[0.3em] text-amber-600 font-semibold mb-2 text-sm">About Us</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-4">Hospitality With Comfort & Style</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Eatery Suites & Lodge is a modern hospitality destination designed for business travelers,
                tourists, and guests looking for a relaxing Airbnb-style stay.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Integrated with Eatery Food Spot, guests enjoy premium accommodation together with curated
                food experiences, breakfast packages, and exceptional hospitality service.
              </p>
              <Link href="/about" className="inline-block mt-6 text-green-700 font-semibold hover:text-green-900 transition">
                Learn More <i className="fas fa-arrow-right ml-1"></i>
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format" 
                alt="Lodge" 
                className="w-full h-[400px] object-cover hover:scale-105 transition duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-green-900">Our Luxury Suites</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-3 rounded-full"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Experience unmatched comfort and elegance in our carefully designed suites
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <div key={room.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition group">
                <div className="relative overflow-hidden h-64">
                  <img src={room.image} alt={room.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    R{room.price}<span className="text-xs">/night</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-900 mb-2">{room.title}</h3>
                  <div className="flex gap-4 text-sm text-gray-500 mb-3">
                    <span><i className="fas fa-arrows-alt"></i> {room.size}</span>
                    <span><i className="fas fa-user"></i> {room.capacity} guests</span>
                  </div>
                  <p className="text-gray-600 mb-4">{room.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenities.map((item, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{item}</span>
                    ))}
                  </div>
                  <Link 
                    href={session ? `/rooms/${room.id}` : "/auth/login"} 
                    className="block w-full bg-green-900 hover:bg-green-800 text-white py-3 rounded-xl text-center transition"
                  >
                    {session ? "Book Now" : "Login to Book"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/rooms" className="inline-block border-2 border-green-900 text-green-900 hover:bg-green-900 hover:text-white px-8 py-3 rounded-xl font-semibold transition">
              View All Rooms <i className="fas fa-arrow-right ml-1"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-green-900">Premium Amenities</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-3 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "fa-wifi", title: "Free Wi-Fi", desc: "High-speed internet throughout" },
              { icon: "fa-car", title: "Free Parking", desc: "Secure parking available" },
              { icon: "fa-utensils", title: "Restaurant", desc: "Fine dining experience" },
              { icon: "fa-dumbbell", title: "Fitness Center", desc: "Modern equipment" },
              { icon: "fa-swimmer", title: "Swimming Pool", desc: "Outdoor heated pool" },
              { icon: "fa-spa", title: "Spa Services", desc: "Relaxing treatments" },
              { icon: "fa-concierge-bell", title: "24/7 Service", desc: "Round-the-clock support" },
              { icon: "fa-shuttle-van", title: "Airport Shuttle", desc: "Convenient transfers" },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition">
                <i className={`fas ${item.icon} text-3xl text-green-600 mb-3`}></i>
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-amber-500">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-6">Get exclusive offers and updates directly to your inbox</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 outline-none focus:ring-2 focus:ring-green-600"
            />
            <button className="bg-green-900 hover:bg-green-800 px-6 py-3 rounded-xl font-semibold transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}