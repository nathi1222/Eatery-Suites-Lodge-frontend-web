"use client";

import React, { useState, useEffect, createContext, useContext } from 'react';

// ============ TYPES ============
type User = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

type Booking = {
  id: string;
  userId: string;
  userName: string;
  suiteType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
};

type Review = {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  isApproved: boolean;
};

type SpecialOffer = {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  image: string;
};

type FAQ = {
  id: string;
  question: string;
  answer: string;
};

// ============ DATA STORE (localStorage simulation) ============
const getStoredUsers = (): User[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('esl_users');
  if (stored) return JSON.parse(stored);
  const defaultUsers: User[] = [
    { id: '1', name: 'Admin User', email: 'admin@eaterysuites.co.za', isAdmin: true },
    { id: '2', name: 'John Guest', email: 'guest@example.com', isAdmin: false },
  ];
  localStorage.setItem('esl_users', JSON.stringify(defaultUsers));
  return defaultUsers;
};

const getStoredBookings = (): Booking[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('esl_bookings');
  if (stored) return JSON.parse(stored);
  return [];
};

const getStoredReviews = (): Review[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('esl_reviews');
  if (stored) return JSON.parse(stored);
  const defaultReviews: Review[] = [
    { id: '1', userName: 'Sarah Johnson', rating: 5, comment: 'Absolutely amazing stay! The service was impeccable and the suites are gorgeous.', date: '2026-03-15', isApproved: true },
    { id: '2', userName: 'Michael Chen', rating: 4, comment: 'Great location and very comfortable beds. Will definitely return.', date: '2026-03-10', isApproved: true },
    { id: '3', userName: 'Thabo Nkosi', rating: 5, comment: 'Best Airbnb-style lodge in Joburg! The food was incredible.', date: '2026-03-05', isApproved: true },
  ];
  localStorage.setItem('esl_reviews', JSON.stringify(defaultReviews));
  return defaultReviews;
};

