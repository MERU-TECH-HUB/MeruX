"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, ChevronDown, Moon, Sun } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { useReducedMotion } from "./ReducedMotion";

const primaryNavItems = [
  { label: "Features", id: "features", hasDropdown: true },
  { label: "Modules", id: "modules", hasDropdown: true },
  { label: "Ecosystem", id: "ecosystem" },
  { label: "Roles", id: "roles" },
];

const secondaryNavItems = ["Modules", "Courses", "Projects", "Certifications", "Events", "Mentors"];

export function Navigation({ darkMode, toggleTheme }: { darkMode: boolean; toggleTheme: () => void }) {
  const [activeItem, setActiveItem] = useState("Features");
  const [showSecondaryNav, setShowSecondaryNav] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Scroll spy logic for Context-Aware Secondary Nav
  useEffect(() => {
    const handleScroll = () => {
      const modulesSection = document.getElementById("modules");
      if (modulesSection) {
        const rect = modulesSection.getBoundingClientRect();
        // Show secondary nav when Modules section is in view
        if (rect.top <= 100 && rect.bottom >= 100) {
          setShowSecondaryNav(true);
        } else {
          setShowSecondaryNav(false);
        }
      }
      
      // Update active nav item based on scroll
      const sections = primaryNavItems.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + 150;
      
      sections.forEach((section, index) => {
        if (section && section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
          setActiveItem(primaryNavItems[index].label);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    setActiveItem(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openCmdK = () => {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true
    });
    document.dispatchEvent(event);
  };

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 px-4 py-4 pointer-events-none">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 pointer-events-auto">
          
          {/* Primary Nav */}
          <div className="flex items-center justify-between rounded-full border border-[rgba(255,255,255,0.1)] bg-[#0f172a]/80 px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl md:px-5">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image src={darkMode ? "/brand/merux-lms-icon-dark.svg" : "/brand/merux-lms-icon.svg"} alt="MeruX" width={32} height={32} className="rounded-full" priority />
              <span className="font-bold text-[#f8fafc] text-lg tracking-tight hidden sm:block">MeruX</span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1 relative">
              {primaryNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative px-4 py-2 text-sm font-semibold text-[#cbd5e1] hover:text-[#f8fafc] transition-colors flex items-center gap-1"
                >
                  {activeItem === item.label && !prefersReducedMotion && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#8b5cf6]/40 to-[#06b6d4]/40 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                  {item.hasDropdown && <ChevronDown className="relative z-10 w-3 h-3 opacity-50" />}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Cmd+K Search */}
              <button 
                onClick={openCmdK}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.1)] bg-[#1e293b]/50 text-sm text-[#cbd5e1] hover:text-[#f8fafc] hover:bg-[#1e293b] transition-all"
              >
                <Search className="w-4 h-4" />
                <span>Search...</span>
                <kbd className="hidden md:inline-block bg-[#020617] px-1.5 rounded text-xs border border-[rgba(255,255,255,0.1)]">⌘K</kbd>
              </button>

              {/* Mobile Search Icon */}
              <button onClick={openCmdK} className="sm:hidden p-2 text-[#cbd5e1] hover:text-[#f8fafc]" aria-label="Search">
                <Search className="w-5 h-5" />
              </button>


              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="relative flex h-8 w-14 items-center justify-between rounded-full bg-[#1e293b] border border-[rgba(255,255,255,0.1)] p-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:ring-offset-2 focus:ring-offset-[#020617]"
              >
                <motion.div
                  className="absolute top-0.5 bottom-0.5 left-0.5 w-6 h-6 rounded-full bg-[#8b5cf6] flex items-center justify-center shadow-md"
                  animate={{ x: darkMode ? 22 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {darkMode ? <Moon className="h-3 w-3 text-white" /> : <Sun className="h-3 w-3 text-white" />}
                </motion.div>
              </button>

              <MagneticButton href="/login" className="hidden md:inline-flex py-2 px-5 text-sm">
                Get Started
              </MagneticButton>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 text-[#cbd5e1] hover:text-[#f8fafc]"
                aria-label="Open menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Context-Aware Secondary Nav (Modules Section Only) */}
          <AnimatePresence>
            {showSecondaryNav && (
              <motion.div
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                className="mx-auto flex max-w-5xl gap-2 overflow-x-auto rounded-full border border-[rgba(255,255,255,0.1)] bg-[#1e293b]/70 p-2 shadow-lg backdrop-blur-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
                role="tablist"
              >
                {secondaryNavItems.map((item, index) => (
                  <button
                    key={item}
                    role="tab"
                    className={`shrink-0 snap-start rounded-full px-4 py-2 text-xs font-bold uppercase text-[#cbd5e1] transition hover:text-[#f8fafc] ${
                      index === 0 ? "bg-[#8b5cf6] text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]" : "hover:bg-white/5"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0.8, transformOrigin: "top" }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0.8 }}
                className="mx-auto w-full max-w-7xl rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[#0f172a]/95 p-4 shadow-2xl backdrop-blur-xl lg:hidden mt-2"
              >
                {primaryNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full rounded-xl px-4 py-3 text-left font-bold text-[#f8fafc] hover:bg-[#1e293b]"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.1)]">
                  <Link href="/login" className="block w-full text-center rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] py-3 font-bold text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                    Get Started
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
}
