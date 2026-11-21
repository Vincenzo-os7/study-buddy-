import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BuddyStudy — AI-Powered Student Learning Assistant",
  description: "Personalized, prerequisite-aware learning roadmaps powered by deterministic knowledge graphs and AI conceptual assistance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200 antialiased">
        {/* Skip to Main Content Link for Keyboard & Screen Reader Users (WCAG 2.4.1) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-indigo-600 focus:text-white focus:text-xs focus:font-semibold focus:rounded-xl focus:shadow-glow focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950 transition-all"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
