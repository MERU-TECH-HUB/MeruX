import type { Metadata } from "next";
import { Inter, Outfit, Space_Grotesk } from "next/font/google";
import { AuthProvider } from "@/lib/supabase/auth-context";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "Merux LMS",
  description: "Merux LMS by MeruTechHub - innovation-driven digital learning, research, and incubation.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/merux-lms-icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/apple-icon.svg",
  },
  openGraph: {
    title: "Merux LMS",
    description: "Merux LMS by MeruTechHub",
    images: [
      {
        url: "/brand/merux-lms-logo-full.svg",
      },
      {
        url: "/brand/merux-lms-logo-horizontal.svg",
      },
    ],
  },
};

import { SessionSecurityProvider } from "@/components/auth/session-security";

import { ToastProvider } from "@/components/ui/Toast";
import { ReducedMotionProvider } from "@/components/ui/ReducedMotion";
import { ReactLenis } from "lenis/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} ${spaceGrotesk.variable} font-inter`} suppressHydrationWarning>
        <ReactLenis root>
          <ReducedMotionProvider>
            <ToastProvider>
              <AuthProvider>
                <SessionSecurityProvider>
                  <div className="min-h-screen flex flex-col">
                    {children}
                  </div>
                </SessionSecurityProvider>
              </AuthProvider>
            </ToastProvider>
          </ReducedMotionProvider>
        </ReactLenis>
      </body>
    </html>
  );
}
