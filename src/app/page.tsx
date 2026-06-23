"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Navigation } from "@/components/ui/Navigation";
import { HeroScene } from "@/components/3d/HeroScene";
import { ModuleCard } from "@/components/ui/ModuleCard";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  Database,
  FlaskConical,
  GraduationCap,
  Layers,
  Menu,
  Moon,
  Rocket,
  Shield,
  Sparkles,
  Sun,
  Target,
  Trophy,
  Users,
  X,
  Zap,
} from "lucide-react";

const navItems = [
  { label: "Features", id: "features" },
  { label: "Modules", id: "modules" },
  { label: "Ecosystem", id: "ecosystem" },
  { label: "Roles", id: "roles" },
];

const secondaryNav = ["Modules", "Courses", "Projects", "Certifications", "Events", "Mentors"];

const modules = [
  {
    title: "Learning Management",
    description: "Cohort paths, structured lessons, rich content blocks, progress tracking, and learner momentum in one place.",
    icon: BookOpen,
    gradient: "from-violet-500 to-cyan-400",
  },
  {
    title: "Assessment Engine",
    description: "Timed quizzes, rubrics, practical submissions, weighted scoring, and competency validation workflows.",
    icon: Target,
    gradient: "from-pink-500 to-violet-500",
  },
  {
    title: "Certifications",
    description: "Verifiable credentials, skill badges, public certificate checks, and a clean learner achievement record.",
    icon: Award,
    gradient: "from-amber-400 to-pink-500",
  },
  {
    title: "Research Hub",
    description: "Research projects, datasets, publication planning, review states, and cross-discipline collaboration.",
    icon: FlaskConical,
    gradient: "from-cyan-400 to-violet-500",
  },
  {
    title: "Project Incubator",
    description: "AI-guided venture ideas, milestones, mentor feedback, pitch preparation, and portfolio-ready outcomes.",
    icon: Rocket,
    gradient: "from-violet-500 to-pink-500",
  },
  {
    title: "Mentorship Network",
    description: "Mentor matching, scheduling, session history, expert reviews, and practical guidance for each learner.",
    icon: Users,
    gradient: "from-cyan-400 to-emerald-400",
  },
  {
    title: "Analytics Layer",
    description: "Skill signals, engagement heatmaps, completion trends, cohort insights, and executive reporting.",
    icon: BarChart3,
    gradient: "from-violet-500 to-cyan-400",
  },
  {
    title: "Reputation System",
    description: "Leaderboards, contribution scores, badges, rank progression, and healthy motivation loops.",
    icon: Trophy,
    gradient: "from-amber-400 to-violet-500",
  },
  {
    title: "Events Studio",
    description: "Bootcamps, hackathons, pitch nights, workshops, registration flows, and attendance signals.",
    icon: Calendar,
    gradient: "from-pink-500 to-cyan-400",
  },
  {
    title: "Portfolio Profiles",
    description: "Public learner profiles with projects, credentials, skills, endorsements, and shareable proof of work.",
    icon: GraduationCap,
    gradient: "from-cyan-400 to-violet-500",
  },
  {
    title: "Role Dashboards",
    description: "Tailored workspaces for students, instructors, mentors, researchers, reviewers, and admins.",
    icon: Shield,
    gradient: "from-violet-500 to-amber-400",
  },
  {
    title: "Knowledge Graph",
    description: "Connected courses, skills, assessments, projects, and recommendations that grow with every action.",
    icon: Database,
    gradient: "from-pink-500 to-violet-500",
  },
];

const roles = [
  "Students resume learning and track progress.",
  "Instructors build, assess, and improve courses.",
  "Mentors guide projects and review milestones.",
  "Researchers coordinate papers and datasets.",
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function RevealSection({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.16 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} ref={ref} className={`reveal-3d ${visible ? "is-visible" : ""} ${className}`}>
      {children}
    </section>
  );
}

