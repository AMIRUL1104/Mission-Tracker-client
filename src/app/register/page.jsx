"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, error } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await register(
        formData.name,
        formData.email,
        formData.password,
        Number(formData.age),
      );
      router.push("/login"); // Registration successful -> navigate to Login
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0d0f14] text-[#d8ddf0] min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="bg-[#1a1e2a] border border-[#252a38] rounded-xl p-8 w-full max-w-md shadow-xl">
        <div className="text-2xl font-bold font-mono mb-2 text-white text-center">
          <span className="text-[#5b6af0]">{"//"}</span> Register
        </div>
        <p className="text-xs text-[#8892b0] font-mono text-center mb-6">
          Create your Mission Tracker account
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-md mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-mono text-[#8892b0] mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#141720] border border-[#252a38] text-[#d8ddf0] px-3 py-2 rounded-md text-sm focus:outline-none focus:border-[#5b6af0]"
              placeholder="Amirul Islam"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#8892b0] mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#141720] border border-[#252a38] text-[#d8ddf0] px-3 py-2 rounded-md text-sm focus:outline-none focus:border-[#5b6af0]"
              placeholder="user@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#8892b0] mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[#141720] border border-[#252a38] text-[#d8ddf0] px-3 py-2 rounded-md text-sm focus:outline-none focus:border-[#5b6af0]"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#8892b0] mb-1">
              Age
            </label>
            <input
              type="number"
              name="age"
              required
              value={formData.age}
              onChange={handleChange}
              className="w-full bg-[#141720] border border-[#252a38] text-[#d8ddf0] px-3 py-2 rounded-md text-sm focus:outline-none focus:border-[#5b6af0]"
              placeholder="20"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#5b6af0] hover:bg-[#4b5ae0] text-white py-2 px-4 rounded-md text-sm font-semibold mt-2 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? "Registering..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-[#8892b0]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#5b6af0] hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