const getStoredOffers = (): SpecialOffer[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('esl_offers');
  if (stored) return JSON.parse(stored);
  const defaultOffers: SpecialOffer[] = [
    { id: '1', title: 'Early Bird Special', description: 'Book 14 days in advance and save big on your stay', discount: '20% OFF', validUntil: '2026-12-31', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=400&auto=format' },
    { id: '2', title: 'Stay Longer, Save More', description: 'Book 3+ nights and get one night free', discount: '1 Night Free', validUntil: '2026-12-31', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400&auto=format' },
    { id: '3', title: 'Honeymoon Package', description: 'Romantic getaway with champagne and late checkout', discount: '15% OFF', validUntil: '2026-12-31', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400&auto=format' },
  ];
  localStorage.setItem('esl_offers', JSON.stringify(defaultOffers));
  return defaultOffers;
};

const getStoredFAQs = (): FAQ[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('esl_faqs');
  if (stored) return JSON.parse(stored);
  const defaultFAQs: FAQ[] = [
    { id: '1', question: 'What time is check-in and check-out?', answer: 'Check-in is from 2:00 PM and check-out is by 11:00 AM. Early check-in and late check-out can be arranged upon request.' },
    { id: '2', question: 'Is parking available?', answer: 'Yes, we offer secure, free on-site parking for all our guests with 24/7 CCTV surveillance.' },
    { id: '3', question: 'Do you allow pets?', answer: 'Yes, we are pet-friendly! Please notify us in advance and a small fee may apply.' },
    { id: '4', question: 'Is breakfast included?', answer: 'Breakfast packages are available as an add-on. We offer both continental and full English breakfast options.' },
    { id: '5', question: 'Do you have airport shuttle service?', answer: 'Yes, we offer airport transfers to/from O.R. Tambo and Lanseria airports for an additional fee.' },
    { id: '6', question: 'What payment methods do you accept?', answer: 'We accept credit cards (Visa, Mastercard), bank transfers, and cash upon arrival.' },
  ];
  localStorage.setItem('esl_faqs', JSON.stringify(defaultFAQs));
  return defaultFAQs;
};

// ============ LOGO COMPONENT (Using actual image) ============
const Logo = () => {
  return (
    <div className="flex items-center">
      <img 
        src="/logo.png" 
        alt="Eatery Suites & Lodge" 
        className="h-12 md:h-16 w-auto object-contain"
        onError={(e) => {
          // Fallback if logo.png doesn't exist
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
    </div>
  );
};

// ============ CONTEXT ============
type AppContextType = {
  user: User | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status' | 'userId' | 'userName'>) => void;
  cancelBooking: (id: string) => void;
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'isApproved'>) => void;
  offers: SpecialOffer[];
  faqs: FAQ[];
  cookieConsent: boolean;
  acceptCookies: () => void;
  showAdminDashboard: boolean;
  adminBookings: Booking[];
  adminReviews: Review[];
  approveReview: (id: string) => void;
  deleteReview: (id: string) => void;
  updateBookingStatus: (id: string, status: 'confirmed' | 'cancelled') => void;
  addOffer: (offer: Omit<SpecialOffer, 'id'>) => void;
  deleteOffer: (id: string) => void;
  addFAQ: (faq: Omit<FAQ, 'id'>) => void;
  deleteFAQ: (id: string) => void;
};

const AppContext = createContext<AppContextType | null>(null);

const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

// ============ PROVIDER ============
function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [offers, setOffers] = useState<SpecialOffer[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [cookieConsent, setCookieConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('esl_cookie_consent');
    if (consent === 'accepted') setCookieConsent(true);
    
    setBookings(getStoredBookings());
    setReviews(getStoredReviews());
    setOffers(getStoredOffers());
    setFaqs(getStoredFAQs());
    
    const loggedUser = localStorage.getItem('esl_current_user');
    if (loggedUser) setUser(JSON.parse(loggedUser));
  }, []);

  const saveBookings = (newBookings: Booking[]) => {
    setBookings(newBookings);
    localStorage.setItem('esl_bookings', JSON.stringify(newBookings));
  };

  const login = (email: string, name?: string) => {
    const users = getStoredUsers();
    let existingUser = users.find(u => u.email === email);
    if (!existingUser) {
      existingUser = { id: Date.now().toString(), name: name || email.split('@')[0], email, isAdmin: false };
      const updatedUsers = [...users, existingUser];
      localStorage.setItem('esl_users', JSON.stringify(updatedUsers));
    }
    setUser(existingUser);
    localStorage.setItem('esl_current_user', JSON.stringify(existingUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('esl_current_user');
  };

  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status' | 'userId' | 'userName'>) => {
    if (!user) return;
    const newBooking: Booking = {
      ...bookingData,
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    const updated = [...bookings, newBooking];
    saveBookings(updated);
    alert('✓ Booking request sent! We will confirm within 2 hours.');
  };

  const cancelBooking = (id: string) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: 'cancelled' } : b);
    saveBookings(updated);
    alert('Booking cancelled successfully.');
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'isApproved'>) => {
    const newReview: Review = {
      ...reviewData,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      isApproved: false,
    };
    const updated = [...reviews, newReview];
    setReviews(updated);
    localStorage.setItem('esl_reviews', JSON.stringify(updated));
    alert('Thank you for your review! It will appear after admin approval.');
  };

  const acceptCookies = () => {
    setCookieConsent(true);
    localStorage.setItem('esl_cookie_consent', 'accepted');
  };

  const showAdminDashboard = user?.isAdmin || false;
  const adminBookings = bookings;
  const adminReviews = reviews;
  
  const approveReview = (id: string) => {
    const updated = reviews.map(r => r.id === id ? { ...r, isApproved: true } : r);
    setReviews(updated);
    localStorage.setItem('esl_reviews', JSON.stringify(updated));
  };
  
  const deleteReview = (id: string) => {
    const updated = reviews.filter(r => r.id !== id);
    setReviews(updated);
    localStorage.setItem('esl_reviews', JSON.stringify(updated));
  };
  
  const updateBookingStatus = (id: string, status: 'confirmed' | 'cancelled') => {
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    saveBookings(updated);
  };
  
  const addOffer = (offerData: Omit<SpecialOffer, 'id'>) => {
    const newOffer: SpecialOffer = { ...offerData, id: Date.now().toString() };
    const updated = [...offers, newOffer];
    setOffers(updated);
    localStorage.setItem('esl_offers', JSON.stringify(updated));
  };
  
  const deleteOffer = (id: string) => {
    const updated = offers.filter(o => o.id !== id);
    setOffers(updated);
    localStorage.setItem('esl_offers', JSON.stringify(updated));
  };
  
  const addFAQ = (faqData: Omit<FAQ, 'id'>) => {
    const newFAQ: FAQ = { ...faqData, id: Date.now().toString() };
    const updated = [...faqs, newFAQ];
    setFaqs(updated);
    localStorage.setItem('esl_faqs', JSON.stringify(updated));
  };
  
  const deleteFAQ = (id: string) => {
    const updated = faqs.filter(f => f.id !== id);
    setFaqs(updated);
    localStorage.setItem('esl_faqs', JSON.stringify(updated));
  };

  return (
    <AppContext.Provider value={{
      user, login, logout, bookings, addBooking, cancelBooking, reviews, addReview,
      offers, faqs, cookieConsent, acceptCookies, showAdminDashboard, adminBookings,
      adminReviews, approveReview, deleteReview, updateBookingStatus, addOffer, deleteOffer,
      addFAQ, deleteFAQ
    }}>
      {children}
    </AppContext.Provider>
  );
}

// ============ SHARE BUTTONS ============
const ShareButtons = ({ title, url }: { title: string; url: string }) => {
  const shareOnWhatsApp = () => window.open(`https://wa.me/?text=${encodeURIComponent(title + ' - ' + url)}`, '_blank');
  const shareOnFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  const shareOnTwitter = () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
  
  return (
    <div className="flex gap-2 mt-4">
      <button onClick={shareOnWhatsApp} className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition text-sm"><i className="fab fa-whatsapp"></i></button>
      <button onClick={shareOnFacebook} className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition text-sm"><i className="fab fa-facebook-f"></i></button>
      <button onClick={shareOnTwitter} className="bg-black hover:bg-gray-800 text-white p-2 rounded-full transition text-sm"><i className="fab fa-twitter"></i></button>
    </div>
  );
};

// ============ FLOATING WHATSAPP BUTTON ============
const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/27794001549?text=Hello!%20I'm%20interested%20in%20booking%20a%20suite%20at%20Eatery%20Suites%20%26%20Lodge."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-xl transition-all hover:scale-110 animate-bounce"
    >
      <i className="fab fa-whatsapp text-2xl md:text-3xl"></i>
    </a>
  );
};

