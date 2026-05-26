"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { Users, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const { user, isLoading } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-violet-500 flex items-center justify-center shadow-lg group-hover:shadow-brand-500/30 transition-shadow">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">
              CoFounder
              <span className="text-gradient">Connect</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              How it Works
            </Link>
            <Link
              href="#matches"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              Browse Founders
            </Link>
            <Link
              href="#success"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              Success Stories
            </Link>
          </div>

          {/* Auth Controls */}
          <div className="hidden md:flex items-center gap-3">
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Dashboard
                </Link>
                <div className="relative group">
                  <button className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 rounded-xl px-3 py-2 transition-colors">
                    {user.picture ? (
                      <Image
                        src={user.picture}
                        alt={user.name ?? "User"}
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                        {user.name?.[0]?.toUpperCase() ?? "U"}
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-700 max-w-24 truncate">
                      {user.name?.split(" ")[0]}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>

                  <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Edit Profile
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <a
                      href="/api/auth/logout"
                      className="block px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <a
                  href="/api/auth/login"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2 transition-colors"
                >
                  Sign In
                </a>
                <a
                  href="/api/auth/login"
                  className="bg-gradient-to-r from-brand-500 to-violet-500 hover:from-brand-600 hover:to-violet-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-brand-500/25"
                >
                  Get Started Free
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-gray-700" />
            ) : (
              <Menu className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 pt-4 space-y-2 animate-slide-up">
            <Link
              href="#features"
              className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-50"
            >
              How it Works
            </Link>
            <Link
              href="#matches"
              className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-50"
            >
              Browse Founders
            </Link>
            {!user && (
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href="/api/auth/login"
                  className="text-center py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50"
                >
                  Sign In
                </a>
                <a
                  href="/api/auth/login"
                  className="text-center py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-violet-500 rounded-xl"
                >
                  Get Started Free
                </a>
              </div>
            )}
            {user && (
              <a
                href="/api/auth/logout"
                className="block px-3 py-2 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50"
              >
                Sign Out
              </a>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
