import { getSession } from "@auth0/nextjs-auth0";
import {
  Users,
  Bell,
  MessageSquare,
  TrendingUp,
  Star,
  ArrowRight,
  Zap,
  CheckCircle,
  Clock,
  MapPin,
  Code2,
  Briefcase,
  ChevronRight,
} from "lucide-react";

const MOCK_MATCHES = [
  {
    id: "1",
    name: "Alex Rivera",
    role: "Full-Stack Engineer",
    avatar: "AR",
    score: 94,
    skills: ["React", "Node.js", "AWS", "MongoDB"],
    stage: "Idea Stage",
    location: "San Francisco, CA",
    vision: "Building AI-powered dev tools",
    commitment: "Full-time",
    status: "new",
  },
  {
    id: "2",
    name: "Jordan Park",
    role: "Growth & Marketing Lead",
    avatar: "JP",
    score: 88,
    skills: ["GTM Strategy", "SEO", "Paid Ads", "Analytics"],
    stage: "Pre-seed",
    location: "New York, NY",
    vision: "Consumer fintech disruption",
    commitment: "Full-time",
    status: "viewed",
  },
  {
    id: "3",
    name: "Sam Okoye",
    role: "Product Designer & Researcher",
    avatar: "SO",
    score: 82,
    skills: ["Figma", "UX Research", "Design Systems", "Prototyping"],
    stage: "MVP Stage",
    location: "Remote",
    vision: "HealthTech accessibility",
    commitment: "Part-time → Full-time",
    status: "new",
  },
  {
    id: "4",
    name: "Taylor Kim",
    role: "Backend Engineer & ML",
    avatar: "TK",
    score: 79,
    skills: ["Python", "PyTorch", "PostgreSQL", "Kubernetes"],
    stage: "Idea Stage",
    location: "Austin, TX",
    vision: "Enterprise AI automation",
    commitment: "Full-time",
    status: "connected",
  },
];

const ACTIVITY_FEED = [
  {
    icon: "🔥",
    text: "3 new founders match your profile today",
    time: "2 min ago",
  },
  {
    icon: "💬",
    text: "Alex Rivera viewed your profile",
    time: "1 hr ago",
  },
  {
    icon: "✅",
    text: "Your profile completeness reached 85%",
    time: "3 hr ago",
  },
  {
    icon: "⚡",
    text: "New match: Jordan Park (88% compatibility)",
    time: "Yesterday",
  },
];

function MatchScoreBadge({ score }: { score: number }) {
  const color =
    score >= 90
      ? "bg-green-100 text-green-700 border-green-200"
      : score >= 80
        ? "bg-blue-100 text-blue-700 border-blue-200"
        : "bg-orange-100 text-orange-700 border-orange-200";

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${color}`}
    >
      <Zap className="w-3 h-3" />
      {score}% match
    </span>
  );
}

function StatusDot({ status }: { status: string }) {
  if (status === "new")
    return (
      <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
    );
  if (status === "connected")
    return <CheckCircle className="w-4 h-4 text-green-500" />;
  return null;
}

export default async function DashboardPage() {
  const session = await getSession();
  const user = session?.user;
  const firstName = user?.name?.split(" ")[0] ?? "Founder";

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {firstName} 👋
          </h1>
          <p className="text-gray-500 mt-1">
            You have{" "}
            <span className="font-semibold text-brand-600">
              3 new matches
            </span>{" "}
            since your last visit
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-500 to-violet-500 text-white font-semibold px-5 py-2.5 rounded-xl hover:from-brand-600 hover:to-violet-600 transition-all shadow-lg hover:shadow-brand-500/25 text-sm">
          <Users className="w-4 h-4" />
          Browse All Founders
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Profile Views",
            value: "47",
            change: "+12 this week",
            icon: <TrendingUp className="w-5 h-5 text-brand-500" />,
            bg: "bg-brand-50",
          },
          {
            label: "Active Matches",
            value: "12",
            change: "3 new today",
            icon: <Users className="w-5 h-5 text-violet-500" />,
            bg: "bg-violet-50",
          },
          {
            label: "Messages",
            value: "5",
            change: "2 unread",
            icon: <MessageSquare className="w-5 h-5 text-pink-500" />,
            bg: "bg-pink-50",
          },
          {
            label: "Match Score",
            value: "94%",
            change: "Top 8% of profiles",
            icon: <Star className="w-5 h-5 text-yellow-500" />,
            bg: "bg-yellow-50",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
          >
            <div
              className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}
            >
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            <div className="text-xs text-brand-600 mt-1">{stat.change}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Matches Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              Your Top Matches
            </h2>
            <button className="text-brand-600 hover:text-brand-700 text-sm font-medium flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {MOCK_MATCHES.map((match) => (
              <div
                key={match.id}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm card-hover cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-400 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                      {match.avatar}
                    </div>
                    {match.status === "new" && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-500 rounded-full border-2 border-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {match.name}
                      </h3>
                      <StatusDot status={match.status} />
                      <MatchScoreBadge score={match.score} />
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5" />
                        {match.role}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {match.location}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-3 italic">
                      &quot;{match.vision}&quot;
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {match.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg font-medium"
                        >
                          <Code2 className="w-3 h-3" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="flex-shrink-0 bg-brand-50 hover:bg-brand-100 text-brand-600 p-2.5 rounded-xl transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Completion */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">
              Profile Strength
            </h3>
            <div className="relative mb-3">
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-500 to-violet-500 rounded-full transition-all duration-700"
                  style={{ width: "85%" }}
                />
              </div>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-gray-500">Completion</span>
              <span className="font-bold text-brand-600">85%</span>
            </div>
            <div className="space-y-2">
              {[
                { task: "Add startup idea / pitch", done: true },
                { task: "Upload profile photo", done: true },
                { task: "List technical skills", done: true },
                { task: "Set commitment level", done: true },
                { task: "Connect LinkedIn", done: false },
                { task: "Write personal bio", done: false },
              ].map((item) => (
                <div key={item.task} className="flex items-center gap-2 text-sm">
                  {item.done ? (
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0" />
                  )}
                  <span
                    className={
                      item.done ? "text-gray-400 line-through" : "text-gray-700"
                    }
                  >
                    {item.task}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Activity</h3>
              <Bell className="w-4 h-4 text-gray-400" />
            </div>
            <div className="space-y-4">
              {ACTIVITY_FEED.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-sm text-gray-700 leading-snug">
                      {item.text}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-brand-600 to-violet-700 rounded-2xl p-5 text-white">
            <h3 className="font-bold mb-1">Boost Your Visibility</h3>
            <p className="text-blue-100 text-sm mb-4">
              Complete your profile to appear in more searches
            </p>
            <button className="w-full bg-white text-brand-700 font-semibold text-sm py-2.5 rounded-xl hover:bg-blue-50 transition-colors">
              Complete Profile →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
