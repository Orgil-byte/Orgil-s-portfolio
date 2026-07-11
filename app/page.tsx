import type { Metadata } from "next";
import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { ContactFooter } from "@/components/sections/contact-footer";
import { Hero } from "@/components/sections/hero";
import { ProfileSection } from "@/components/sections/profile-section";
import { ProjectsSection } from "@/components/sections/projects-section";

export const metadata: Metadata = {
  title: "Orgil Ulziitogtokh — Software Engineer",
  description:
    "Portfolio of Orgil Ulziitogtokh: full-stack product engineering, frontend quality, and practical AI integration.",
};

export default function Home() {
  return (
    <div className="relative isolate flex min-h-[calc(100svh-var(--header-height))] w-full flex-col overflow-clip bg-[#F1EBDD]">
      <main className="flex min-w-0 flex-1 flex-col">
        <Hero />
        <ProfileSection />
        <ProjectsSection />
        <CapabilitiesSection />
      </main>
      <ContactFooter />
    </div>
  );
}
