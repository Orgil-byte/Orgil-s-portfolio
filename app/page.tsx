import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <div className="relative isolate flex min-h-svh w-full flex-col overflow-clip bg-[#F1EBDD]">
      <SiteHeader />
      <main className="flex min-w-0 flex-1 flex-col">
        <Hero />
      </main>
    </div>
  );
}