// ============ COOKIE CONSENT BANNER ============
const CookieConsent = () => {
  const { cookieConsent, acceptCookies } = useApp();
  if (cookieConsent) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur border-t border-amber-500 p-4 md:p-5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white text-sm md:text-base text-center md:text-left">
          🍪 We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
        </p>
        <button onClick={acceptCookies} className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-xl text-sm font-semibold transition">Accept</button>
      </div>
    </div>
  );
};

// ============ TESTIMONIALS CAROUSEL (FIXED - no conditional hooks) ============
const TestimonialsCarousel = () => {
  const { reviews } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const approvedReviews = reviews.filter(r => r.isApproved);
  
  const next = () => {
    if (approvedReviews.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % approvedReviews.length);
    }
  };
  
  const prev = () => {
    if (approvedReviews.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + approvedReviews.length) % approvedReviews.length);
    }
  };
  
  useEffect(() => {
    if (approvedReviews.length === 0) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [approvedReviews.length]);
  
  if (approvedReviews.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-green-900 py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
        <p className="uppercase tracking-[0.3em] text-amber-400 font-semibold mb-2 text-xs md:text-sm">Testimonials</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">What Our Guests Say</h2>
        <div className="relative">
          <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 md:p-3 transition"><i className="fas fa-chevron-left text-sm md:text-base"></i></button>
          <div className="bg-white/10 backdrop-blur rounded-3xl p-6 md:p-8 mx-8">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <i key={i} className={`fas fa-star ${i < approvedReviews[currentIndex].rating ? 'text-amber-400' : 'text-gray-500'} text-base md:text-lg`}></i>
              ))}
            </div>
            <p className="text-white text-base md:text-xl italic mb-4">"{approvedReviews[currentIndex].comment}"</p>
            <p className="text-amber-400 font-semibold">— {approvedReviews[currentIndex].userName}</p>
            <p className="text-gray-300 text-xs md:text-sm mt-1">{approvedReviews[currentIndex].date}</p>
          </div>
          <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 md:p-3 transition"><i className="fas fa-chevron-right text-sm md:text-base"></i></button>
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {approvedReviews.map((_, idx) => (
            <button key={idx} onClick={() => setCurrentIndex(idx)} className={`w-2 h-2 rounded-full transition ${idx === currentIndex ? 'bg-amber-400 w-4' : 'bg-white/50'}`}></button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============ FAQ ACCORDION ============
const FAQAccordion = () => {
  const { faqs } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  return (
    <section id="faq" className="py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-12">
          <p className="uppercase tracking-[0.3em] text-amber-600 font-semibold mb-2 text-xs md:text-sm">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold text-green-900">Frequently Asked Questions</h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-3 rounded-full"></div>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={faq.id} className="border border-gray-200 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex justify-between items-center p-5 md:p-6 text-left bg-gray-50 hover:bg-gray-100 transition"
              >
                <span className="font-semibold text-green-800 text-sm md:text-base">{faq.question}</span>
                <i className={`fas fa-chevron-${openIndex === idx ? 'up' : 'down'} text-amber-600 transition`}></i>
              </button>
              {openIndex === idx && (
                <div className="p-5 md:p-6 bg-white border-t border-gray-100">
                  <p className="text-gray-600 text-sm md:text-base">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ ADMIN DASHBOARD ============
const AdminDashboard = () => {
  const { adminBookings, adminReviews, approveReview, deleteReview, updateBookingStatus, addOffer, deleteOffer, offers, addFAQ, deleteFAQ, faqs } = useApp();
  const [activeTab, setActiveTab] = useState<'bookings' | 'reviews' | 'offers' | 'faqs'>('bookings');
  const [newOffer, setNewOffer] = useState({ title: '', description: '', discount: '', validUntil: '', image: '' });
  const [newFAQ, setNewFAQ] = useState({ question: '', answer: '' });
  
  const handleAddOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (newOffer.title && newOffer.description) {
      addOffer(newOffer);
      setNewOffer({ title: '', description: '', discount: '', validUntil: '', image: '' });
    }
  };
  
  const handleAddFAQ = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFAQ.question && newFAQ.answer) {
      addFAQ(newFAQ);
      setNewFAQ({ question: '', answer: '' });
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">Admin Dashboard</h1>
        
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          <button onClick={() => setActiveTab('bookings')} className={`px-5 py-2 rounded-t-xl font-semibold transition ${activeTab === 'bookings' ? 'bg-green-900 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Bookings</button>
          <button onClick={() => setActiveTab('reviews')} className={`px-5 py-2 rounded-t-xl font-semibold transition ${activeTab === 'reviews' ? 'bg-green-900 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Reviews</button>
          <button onClick={() => setActiveTab('offers')} className={`px-5 py-2 rounded-t-xl font-semibold transition ${activeTab === 'offers' ? 'bg-green-900 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Special Offers</button>
          <button onClick={() => setActiveTab('faqs')} className={`px-5 py-2 rounded-t-xl font-semibold transition ${activeTab === 'faqs' ? 'bg-green-900 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>FAQs</button>
        </div>
        
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-green-900 text-white">
                <tr><th className="p-3 text-left">Guest</th><th className="p-3 text-left">Suite</th><th className="p-3 text-left">Dates</th><th className="p-3 text-left">Guests</th><th className="p-3 text-left">Status</th><th className="p-3 text-left">Actions</th></tr>
              </thead>
              <tbody>
                {adminBookings.map(booking => (
                  <tr key={booking.id} className="border-b border-gray-200">
                    <td className="p-3">{booking.userName}</td><td className="p-3">{booking.suiteType}</td>
                    <td className="p-3">{booking.checkIn} → {booking.checkOut}</td><td className="p-3">{booking.guests}</td>
                    <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : booking.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{booking.status}</span></td>
                    <td className="p-3 flex gap-2">
                      {booking.status === 'pending' && <button onClick={() => updateBookingStatus(booking.id, 'confirmed')} className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs">Confirm</button>}
                      {booking.status === 'pending' && <button onClick={() => updateBookingStatus(booking.id, 'cancelled')} className="bg-red-600 text-white px-3 py-1 rounded-lg text-xs">Cancel</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {adminReviews.map(review => (
              <div key={review.id} className="bg-white rounded-2xl p-5 shadow-md flex justify-between items-start">
                <div><div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <i key={i} className={`fas fa-star ${i < review.rating ? 'text-amber-400' : 'text-gray-300'} text-sm`}></i>)}</div><p className="font-semibold">{review.userName}</p><p className="text-gray-600 text-sm mt-1">{review.comment}</p><p className="text-gray-400 text-xs mt-1">{review.date}</p></div>
                <div className="flex gap-2">
                  {!review.isApproved && <button onClick={() => approveReview(review.id)} className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs">Approve</button>}
                  <button onClick={() => deleteReview(review.id)} className="bg-red-600 text-white px-3 py-1 rounded-lg text-xs">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'offers' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-green-900 mb-4">Add New Offer</h3>
              <form onSubmit={handleAddOffer} className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="Title" value={newOffer.title} onChange={e => setNewOffer({...newOffer, title: e.target.value})} className="border rounded-xl px-4 py-2" required />
                <input type="text" placeholder="Discount (e.g., 20% OFF)" value={newOffer.discount} onChange={e => setNewOffer({...newOffer, discount: e.target.value})} className="border rounded-xl px-4 py-2" />
                <input type="text" placeholder="Description" value={newOffer.description} onChange={e => setNewOffer({...newOffer, description: e.target.value})} className="border rounded-xl px-4 py-2" required />
                <input type="date" placeholder="Valid Until" value={newOffer.validUntil} onChange={e => setNewOffer({...newOffer, validUntil: e.target.value})} className="border rounded-xl px-4 py-2" />
                <button type="submit" className="bg-green-900 text-white px-6 py-2 rounded-xl font-semibold">Add Offer</button>
              </form>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {offers.map(offer => (
                <div key={offer.id} className="bg-white rounded-2xl p-5 shadow-md flex justify-between items-center">
                  <div><h4 className="font-bold text-green-900">{offer.title}</h4><p className="text-amber-600 font-semibold text-sm">{offer.discount}</p><p className="text-gray-500 text-xs">{offer.description}</p></div>
                  <button onClick={() => deleteOffer(offer.id)} className="bg-red-600 text-white px-3 py-1 rounded-lg text-xs">Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-green-900 mb-4">Add New FAQ</h3>
              <form onSubmit={handleAddFAQ} className="space-y-4">
                <input type="text" placeholder="Question" value={newFAQ.question} onChange={e => setNewFAQ({...newFAQ, question: e.target.value})} className="w-full border rounded-xl px-4 py-2" required />
                <textarea placeholder="Answer" value={newFAQ.answer} onChange={e => setNewFAQ({...newFAQ, answer: e.target.value})} className="w-full border rounded-xl px-4 py-2" rows={3} required></textarea>
                <button type="submit" className="bg-green-900 text-white px-6 py-2 rounded-xl font-semibold">Add FAQ</button>
              </form>
            </div>
            <div className="space-y-3">
              {faqs.map(faq => (
                <div key={faq.id} className="bg-white rounded-2xl p-5 shadow-md flex justify-between items-center">
                  <div><p className="font-semibold">{faq.question}</p><p className="text-gray-500 text-sm">{faq.answer.substring(0, 100)}...</p></div>
                  <button onClick={() => deleteFAQ(faq.id)} className="bg-red-600 text-white px-3 py-1 rounded-lg text-xs">Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============ SPECIAL OFFERS SECTION ============
const SpecialOffers = () => {
  const { offers } = useApp();
  return (
    <section id="offers" className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-12">
          <p className="uppercase tracking-[0.3em] text-amber-600 font-semibold mb-2 text-xs md:text-sm">Limited Time</p>
          <h2 className="text-3xl md:text-4xl font-bold text-green-900">Special Offers</h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-3 rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {offers.map(offer => (
            <div key={offer.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
              <img src={offer.image} alt={offer.title} className="h-48 w-full object-cover" />
              <div className="p-6">
                <div className="inline-block bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">{offer.discount}</div>
                <h3 className="text-xl font-bold text-green-900 mb-2">{offer.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{offer.description}</p>
                <p className="text-gray-400 text-xs">Valid until {offer.validUntil}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ USER LOGIN MODAL ============
const LoginModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, name);
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-green-900">Login / Sign Up</h2><button onClick={onClose} className="text-gray-500 text-2xl">&times;</button></div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className="w-full border rounded-xl px-4 py-3" required />
          <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} className="w-full border rounded-xl px-4 py-3" required />
          <button type="submit" className="w-full bg-green-900 text-white py-3 rounded-xl font-semibold">Continue</button>
        </form>
      </div>
    </div>
  );
};

// ============ MY BOOKINGS PAGE ============
const MyBookings = () => {
  const { user, bookings, cancelBooking } = useApp();
  const userBookings = bookings.filter(b => b.userId === user?.id);
  
  if (!user) return <div className="text-center py-20">Please login to view your bookings.</div>;
  
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">My Bookings</h1>
        {userBookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center"><p className="text-gray-500">You have no bookings yet.</p></div>
        ) : (
          <div className="space-y-4">
            {userBookings.map(booking => (
              <div key={booking.id} className="bg-white rounded-2xl p-6 shadow-md flex flex-wrap justify-between items-center">
                <div><p className="font-bold text-green-900">{booking.suiteType}</p><p className="text-sm text-gray-600">{booking.checkIn} → {booking.checkOut}</p><p className="text-sm text-gray-600">{booking.guests} guests</p></div>
                <div><span className={`px-3 py-1 rounded-full text-sm ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : booking.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{booking.status}</span></div>
                {booking.status === 'pending' && <button onClick={() => cancelBooking(booking.id)} className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm">Cancel</button>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ============ REVIEW FORM ============
const ReviewForm = () => {
  const { user, addReview } = useApp();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { alert('Please login to leave a review'); return; }
    addReview({ userName: user.name, rating, comment });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setComment('');
    setRating(5);
  };
  
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
      <h3 className="text-xl font-bold text-green-900 mb-4">Leave a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          {[1,2,3,4,5].map(s => (
            <button key={s} type="button" onClick={() => setRating(s)} className="text-2xl"><i className={`fas fa-star ${s <= rating ? 'text-amber-400' : 'text-gray-300'}`}></i></button>
          ))}
        </div>
        <textarea rows={4} placeholder="Share your experience..." value={comment} onChange={e => setComment(e.target.value)} className="w-full border rounded-xl px-4 py-3" required></textarea>
        <button type="submit" className="bg-green-900 text-white px-6 py-3 rounded-xl font-semibold">Submit Review</button>
        {submitted && <p className="text-green-600 text-sm">✓ Thank you! Your review awaits admin approval.</p>}
      </form>
    </div>
  );
};

// ============ MAIN HOME PAGE ============
const HomePage = () => {
  const { user, logout, showAdminDashboard } = useApp();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showBookings, setShowBookings] = useState(false);
  
  const scrollToSection = (sectionId: string) => {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  if (showAdminDashboard) return <AdminDashboard />;
  if (showBookings) return <MyBookings />;
  
  const rooms = [
    { title: "Standard Suite", price: "R650 / night", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format", description: "Cozy modern suite with premium comfort.", amenities: ["Queen bed", "Work desk", "Free Wi-Fi"] },
    { title: "Deluxe Suite", price: "R950 / night", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format", description: "Luxurious interiors with living area.", amenities: ["King bed", "Living area", "Mini fridge"] },
    { title: "Executive Suite", price: "R1,250 / night", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=600&auto=format", description: "Premium suite with panoramic views.", amenities: ["Super king bed", "Jacuzzi", "Balcony"] },
  ];
  
  return (
    <div className="min-h-screen bg-white">
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <FloatingWhatsApp />
      <CookieConsent />
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <button onClick={() => setShowBookings(false)} className="cursor-pointer">
            <Logo />
          </button>
          <div className="hidden md:flex gap-6 lg:gap-8 text-sm font-medium">
            <button onClick={() => scrollToSection('about')} className="text-green-700 hover:text-green-900 transition">About</button>
            <button onClick={() => scrollToSection('rooms')} className="text-green-700 hover:text-green-900 transition">Rooms</button>
            <button onClick={() => scrollToSection('offers')} className="text-green-700 hover:text-green-900 transition">Offers</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-green-700 hover:text-green-900 transition">Reviews</button>
            <button onClick={() => scrollToSection('faq')} className="text-green-700 hover:text-green-900 transition">FAQ</button>
            <button onClick={() => scrollToSection('contact')} className="text-green-700 hover:text-green-900 transition">Contact</button>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex gap-2">
                <button onClick={() => setShowBookings(true)} className="text-green-900 text-sm font-medium hover:text-green-700">My Bookings</button>
                <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm">Logout</button>
              </div>
            ) : (
              <button onClick={() => setShowLoginModal(true)} className="bg-green-900 text-white px-5 py-2 rounded-xl hover:bg-green-800 transition">Login</button>
            )}
          </div>
        </div>
      </nav>
      
      {/* Hero */}
      <section id="home" className="relative h-screen flex items-center justify-center text-center pt-16" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=1600&auto=format')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 px-4 max-w-4xl text-white">
          <h1 className="text-4xl md:text-7xl font-bold mb-4">Modern Airbnb-Style Hospitality</h1>
          <p className="text-lg md:text-2xl mb-8">Comfortable suites, integrated food experiences, and premium short-stay accommodation.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowLoginModal(true)} className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition">Book Now</button>
            <button onClick={() => scrollToSection('rooms')} className="border-2 border-white hover:bg-white hover:text-black px-8 py-4 rounded-2xl text-lg font-semibold transition">Explore</button>
          </div>
        </div>
      </section>
      
      {/* About */}
      <section id="about" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
          <img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format" alt="Lodge" className="rounded-3xl shadow-2xl h-[400px] w-full object-cover" />
          <div>
            <p className="uppercase tracking-[0.3em] text-amber-600 font-semibold mb-2">About Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">Hospitality With Comfort & Style</h2>
            <p className="text-gray-600 leading-8">Eatery Suites & Lodge is a modern hospitality destination designed for business travelers, tourists, and guests looking for a relaxing Airbnb-style stay. Integrated with Eatery Food Spot, guests enjoy premium accommodation together with curated food experiences, breakfast packages, and exceptional hospitality service.</p>
          </div>
        </div>
      </section>
      
      {/* Rooms */}
      <section id="rooms" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900">Our Suites</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-3 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {rooms.map(room => (
              <div key={room.title} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
                <img src={room.image} className="h-64 w-full object-cover" />
                <div className="p-5">
                  <h3 className="text-xl font-bold text-green-900">{room.title}</h3>
                  <span className="text-amber-600 font-semibold">{room.price}</span>
                  <p className="text-gray-600 text-sm mt-2">{room.description}</p>
                  <button onClick={() => setShowLoginModal(true)} className="mt-4 w-full bg-green-900 hover:bg-green-800 text-white py-2 rounded-xl transition">Book Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <SpecialOffers />
      <TestimonialsCarousel />
      <FAQAccordion />
      
      {/* Review Form */}
      <section id="testimonials" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <ReviewForm />
        </div>
      </section>
      
      {/* Contact */}
      <section id="contact" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">Contact Us</h2>
            <div className="space-y-4 text-gray-700">
              <p className="flex items-center gap-3"><i className="fas fa-map-marker-alt text-amber-600 w-6"></i> Johannesburg, South Africa</p>
              <p className="flex items-center gap-3"><i className="fas fa-phone-alt text-amber-600 w-6"></i> +27 79 400 1549</p>
              <p className="flex items-center gap-3"><i className="fas fa-envelope text-amber-600 w-6"></i> reservations@eaterysuites.co.za</p>
            </div>
            <ShareButtons title="Eatery Suites & Lodge" url="https://eaterysuites.co.za" />
          </div>
          <div className="bg-gray-100 rounded-2xl overflow-hidden h-[400px]">
            <iframe 
              className="w-full h-full" 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229173.2263848952!2d27.918863219369305!3d-26.174090399999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950c1e8e7e7e7f%3A0x2b8b8b8b8b8b8b8b!2sJohannesburg!5e0!3m2!1sen!2sza!4v1700000000000!5m2!1sen!2sza" 
              allowFullScreen 
              loading="lazy"
              title="Eatery Suites & Lodge Location"
            ></iframe>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-black text-gray-400 py-10 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <Logo />
          <p className="text-sm mt-4">© 2026 Eatery Suites & Lodge. All rights reserved.</p>
          <p className="text-xs mt-2 tracking-wide">COMFORT • HOSPITALITY • MEMORIES</p>
        </div>
      </footer>
    </div>
  );
};

// ============ MAIN APP ============
export default function EaterySuitesLodgeWebsite() {
  return (
    <AppProvider>
      <HomePage />
    </AppProvider>
  );
}