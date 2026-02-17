"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiHelpCircle, FiSettings, FiLogOut, FiBell, FiUser } from "react-icons/fi";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import Image from "next/image";
import logo from "../../../public/logo.svg";

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
  
  // Refs for sliding animation
  const navContainerRef = useRef<HTMLDivElement>(null);
  const mobileNavContainerRef = useRef<HTMLDivElement>(null);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  const [mobileSliderStyle, setMobileSliderStyle] = useState({ left: 0, width: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const linkRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const mobileLinkRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Scroll state for mobile
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    
    // Check scroll buttons on mobile
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScrollButtons);
    };
  }, []);

  // Check if scrolling is possible
  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5); // 5px threshold
    }
  };

  // Handle scroll on mobile
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200; // Adjust this value as needed
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      
      // Update button states after scroll
      setTimeout(checkScrollButtons, 300);
    }
  };

  // Update slider position when active tab changes (desktop)
  useEffect(() => {
    if (!isHydrated) return;

    // Find the active link
    const activeHref = navigationItems.find(item => isActive(item.href))?.href;
    if (activeHref && linkRefs.current[activeHref]) {
      const activeLink = linkRefs.current[activeHref];
      if (activeLink) {
        const { offsetLeft, offsetWidth } = activeLink;
        setSliderStyle({
          left: offsetLeft,
          width: offsetWidth
        });
      }
    }
  }, [pathname, isHydrated]);

  // Update mobile slider position
  useEffect(() => {
    if (!isHydrated) return;

    const activeHref = navigationItems.find(item => isActive(item.href))?.href;
    if (activeHref && mobileLinkRefs.current[activeHref]) {
      const activeLink = mobileLinkRefs.current[activeHref];
      if (activeLink && scrollContainerRef.current) {
        const containerLeft = scrollContainerRef.current.getBoundingClientRect().left;
        const linkLeft = activeLink.getBoundingClientRect().left;
        
        setMobileSliderStyle({
          left: linkLeft - containerLeft,
          width: activeLink.offsetWidth
        });
      }
    }
  }, [pathname, isHydrated]);

  // Scroll to active tab on mobile when component mounts or path changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeHref = navigationItems.find(item => isActive(item.href))?.href;
      if (activeHref && mobileLinkRefs.current[activeHref]) {
        const activeLink = mobileLinkRefs.current[activeHref];
        activeLink?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
        
        // Update slider position after scroll
        setTimeout(() => {
          if (activeLink && scrollContainerRef.current) {
            const containerLeft = scrollContainerRef.current.getBoundingClientRect().left;
            const linkLeft = activeLink.getBoundingClientRect().left;
            setMobileSliderStyle({
              left: linkLeft - containerLeft,
              width: activeLink.offsetWidth
            });
          }
          checkScrollButtons();
        }, 300);
      }
    }
  }, [pathname]);

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

  // Check if a navigation item is active - handles trailing slashes
  const isActive = (href: string) => {
    // Remove trailing slashes from both pathname and href for comparison
    const normalizedPathname = pathname?.replace(/\/$/, '') || '';
    const normalizedHref = href.replace(/\/$/, '');
    return normalizedPathname === normalizedHref;
  };

  // Handle mouse enter for hover effect (desktop)
  const handleMouseEnter = (href: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    const element = event.currentTarget;
    setSliderStyle({
      left: element.offsetLeft,
      width: element.offsetWidth
    });
    setIsAnimating(true);
  };

  // Handle mouse leave to return to active tab (desktop)
  const handleMouseLeave = () => {
    setIsAnimating(false);
    // Reset to active tab position
    const activeHref = navigationItems.find(item => isActive(item.href))?.href;
    if (activeHref && linkRefs.current[activeHref]) {
      const activeLink = linkRefs.current[activeHref];
      if (activeLink) {
        setSliderStyle({
          left: activeLink.offsetLeft,
          width: activeLink.offsetWidth
        });
      }
    }
  };

  // Handle mobile touch interactions
  const handleMobileTouch = (href: string, event: React.TouchEvent<HTMLAnchorElement>) => {
    const element = event.currentTarget;
    if (scrollContainerRef.current) {
      const containerLeft = scrollContainerRef.current.getBoundingClientRect().left;
      const linkLeft = element.getBoundingClientRect().left;
      
      setMobileSliderStyle({
        left: linkLeft - containerLeft,
        width: element.offsetWidth
      });
    }
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
      <div className="bg-[#0A1647] text-white 2xl:px-32 lg:px-12 bg-contain bg-no-repeat bg-right isidora"
       style={{
                backgroundImage: `url('/assets/ci2.png')`,
            }}>
        {/* Top Section - Notifications and Date */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2">
          <div>
            <Image src={logo} alt="INVISIO Logo" width={60} height={26} className="object-contain sm:w-[70px]" />
          </div>
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Notifications */}
            <button className="p-1 hover:bg-blue-700/30 rounded-lg transition-colors">
              <FiBell size={16} className="sm:w-[18px]" />
            </button>

            {/* Settings with Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-1 hover:bg-blue-700/30 rounded-lg transition-colors"
              >
                <FiSettings size={16} className="sm:w-[18px]" />
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
                      <p className="text-xs text-gray-600">Signed in as</p>
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

            {/* Date - Hidden on very small screens */}
            <div className="hidden xs:block text-xs text-white/80">
              {getCurrentDate()}
            </div>
          </div>
        </div>

        {/* Page Title Section - Adjust for mobile */}
        <div className="border-t border-white/10">
          <div className="flex items-end justify-between px-4 sm:px-6 pt-4 sm:pt-6 pb-0">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-light mb-1">
                Welcome back, {getUserDisplayName()}
              </h1>
              <p className="text-xs sm:text-sm text-white/70 mb-4 sm:mb-6">Helping you uncover market opportunities with INVISIO™</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs - Sticky Section */}
      <div 
        id="navigation-tabs"
        className={`bg-[#0A1647] text-white 2xl:px-32 lg:px-12 transition-all duration-200 ${
          isSticky ? 'fixed top-0 left-0 right-0 z-[100] shadow-lg' : 'relative'
        }`}
      >
        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden lg:block p-3">
          <div className="px-6">
            <div 
              ref={navContainerRef}
              className="relative flex items-center space-x-0 justify-between"
              onMouseLeave={handleMouseLeave}
            >
              {/* Sliding border for desktop */}
              <div
                className={`absolute bottom-0 h-0.5 bg-[#0794D4] transition-all duration-300 ease-in-out ${
                  isAnimating ? 'opacity-100' : 'opacity-100'
                }`}
                style={{
                  left: sliderStyle.left,
                  width: sliderStyle.width,
                }}
              />
              
              {navigationItems.map((item) => {
                const active = isActive(item.href);
                
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    ref={(el) => {
                      linkRefs.current[item.href] = el;
                    }}
                    onMouseEnter={(e) => handleMouseEnter(item.href, e)}
                    className={`text-xs transition-all duration-200 pb-2 px-3 relative whitespace-nowrap ${
                      active
                        ? "text-[#0794D4] font-bold"
                        : "text-white/60 font-normal hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Always visible on mobile */}
        <div className="lg:hidden relative">
          {/* Scroll buttons for mobile */}
          {canScrollLeft && (
            <button
              onClick={() => handleScroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#0A1647] p-1 rounded-r-lg shadow-lg"
            >
              <HiOutlineChevronLeft size={20} className="text-white" />
            </button>
          )}
          
          {canScrollRight && (
            <button
              onClick={() => handleScroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#0A1647] p-1 rounded-l-lg shadow-lg"
            >
              <HiOutlineChevronRight size={20} className="text-white" />
            </button>
          )}

          {/* Scrollable navigation container */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide py-3 px-4"
            onScroll={checkScrollButtons}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="relative flex items-center space-x-4 min-w-max">
              {/* Sliding border for mobile */}
              <div
                className="absolute bottom-0 h-0.5 bg-[#0794D4] transition-all duration-300 ease-in-out"
                style={{
                  left: mobileSliderStyle.left,
                  width: mobileSliderStyle.width,
                }}
              />
              
              {navigationItems.map((item) => {
                const active = isActive(item.href);
                
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    ref={(el) => {
                      mobileLinkRefs.current[item.href] = el;
                    }}
                    onTouchStart={(e) => handleMobileTouch(item.href, e)}
                    className={`text-sm transition-all duration-200 pb-2 px-3 relative whitespace-nowrap ${
                      active
                        ? "text-[#0794D4] font-bold"
                        : "text-white/60 font-normal hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content jump when navigation becomes fixed */}
      {isSticky && <div className="h-[49px] lg:h-[49px]" />}
    </>
  );
};

export default Topbar;