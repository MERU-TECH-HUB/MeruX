"use client"

import { Sidebar } from "@/components/dashboard/sidebar";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex bg-background min-h-screen relative">
            <div className="hidden lg:block">
                <Sidebar />
            </div>

            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <button
                        aria-label="Close navigation"
                        className="absolute inset-0 bg-black/45"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <Sidebar
                        className="absolute left-0 top-0 h-full"
                        onClose={() => setSidebarOpen(false)}
                    />
                </div>
            )}

            <main className="flex-1 overflow-auto relative z-10 min-w-0">
                <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/95 px-4 py-3 backdrop-blur lg:hidden">
                    <Link href="/" className="flex items-center gap-2 font-outfit font-bold text-lg">
                        <Image
                            src="/brand/merux-lms-icon.svg"
                            alt="MeruX"
                            width={28}
                            height={28}
                            className="rounded-md"
                            priority
                        />
                        <span>Meru<span className="text-hub-indigo">X</span></span>
                    </Link>
                    <button
                        aria-label="Open navigation"
                        onClick={() => setSidebarOpen(true)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                </header>

                <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
