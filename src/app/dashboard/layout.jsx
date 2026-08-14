"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="bg-[#0d0f14] text-[#d8ddf0] min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Priorities", href: "/dashboard/priorities" },
    { label: "Tasks", href: "/dashboard/tasks" },
    { label: "Streak", href: "/dashboard/streak" },
    { label: "Academics", href: "/dashboard/academics" },
    { label: "Metrics", href: "/dashboard/metrics" },
    { label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <div className="bg-[#0d0f14] text-[#d8ddf0] min-h-screen grid grid-cols-1 font-sans">
      {/* Mobile Header */}
      <div className="hidden md:hidden max-md:flex bg-[#141720] border-b border-[#252a38] p-4 gap-3 items-center justify-between">
        <div className="text-base font-bold font-mono">
          <span className="text-[#5b6af0]">//</span> Mission Tracker
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-transparent border border-[#252a38] text-[#8892b0] px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer"
        >
          ☰
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-0">
        {/* Sidebar */}
        <aside
          className={`bg-[#141720] border-r border-[#252a38] py-6 h-[calc(100vh-var(--header-height,0px))] sticky top-0 overflow-y-auto 
          max-md:absolute max-md:top-[60px] max-md:left-0 max-md:right-0 max-md:h-auto max-md:z-10 max-md:border-r-0 max-md:border-b max-md:border-[#252a38]
          ${mobileMenuOpen ? "block" : "hidden md:block"}`}
        >
          <nav className="flex flex-col gap-0">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-5 py-3 text-[#8892b0] text-[13px] font-medium transition-all duration-150 border-l-[3px] border-transparent block hover:text-[#d8ddf0] hover:bg-[#5b6af0]/10 hover:border-l-[#5b6af0]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-[#252a38] mt-4 pt-4 px-5">
            <button
              onClick={handleLogout}
              className="bg-transparent border border-[#252a38] text-[#8892b0] py-2 px-3 rounded-md text-xs font-semibold cursor-pointer w-full transition-all duration-150 hover:text-[#d8ddf0] hover:border-[#8892b0]"
            >
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="py-6 px-5 overflow-y-auto max-h-screen max-md:max-h-[calc(100vh-60px)]">
          {/* Header */}
          <div className="border-b border-[#252a38] pb-[18px] mb-6 flex items-center justify-between">
            <div>
              <div className="text-xl font-bold text-white font-mono">
                <span className="text-[#5b6af0]">//</span> Mission Tracker
              </div>
              <div className="text-[11px] text-[#8892b0] font-mono mt-[3px]">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>

            <div className="text-[11px] font-mono text-[#3dd68c] bg-[#3dd68c]/[0.07] border border-[#3dd68c]/20 px-3 py-[5px] rounded-md inline-block">
              {user?.name || "User"}
            </div>
          </div>

          {/* Page Content */}
          {children}
        </main>
      </div>
    </div>
  );
}
