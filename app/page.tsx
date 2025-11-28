"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bell,
  BookOpen,
  CalendarDays,
  ChevronRight,
  Compass,
  LayoutDashboard,
  MessageCircle,
  MessageSquareMore,
  PlayCircle,
  PanelLeft,
  PanelLeftClose,
  Settings,
  Sparkles,
  TrendingUp,
} from "lucide-react";

// --- TYPES ---

type NavKey =
  | "dashboard"
  | "courses"
  | "calendar"
  | "explore"
  | "analytics"
  | "messages"
  | "settings";

type NavItem = {
  key: NavKey;
  label: string;
  icon: React.ReactNode;
};

type StatCard = {
  label: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
};

type Course = {
  title: string;
  instructor: string;
  category: string;
  progress: number;
  sessions: number;
};

type Program = {
  title: string;
  level: string;
  duration: string;
  cohort: number;
  summary: string;
  outline: string[];
};

type MessageThread = {
  id: number;
  to: string;
  title: string;
  content: string;
  time: string;
};

// --- DATA ---

const navItems: NavItem[] = [
  { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { key: "courses", label: "My Courses", icon: <BookOpen size={18} /> },
  { key: "calendar", label: "Calendar", icon: <CalendarDays size={18} /> },
  { key: "explore", label: "Explore", icon: <Compass size={18} /> },
  { key: "analytics", label: "Analytics", icon: <TrendingUp size={18} /> },
  { key: "messages", label: "Messages", icon: <MessageCircle size={18} /> },
  { key: "settings", label: "Settings", icon: <Settings size={18} /> },
];

const statCards: StatCard[] = [
  {
    label: "Courses in Progress",
    value: "08",
    trend: "+2 this week",
    icon: <BookOpen size={20} />,
  },
  {
    label: "Pending Assignments",
    value: "03",
    trend: "Due in 2 days",
    icon: <CalendarDays size={20} />,
  },
  {
    label: "Weekly Learning Time",
    value: "12h 40m",
    trend: "+1.2h vs last week",
    icon: <TrendingUp size={20} />,
  },
];

const courses: Course[] = [
  {
    title: "Product Strategy & Roadmapping",
    instructor: "Cameron Joyce",
    category: "Product",
    progress: 72,
    sessions: 18,
  },
  {
    title: "Advanced UI with Modern React",
    instructor: "Maya Patel",
    category: "Frontend",
    progress: 46,
    sessions: 24,
  },
  {
    title: "Data Storytelling Essentials",
    instructor: "Isabella Liu",
    category: "Analytics",
    progress: 83,
    sessions: 12,
  },
  {
    title: "Systems Thinking Fundamentals",
    instructor: "Derrick Brown",
    category: "Leadership",
    progress: 31,
    sessions: 16,
  },
  {
    title: "Engineering Management Foundations",
    instructor: "Olivia Dass",
    category: "Management",
    progress: 55,
    sessions: 20,
  },
  {
    title: "Designing for Accessibility",
    instructor: "Marcus Lee",
    category: "UX",
    progress: 90,
    sessions: 10,
  },
];

const explorePrograms: Program[] = [
  {
    title: "AI Product Sprint",
    level: "Intermediate",
    duration: "4 weeks",
    cohort: 12,
    summary: "Ship an AI-assisted product brief with mentorship from PMs at top startups.",
    outline: ["Ideation lab", "User research loop", "MVP with AI copilots", "Demo day delivery"],
  },
  {
    title: "Creative Tech Leadership",
    level: "Advanced",
    duration: "5 weeks",
    cohort: 15,
    summary: "Scale design systems and manage multi-disciplinary pods with confidence.",
    outline: ["Org design", "Ops rituals", "Design QA playbook", "Exec storytelling"],
  },
  {
    title: "Strategic Design Thinking",
    level: "Beginner",
    duration: "3 weeks",
    cohort: 18,
    summary: "Master facilitation techniques and produce actionable journey maps.",
    outline: ["Problem framing", "Insight synthesis", "Future-state blueprinting"],
  },
];

const initialThreads: MessageThread[] = [
  {
    id: 1,
    to: "Coach Isla",
    title: "Demo day rehearsal check-in",
    content: "Quick reminder about your demo day rehearsal.",
    time: "2m ago",
  },
  {
    id: 2,
    to: "Frontend Cohort",
    title: "Today’s critique notes",
    content: "Sharing notes from today's critique session.",
    time: "1h ago",
  },
  {
    id: 3,
    to: "Ops Support",
    title: "Lab extension approved",
    content: "We processed your lab extension request.",
    time: "Yesterday",
  },
];

const chatbotSeed = [
  { from: "bot" as const, text: "Hi! I'm Lyra, your study copilot. How can I help today?" },
  { from: "user" as const, text: "Show my React course milestones." },
  { from: "bot" as const, text: "You have 3 lessons left and a quiz due Friday." },
];

const roadmapMilestones = [
  { phase: "Module 5", title: "State Machines & Data Flow", due: "Nov 30", status: "In progress" },
  { phase: "Module 6", title: "Team Demo Day Prep", due: "Dec 02", status: "Upcoming" },
  { phase: "Capstone", title: "Ship React Product MVP", due: "Dec 08", status: "Milestone" },
];

// --- COMPONENTS ---

// 1. LOGIN COMPONENT
type LoginScreenProps = {
  onLogin: (status: boolean) => void;
};

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // LOGIKA SEDERHANA (Hardcoded Credentials)
    setTimeout(() => {
      if (email === "user@gmail.com" && password === "123") {
        onLogin(true);
      } else {
        setError("Email atau password salah.");
        setLoading(false);
      }
    }, 1000); // Simulasi loading 1 detik
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
            <Sparkles size={24} />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-500">
            Masuk untuk mengakses dashboard pembelajaranmu.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Email</label>
            <input
              type="email"
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              placeholder="user@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Password</label>
            <input
              type="password"
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              placeholder="123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 p-3 text-center text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500 disabled:bg-indigo-400"
          >
            {loading ? "Memproses..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-slate-400">
          <p>Demo Credentials:</p>
          <p>
            Email: <span className="font-mono text-slate-600">demo@lumina.dev</span>
          </p>
          <p>
            Pass: <span className="font-mono text-slate-600">123</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// 2. SIDEBAR
type SidebarProps = {
  activeNav: NavKey;
  onNavigate: (key: NavKey) => void;
};

const Sidebar = ({ activeNav, onNavigate }: SidebarProps) => (
  <aside className="flex h-full w-64 flex-shrink-0 flex-col border-r border-slate-200 bg-white/80 px-6 py-8 shadow-sm">
    <div className="flex items-center gap-2 text-lg font-semibold text-slate-900">
      <Sparkles className="text-indigo-600" />
      Lumina LMS
    </div>
    <nav className="mt-10 space-y-1">
      {navItems.map((item) => (
        <button
          key={item.label}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
            activeNav === item.key
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
              : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          }`}
          onClick={() => onNavigate(item.key)}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </nav>
    <div className="mt-auto rounded-2xl bg-slate-900 px-4 py-5 text-sm text-white">
      <p className="text-xs uppercase tracking-[0.3em] text-white/60">Pro Tips</p>
      <p className="mt-2 text-base font-semibold">Stay on track</p>
      <p className="text-white/70">Add today&apos;s learning block to your calendar.</p>
      <button className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-indigo-200">
        Open planner <ChevronRight size={14} />
      </button>
    </div>
  </aside>
);

// 3. HEADER
type HeaderProps = {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
  onSearch: (query: string) => void;
  searchValue: string;
  onTriggerToast?: (message: string) => void;
  onOpenProfile?: () => void;
};
const Header = ({ onToggleSidebar, sidebarOpen, onSearch, searchValue, onTriggerToast, onOpenProfile }: HeaderProps) => {
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement | null>(null);

  // sample notifications — in a real app these would come from an API
  const notifications = [
    { id: 1, title: "New mentor message", message: "Coach Isla replied to your demo draft.", time: "2m ago", unread: true },
    { id: 2, title: "Assignment graded", message: "Your UI critique was graded: 88%.", time: "1h ago", unread: true },
    { id: 3, title: "Upcoming session", message: "Live cohort: React Capstone starts tomorrow.", time: "1 day", unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!notifRef.current) return;
      if (notifRef.current.contains(e.target as Node)) return;
      setNotifOpen(false);
    };
    if (notifOpen) document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [notifOpen]);

  const handleOpenNotif = () => setNotifOpen((s) => !s);

  const handleClickNotification = (n: { title: string; message: string }) => {
    setNotifOpen(false);
    onTriggerToast?.(`${n.title}: ${n.message}`);
  };

  return (
    <header className="flex flex-col gap-4 border-b border-slate-200 bg-white/60 px-6 py-5 backdrop-blur md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <button
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
          onClick={onToggleSidebar}
        >
          {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeft size={18} />}
          <span className="hidden sm:inline">{sidebarOpen ? "Hide menu" : "Show menu"}</span>
        </button>
        <div>
          <p className="text-sm text-slate-500">Friday, November 28</p>
          <h1 className="text-2xl font-semibold text-slate-900">Welcome back, user 👋</h1>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center md:justify-end">
        <div className="flex w-full items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 md:max-w-sm">
          <input
            className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
            placeholder="Search courses, mentors, files..."
            value={searchValue}
            onChange={(event) => onSearch(event.target.value)}
          />
        </div>
        <div className="relative flex items-center gap-3">
          <div ref={notifRef} className="relative">
            <button
              className="relative rounded-full border border-slate-200 p-2 text-slate-500 transition hover:text-indigo-600"
              onClick={handleOpenNotif}
              aria-label="Open notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute right-0 top-0 flex h-3 w-3 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-indigo-600" />
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-lg">
                <div className="px-4 py-3">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">Notifications</p>
                    <button
                      className="text-xs text-slate-500"
                      onClick={() => onTriggerToast?.("All notifications marked as read")}
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="mt-3 space-y-2 max-h-64 overflow-auto">
                    {notifications.map((n) => (
                      <button
                        key={n.id}
                        className={`w-full text-left rounded-lg px-3 py-2 hover:bg-slate-50 ${n.unread ? "bg-indigo-50" : ""}`}
                        onClick={() => handleClickNotification(n)}
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-slate-900">{n.title}</p>
                          <span className="text-xs text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-sm text-slate-500">{n.message}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <button onClick={() => onOpenProfile?.()} className="rounded-full p-0">
            <Image
              src="https://i.pravatar.cc/64?img=52"
              alt="Learner avatar"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full border-2 border-indigo-100 object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

// 4. WELCOME BANNER
type WelcomeBannerProps = {
  onViewRoadmap: () => void;
  onContinueLearning: () => void;
};

const WelcomeBanner = ({ onViewRoadmap, onContinueLearning }: WelcomeBannerProps) => (
  <section className="rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-500 px-8 py-10 text-white shadow-xl">
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-white/70">Learning Sprint</p>
        <h2 className="mt-2 text-3xl font-semibold">Finish your React Capstone this week</h2>
        <p className="mt-3 max-w-2xl text-white/70">
          Keep momentum going—complete at least 3 key lessons before Sunday to stay ahead of your target graduation
          date.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <button
            className="rounded-full bg-white/20 px-5 py-2 font-semibold backdrop-blur hover:bg-white/30"
            onClick={onContinueLearning}
          >
            Continue learning
          </button>
          <button
            className="rounded-full border border-white/40 px-5 py-2 font-semibold text-white/90 hover:bg-white/10"
            onClick={onViewRoadmap}
          >
            View roadmap
          </button>
        </div>
      </div>
      <div className="rounded-2xl border border-white/20 bg-white/10 px-6 py-5 text-sm shadow-inner shadow-black/10">
        <p className="text-white/70">Weekly objective</p>
        <p className="text-3xl font-semibold">70%</p>
        <p className="text-white/80">Complete modules 5 & 6</p>
      </div>
    </div>
  </section>
);

const StatsGrid = () => (
  <section className="grid gap-4 md:grid-cols-3">
    {statCards.map((card) => (
      <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-sm font-medium">{card.label}</span>
          <span className="text-indigo-600">{card.icon}</span>
        </div>
        <p className="mt-4 text-3xl font-semibold text-slate-900">{card.value}</p>
        <p className="text-sm text-slate-500">{card.trend}</p>
      </div>
    ))}
  </section>
);

type CoursesGridProps = {
  onResumeCourse: (courseTitle: string) => void;
  coursesData: Course[];
  sectionRef?: React.RefObject<HTMLDivElement | null>;
};

const CoursesGrid = ({ onResumeCourse, coursesData, sectionRef }: CoursesGridProps) => (
  <section ref={sectionRef ?? undefined} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="text-sm text-slate-500">Active Pathways</p>
        <h3 className="text-xl font-semibold text-slate-900">Continue your courses</h3>
      </div>
      <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">View all</button>
    </div>
    <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {coursesData.length === 0 && (
        <p className="rounded-2xl border border-dashed border-slate-200 p-6 text-sm text-slate-500">
          Tidak ada kursus yang cocok dengan pencarian kamu.
        </p>
      )}
      {coursesData.map((course) => (
        <div key={course.title} className="flex flex-col gap-4 rounded-2xl border border-slate-100 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.04)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-indigo-500">{course.category}</p>
              <h4 className="mt-2 text-lg font-semibold text-slate-900">{course.title}</h4>
              <p className="text-sm text-slate-500">with {course.instructor}</p>
            </div>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
              {course.sessions} sessions
            </span>
          </div>
          <div>
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>Progress</span>
              <span className="font-semibold text-slate-900">{course.progress}%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
          <button
            className="inline-flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:border-indigo-200 hover:bg-indigo-50"
            onClick={() => onResumeCourse(course.title)}
          >
            Resume lesson <ChevronRight size={16} />
          </button>
        </div>
      ))}
    </div>
  </section>
);

const Chatbot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages] = useState(chatbotSeed);
  const greeting = useMemo(() => messages[0]?.text, [messages]);

  return (
    <>
      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-[360px] rounded-3xl border border-white/40 bg-white/80 p-5 text-sm text-slate-900 shadow-[0_30px_80px_rgba(15,23,42,0.25)] backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-indigo-500">Chatbot</p>
              <p className="text-base font-semibold text-slate-900">Lyra</p>
            </div>
            <button
              className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 hover:text-slate-900"
              onClick={() => setChatOpen(false)}
            >
              Close
            </button>
          </div>
          <div className="mt-4 space-y-3 max-h-64 overflow-y-auto pr-2">
            {messages.map((message, idx) => (
              <div
                key={`${message.from}-${idx}`}
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  message.from === "bot"
                    ? "bg-white/80 text-slate-900 shadow-inner shadow-white/40"
                    : "ml-auto bg-indigo-600 text-white"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-3 py-2">
            <input className="flex-1 bg-transparent text-sm outline-none" placeholder="Ask about a class..." />
            <MessageSquareMore size={18} className="text-indigo-500" />
          </div>
        </div>
      )}
      <button
        className="fixed bottom-6 right-6 flex items-center gap-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-2xl shadow-indigo-600/40 transition hover:scale-105"
        onClick={() => setChatOpen((prev) => !prev)}
      >
        <MessageSquareMore size={18} />
        {chatOpen ? "Hide Assistant" : "Chat with Lyra"}
      </button>
      <span className="sr-only">{greeting}</span>
    </>
  );
};

type CoursesViewProps = {
  onResumeCourse: (courseTitle: string) => void;
  coursesData: Course[];
};

const CoursesView = ({ onResumeCourse, coursesData }: CoursesViewProps) => (
  <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">Learning streak</p>
          <h3 className="text-xl font-semibold text-slate-900">Continue where you left off</h3>
        </div>
        <div className="flex gap-2 text-xs font-semibold">
          {["All", "In Progress", "Completed"].map((filter) => (
            <span
              key={filter}
              className={`rounded-full border px-3 py-1 ${
                filter === "In Progress"
                  ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                  : "border-slate-200 text-slate-500"
              }`}
            >
              {filter}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-6 space-y-4">
        {coursesData.length === 0 && (
          <p className="rounded-2xl border border-dashed border-slate-200 p-6 text-sm text-slate-500">
            Belum ada kursus yang sesuai hasil pencarian.
          </p>
        )}
        {coursesData.slice(0, 4).map((course) => (
          <div
            key={course.title}
            className="flex flex-col gap-4 rounded-2xl border border-slate-100 p-5 transition hover:border-indigo-100 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-slate-900">{course.title}</h4>
                <p className="text-sm text-slate-500">{course.instructor}</p>
              </div>
              <button className="text-sm font-semibold text-indigo-600" onClick={() => onResumeCourse(course.title)}>
                Resume lesson
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 flex-1 rounded-full bg-slate-100">
                <span
                  className="block h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-slate-900">{course.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm text-slate-500">Next milestone</p>
        <h4 className="text-lg font-semibold text-slate-900">React Capstone presentation</h4>
        <p className="text-sm text-slate-500">Due Monday at 10:00 AM</p>
      </div>
      <div className="rounded-2xl bg-slate-900 px-4 py-5 text-white">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Coach note</p>
        <p className="mt-2 text-base">Review animation handoff before submission.</p>
        <button className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-indigo-200">
          See feedback <ChevronRight size={14} />
        </button>
      </div>
      <div>
        <p className="text-sm text-slate-500">Certificates unlocked</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Product Strategy", "Inclusive Design", "Team Systems"].map((badge) => (
            <span key={badge} className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold">
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// 5. CALENDAR VIEW (With Sync Logic)
type CalendarViewProps = {
  onSyncClick: () => void;
  isSynced: boolean;
};

const CalendarView = ({ onSyncClick, isSynced }: CalendarViewProps) => (
  <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="text-sm text-slate-500">Week 48 schedule</p>
        <h3 className="text-xl font-semibold text-slate-900">Learning calendar</h3>
      </div>
      <button
        onClick={onSyncClick}
        disabled={isSynced}
        className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
          isSynced
            ? "border-emerald-200 bg-emerald-50 text-emerald-600 cursor-default"
            : "border-slate-200 text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50"
        }`}
      >
        {isSynced ? (
          <>
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Synced
          </>
        ) : (
          "Sync calendar"
        )}
      </button>
    </div>
    <div className="mt-6 grid gap-4 lg:grid-cols-2">
      {[
        { day: "Mon", title: "React Capstone", time: "09:00 · 2h", type: "Live cohort" },
        { day: "Tue", title: "Leadership Lab", time: "18:00 · 90m", type: "Workshop" },
        { day: "Thu", title: "UI critique", time: "12:00 · 1h", type: "Mentor session" },
        { day: "Fri", title: "Systems Thinking", time: "07:00 · 2h", type: "Self-paced" },
      ].map((event) => (
        <div key={event.title} className="rounded-2xl border border-slate-100 p-4">
          <p className="text-xs uppercase tracking-[0.4em] text-indigo-500">{event.day}</p>
          <h4 className="mt-2 text-lg font-semibold text-slate-900">{event.title}</h4>
          <p className="text-sm text-slate-500">{event.time}</p>
          <span className="mt-3 inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
            {event.type}
          </span>
        </div>
      ))}
    </div>
  </section>
);

// 6. EXPLORE VIEW
type ExploreViewProps = {
  programs: Program[];
  onViewSyllabus: (program: Program) => void;
};

const ExploreView = ({ programs, onViewSyllabus }: ExploreViewProps) => (
  <section className="grid gap-6 lg:grid-cols-3">
    {programs.map((program) => (
      <div
        key={program.title}
        className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl"
      >
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>{program.level}</span>
          <span>{program.duration}</span>
        </div>
        <h3 className="text-xl font-semibold text-slate-900">{program.title}</h3>
        <p className="text-sm text-slate-500">{program.summary}</p>
        <button
          className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-indigo-600"
          onClick={() => onViewSyllabus(program)}
        >
          View syllabus <ChevronRight size={16} />
        </button>
        <div className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Cohort {program.cohort}
        </div>
      </div>
    ))}
  </section>
);

// 7. ANALYTICS VIEW
const AnalyticsView = () => (
  <section className="grid gap-6 lg:grid-cols-2">
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-500">Time allocation</p>
      <h3 className="text-xl font-semibold text-slate-900">Learning analytics</h3>
      <div className="mt-6 space-y-4">
        {[
          { label: "Core lessons", value: 62, color: "bg-indigo-500" },
          { label: "Projects", value: 24, color: "bg-violet-500" },
          { label: "Community hours", value: 14, color: "bg-slate-300" },
        ].map((metric) => (
          <div key={metric.label}>
            <div className="flex justify-between text-sm text-slate-500">
              <span>{metric.label}</span>
              <span className="font-semibold text-slate-900">{metric.value}%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-slate-100">
              <div className={`h-full rounded-full ${metric.color}`} style={{ width: `${metric.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-500">Skill velocity</p>
      <h3 className="text-xl font-semibold text-slate-900">Weekly trend</h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {[
          { label: "Focus hours", value: "12.4h", trend: "+8%" },
          { label: "Assignments shipped", value: "6", trend: "+2" },
          { label: "Peer reviews", value: "4", trend: "+1" },
          { label: "Mentor syncs", value: "3", trend: "On target" },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-100 p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</p>
            <p className="text-sm text-emerald-500">{item.trend}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// 8. MESSAGES VIEW
type MessagesViewProps = {
  threads: MessageThread[];
  onNewThread: () => void;
  onEditThread: (thread: MessageThread) => void;
  onDeleteThread: (id: number) => void;
};

const MessagesView = ({ threads, onNewThread, onEditThread, onDeleteThread }: MessagesViewProps) => (
  <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="text-sm text-slate-500">Inbox</p>
        <h3 className="text-xl font-semibold text-slate-900">Mentor & cohort messages</h3>
      </div>
      <button
        className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500"
        onClick={onNewThread}
      >
        New thread
      </button>
    </div>
    <div className="mt-6 space-y-4">
      {threads.length === 0 && (
        <p className="rounded-2xl border border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500">
          Belum ada percakapan. Mulai thread baru dengan mentor atau cohort kamu.
        </p>
      )}
      {threads.map((msg) => (
        <div
          key={msg.id}
          className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3 hover:border-indigo-100 hover:bg-indigo-50/40"
        >
          <div>
            <p className="text-sm font-semibold text-slate-900">{msg.to}</p>
            <p className="text-xs font-semibold text-slate-500">{msg.title}</p>
            <p className="text-sm text-slate-500 line-clamp-1">{msg.content}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">{msg.time}</span>
            <button
              className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 hover:border-indigo-200 hover:text-indigo-600"
              onClick={() => onEditThread(msg)}
            >
              Edit
            </button>
            <button
              className="rounded-full border border-red-100 px-3 py-1 text-xs font-semibold text-red-500 hover:bg-red-50"
              onClick={() => onDeleteThread(msg.id)}
            >
              Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
);

// 9. SETTINGS VIEW
const SettingsView = () => (
  <section className="grid gap-6 lg:grid-cols-2">
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-500">Profile</p>
      <h3 className="text-xl font-semibold text-slate-900">Personal preferences</h3>
      <form className="mt-6 space-y-4">
        {[
          { label: "Full name", value: "Riley Summers" },
          { label: "Timezone", value: "GMT +07:00" },
          { label: "Notification email", value: "riley@lumina.dev" },
        ].map((field) => (
          <label key={field.label} className="block text-sm">
            <span className="text-slate-500">{field.label}</span>
            <input
              className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-slate-900 outline-none focus:border-indigo-400"
              defaultValue={field.value}
            />
          </label>
        ))}
        <button className="w-full rounded-2xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500">
          Save changes
        </button>
      </form>
    </div>
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-500">Focus mode</p>
      <h3 className="text-xl font-semibold text-slate-900">Learning environment</h3>
      <div className="mt-6 space-y-4 text-sm text-slate-500">
        {[
          { title: "Daily summary", desc: "Send highlights at 20:00", enabled: true },
          { title: "Remind me to hydrate", desc: "During 2h+ study sessions", enabled: false },
          { title: "Auto mute distractions", desc: "Activate Focus on start", enabled: true },
        ].map((pref) => (
          <div key={pref.title} className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3">
            <div>
              <p className="font-semibold text-slate-900">{pref.title}</p>
              <p>{pref.desc}</p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                pref.enabled ? "bg-indigo-50 text-indigo-600" : "bg-slate-100 text-slate-400"
              }`}
            >
              {pref.enabled ? "On" : "Off"}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- MODAL PANELS ---

// Roadmap Panel
type RoadmapPanelProps = {
  open: boolean;
  onClose: () => void;
};

const RoadmapPanel = ({ open, onClose }: RoadmapPanelProps) =>
  open ? (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-slate-950/30 px-4 pb-8 pt-20 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-2xl rounded-3xl border border-white/20 bg-white/90 p-6 text-slate-900 shadow-[0_40px_120px_rgba(15,23,42,0.35)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-500">Roadmap</p>
            <h3 className="text-2xl font-semibold text-slate-900">React Capstone milestones</h3>
            <p className="text-sm text-slate-500">Track each phase to stay ahead of demo day.</p>
          </div>
          <button
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-indigo-200 hover:text-indigo-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="mt-6 space-y-4">
          {roadmapMilestones.map((item, idx) => (
            <div key={item.title} className="flex gap-4 rounded-2xl border border-slate-100 bg-white/70 p-4">
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500">{item.phase}</span>
                {idx < roadmapMilestones.length - 1 && <div className="h-full w-px flex-1 bg-slate-200" />}
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold text-slate-900">{item.title}</p>
                <p className="text-sm text-slate-500">Due {item.due}</p>
              </div>
              <span
                className={`self-start rounded-full px-3 py-1 text-xs font-semibold ${
                  item.status === "In progress"
                    ? "bg-amber-100 text-amber-700"
                    : item.status === "Upcoming"
                    ? "bg-slate-100 text-slate-600"
                    : "bg-emerald-100 text-emerald-600"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null;

// Profile Modal (CRUD)
type Profile = {
  name: string;
  email: string;
  bio?: string;
};

type ProfileModalProps = {
  open: boolean;
  profile: Profile;
  draft: Profile;
  setDraft: (p: Profile) => void;
  editing: boolean;
  setEditing: (b: boolean) => void;
  onClose: () => void;
  onSave: (p: Profile) => void;
  onDelete: () => void;
};

const ProfileModal = ({ open, profile, draft, setDraft, editing, setEditing, onClose, onSave, onDelete }: ProfileModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Profile</h3>
          <button className="text-sm text-slate-500" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="mt-4 space-y-3">
          <div>
            <label className="text-xs text-slate-500">Name</label>
            {editing ? (
              <input
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
            ) : (
              <p className="mt-1 font-semibold text-slate-900">{profile.name}</p>
            )}
          </div>
          <div>
            <label className="text-xs text-slate-500">Email</label>
            {editing ? (
              <input
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                value={draft.email}
                onChange={(e) => setDraft({ ...draft, email: e.target.value })}
              />
            ) : (
              <p className="mt-1 text-slate-700">{profile.email}</p>
            )}
          </div>
          <div>
            <label className="text-xs text-slate-500">Bio</label>
            {editing ? (
              <textarea
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                value={draft.bio}
                onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
              />
            ) : (
              <p className="mt-1 text-slate-600">{profile.bio}</p>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          {!editing ? (
            <>
              <button
                className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                onClick={() => setEditing(true)}
              >
                Edit
              </button>
              <button
                className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600"
                onClick={() => {
                  if (confirm("Delete your profile? This is irreversible.")) onDelete();
                }}
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <button
                className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                onClick={() => {
                  setDraft(profile);
                  setEditing(false);
                }}
              >
                Cancel
              </button>
              <button
                className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"
                onClick={() => {
                  onSave(draft);
                }}
              >
                Save
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Lesson Player Panel
type LessonPlayerProps = {
  open: boolean;
  courseTitle: string | null;
  onClose: () => void;
};

const LessonPlayerPanel = ({ open, courseTitle, onClose }: LessonPlayerProps) =>
  open && courseTitle ? (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-slate-950/40 px-4 pb-6 pt-16 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-slate-950 text-slate-50 shadow-[0_40px_120px_rgba(15,23,42,0.65)]">
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-400">Now learning</p>
            <h3 className="text-lg font-semibold">{courseTitle}</h3>
          </div>
          <button
            className="rounded-full border border-slate-700 px-4 py-1 text-xs font-semibold text-slate-300 hover:border-indigo-400 hover:text-indigo-200"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="grid gap-6 px-6 py-5 md:grid-cols-[1.6fr,1fr]">
          <div className="flex flex-col gap-4">
            <div className="flex h-40 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700">
              <button className="flex items-center gap-3 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/20">
                <PlayCircle size={20} />
                Start current lesson
              </button>
            </div>
            <p className="text-sm text-slate-300">
              We&apos;ll resume from your last watched timestamp and keep your notes in sync across devices.
            </p>
          </div>
          <div className="space-y-3 text-sm text-slate-300">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Up next</p>
            <ul className="space-y-2">
              <li className="flex items-center justify-between rounded-xl border border-slate-800 px-3 py-2">
                <span>Checkpoint quiz</span>
                <span className="text-xs text-slate-400">10 min</span>
              </li>
              <li className="flex items-center justify-between rounded-xl border border-slate-800 px-3 py-2">
                <span>Implementation lab</span>
                <span className="text-xs text-slate-400">40 min</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) : null;

// Syllabus Panel
type SyllabusPanelProps = {
  open: boolean;
  program: Program | null;
  onClose: () => void;
};

const SyllabusPanel = ({ open, program, onClose }: SyllabusPanelProps) =>
  open && program ? (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-slate-950/35 px-4 pb-6 pt-16 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_40px_120px_rgba(15,23,42,0.35)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-500">{program.level}</p>
            <h3 className="text-2xl font-semibold text-slate-900">{program.title}</h3>
            <p className="text-sm text-slate-500">
              Cohort {program.cohort} · {program.duration}
            </p>
          </div>
          <button
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-500 hover:border-indigo-200 hover:text-indigo-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-[1.5fr,1fr]">
          <div>
            <p className="text-sm text-slate-500">{program.summary}</p>
            <div className="mt-4 space-y-3">
              {program.outline.map((item, idx) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-100 px-4 py-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-50 text-xs font-semibold text-indigo-600">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-slate-800">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">What you get</p>
            <ul className="mt-3 space-y-2">
              <li>• Weekly mentor office hours</li>
              <li>• Peer critique circles</li>
              <li>• Showcase-ready portfolio artifact</li>
              <li>• Certification badge</li>
            </ul>
            <button className="mt-5 w-full rounded-2xl bg-indigo-600 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500">
              Enroll now
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;

// Sync Calendar Panel
type SyncCalendarPanelProps = {
  open: boolean;
  onClose: () => void;
  onSync: (provider: string) => void;
  isSyncing: boolean;
};

const SyncCalendarPanel = ({ open, onClose, onSync, isSyncing }: SyncCalendarPanelProps) =>
  open ? (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-slate-950/35 px-4 pb-6 pt-16 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_40px_120px_rgba(15,23,42,0.35)]">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="text-xl font-semibold text-slate-900">Sync Calendar</h3>
          <button
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 hover:text-slate-900"
            onClick={onClose}
            disabled={isSyncing}
          >
            Close
          </button>
        </div>
        <div className="mt-6 space-y-3">
          <p className="mb-4 text-sm text-slate-500">
            Pilih penyedia kalender untuk menyinkronkan jadwal belajar Anda secara otomatis.
          </p>
          {[
            { id: "google", label: "Google Calendar", icon: "G" },
            { id: "outlook", label: "Outlook Calendar", icon: "O" },
            { id: "apple", label: "Apple Calendar", icon: "A" },
          ].map((provider) => (
            <button
              key={provider.id}
              onClick={() => onSync(provider.label)}
              disabled={isSyncing}
              className="flex w-full items-center justify-between rounded-2xl border border-slate-100 p-4 transition hover:border-indigo-200 hover:bg-indigo-50 disabled:opacity-50"
            >
              <span className="font-semibold text-slate-900">{provider.label}</span>
              {isSyncing ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
              ) : (
                <ChevronRight size={16} className="text-slate-400" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  ) : null;

// New Thread Panel
type NewThreadPanelProps = {
  open: boolean;
  mode: "create" | "edit";
  initialThread: MessageThread | null;
  onClose: () => void;
  onSubmit: (payload: { id?: number; to: string; title: string; content: string }) => void;
};

const NewThreadPanel = ({ open, mode, initialThread, onClose, onSubmit }: NewThreadPanelProps) =>
  open ? (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-slate-950/35 px-4 pb-6 pt-16 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_40px_120px_rgba(15,23,42,0.35)]">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              {mode === "create" ? "New thread" : "Edit thread"}
            </p>
            <h3 className="text-lg font-semibold text-slate-900">
              {mode === "create" ? "Start a conversation" : "Update conversation"}
            </h3>
          </div>
          <button
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 hover:border-indigo-200 hover:text-indigo-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <form
          className="mt-4 space-y-3 text-sm"
          onSubmit={(event) => {
            event.preventDefault();
            const form = event.currentTarget as HTMLFormElement;
            const formData = new FormData(form);
            const to = String(formData.get("to") ?? "").trim();
            const title = String(formData.get("title") ?? "").trim();
            const content = String(formData.get("content") ?? "").trim();
            if (!to || !title || !content) return;
            onSubmit({ id: initialThread?.id, to, title, content });
          }}
        >
          <label className="block">
            <span className="text-slate-500">To</span>
            <input
              name="to"
              defaultValue={initialThread?.to ?? ""}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-indigo-400"
              placeholder="@coach, @cohort…"
            />
          </label>
          <label className="block">
            <span className="text-slate-500">Title</span>
            <input
              name="title"
              defaultValue={initialThread?.title ?? ""}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-indigo-400"
              placeholder="e.g. Help with capstone brief"
            />
          </label>
          <label className="block">
            <span className="text-slate-500">Message</span>
            <textarea
              name="content"
              defaultValue={initialThread?.content ?? ""}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-indigo-400"
              rows={4}
              placeholder="Tulis pertanyaan atau update kamu di sini…"
            />
          </label>
          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              className="rounded-2xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-500 hover:border-slate-300"
              onClick={onClose}
            >
              Batal
            </button>
            <button
              type="submit"
              className="rounded-2xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-500"
            >
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;

const Toast = ({ message }: { message: string }) => (
  <div className="fixed bottom-6 left-6 z-50 rounded-full border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-700 shadow-xl shadow-slate-900/10">
    {message}
  </div>
);

// --- MAIN PAGE LOGIC ---

export default function Home() {
  // 1. Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 2. Main Dashboard States
  const [activeNav, setActiveNav] = useState<NavKey>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [roadmapOpen, setRoadmapOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [lessonOpen, setLessonOpen] = useState(false);
  const [currentCourseTitle, setCurrentCourseTitle] = useState<string | null>(null);
  const [syllabusOpen, setSyllabusOpen] = useState(false);
  const [currentProgram, setCurrentProgram] = useState<Program | null>(null);
  const [newThreadOpen, setNewThreadOpen] = useState(false);
  const [threads, setThreads] = useState<MessageThread[]>(initialThreads);
  const [editingThread, setEditingThread] = useState<MessageThread | null>(null);
  const coursesSectionRef = useRef<HTMLDivElement | null>(null);

  // 3. Sync Calendar States
  const [syncPanelOpen, setSyncPanelOpen] = useState(false);
  const [isCalendarSynced, setIsCalendarSynced] = useState(false);
  const [isSyncingProcess, setIsSyncingProcess] = useState(false);
  // Profile modal state
  const [profileOpen, setProfileOpen] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    name: "Riley Harper",
    email: "riley@lumina.dev",
    bio: "Product designer and learner.",
  });
  const [profileDraft, setProfileDraft] = useState<Profile>(profile);
  const [profileEditing, setProfileEditing] = useState(false);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const triggerToast = (message: string) => {
    setToastMessage(message);
  };

  const handleContinueLearning = () => {
    setActiveNav("dashboard");
    requestAnimationFrame(() => {
      coursesSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    triggerToast("Jumping back into your React capstone lessons.");
  };

  const filteredCourses = courses.filter((course) => {
    if (!searchQuery.trim()) return true;
    const term = searchQuery.toLowerCase();
    return (
      course.title.toLowerCase().includes(term) ||
      course.instructor.toLowerCase().includes(term) ||
      course.category.toLowerCase().includes(term)
    );
  });

  const handleResumeCourse = (title: string) => {
    setActiveNav("courses");
    setCurrentCourseTitle(title);
    setLessonOpen(true);
    triggerToast(`Resuming "${title}"… loading latest lesson.`);
  };

  const handleViewSyllabus = (program: Program) => {
    setCurrentProgram(program);
    setSyllabusOpen(true);
    triggerToast(`Opening ${program.title} syllabus.`);
  };

  const handleNewThread = () => {
    setActiveNav("messages");
    setEditingThread(null);
    setNewThreadOpen(true);
    triggerToast("Starting a new mentor thread.");
  };

  const handleEditThread = (thread: MessageThread) => {
    setActiveNav("messages");
    setEditingThread(thread);
    setNewThreadOpen(true);
    triggerToast(`Editing thread dengan ${thread.to}.`);
  };

  const handleDeleteThread = (id: number) => {
    setThreads((prev) => prev.filter((thread) => thread.id !== id));
    triggerToast("Thread dihapus.");
  };

  const handleSubmitThread = (payload: { id?: number; to: string; title: string; content: string }) => {
    setThreads((prev) => {
      const time = "Just now";
      if (payload.id) {
        return prev.map((thread) =>
          thread.id === payload.id
            ? { ...thread, to: payload.to, title: payload.title, content: payload.content, time }
            : thread,
        );
      }
      const nextId = prev.length ? Math.max(...prev.map((t) => t.id)) + 1 : 1;
      return [...prev, { id: nextId, to: payload.to, title: payload.title, content: payload.content, time }];
    });
    setNewThreadOpen(false);
    setEditingThread(null);
    triggerToast("Thread berhasil disimpan.");
  };

  // Sync Handlers
  const handleOpenSync = () => {
    setSyncPanelOpen(true);
  };

  // Profile handlers
  const handleOpenProfile = () => {
    setProfileDraft(profile);
    setProfileEditing(false);
    setProfileOpen(true);
  };
  const handleCloseProfile = () => setProfileOpen(false);
  const handleSaveProfile = (p: Profile) => {
    setProfile(p);
    setProfileOpen(false);
    triggerToast("Profile saved.");
  };
  const handleDeleteProfile = () => {
    setProfile({ name: "", email: "", bio: "" });
    setProfileOpen(false);
    triggerToast("Profile deleted.");
  };

  const handleProcessSync = (provider: string) => {
    setIsSyncingProcess(true);
    setTimeout(() => {
      setIsSyncingProcess(false);
      setIsCalendarSynced(true);
      setSyncPanelOpen(false);
      triggerToast(`Berhasil menyinkronkan dengan ${provider}!`);
    }, 1500);
  };

  // --- CONDITIONAL RENDER: LOGIN VS DASHBOARD ---
  
  // Jika belum login, tampilkan Login Screen saja
  if (!isAuthenticated) {
    return <LoginScreen onLogin={(status) => setIsAuthenticated(status)} />;
  }

  // Jika sudah login, lanjutkan render Dashboard
  const renderMainView = (courseList: Course[]) => {
    switch (activeNav) {
      case "dashboard":
        return (
          <>
            <WelcomeBanner onViewRoadmap={() => setRoadmapOpen(true)} onContinueLearning={handleContinueLearning} />
            <StatsGrid />
            <CoursesGrid onResumeCourse={handleResumeCourse} coursesData={courseList} sectionRef={coursesSectionRef} />
          </>
        );
      case "courses":
        return <CoursesView onResumeCourse={handleResumeCourse} coursesData={courseList} />;
      case "calendar":
        return <CalendarView onSyncClick={handleOpenSync} isSynced={isCalendarSynced} />;
      case "explore":
        return <ExploreView programs={explorePrograms} onViewSyllabus={handleViewSyllabus} />;
      case "analytics":
        return <AnalyticsView />;
      case "messages":
        return (
          <MessagesView
            threads={threads}
            onNewThread={handleNewThread}
            onEditThread={handleEditThread}
            onDeleteThread={handleDeleteThread}
          />
        );
      case "settings":
        return <SettingsView />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        {sidebarOpen && <Sidebar activeNav={activeNav} onNavigate={setActiveNav} />}
        <div className="flex flex-1 flex-col">
          <Header
            onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
            sidebarOpen={sidebarOpen}
            onSearch={setSearchQuery}
            searchValue={searchQuery}
            onTriggerToast={triggerToast}
            onOpenProfile={handleOpenProfile}
          />
          <main className="flex flex-1 flex-col gap-8 bg-slate-50 px-6 py-8">{renderMainView(filteredCourses)}</main>
        </div>
      </div>
      
      {/* Modals */}
      <RoadmapPanel open={roadmapOpen} onClose={() => setRoadmapOpen(false)} />
      <LessonPlayerPanel open={lessonOpen} courseTitle={currentCourseTitle} onClose={() => setLessonOpen(false)} />
      <SyllabusPanel open={syllabusOpen} program={currentProgram} onClose={() => setSyllabusOpen(false)} />
      
      <SyncCalendarPanel
        open={syncPanelOpen}
        onClose={() => setSyncPanelOpen(false)}
        onSync={handleProcessSync}
        isSyncing={isSyncingProcess}
      />

      <ProfileModal
        open={profileOpen}
        profile={profile}
        draft={profileDraft}
        setDraft={setProfileDraft}
        editing={profileEditing}
        setEditing={setProfileEditing}
        onClose={handleCloseProfile}
        onSave={handleSaveProfile}
        onDelete={handleDeleteProfile}
      />

      <NewThreadPanel
        open={newThreadOpen}
        mode={editingThread ? "edit" : "create"}
        initialThread={editingThread}
        onClose={() => {
          setNewThreadOpen(false);
          setEditingThread(null);
        }}
        onSubmit={handleSubmitThread}
      />
      
      {toastMessage && <Toast message={toastMessage} />}
      <Chatbot />
    </div>
  );
}