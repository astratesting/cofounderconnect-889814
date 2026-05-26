import {
  Zap,
  Brain,
  MessageSquare,
  Shield,
  BarChart3,
  Globe,
} from "lucide-react";

const FEATURES = [
  {
    icon: <Brain className="w-7 h-7" />,
    title: "AI Compatibility Engine",
    description:
      "Our algorithm scores 47 founder attributes — skills, values, commitment level, work style, and vision alignment — to surface only your most compatible matches.",
    color: "text-brand-600",
    bg: "bg-brand-50",
    border: "border-brand-100",
    tag: "Core Feature",
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: "Real-Time Skill Gap Analysis",
    description:
      "Identify exactly what skills your startup needs that you don't have. CoFounderConnect finds founders who fill your precise gaps — not just broadly technical people.",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
    tag: "Unique to CoFounder",
  },
  {
    icon: <MessageSquare className="w-7 h-7" />,
    title: "Structured Introductions",
    description:
      "Skip cold outreach. Every connection starts with a curated introduction that explains why you matched, what you each bring, and suggested first conversation topics.",
    color: "text-pink-600",
    bg: "bg-pink-50",
    border: "border-pink-100",
    tag: "No Cold DMs",
  },
  {
    icon: <Shield className="w-7 h-7" />,
    title: "Verified Founder Profiles",
    description:
      "Every profile is verified through LinkedIn, GitHub, or prior startup experience. No fake profiles, no tire-kickers. Only serious founders looking to build.",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-100",
    tag: "Trust & Safety",
  },
  {
    icon: <BarChart3 className="w-7 h-7" />,
    title: "Founder Compatibility Score",
    description:
      "See a transparent breakdown of your compatibility with every potential match: skill complement, personality fit, commitment alignment, and vision overlap.",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
    tag: "Transparency",
  },
  {
    icon: <Globe className="w-7 h-7" />,
    title: "Global + Remote-First Network",
    description:
      "Find co-founders in your city or anywhere in the world. Filter by time zone, remote preferences, and commitment level to find your ideal working arrangement.",
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-100",
    tag: "12,400+ Founders",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <Zap className="w-4 h-4" />
            Built for serious founders
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-5 leading-tight">
            Everything you need to find{" "}
            <span className="text-gradient">the right partner</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            CoFounderConnect is purpose-built for the unique challenge of
            co-founder matching — not a repurposed dating app or LinkedIn clone.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className={`group relative bg-white rounded-2xl p-7 border ${feature.border} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default`}
            >
              <div className="flex items-start justify-between mb-5">
                <div
                  className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center ${feature.color} group-hover:scale-110 transition-transform`}
                >
                  {feature.icon}
                </div>
                <span
                  className={`text-xs font-bold ${feature.color} ${feature.bg} px-2.5 py-1 rounded-full border ${feature.border}`}
                >
                  {feature.tag}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-16 bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-8 border border-gray-100 text-center">
          <p className="text-2xl font-bold text-gray-900 mb-2">
            Ready to find your co-founder?
          </p>
          <p className="text-gray-500 mb-6">
            Free to join. Set up your profile in under 5 minutes.
          </p>
          <a
            href="/api/auth/login"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-500 to-violet-500 hover:from-brand-600 hover:to-violet-600 text-white font-bold px-8 py-3.5 rounded-2xl transition-all shadow-lg hover:shadow-brand-500/25 hover:-translate-y-0.5"
          >
            Create Free Profile
            <Zap className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
