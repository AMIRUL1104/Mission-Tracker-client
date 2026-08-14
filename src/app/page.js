"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="bg-[#0d0f14] text-[#d8ddf0] min-h-screen flex items-center justify-center font-sans">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#0d0f14] text-[#d8ddf0] min-h-screen flex items-center justify-center p-5 font-sans">
      <div className="max-w-[500px] text-center">
        <div className="text-[32px] font-bold mb-3 font-mono">
          <span className="text-[#5b6af0]">{"//"}</span> Mission Tracker
        </div>

        <p className="text-[13px] text-[#8892b0] mb-2 font-mono">
          Personal Productivity &amp; Progress Tracking
        </p>

        <div className="my-10 leading-[1.8] text-sm text-[#d8ddf0]">
          <p className="mb-4">
            Mission Tracker helps you stay focused on what matters.
          </p>
          <p className="mb-4">
            Track your priorities, daily non-negotiables, consistency streaks,
            academic progress, and custom metrics—all organized by month.
          </p>
          <p>
            <strong>
              Ship &gt; Wait. Finish &gt; Perfect. Learn &gt; Overthink.
            </strong>
          </p>
        </div>

        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/login"
            className="inline-flex items-center justify-center bg-[#5b6af0] text-white px-6 py-2 rounded-md text-sm font-semibold no-underline cursor-pointer border-none transition-opacity duration-150 hover:opacity-85"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center bg-transparent text-[#8892b0] px-6 py-2 rounded-md text-sm font-semibold no-underline cursor-pointer border border-[#252a38] transition-all duration-150 hover:text-[#d8ddf0] hover:border-[#8892b0]"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
