"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RoomsPage() {
  const { data: session } = useSession();
  const [priceRange, setPriceRange] = useState(3000);
  const [selectedAmenity, setSelectedAmenity] = useState('all');
  const [sortBy, setSortBy] = useState('price_asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  // Set default dates
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setCheckIn(today.toISOString().split('T')[0]);
    setCheckOut(tomorrow.toISOString().split('T')[0]);
  }, []);

  const rooms = [
    { 
      id: 1, 
      title: "Standard Suite", 
      price: 650, 
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format", 
      gallery: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&flip=horizontal",
      ],
      description: "Cozy modern suite with premium comfort. Perfect for business travelers or couples seeking a relaxing stay.", 
      amenities: ["Queen Bed", "Work Desk", "Free Wi-Fi", "55\" TV", "AC", "Mini Fridge", "Safe", "Tea/Coffee"], 
      size: "35m²", 
      capacity: 2, 
      bedType: "Queen", 
      view: "City View", 
      popular: true,
      rating: 4.5,
      reviews: 128
    },
    { 
      id: 2, 
      title: "Deluxe Suite", 
      price: 950, 
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format", 
      gallery: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format",
      ],
      description: "Luxurious interiors with separate living area. Indulge in comfort with premium amenities and elegant decor.", 
      amenities: ["King Bed", "Living Area", "Mini Bar", "Balcony", "65\" TV", "AC", "Jacuzzi Tub", "Walk-in Closet"], 
      size: "45m²", 
      capacity: 2, 
      bedType: "King", 
      view: "Garden View", 
      popular: true,
      rating: 4.8,
      reviews: 256
    },
    { 
      id: 3, 
      title: "Executive Suite", 
      price: 1250, 
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=600&auto=format", 
      gallery: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&auto=format",
      ],
      description: "Premium suite with panoramic views. Designed for the discerning traveler seeking the ultimate in luxury.", 
      amenities: ["Super King Bed", "Jacuzzi", "Kitchenette", "Private Balcony", "75\" TV", "Sound System", "Butler Service"], 
      size: "65m²", 
      capacity: 3, 
      bedType: "Super King", 
      view: "Panoramic", 
      popular: false,
      rating: 4.9,
      reviews: 89
    },
    { 
      id: 4, 
      title: "Family Suite", 
      price: 1500, 
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format", 
      gallery: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format",
      ],
      description: "Perfect for families and groups. Spacious suite with multiple bedrooms and living areas.", 
      amenities: ["2 Queen Beds", "Full Kitchen", "Play Area", "2 Smart TVs", "Dining Area", "Private Balcony", "Game Console"], 
      size: "75m²", 
      capacity: 4, 
      bedType: "2 Queens", 
      view: "City View", 
      popular: true,
      rating: 4.7,
      reviews: 312
    },
    { 
      id: 5, 
      title: "Presidential Suite", 
      price: 2500, 
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=600&auto=format", 
      gallery: [
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800&auto=format",
      ],
      description: "Ultimate luxury experience. The pinnacle of elegance with exclusive amenities and personalized service.", 
      amenities: ["Master Bedroom", "Private Pool", "Butler Service", "Home Theater", "Full Kitchen", "Private Terrace", "Sauna"], 
      size: "120m²", 
      capacity: 4, 
      bedType: "King + 2 Singles", 
      view: "360° Panoramic", 
      popular: false,
      rating: 5.0,
      reviews: 45
    },
  ];

  // Filter rooms
  let filteredRooms = rooms.filter(room => {
    const matchesPrice = room.price <= priceRange;
    const matchesAmenity = selectedAmenity === 'all' || room.amenities.some(a => a.toLowerCase().includes(selectedAmenity.toLowerCase()));
    return matchesPrice && matchesAmenity;
  });

  // Sort rooms
  filteredRooms = [...filteredRooms].sort((a, b) => {
    switch (sortBy) {
      case 'price_asc': return a.price - b.price;
      case 'price_desc': return b.price - a.price;
      case 'rating_desc': return b.rating - a.rating;
      case 'popularity': return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      default: return 0;
    }
  });

  const amenityOptions = ['all', 'WiFi', 'Jacuzzi', 'Balcony', 'Kitchen', 'Pool', 'Butler'];
  const sortOptions = [
    { value: 'price_asc', label: 'Price: Low to High', icon: 'fa-arrow-up' },
    { value: 'price_desc', label: 'Price: High to Low', icon: 'fa-arrow-down' },
    { value: 'rating_desc', label: 'Highest Rated', icon: 'fa-star' },
    { value: 'popularity', label: 'Most Popular', icon: 'fa-fire' },
  ];

  const getRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return (
      <div className="flex items-center gap-1">
        <div className="flex text-amber-400">
          {[...Array(5)].map((_, i) => (
            <i key={i} className={`fas fa-star ${i < fullStars ? 'text-amber-400' : i === fullStars && hasHalfStar ? 'fas fa-star-half-alt' : 'text-gray-300'}`}></i>
          ))}
        </div>
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  const calculateTotal = () => {
    if (checkIn && checkOut && selectedRoom) {
      const nights = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24));
      return selectedRoom.price * (nights > 0 ? nights : 0);
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-72 md:h-96 bg-gradient-to-r from-green-900 to-green-800 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Our Luxury Suites</h1>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            Experience unparalleled comfort and elegance in our carefully designed accommodations
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
              <select
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Guests</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold transition">
                Search Availability
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 justify-between">
            {/* Price Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (per night)</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="3000"
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
                <span className="text-sm font-semibold text-green-700 min-w-[80px]">Up to R{priceRange}</span>
              </div>
            </div>

            {/* Amenity Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
              <div className="flex flex-wrap gap-2">
                {amenityOptions.map((amenity) => (
                  <button
                    key={amenity}
                    onClick={() => setSelectedAmenity(amenity)}
                    className={`px-3 py-1 rounded-full text-sm transition ${
                      selectedAmenity === amenity ? 'bg-green-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort and View */}
            <div className="flex gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-1.5 focus:ring-2 focus:ring-green-500 outline-none"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">View</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-green-900 text-white' : 'bg-gray-100 text-gray-600'}`}
                  >
                    <i className="fas fa-th-large"></i>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-green-900 text-white' : 'bg-gray-100 text-gray-600'}`}
                  >
                    <i className="fas fa-list"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-green-700">{filteredRooms.length}</span> of {rooms.length} suites
          </p>
          <button className="text-sm text-green-600 hover:text-green-800">
            <i className="fas fa-sliders-h mr-1"></i> More Filters
          </button>
        </div>

        {/* Rooms Grid/List View */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <div key={room.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                <div className="relative overflow-hidden h-64">
                  <img src={room.image} alt={room.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  {room.popular && (
                    <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      <i className="fas fa-fire mr-1"></i> Popular
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-green-900 text-white px-3 py-1 rounded-full text-sm font-bold">
                    R{room.price}<span className="text-xs">/night</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedRoom(room);
                      setShowQuickView(true);
                    }}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                  >
                    <span className="bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold">
                      <i className="fas fa-eye mr-2"></i> Quick View
                    </span>
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-green-900">{room.title}</h3>
                    {getRatingStars(room.rating)}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                    <span><i className="fas fa-arrows-alt"></i> {room.size}</span>
                    <span><i className="fas fa-user"></i> {room.capacity} guests</span>
                    <span><i className="fas fa-bed"></i> {room.bedType}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{room.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenities.slice(0, 4).map((item, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        <i className="fas fa-check-circle text-green-600 mr-1 text-[10px]"></i> {item}
                      </span>
                    ))}
                    {room.amenities.length > 4 && (
                      <span className="text-xs text-gray-400">+{room.amenities.length - 4} more</span>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <Link href={`/rooms/${room.id}`} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm text-center transition">
                      View Details
                    </Link>
                    <Link href={session ? `/rooms/${room.id}` : "/auth/login"} className="flex-1 bg-green-900 hover:bg-green-800 text-white py-2 rounded-xl text-sm text-center transition">
                      {session ? 'Book Now' : 'Login to Book'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredRooms.map((room) => (
              <div key={room.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition flex flex-col md:flex-row">
                <div className="md:w-80 h-64 md:h-auto relative">
                  <img src={room.image} alt={room.title} className="w-full h-full object-cover" />
                  {room.popular && (
                    <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      <i className="fas fa-fire mr-1"></i> Popular
                    </div>
                  )}
                </div>
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start flex-wrap gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-green-900">{room.title}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        {getRatingStars(room.rating)}
                        <span className="text-sm text-gray-500">({room.reviews} reviews)</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-amber-600">R{room.price}<span className="text-sm text-gray-500">/night</span></p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 my-3">
                    <span><i className="fas fa-arrows-alt"></i> {room.size}</span>
                    <span><i className="fas fa-user"></i> {room.capacity} guests</span>
                    <span><i className="fas fa-bed"></i> {room.bedType}</span>
                    <span><i className="fas fa-eye"></i> {room.view}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{room.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenities.slice(0, 6).map((item, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        <i className="fas fa-check-circle text-green-600 mr-1"></i> {item}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Link href={`/rooms/${room.id}`} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm transition">
                      View Details
                    </Link>
                    <Link href={session ? `/rooms/${room.id}` : "/auth/login"} className="px-6 py-2 bg-green-900 hover:bg-green-800 text-white rounded-xl text-sm transition">
                      {session ? 'Book Now' : 'Login to Book'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {showQuickView && selectedRoom && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowQuickView(false)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img src={selectedRoom.image} alt={selectedRoom.title} className="w-full h-64 object-cover rounded-t-2xl" />
              <button
                onClick={() => setShowQuickView(false)}
                className="absolute top-4 right-4 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-green-900">{selectedRoom.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {getRatingStars(selectedRoom.rating)}
                    <span className="text-sm text-gray-500">({selectedRoom.reviews} reviews)</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-amber-600">R{selectedRoom.price}<span className="text-sm">/night</span></p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 mb-4">{selectedRoom.description}</p>
                  <h4 className="font-semibold mb-2">Key Features</h4>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="flex items-center gap-2 text-sm"><i className="fas fa-arrows-alt text-green-600"></i> {selectedRoom.size}</div>
                    <div className="flex items-center gap-2 text-sm"><i className="fas fa-user text-green-600"></i> {selectedRoom.capacity} guests</div>
                    <div className="flex items-center gap-2 text-sm"><i className="fas fa-bed text-green-600"></i> {selectedRoom.bedType}</div>
                    <div className="flex items-center gap-2 text-sm"><i className="fas fa-eye text-green-600"></i> {selectedRoom.view}</div>
                  </div>
                  <h4 className="font-semibold mb-2">Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedRoom.amenities.map((item: string, i: number) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{item}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold mb-3">Book This Room</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Check-in</label>
                      <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Check-out</label>
                      <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Guests</label>
                      <select value={guests} onChange={(e) => setGuests(parseInt(e.target.value))} className="w-full border rounded-lg px-3 py-2">
                        <option value={1}>1 Guest</option>
                        <option value={2}>2 Guests</option>
                        <option value={3}>3 Guests</option>
                        <option value={4}>4 Guests</option>
                      </select>
                    </div>
                    {checkIn && checkOut && (
                      <div className="pt-2 border-t">
                        <p className="text-sm text-gray-600">Total: <span className="font-bold text-green-700">R{calculateTotal()}</span></p>
                      </div>
                    )}
                    <Link href={session ? `/rooms/${selectedRoom.id}` : "/auth/login"} className="block w-full bg-amber-500 text-white text-center py-2 rounded-lg font-semibold hover:bg-amber-600 transition">
                      {session ? 'Book Now' : 'Login to Book'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Newsletter Section */}
      <section className="py-16 bg-amber-500 mt-12">
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