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
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
        {children}
      </body>
    </html>
  );
}
