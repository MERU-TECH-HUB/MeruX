"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search, BookOpen, Target, Rocket, Users, FlaskConical, Award, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] sm:pt-[20vh]">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/60 backdrop-blur-sm transition-opacity"
        onClick={() => setOpen(false)}
      />

      {/* Command Palette */}
      <div className="relative z-[101] w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl mx-4 animate-in fade-in zoom-in-95 duration-200">
        <Command 
          className="flex h-full w-full flex-col overflow-hidden bg-transparent"
          label="Global Command Menu"
        >
          <div className="flex items-center border-b border-border px-3">
            <Search className="mr-2 h-5 w-5 shrink-0 text-muted-foreground" />
            <Command.Input 
              autoFocus
              className="flex h-14 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
              placeholder="Search courses, mentors, projects..." 
            />
            <div className="hidden items-center gap-1 sm:flex text-xs text-muted-foreground">
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">ESC</kbd>
              <span>to close</span>
            </div>
          </div>

          <Command.List className="max-h-[350px] overflow-y-auto overflow-x-hidden p-2 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </Command.Empty>

            <Command.Group heading="Recent Searches" className="p-1 text-xs font-medium text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-semibold">
              <Command.Item 
                onSelect={() => handleSelect('/courses/ai-agents')}
                className="relative flex cursor-pointer select-none items-center rounded-lg px-2 py-3 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-foreground"
              >
                <Target className="mr-2 h-4 w-4 text-cyan-400" />
                <span>AI Agents Course</span>
              </Command.Item>
              <Command.Item 
                onSelect={() => handleSelect('/mentors')}
                className="relative flex cursor-pointer select-none items-center rounded-lg px-2 py-3 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-foreground"
              >
                <Users className="mr-2 h-4 w-4 text-pink-400" />
                <span>Find a Mentor</span>
              </Command.Item>
            </Command.Group>

            <Command.Separator className="-mx-2 my-1 h-px bg-border" />

            <Command.Group heading="Quick Links" className="p-1 text-xs font-medium text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-semibold">
              <Command.Item 
                onSelect={() => handleSelect('/courses')}
                className="relative flex cursor-pointer select-none items-center justify-between rounded-lg px-2 py-3 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground"
              >
                <div className="flex items-center">
                  <BookOpen className="mr-2 h-4 w-4 text-violet-400" />
                  <span>Browse Catalog</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-50" />
              </Command.Item>
              <Command.Item 
                onSelect={() => handleSelect('/projects')}
                className="relative flex cursor-pointer select-none items-center justify-between rounded-lg px-2 py-3 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground"
              >
                <div className="flex items-center">
                  <Rocket className="mr-2 h-4 w-4 text-amber-400" />
                  <span>Project Incubator</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-50" />
              </Command.Item>
              <Command.Item 
                onSelect={() => handleSelect('/certifications')}
                className="relative flex cursor-pointer select-none items-center justify-between rounded-lg px-2 py-3 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground"
              >
                <div className="flex items-center">
                  <Award className="mr-2 h-4 w-4 text-emerald-400" />
                  <span>My Certifications</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-50" />
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
