"use client";

import { ArrowRight, Play, Users, Zap, Shield } from "lucide-react";
import { useUser } from "@auth0/nextjs-auth0/client";

const TRUST_BADGES = [
  { icon: <Users className="w-3.5 h-3.5" />, text: "12,400+ founders" },
  { icon: <Zap className="w-3.5 h-3.5" />, text: "Avg. 11-day match" },
  { icon: <Shield className="w-3.5 h-3.5" />, text: "Vetted profiles only" },
];

const FLOATING_CARDS = [
  {
    avatar: "MK",
    name: "Maya K.",
    role: "CTO Found",
    score: "97%",
    gradient: "from-brand-400 to-violet-500",
    position: "top-8 -left-4 rotate-[-6deg]",
  },
  {
    avatar: "JL",
    name: "James L.",
    role: "CEO Match",
    score: "91%",
    gradient: "from-violet-400 to-pink-500",
    position: "bottom-8 -right-4 rotate-[4deg]",
  },
];

export default function Hero() {
  const { user } = useUser();

  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-24">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-[600px] h-[600px] bg-gradient-to-br from-brand-100 via-violet-100 to-pink-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-40 -left-32 w-[500px] h-[500px] bg-gradient-to-tr from-brand-50 to-violet-100 rounded-full blur-3xl opacity-50" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div className="text-center lg:text-left animate-slide-up">
            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 text-brand-700 text-sm font-medium px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              New: Real-time compatibility scoring is live
              <ArrowRight className="w-3.5 h-3.5" />
            </div>

            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 leading-[1.05] tracking-tight mb-6">
              Find the{" "}
              <span className="relative">
                <span className="text-gradient">co-founder</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                >
                  <path
                    d="M2 8C50 4 100 2 150 4C200 6 250 8 298 5"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" x2="300" y1="0" y2="0">
                      <stop stopColor="#3b82f6" />
                      <stop offset="1" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <br />
              who makes you{" "}
              <span className="text-gradient">unstoppable</span>
            </h1>

            <p className="text-xl text-gray-500 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              CoFounderConnect uses real-time skill-gap analysis and
              personality matching to pair ambitious founders with their
              perfect complement. Stop building alone.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10">
              {TRUST_BADGES.map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-1.5 text-sm text-gray-500 font-medium"
                >
                  <span className="text-brand-500">{badge.icon}</span>
                  {badge.text}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {user ? (
                <a
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-500 to-violet-500 hover:from-brand-600 hover:to-violet-600 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all shadow-xl hover:shadow-brand-500/30 hover:-translate-y-0.5"
                >
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5" />
                </a>
              ) : (
                <a
                  href="/api/auth/login"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-500 to-violet-500 hover:from-brand-600 hover:to-violet-600 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all shadow-xl hover:shadow-brand-500/30 hover:-translate-y-0.5"
                >
                  Find My Co-Founder — Free
                  <ArrowRight className="w-5 h-5" />
                </a>
              )}
              <button className="inline-flex items-center justify-center gap-2 text-gray-700 font-semibold text-lg px-6 py-4 rounded-2xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all">
                <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 text-brand-600 ml-0.5" />
                </div>
                Watch 90-sec demo
              </button>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="hidden lg:flex justify-center items-center relative">
            <div className="relative w-[420px] h-[480px]">
              {/* Main card */}
              <div className="absolute inset-8 bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-sm font-bold text-gray-900">
                    Your Best Match
                  </span>
                  <span className="text-xs bg-green-100 text-green-700 font-bold px-2.5 py-1 rounded-full">
                    ⚡ 94% Compatible
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-400 to-violet-500 flex items-center justify-center text-white font-bold text-xl">
                    AR
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">
                      Alex Rivera
                    </div>
                    <div className="text-gray-500 text-sm">
                      Full-Stack Engineer
                    </div>
                    <div className="text-xs text-brand-600 font-medium mt-0.5">
                      San Francisco · Full-time
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-5">
                  {[
                    { label: "Skill Complement", value: 97, color: "bg-brand-500" },
                    { label: "Vision Alignment", value: 91, color: "bg-violet-500" },
                    { label: "Work Style Fit", value: 88, color: "bg-pink-500" },
                  ].map((bar) => (
                    <div key={bar.label}>
                      <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                        <span>{bar.label}</span>
                        <span className="font-bold text-gray-700">
                          {bar.value}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${bar.color} rounded-full`}
                          style={{ width: `${bar.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {["React", "Node.js", "AWS", "MongoDB"].map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <button className="w-full bg-gradient-to-r from-brand-500 to-violet-500 text-white font-semibold py-3 rounded-xl text-sm hover:from-brand-600 hover:to-violet-600 transition-all">
                  Send Introduction →
                </button>
              </div>

              {/* Floating decorative cards */}
              {FLOATING_CARDS.map((card) => (
                <div
                  key={card.name}
                  className={`absolute ${card.position} bg-white rounded-2xl shadow-xl border border-gray-100 p-3 flex items-center gap-2.5 w-44`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                  >
                    {card.avatar}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">
                      {card.name}
                    </div>
                    <div className="text-xs text-gray-500">{card.role}</div>
                    <div className="text-xs text-green-600 font-bold">
                      {card.score} match
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
