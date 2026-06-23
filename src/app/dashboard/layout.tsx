"use client"

import { Sidebar } from "@/components/dashboard/sidebar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Menu } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const supabase = createClient();
    const [loading, setLoading] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
                if (authError || !authUser) {
                    setLoading(false);
                    return;
                }
                setLoading(false);
            } catch (error) {
                console.error('Auth check error:', error);
                setLoading(false);
            }
        };

        checkAuth();
    }, [supabase.auth]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 rounded-full border-2 border-hub-indigo border-t-transparent animate-spin mx-auto" />
                    <p className="text-muted-foreground">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex bg-background min-h-[100dvh] relative">
            {/* Desktop Sidebar */}
            <Sidebar className="hidden lg:flex" />

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[100] flex lg:hidden">
                    {/* Backdrop */}
                    <button
                        aria-label="Close navigation"
                        className="fixed inset-0 bg-black/45 transition-opacity"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    {/* Sliding Panel */}
                    <div className="relative flex w-[280px] max-w-[80vw] flex-col bg-card shadow-2xl animate-in slide-in-from-left duration-300">
                        <Sidebar className="w-full flex h-[100dvh]" onClose={() => setIsMobileMenuOpen(false)} />
                    </div>
                </div>
            )}

            <main className="flex-1 overflow-x-hidden overflow-y-auto relative z-10 w-full flex flex-col h-[100dvh]">
                {/* Mobile Header */}
                <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/brand/merux-lms-icon.svg"
                            alt="Merux LMS"
                            width={32}
                            height={32}
                            className="rounded-lg shadow-lg shadow-hub-indigo/20"
                            priority
                        />
                        <span className="font-outfit font-bold text-xl tracking-tight">Merux <span className="text-hub-indigo">LMS</span></span>
                    </div>
                    <button
                        aria-label="Open navigation"
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                        <Menu className="w-5 h-5 text-foreground" />
                    </button>
                </header>

                <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
