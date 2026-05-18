"use client";

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function RoomDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const rooms = {
    '1': { 
      id: 1,
      title: "Standard Suite", 
      price: 650, 
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format", 
      description: "Experience comfort and elegance in our Standard Suite. Perfect for business travelers or couples seeking a relaxing stay. The suite features modern decor, premium bedding, and all the amenities you need for a comfortable stay.", 
      amenities: ["Queen Bed", "Work Desk", "Free Wi-Fi", "Flat-screen TV", "Air Conditioning", "Mini Fridge", "En-suite Bathroom", "Tea/Coffee Maker", "Safe", "Ironing Facilities", "Hair Dryer", "Bathrobes"],
      size: "35m²",
      capacity: 2,
      bedType: "Queen",
      view: "City View",
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&flip=horizontal",
      ]
    },
    '2': { 
      id: 2,
      title: "Deluxe Suite", 
      price: 950, 
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format", 
      description: "Indulge in luxury with our Deluxe Suite featuring separate living area and premium amenities. Perfect for those seeking extra space and comfort.", 
      amenities: ["King Bed", "Living Area", "Mini Bar", "Private Balcony", "55\" Smart TV", "Air Conditioning", "Jacuzzi Tub", "Walk-in Closet", "Bathrobes", "Welcome Drinks", "Turndown Service"],
      size: "45m²",
      capacity: 2,
      bedType: "King",
      view: "Garden View",
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format",
      ]
    },
    '3': { 
      id: 3,
      title: "Executive Suite", 
      price: 1250, 
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&auto=format", 
      description: "Our Executive Suite offers panoramic views and exceptional comfort for the discerning traveler. Includes access to the Executive Lounge.", 
      amenities: ["Super King Bed", "Jacuzzi", "Kitchenette", "Private Balcony", "65\" Smart TV", "Sound System", "Work Area", "Butler Service", "Executive Lounge Access", "Champagne", "VIP Check-in"],
      size: "65m²",
      capacity: 3,
      bedType: "Super King",
      view: "Panoramic",
      images: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&auto=format",
      ]
    },
    '4': { 
      id: 4,
      title: "Family Suite", 
      price: 1500, 
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format", 
      description: "Perfect for families and groups. This spacious suite features multiple bedrooms and a full kitchen for a home-away-from-home experience.", 
      amenities: ["2 Queen Beds", "Full Kitchen", "Play Area", "2 Smart TVs", "Dining Area", "Private Balcony", "Game Console", "Kids Amenities", "Family Board Games", "Baby Cot Available"],
      size: "75m²",
      capacity: 4,
      bedType: "2 Queens",
      view: "City View",
      images: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format",
      ]
    },
    '5': { 
      id: 5,
      title: "Presidential Suite", 
      price: 2500, 
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800&auto=format", 
      description: "The ultimate luxury experience. Our Presidential Suite offers unparalleled elegance, space, and personalized service.", 
      amenities: ["Master Bedroom", "Private Pool", "Butler Service", "Home Theater", "Full Kitchen", "Private Terrace", "Sauna", "Wine Cellar", "Private Gym", "Steam Room", "Grand Piano"],
      size: "120m²",
      capacity: 4,
      bedType: "King + 2 Singles",
      view: "360° Panoramic",
      images: [
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800&auto=format",
      ]
    },
  };

  const room = rooms[id as keyof typeof rooms] || rooms['1'];

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      return nights > 0 ? nights : 0;
    }
    return 0;
  };

  const nights = calculateNights();
  const total = room.price * nights;

  const handleBooking = () => {
    setBookingError('');
    
    if (status === 'unauthenticated') {
      router.push('/auth/login');
      return;
    }

    if (!session) {
      router.push('/auth/login');
      return;
    }

    if (!checkIn || !checkOut) {
      setBookingError('Please select check-in and check-out dates');
      return;
    }

    if (nights <= 0) {
      setBookingError('Check-out date must be after check-in date');
      return;
    }

    const newBooking = {
      id: Date.now().toString(),
      roomId: room.id,
      roomName: room.title,
      roomImage: room.image,
      userEmail: session.user?.email,
      userName: session.user?.name,
      checkIn,
      checkOut,
      guests,
      pricePerNight: room.price,
      nights,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    existingBookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(existingBookings));
    
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 5000);
    
    // Reset form
    setCheckIn('');
    setCheckOut('');
    setGuests(1);
  };

  // Get today's date for min date attribute
  const today = new Date().toISOString().split('T')[0];

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-64 md:h-96 bg-gradient-to-r from-green-900 to-green-800 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{room.title}</h1>
          <p className="text-base sm:text-lg md:text-xl">Experience luxury and comfort like never before</p>
        </div>
      </div>

      {/* Room Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Image Gallery */}
          <div>
            <div 
              className="rounded-2xl overflow-hidden shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(room.image)}
            >
              <img src={room.image} alt={room.title} className="w-full h-[400px] object-cover hover:scale-105 transition duration-500" />
            </div>
            {room.images && room.images.length > 1 && (
              <div className="flex gap-2 mt-4">
                {room.images.slice(1, 4).map((img, idx) => (
                  <div key={idx} className="w-24 h-24 rounded-lg overflow-hidden cursor-pointer" onClick={() => setSelectedImage(img)}>
                    <img src={img} alt={`${room.title} ${idx + 2}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Room Info */}
          <div>
            <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-green-900">{room.title}</h1>
                <div className="flex flex-wrap gap-4 text-gray-600 mt-2">
                  <span><i className="fas fa-arrows-alt text-green-600"></i> {room.size}</span>
                  <span><i className="fas fa-user text-green-600"></i> {room.capacity} guests</span>
                  <span><i className="fas fa-bed text-green-600"></i> {room.bedType}</span>
                  <span><i className="fas fa-eye text-green-600"></i> {room.view}</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-amber-600">R{room.price}<span className="text-sm text-gray-500">/night</span></p>
            </div>
            
            <p className="text-gray-600 leading-relaxed mb-6">{room.description}</p>

            {/* Amenities */}
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <i className="fas fa-concierge-bell text-green-600"></i> Amenities & Services
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {room.amenities.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <i className="fas fa-check-circle text-green-600"></i> {item}
                </div>
              ))}
            </div>

            {/* Booking Form */}
            <div className="bg-gray-100 rounded-2xl p-6 sticky top-24">
              <h3 className="text-2xl font-bold text-green-900 mb-4">Book This Suite</h3>
              
              {bookingSuccess && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-xl text-sm flex items-center gap-2">
                  <i className="fas fa-check-circle"></i>
                  ✓ Booking request sent! We'll confirm within 2 hours. Check your email for details.
                </div>
              )}
              
              {bookingError && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl text-sm flex items-center gap-2">
                  <i className="fas fa-exclamation-circle"></i>
                  {bookingError}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Check-in Date</label>
                  <input 
                    type="date" 
                    min={today}
                    className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none" 
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Check-out Date</label>
                  <input 
                    type="date" 
                    min={checkIn || today}
                    className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none" 
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Number of Guests</label>
                  <select 
                    className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                  </select>
                </div>
                
                {nights > 0 && (
                  <div className="bg-green-50 p-4 rounded-xl">
                    <p className="text-green-800">R{room.price} x {nights} night{nights > 1 ? 's' : ''}</p>
                    <p className="text-green-900 font-bold text-xl mt-1">Total: R{total}</p>
                  </div>
                )}
                
                <button
                  onClick={handleBooking}
                  className="block w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold text-center transition"
                >
                  {session ? 'Confirm Booking' : 'Login to Book'}
                </button>
                
                {!session && (
                  <p className="text-center text-sm text-gray-500">
                    Already have an account? <Link href="/auth/login" className="text-green-600 font-semibold">Login</Link> | 
                    <Link href="/auth/register" className="text-green-600 font-semibold ml-1">Register</Link>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Rooms Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-green-900 mb-6">You Might Also Like</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.values(rooms).filter(r => r.id !== room.id).slice(0, 3).map((similarRoom) => (
              <Link key={similarRoom.id} href={`/rooms/${similarRoom.id}`} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition">
                  <img src={similarRoom.image} alt={similarRoom.title} className="h-48 w-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="p-4">
                    <h4 className="font-bold text-green-900">{similarRoom.title}</h4>
                    <p className="text-sm text-gray-500">{similarRoom.size} • {similarRoom.capacity} guests</p>
                    <p className="text-lg font-bold text-amber-600 mt-2">R{similarRoom.price}<span className="text-sm">/night</span></p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
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
            <img src={selectedImage} alt="Full size" className="w-full rounded-lg shadow-2xl" />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}