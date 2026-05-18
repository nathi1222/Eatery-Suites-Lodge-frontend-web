"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface BookingWidgetProps {
  roomId?: number;
  roomName?: string;
  roomPrice?: number;
  variant?: 'homepage' | 'roompage';
}

export default function BookingWidget({ roomId, roomName, roomPrice, variant = 'homepage' }: BookingWidgetProps) {
  const { data: session } = useSession();
  const router = useRouter();
  
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [children, setChildren] = useState(0);
  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [searching, setSearching] = useState(false);
  const [availableRooms, setAvailableRooms] = useState<any[]>([]);

  // Get today's date for min attribute
  const today = new Date().toISOString().split('T')[0];
  
  // Set default dates (today and tomorrow)
  useEffect(() => {
    const defaultCheckIn = new Date();
    const defaultCheckOut = new Date();
    defaultCheckOut.setDate(defaultCheckOut.getDate() + 1);
    
    setCheckIn(defaultCheckIn.toISOString().split('T')[0]);
    setCheckOut(defaultCheckOut.toISOString().split('T')[0]);
  }, []);

  // Calculate nights and total price
  useEffect(() => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const nightsCount = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      setNights(nightsCount > 0 ? nightsCount : 0);
      
      if (roomPrice && nightsCount > 0) {
        setTotalPrice(roomPrice * nightsCount);
      }
    }
  }, [checkIn, checkOut, roomPrice]);

  const handleSearch = async () => {
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }

    setSearching(true);
    
    // Simulate API call to check availability
    setTimeout(() => {
      const rooms = [
        { id: 1, name: "Standard Suite", price: 650, available: true, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=300&auto=format" },
        { id: 2, name: "Deluxe Suite", price: 950, available: true, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=300&auto=format" },
        { id: 3, name: "Executive Suite", price: 1250, available: true, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=300&auto=format" },
        { id: 4, name: "Family Suite", price: 1500, available: true, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=300&auto=format" },
      ];
      setAvailableRooms(rooms);
      setSearching(false);
    }, 1000);
  };

  const handleBooking = (roomId: number, roomName: string, price: number) => {
    if (!session) {
      router.push('/auth/login');
      return;
    }
    
    // Store booking details in session storage
    sessionStorage.setItem('bookingDetails', JSON.stringify({
      roomId,
      roomName,
      price,
      checkIn,
      checkOut,
      guests,
      children,
      nights,
      total: price * nights
    }));
    
    router.push(`/rooms/${roomId}/booking`);
  };

  if (variant === 'homepage') {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto -mt-20 relative z-20">
        <h3 className="text-2xl font-bold text-green-900 mb-4">Search Availability</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
            <div className="relative">
              <i className="fas fa-calendar-alt absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
            <div className="relative">
              <i className="fas fa-calendar-alt absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
            <button
              onClick={() => setShowGuestDropdown(!showGuestDropdown)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-left focus:ring-2 focus:ring-green-500 outline-none flex justify-between items-center"
            >
              <span>{guests} {guests === 1 ? 'Guest' : 'Guests'}{children > 0 ? `, ${children} Children` : ''}</span>
              <i className="fas fa-chevron-down text-gray-400"></i>
            </button>
            {showGuestDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-lg p-4 z-30">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium">Adults</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200"
                    >-</button>
                    <span className="w-8 text-center">{guests}</span>
                    <button
                      onClick={() => setGuests(Math.min(10, guests + 1))}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200"
                    >+</button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Children</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200"
                    >-</button>
                    <span className="w-8 text-center">{children}</span>
                    <button
                      onClick={() => setChildren(Math.min(5, children + 1))}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200"
                    >+</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              disabled={searching}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
            >
              {searching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {/* Search Results */}
        {availableRooms.length > 0 && (
          <div className="mt-8">
            <h4 className="font-bold text-lg mb-4">Available Rooms for {nights} nights</h4>
            <div className="space-y-4">
              {availableRooms.map((room) => (
                <div key={room.id} className="flex gap-4 p-4 border rounded-xl hover:shadow-md transition">
                  <img src={room.image} alt={room.name} className="w-32 h-32 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h5 className="font-bold text-green-900">{room.name}</h5>
                    <p className="text-sm text-gray-500">Sleeps up to 2 guests</p>
                    <div className="flex items-center gap-2 mt-2">
                      <i className="fas fa-wifi text-gray-400"></i>
                      <i className="fas fa-tv text-gray-400"></i>
                      <i className="fas fa-snowflake text-gray-400"></i>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-900">R{room.price}</p>
                    <p className="text-xs text-gray-500">per night</p>
                    <p className="text-sm font-semibold mt-2">Total: R{room.price * nights}</p>
                    <button
                      onClick={() => handleBooking(room.id, room.name, room.price)}
                      className="mt-2 bg-green-900 hover:bg-green-800 text-white px-6 py-2 rounded-lg text-sm transition"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Room page variant
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
      <h3 className="text-2xl font-bold text-green-900 mb-4">Book This Room</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
          <div className="relative">
            <i className="fas fa-calendar-alt absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="date"
              min={today}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
          <div className="relative">
            <i className="fas fa-calendar-alt absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="date"
              min={checkIn || today}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
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
        
        {nights > 0 && (
          <div className="bg-green-50 p-4 rounded-xl">
            <div className="flex justify-between mb-2">
              <span>R{roomPrice} x {nights} nights</span>
              <span>R{roomPrice! * nights}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span className="text-green-900">R{totalPrice}</span>
              </div>
            </div>
          </div>
        )}
        
        <button
          onClick={() => handleBooking(roomId!, roomName!, roomPrice!)}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold transition"
        >
          {session ? 'Confirm Booking' : 'Login to Book'}
        </button>
        
        {!session && (
          <p className="text-center text-sm text-gray-500">
            <Link href="/auth/login" className="text-green-600 font-semibold">Login</Link> to complete your booking
          </p>
        )}
      </div>
    </div>
  );
}