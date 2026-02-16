"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiHelpCircle, FiSettings, FiLogOut, FiBell, FiUser } from "react-icons/fi";
import Image from "next/image";
import logo from "../../../public/logo.png";

const navigationItems = [
  { href: "/invisio/dashboard", label: "Dashboard" },
  { href: "/invisio/overview", label: "Overview" },
  { href: "/invisio/oop", label: "Disease Burden" },
  { href: "/invisio/treatment", label: "Treatment Mapping" },
  { href: "/invisio/prescription", label: "Prescription Analytics" },
  { href: "/invisio/diagnostic", label: "Diagnostics" },
  { href: "/invisio/coc", label: "Cost of Care Analytics" },
];

// User type definition
interface User {
  name?: string;
  email?: string;
  [key: string]: any;
}

const Topbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  const [isHydrated, setIsHydrated] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    
    // Get user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    
    const handleScroll = () => {
      const navigationElement = document.getElementById('navigation-tabs');
      if (navigationElement) {
        const offset = navigationElement.offsetTop;
        setIsSticky(window.scrollY > offset);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = useCallback(() => {
    // Clear both token and user from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/auth/login");
  }, [router]);

  const getCurrentDate = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date();
    const day = date.getDate();
    const suffix = day === 1 || day === 21 || day === 31 ? "st" : day === 2 || day === 22 ? "nd" : day === 3 || day === 23 ? "rd" : "th";
    return `${months[date.getMonth()]} ${day}${suffix} ${date.getFullYear()}`;
  };

  // Get user's first name or full name
  const getUserDisplayName = () => {
    if (!user) return 'User';
    
    // Try to get name from different possible structures
    if (user.name) {
      // If it's a full name, get the first name
      const nameParts = user.name.split(' ');
      return nameParts[0] || user.name;
    }
    if (user.firstName) return user.firstName;
    if (user.email) return user.email.split('@')[0]; // Use part before @ in email
    return 'User';
  };

  if (!isHydrated) {
    return (
      <div className="fixed top-0 left-0 right-0 h-16 bg-[#0A1647] z-50">
        <div className="animate-pulse h-full"></div>
      </div>
    );
  }

  return (
    <>
      {/* Top Section - This will scroll with the page */}
      <div className="bg-[#0A1647] text-white 2xl:px-32 lg:px-12 p-3  bg-contain bg-no-repeat bg-right"
       style={{
                backgroundImage: `url('/assets/ci2.png')`,
            }}>
        {/* Top Section - Notifications and Date */}
        <div className="flex items-center justify-between px-6 py-2">
          <div>
            <Image src={logo} alt="INVISIO Logo" width={120} height={30} className="object-contain" />
          </div>
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-1 hover:bg-blue-700/30 rounded-lg transition-colors">
              <FiBell size={18} />
            </button>

            {/* Settings with Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-1 hover:bg-blue-700/30 rounded-lg transition-colors"
              >
                <FiSettings size={18} />
              </button>
              
              {/* User Menu Dropdown */}
              {showUserMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm text-gray-600">Signed in as</p>
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user?.email || getUserDisplayName()}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        router.push('/settings/profile');
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <FiUser size={16} />
                      <span>Profile Settings</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <FiLogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Date */}
            <div className="text-xs text-white/80">
              {getCurrentDate()}
            </div>
          </div>
        </div>

        {/* Page Title Section - This will scroll with the page */}
        <div className="border-t border-white/10">
          <div className="flex items-end justify-between px-6 pt-6 pb-0">
            <div>
              <div className="text-xs text-white/60 mb-1">Overview</div>
              <h1 className="text-3xl font-light mb-1">
                Welcome back, {getUserDisplayName()}
              </h1>
              <p className="text-sm text-white/70 mb-6">Helping you uncover market opportunities with INVISIO™</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs - Sticky Section */}
      <div 
        id="navigation-tabs"
        className={`bg-[#0A1647] text-white 2xl:px-32 lg:px-12 p-3  transition-all duration-200 ${
          isSticky ? 'fixed top-0 left-0 right-0 z-[100] shadow-lg' : 'relative'
        }`}
      >
        <div className="px-6">
          <div className="flex items-center space-x-0 justify-between">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={` text-sm font-normal transition-colors relative border-b-2 ${
                  pathname === item.href
                    ? "text-white border-white"
                    : "text-white/60 border-transparent hover:text-white hover:border-white/30"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Spacer to prevent content jump when navigation becomes fixed */}
      {isSticky && <div className="h-[49px]" />}
    </>
  );
};

export default Topbar;