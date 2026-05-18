"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Booking {
  id: string;
  roomId: number;
  roomName: string;
  roomImage: string;
  userEmail: string;
  userName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  children?: number;
  pricePerNight: number;
  nights: number;
  total: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  bookingDate: string;
  specialRequests?: string;
}

export default function MyBookingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past' | 'cancelled'>('upcoming');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [invoiceDownloading, setInvoiceDownloading] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else if (session) {
      // Load user's bookings from localStorage
      const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      const userBookings = allBookings.filter((b: any) => b.userEmail === session.user?.email);
      
      // Sort by booking date (newest first)
      userBookings.sort((a: any, b: any) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime());
      setBookings(userBookings);
    }
  }, [status, session, router]);

  const getFilteredBookings = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    switch (filter) {
      case 'upcoming':
        return bookings.filter(b => 
          b.status !== 'cancelled' && 
          new Date(b.checkIn) >= today
        );
      case 'past':
        return bookings.filter(b => 
          b.status !== 'cancelled' && 
          new Date(b.checkOut) < today
        );
      case 'cancelled':
        return bookings.filter(b => b.status === 'cancelled');
      default:
        return bookings;
    }
  };

  const cancelBooking = (id: string) => {
    const updatedBookings = bookings.map(b => 
      b.id === id ? { ...b, status: 'cancelled' as const } : b
    );
    setBookings(updatedBookings);
    
    // Update localStorage
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const updatedAllBookings = allBookings.map((b: any) => 
      b.id === id ? { ...b, status: 'cancelled' } : b
    );
    localStorage.setItem("bookings", JSON.stringify(updatedAllBookings));
    
    setShowCancelModal(false);
    setBookingToCancel(null);
    alert("Booking cancelled successfully!");
  };

  const modifyBooking = (booking: Booking) => {
    // Store booking details for modification
    sessionStorage.setItem('modifyBooking', JSON.stringify(booking));
    router.push(`/rooms/${booking.roomId}/modify`);
  };

  const submitReview = (bookingId: string) => {
    const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    const newReview = {
      id: Date.now().toString(),
      bookingId,
      userId: session?.user?.email,
      userName: session?.user?.name,
      rating: reviewRating,
      comment: reviewComment,
      date: new Date().toISOString(),
    };
    reviews.push(newReview);
    localStorage.setItem("reviews", JSON.stringify(reviews));
    
    setShowReviewModal(false);
    setReviewRating(5);
    setReviewComment('');
    alert("Thank you for your review!");
  };

  const downloadInvoice = (booking: Booking) => {
    setInvoiceDownloading(booking.id);
    
    // Generate invoice HTML
    const invoiceHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice - ${booking.id}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 50px; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; color: #14532d; }
          .invoice-title { font-size: 20px; margin: 20px 0; }
          .details { margin: 20px 0; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          th { background-color: #14532d; color: white; }
          .total { font-size: 18px; font-weight: bold; text-align: right; margin-top: 20px; }
          .footer { text-align: center; margin-top: 50px; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">EATERY SUITES & LODGE</div>
          <p>Johannesburg, South Africa | +27 79 400 1549</p>
        </div>
        <div class="invoice-title">INVOICE</div>
        <div class="details">
          <p><strong>Invoice Number:</strong> INV-${booking.id}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Guest Name:</strong> ${booking.userName}</p>
          <p><strong>Email:</strong> ${booking.userEmail}</p>
        </div>
        <table>
          <tr>
            <th>Description</th>
            <th>Details</th>
            <th>Amount</th>
          </tr>
          <tr>
            <td>Room Type</td>
            <td>${booking.roomName}</td>
            <td>R${booking.pricePerNight} / night</td>
          </tr>
          <tr>
            <td>Stay Period</td>
            <td>${booking.checkIn} to ${booking.checkOut}</td>
            <td>${booking.nights} nights</td>
          </tr>
          <tr>
            <td>Guests</td>
            <td colspan="2">${booking.guests} adults${booking.children ? `, ${booking.children} children` : ''}</td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: right;"><strong>Total Amount</strong></td>
            <td><strong>R${booking.total.toLocaleString()}</strong></td>
          </tr>
        </table>
        <div class="total">
          <p>Total Paid: R${booking.total.toLocaleString()}</p>
          <p>Status: ${booking.status.toUpperCase()}</p>
        </div>
        <div class="footer">
          <p>Thank you for choosing Eatery Suites & Lodge!</p>
          <p>COMFORT • HOSPITALITY • MEMORIES</p>
        </div>
      </body>
      </html>
    `;
    
    // Create blob and download
    const blob = new Blob([invoiceHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice_${booking.id}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setTimeout(() => setInvoiceDownloading(null), 1000);
  };

  const getStatusBadge = (status: string, checkIn: string, checkOut: string) => {
    const today = new Date();
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    if (status === 'cancelled') {
      return <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700">Cancelled</span>;
    }
    
    if (today < checkInDate) {
      return <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">Upcoming</span>;
    }
    
    if (today >= checkInDate && today <= checkOutDate) {
      return <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">Active</span>;
    }
    
    return <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">Completed</span>;
  };

  const filteredBookings = getFilteredBookings();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-green-900 to-green-800 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">My Bookings</h1>
          <p className="text-base sm:text-lg md:text-xl">View and manage your reservations</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-green-600">{bookings.length}</p>
            <p className="text-sm text-gray-500">Total Bookings</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-blue-600">
              {bookings.filter(b => b.status !== 'cancelled' && new Date(b.checkIn) >= new Date()).length}
            </p>
            <p className="text-sm text-gray-500">Upcoming</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-green-600">
              {bookings.filter(b => b.status === 'confirmed' && new Date(b.checkIn) <= new Date() && new Date(b.checkOut) >= new Date()).length}
            </p>
            <p className="text-sm text-gray-500">Active Stays</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-amber-600">
              R{bookings.filter(b => b.status !== 'cancelled').reduce((sum, b) => sum + b.total, 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">Total Spent</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 border-b">
          {[
            { key: 'upcoming', label: 'Upcoming', icon: 'fa-calendar-alt' },
            { key: 'past', label: 'Past Stays', icon: 'fa-history' },
            { key: 'cancelled', label: 'Cancelled', icon: 'fa-ban' },
            { key: 'all', label: 'All Bookings', icon: 'fa-list' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`px-6 py-3 font-medium transition flex items-center gap-2 ${
                filter === tab.key
                  ? 'text-green-700 border-b-2 border-green-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className={`fas ${tab.icon}`}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <i className="fas fa-calendar-alt text-5xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No bookings found</h3>
            <p className="text-gray-500 mb-6">
              {filter === 'upcoming' 
                ? "You don't have any upcoming reservations." 
                : filter === 'past' 
                ? "You haven't completed any stays yet."
                : "You have no cancelled bookings."}
            </p>
            <Link href="/rooms" className="inline-block bg-green-900 text-white px-6 py-3 rounded-xl hover:bg-green-800 transition">
              Browse Rooms
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Room Image */}
                  <div className="md:w-48 h-48 md:h-auto">
                    <img 
                      src={booking.roomImage || "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=200&auto=format"} 
                      alt={booking.roomName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Booking Details */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-green-900 mb-2">{booking.roomName}</h3>
                        <div className="space-y-2">
                          <p className="text-gray-600 flex items-center gap-2">
                            <i className="fas fa-calendar-check w-5 text-amber-500"></i>
                            {booking.checkIn} → {booking.checkOut}
                          </p>
                          <p className="text-gray-600 flex items-center gap-2">
                            <i className="fas fa-moon w-5 text-amber-500"></i>
                            {booking.nights} nights
                          </p>
                          <p className="text-gray-600 flex items-center gap-2">
                            <i className="fas fa-users w-5 text-amber-500"></i>
                            {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
                            {booking.children ? `, ${booking.children} children` : ''}
                          </p>
                          <p className="text-gray-600 flex items-center gap-2">
                            <i className="fas fa-rand w-5 text-amber-500"></i>
                            Total: <span className="font-semibold text-green-700">R{booking.total.toLocaleString()}</span>
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(booking.status, booking.checkIn, booking.checkOut)}
                        <p className="text-xs text-gray-400 mt-2">
                          Booked on: {new Date(booking.bookingDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t">
                      {booking.status !== 'cancelled' && new Date(booking.checkIn) > new Date() && (
                        <>
                          <button
                            onClick={() => {
                              setBookingToCancel(booking.id);
                              setShowCancelModal(true);
                            }}
                            className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition text-sm"
                          >
                            <i className="fas fa-times mr-1"></i> Cancel Booking
                          </button>
                          <button
                            onClick={() => modifyBooking(booking)}
                            className="px-4 py-2 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition text-sm"
                          >
                            <i className="fas fa-edit mr-1"></i> Modify Dates
                          </button>
                        </>
                      )}
                      {booking.status !== 'cancelled' && new Date(booking.checkOut) < new Date() && (
                        <button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowReviewModal(true);
                          }}
                          className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition text-sm"
                        >
                          <i className="fas fa-star mr-1"></i> Write a Review
                        </button>
                      )}
                      <button
                        onClick={() => downloadInvoice(booking)}
                        disabled={invoiceDownloading === booking.id}
                        className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition text-sm"
                      >
                        <i className="fas fa-download mr-1"></i> 
                        {invoiceDownloading === booking.id ? 'Downloading...' : 'Download Invoice'}
                      </button>
                      <Link
                        href={`/rooms/${booking.roomId}`}
                        className="px-4 py-2 border border-green-300 text-green-600 rounded-lg hover:bg-green-50 transition text-sm"
                      >
                        <i className="fas fa-redo mr-1"></i> Book Again
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowCancelModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-exclamation-triangle text-2xl text-red-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Cancel Booking</h3>
              <p className="text-gray-600">
                Are you sure you want to cancel this booking? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Keep Booking
              </button>
              <button
                onClick={() => bookingToCancel && cancelBooking(bookingToCancel)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowReviewModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-green-900 mb-4">Write a Review</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setReviewRating(star)}
                    className="text-2xl focus:outline-none"
                  >
                    <i className={`fas fa-star ${star <= reviewRating ? 'text-amber-400' : 'text-gray-300'}`}></i>
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
              <textarea
                rows={4}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Share your experience at Eatery Suites & Lodge..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
              ></textarea>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowReviewModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => submitReview(selectedBooking.id)}
                className="flex-1 px-4 py-2 bg-green-900 text-white rounded-lg hover:bg-green-800 transition"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}