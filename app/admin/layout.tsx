"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check if user is admin
    if (status === "loading") return;
    
    if (!session) {
      router.push("/auth/login");
    } else if (session.user?.role !== "admin") {
      router.push("/");
    }
  }, [session, status, router]);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/auth/login");
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session || session.user?.role !== "admin") {
    return null;
  }

  const navItems = [
    { href: "/admin/dashboard", icon: "fa-chart-line", label: "Dashboard" },
    { href: "/admin/rooms", icon: "fa-bed", label: "Rooms" },
    { href: "/admin/bookings", icon: "fa-calendar-check", label: "Bookings" },
    { href: "/admin/staff", icon: "fa-users", label: "Staff" },
    { href: "/admin/finance", icon: "fa-credit-card", label: "Finance" },
    { href: "/admin/reports", icon: "fa-chart-bar", label: "Reports" },
    { href: "/admin/marketing", icon: "fa-bullhorn", label: "Marketing" },
    { href: "/admin/settings", icon: "fa-cog", label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
            <h1 className="text-lg font-bold text-green-900 hidden sm:block">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 hidden md:block">
              Welcome, {session.user?.name}
            </span>
            <button 
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              <i className="fas fa-sign-out-alt mr-2"></i>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-screen fixed left-0 top-[57px] overflow-y-auto">
          <div className="p-4">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                    pathname === item.href ? "bg-green-900 text-white" : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <i className={`fas ${item.icon} w-5`}></i> {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}