import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { InteractiveRoadmapPreview } from "@/components/landing/InteractiveRoadmapPreview";
import { FeatureShowcase } from "@/components/landing/FeatureShowcase";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ComparisonSection } from "@/components/landing/ComparisonSection";
import { DomainGrid } from "@/components/landing/DomainGrid";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* 1. Global Navigation Bar */}
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* 2. Hero Section with Requested Headline and CTAs */}
        <Hero />

        {/* 3. Interactive Signature Roadmap Preview */}
        <InteractiveRoadmapPreview />

        {/* 4. Deep Feature Showcase with Tabs */}
        <FeatureShowcase />

        {/* 5. How BuddyStudy Works (4-Step Pipeline) */}
        <HowItWorks />

        {/* 6. Benefits & Direct Comparison */}
        <ComparisonSection />

        {/* Curated Skill Graphs Overview */}
        <DomainGrid />
      </main>

      {/* 7. Footer with Deep Links */}
      <Footer />
    </div>
  );
}
