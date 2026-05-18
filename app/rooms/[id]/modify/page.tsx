"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function ModifyBookingPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [booking, setBooking] = useState<any>(null);
  const [newCheckIn, setNewCheckIn] = useState('');
  const [newCheckOut, setNewCheckOut] = useState('');
  const [newGuests, setNewGuests] = useState(1);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [priceChange, setPriceChange] = useState(0);

  useEffect(() => {
    // Get booking details from session storage
    const modifyBooking = sessionStorage.getItem('modifyBooking');
    if (modifyBooking) {
      const bookingData = JSON.parse(modifyBooking);
      setBooking(bookingData);
      setNewCheckIn(bookingData.checkIn);
      setNewCheckOut(bookingData.checkOut);
      setNewGuests(bookingData.guests);
      setLoading(false);
    } else {
      router.push('/my-bookings');
    }
  }, [router]);

  // Calculate price difference
  useEffect(() => {
    if (booking && newCheckIn && newCheckOut) {
      const start = new Date(newCheckIn);
      const end = new Date(newCheckOut);
      const newNights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      const newTotal = booking.pricePerNight * (newNights > 0 ? newNights : 0);
      const priceDiff = newTotal - booking.total;
      setPriceChange(priceDiff);
    }
  }, [newCheckIn, newCheckOut, booking]);

  const handleModify = () => {
    setError('');
    
    if (!newCheckIn || !newCheckOut) {
      setError('Please select check-in and check-out dates');
      return;
    }
    
    const start = new Date(newCheckIn);
    const end = new Date(newCheckOut);
    const newNights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    if (newNights <= 0) {
      setError('Check-out date must be after check-in date');
      return;
    }
    
    setUpdating(true);
    
    // Update booking in localStorage
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const updatedBookings = allBookings.map((b: any) => {
      if (b.id === booking.id) {
        return {
          ...b,
          checkIn: newCheckIn,
          checkOut: newCheckOut,
          guests: newGuests,
          nights: newNights,
          total: booking.pricePerNight * newNights,
          modifiedDate: new Date().toISOString(),
        };
      }
      return b;
    });
    
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    sessionStorage.removeItem('modifyBooking');
    
    setTimeout(() => {
      setUpdating(false);
      router.push('/my-bookings');
    }, 1500);
  };

  const today = new Date().toISOString().split('T')[0];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!booking) {
    return null;
  }

  const newNights = newCheckIn && newCheckOut 
    ? Math.ceil((new Date(newCheckOut).getTime() - new Date(newCheckIn).getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  const newTotal = booking.pricePerNight * (newNights > 0 ? newNights : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-48 bg-gradient-to-r from-green-900 to-green-800 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Modify Booking</h1>
          <p className="text-base">Update your reservation details</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Current Booking Details */}
          <div className="bg-gray-50 px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-700">Current Booking</h2>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Room</p>
                <p className="font-semibold text-green-900">{booking.roomName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Dates</p>
                <p className="font-semibold">{booking.checkIn} → {booking.checkOut}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Guests</p>
                <p className="font-semibold">{booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-semibold text-green-700">R{booking.total.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Modify Form */}
          <div className="bg-gray-50 px-6 py-4 border-t border-b">
            <h2 className="text-lg font-semibold text-gray-700">Modify Dates & Guests</h2>
          </div>
          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl text-sm">
                {error}
              </div>
            )}
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Check-in Date</label>
                <input
                  type="date"
                  min={today}
                  value={newCheckIn}
                  onChange={(e) => setNewCheckIn(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Check-out Date</label>
                <input
                  type="date"
                  min={newCheckIn || today}
                  value={newCheckOut}
                  onChange={(e) => setNewCheckOut(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                <select
                  value={newGuests}
                  onChange={(e) => setNewGuests(parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                </select>
              </div>
            </div>

            {/* Price Comparison */}
            {newNights > 0 && (
              <div className="mt-6 p-4 bg-gray-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-3">Price Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Price per night:</span>
                    <span>R{booking.pricePerNight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Number of nights:</span>
                    <span>{newNights} nights</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>New total:</span>
                    <span className="text-green-700">R{newTotal.toLocaleString()}</span>
                  </div>
                  {priceChange !== 0 && (
                    <div className={`flex justify-between pt-2 border-t ${priceChange > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      <span>Difference:</span>
                      <span>{priceChange > 0 ? '+' : ''}R{Math.abs(priceChange).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleModify}
                disabled={updating}
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
              >
                {updating ? 'Updating...' : 'Confirm Changes'}
              </button>
              <Link
                href="/my-bookings"
                className="flex-1 border-2 border-gray-300 text-gray-700 hover:border-gray-400 py-3 rounded-xl font-semibold text-center transition"
              >
                Cancel
              </Link>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="bg-blue-50 px-6 py-4 border-t">
            <div className="flex items-start gap-3">
              <i className="fas fa-info-circle text-blue-600 mt-0.5"></i>
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">Modification Policy</p>
                <p>Changes are free up to 48 hours before check-in. Price differences will be adjusted accordingly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}