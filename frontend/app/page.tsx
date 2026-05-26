import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import {
  Users,
  ArrowRight,
  Star,
  Building2,
  TrendingUp,
  MessageSquare,
} from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "CEO, NovaTech",
    avatar: "SC",
    content:
      "Found my CTO co-founder within 3 weeks. CoFounderConnect's skill-gap matching is uncannily accurate — he fills every technical gap I had.",
    company: "Raised $2.4M Seed",
  },
  {
    name: "Marcus Williams",
    role: "CTO, BuildFlow",
    avatar: "MW",
    content:
      "The compatibility score isn't just about skills. It factors in work style, vision alignment, and commitment level. We clicked immediately.",
    company: "YC W24",
  },
  {
    name: "Priya Nair",
    role: "Founder, HealthAI",
    avatar: "PN",
    content:
      "After 6 months searching on LinkedIn with zero results, CoFounderConnect found me 3 qualified matches in day one. Launched 4 months later.",
    company: "500K ARR",
  },
];

const STATS = [
  { label: "Founders Matched", value: "12,400+" },
  { label: "Startups Launched", value: "3,200+" },
  { label: "Avg. Match Time", value: "11 days" },
  { label: "Match Success Rate", value: "78%" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-brand-600 via-violet-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {STATS.map((stat) => (
              <div key={stat.label} className="animate-fade-in">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-blue-100 text-sm font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              From profile to partnership in{" "}
              <span className="text-gradient">3 steps</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              No cold emails. No awkward LinkedIn DMs. A structured path to
              finding the co-founder who will help you win.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-brand-400 to-violet-400" />

            {[
              {
                step: "01",
                icon: <Users className="w-8 h-8" />,
                title: "Build Your Founder Profile",
                desc: "Share your skills, vision, stage, and what you bring to the table. Our AI extracts your unique founder DNA.",
              },
              {
                step: "02",
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Get Compatibility Scores",
                desc: "Our algorithm analyzes skill complementarity, personality alignment, commitment level, and startup stage fit in real time.",
              },
              {
                step: "03",
                icon: <MessageSquare className="w-8 h-8" />,
                title: "Connect & Collaborate",
                desc: "Receive warm introductions to your top matches. Chat, schedule calls, and co-work on test projects before committing.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 card-hover"
              >
                <div className="absolute -top-4 left-8 bg-gradient-to-r from-brand-500 to-violet-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  Step {item.step}
                </div>
                <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-6 mt-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Founders who found their{" "}
              <span className="text-gradient">missing piece</span>
            </h2>
            <p className="text-xl text-gray-500">
              Real matches. Real startups. Real results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100 card-hover"
              >
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  &quot;{t.content}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-400 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{t.name}</div>
                    <div className="text-sm text-gray-500">{t.role}</div>
                    <div className="text-xs text-brand-600 font-medium mt-0.5">
                      {t.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white text-sm px-4 py-2 rounded-full mb-6">
            <Building2 className="w-4 h-4 text-brand-400" />
            <span>Join 12,400+ founders already on CoFounderConnect</span>
          </div>
          <h2 className="text-5xl font-bold text-white mb-6">
            Your co-founder is{" "}
            <span className="bg-gradient-to-r from-brand-400 to-violet-400 bg-clip-text text-transparent">
              already here
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Stop building alone. Stop searching in the wrong places. Your
            complementary co-founder — the person who makes your startup
            unstoppable — is waiting on CoFounderConnect.
          </p>
          <a
            href="/api/auth/login"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-500 to-violet-500 hover:from-brand-600 hover:to-violet-600 text-white font-semibold text-lg px-10 py-4 rounded-2xl transition-all duration-200 shadow-2xl hover:shadow-brand-500/25 hover:-translate-y-0.5"
          >
            Find My Co-Founder — Free
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="text-gray-500 text-sm mt-4">
            No credit card required · Setup in 5 minutes · Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-violet-500 flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-lg">
                CoFounderConnect
              </span>
            </div>
            <div className="flex gap-8 text-sm">
              <a href="#" className="hover:text-white transition-colors">
                About
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Blog
              </a>
            </div>
            <p className="text-sm">© 2024 CoFounderConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