// Replaced by external components

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDarkTheme = savedTheme ? savedTheme === "dark" : true;
    setDarkMode(isDarkTheme);
    document.documentElement.setAttribute("data-theme", isDarkTheme ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    document.documentElement.setAttribute("data-theme", nextDark ? "dark" : "light");
    localStorage.setItem("theme", nextDark ? "dark" : "light");
  };

  return (
    <main ref={rootRef} className="immersive-lms min-h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
      <Navigation darkMode={darkMode} toggleTheme={toggleTheme} />
      <CommandPalette />

      <section id="features" className="relative min-h-screen overflow-hidden px-4 pb-12 pt-24 md:pb-20 md:px-8 md:pt-40">
        <HeroScene darkMode={darkMode} />
        <div className="relative z-10 mx-auto grid min-h-auto lg:min-h-[calc(100vh-10rem)] max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] py-12 lg:py-0">
          <div className="max-w-4xl space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-cyan-300" />
              {darkMode ? "Dark mode-first learning ecosystem" : "Light mode learning ecosystem"}
            </div>
            <div className="space-y-6">
              <h1 className="font-space text-4xl sm:text-5xl font-black leading-tight text-foreground md:text-7xl lg:text-8xl">
                Everything You Need, <span className="mesh-text">One Ecosystem</span>
              </h1>
              <p className="max-w-2xl text-base leading-7 text-foreground/80 md:text-lg lg:text-xl">
                A cinematic LMS frontend for learning, assessments, research, project incubation, events, mentorship,
                analytics, and verifiable credentials.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row relative z-20 pointer-events-auto">
              <MagneticButton href="/login">
                Start learning <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton href="/courses" variant="ghost">
                Explore catalog <Layers className="h-4 w-4" />
              </MagneticButton>
            </div>
          </div>

          <div className="hero-console">
            <div className="console-topbar">
              <span />
              <span />
              <span />
            </div>
            <div className="space-y-5">
              {[
                ["Learner velocity", "84%", "from-violet-500 to-cyan-400"],
                ["Assessment readiness", "72%", "from-cyan-400 to-pink-500"],
                ["Mentor coverage", "96%", "from-pink-500 to-amber-400"],
              ].map(([label, value, gradient]) => (
                <div key={label} className="rounded-2xl border border-border/40 bg-card/40 p-4">
                  <div className="mb-3 flex items-center justify-between text-sm">
                    <span className="font-semibold text-foreground/80">{label}</span>
                    <span className="font-space font-bold text-foreground">{value}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div className={`h-full rounded-full bg-gradient-to-r ${gradient}`} style={{ width: value }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {["12 Modules", "50 Courses", "25 Mentors"].map((item) => (
                <div key={item} className="rounded-2xl border border-border/40 bg-card/50 p-3 text-center text-xs font-bold text-foreground/80">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between rounded-2xl border border-border/40 bg-card/60 p-4">
              <div className="cube-loader" aria-hidden="true">
                <span />
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
                <CheckCircle2 className="success-flip h-5 w-5 text-cyan-300" />
                Adaptive workspace ready
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Nav handled by Navigation component natively */}

      <RevealSection id="modules" className="px-4 py-24 md:px-8">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1 text-xs font-bold uppercase text-violet-100">
                Platform modules
              </div>
              <h2 className="font-space text-4xl font-black text-foreground md:text-6xl">Dark glass cards, live motion, real workflows.</h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-muted-foreground">
              Each module is built as a touchpoint in the same ecosystem, designed for fast scanning and interactive exploration.
            </p>
          </div>

          <div className="flex snap-x snap-mandatory overflow-x-auto pb-8 gap-5 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {modules.map((item, index) => (
              <div key={item.title} className="min-w-[85vw] md:min-w-0 shrink-0 snap-center">
                <ModuleCard 
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  gradient={item.gradient}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection id="ecosystem" className="relative border-y border-border/40 bg-card/20 px-4 py-16 md:py-24 md:px-8">
        <div className="section-depth-shape" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-5">
            <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-bold uppercase text-cyan-100">
              Connected ecosystem
            </div>
            <h2 className="font-space text-3xl font-black text-foreground sm:text-4xl md:text-6xl">From course to credential to career signal.</h2>
            <p className="text-base leading-8 text-muted-foreground">
              Learning data becomes project recommendations, assessment evidence, mentor context, research collaboration, and verified achievements.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Learn", "Build", "Assess", "Certify"].map((step, index) => (
              <div key={step} className="flip-card rounded-2xl border border-border/40 bg-card/40 p-6 backdrop-blur-xl">
                <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-full border border-border/50 bg-card/40 relative overflow-hidden backdrop-blur-md">
                  <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-violet-500 to-cyan-400 mix-blend-overlay" />
                  <span className="relative z-10 font-space font-black text-foreground drop-shadow-sm">{index + 1}</span>
                </div>
                <h3 className="mb-2 font-space text-xl font-bold text-foreground">{step}</h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {step === "Learn" && "Structured lessons and cohorts create the foundation."}
                  {step === "Build" && "Projects turn skill evidence into portfolio outcomes."}
                  {step === "Assess" && "Quizzes, rubrics, and reviews validate competence."}
                  {step === "Certify" && "Badges and certificates make achievement portable."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection id="roles" className="px-4 py-16 md:py-24 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-border/40 bg-card/40 p-6 backdrop-blur-xl md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div className="space-y-5">
              <div className="inline-flex rounded-full border border-pink-300/20 bg-pink-300/10 px-3 py-1 text-xs font-bold uppercase text-pink-100">
                Role-aware UX
              </div>
              <h2 className="font-space text-3xl font-black text-foreground sm:text-4xl md:text-6xl">One platform, many workspaces.</h2>
              <p className="text-base leading-8 text-muted-foreground">
                Every role gets the same visual language with the controls, metrics, and tasks they actually need.
              </p>
            </div>
            <div className="space-y-3">
              {roles.map((role, index) => (
                <div key={role} className="flex items-center gap-4 rounded-2xl border border-border/40 bg-card/50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-card/40 relative overflow-hidden backdrop-blur-md">
                    <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-pink-500 to-cyan-400 mix-blend-overlay" />
                    {index === 0 && <BookOpen className="relative z-10 h-5 w-5 text-foreground drop-shadow-sm" />}
                    {index === 1 && <Zap className="relative z-10 h-5 w-5 text-foreground drop-shadow-sm" />}
                    {index === 2 && <Users className="relative z-10 h-5 w-5 text-foreground drop-shadow-sm" />}
                    {index === 3 && <Database className="relative z-10 h-5 w-5 text-foreground drop-shadow-sm" />}
                  </div>
                  <p className="font-semibold text-foreground/90">{role}</p>
                  <CheckCircle2 className="ml-auto h-5 w-5 text-cyan-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>
    </main>
  );
}
