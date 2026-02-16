'use client';
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
const Layout2 = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const isAuthRoute = pathname?.startsWith("/auth");

  // Authentication check
  useEffect(() => {
    if (!isAuthRoute && !isLoggedIn()) {
      router.push("/auth/login/"); // Redirect to login if not authenticated and not on an auth route
    }
  }, [pathname, router, isAuthRoute]);

  // Render only children for auth routes
  if (isAuthRoute) {
    return <>{children}</>;
  }

  // Render full layout for authenticated users
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Sidebar />
      {/* Main content with top padding to account for fixed topbar */}
      <main className="mt-5 2xl:px-32 lg:px-12 p-3 relative z-0 isidora">
        {children}
      </main>
    </div>
  );
};

export default Layout2;





