"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function BookingConfirmationPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [bookingComplete, setBookingComplete] = useState(false);

  useEffect(() => {
    // Get booking details from session storage
    const details = sessionStorage.getItem('bookingDetails');
    if (details) {
      setBookingDetails(JSON.parse(details));
    } else {
      router.push('/rooms');
    }
  }, [router]);

  const handleConfirmBooking = () => {
    // Save booking to localStorage
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const newBooking = {
      id: Date.now().toString(),
      ...bookingDetails,
      userEmail: session?.user?.email,
      userName: session?.user?.name,
      status: 'confirmed',
      bookingDate: new Date().toISOString(),
    };
    existingBookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(existingBookings));
    
    setBookingComplete(true);
    sessionStorage.removeItem('bookingDetails');
    
    setTimeout(() => {
      router.push('/my-bookings');
    }, 3000);
  };

  if (!bookingDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-900 to-green-800 px-8 py-6">
            <h1 className="text-2xl font-bold text-white">Complete Your Booking</h1>
            <p className="text-green-100 mt-1">Review your reservation details</p>
          </div>

          {bookingComplete ? (
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check text-4xl text-green-600"></i>
              </div>
              <h2 className="text-2xl font-bold text-green-900 mb-2">Booking Confirmed!</h2>
              <p className="text-gray-600 mb-4">
                Your reservation has been confirmed. A confirmation email has been sent to your inbox.
              </p>
              <p className="text-sm text-gray-500">Redirecting to your bookings...</p>
            </div>
          ) : (
            <div className="p-8">
              {/* Room Details */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-green-900 mb-4">Room Details</h2>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-lg">{bookingDetails.roomName}</p>
                      <p className="text-gray-500 text-sm">R{bookingDetails.price} per night</p>
                    </div>
                    <img 
                      src={`https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=100&auto=format`} 
                      alt={bookingDetails.roomName}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Date & Guest Details */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h2 className="text-xl font-bold text-green-900 mb-4">Stay Details</h2>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-in:</span>
                      <span className="font-semibold">{bookingDetails.checkIn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-out:</span>
                      <span className="font-semibold">{bookingDetails.checkOut}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nights:</span>
                      <span className="font-semibold">{bookingDetails.nights}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-green-900 mb-4">Guest Details</h2>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Guest Name:</span>
                      <span className="font-semibold">{session?.user?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-semibold">{session?.user?.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Adults:</span>
                      <span className="font-semibold">{bookingDetails.guests}</span>
                    </div>
                    {bookingDetails.children > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Children:</span>
                        <span className="font-semibold">{bookingDetails.children}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-green-900 mb-4">Price Breakdown</h2>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>R{bookingDetails.price} x {bookingDetails.nights} nights</span>
                      <span>R{bookingDetails.price * bookingDetails.nights}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes & fees</span>
                      <span>R0</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-green-900">R{bookingDetails.total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-green-900 mb-4">Payment Method</h2>
                <div className="grid grid-cols-3 gap-3">
                  <div className="border rounded-lg p-3 text-center cursor-pointer hover:border-green-600 transition">
                    <i className="fab fa-cc-visa text-2xl text-blue-600"></i>
                    <p className="text-xs mt-1">Credit Card</p>
                  </div>
                  <div className="border rounded-lg p-3 text-center cursor-pointer hover:border-green-600 transition">
                    <i className="fab fa-paypal text-2xl text-blue-600"></i>
                    <p className="text-xs mt-1">PayPal</p>
                  </div>
                  <div className="border rounded-lg p-3 text-center cursor-pointer hover:border-green-600 transition">
                    <i className="fas fa-university text-2xl text-gray-600"></i>
                    <p className="text-xs mt-1">Bank Transfer</p>
                  </div>
                </div>
              </div>

              {/* Booking Policies */}
              <div className="mb-8 p-4 bg-blue-50 rounded-xl">
                <h3 className="font-semibold text-blue-800 mb-2">Booking Policies</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>✓ Free cancellation up to 48 hours before check-in</li>
                  <li>✓ No prepayment needed - pay at the property</li>
                  <li>✓ Check-in: 2:00 PM | Check-out: 11:00 AM</li>
                  <li>✓ ID required at check-in</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleConfirmBooking}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold transition"
                >
                  Confirm Booking
                </button>
                <Link
                  href={`/rooms/${id}`}
                  className="flex-1 border-2 border-gray-300 text-gray-700 hover:border-gray-400 py-3 rounded-xl font-semibold text-center transition"
                >
                  Back
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}