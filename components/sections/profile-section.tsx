import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FadeUp, LineReveal } from "@/components/motion/reveal";
import { TransitionLink } from "@/components/navigation/transition-link";
import { profile } from "@/data/site";

export function ProfileSection() {
  return (
    <section
      id="profile"
      aria-labelledby="profile-heading"
      className="scroll-mt-24 border-t border-[#111111] bg-[#F1EBDD] px-5 py-24 md:px-[clamp(32px,5vw,64px)] md:py-32"
    >
      <div className="grid gap-12 md:grid-cols-12 md:gap-6">
        <FadeUp className="md:col-span-5">
          <div className="relative mr-4 mb-4 border border-[#111111] bg-[#E4542F]">
            <Image
              src={profile.portrait}
              alt="Portrait of Orgil Ulziitogtokh"
              width={1638}
              height={2048}
              sizes="(max-width: 767px) calc(100vw - 56px), 38vw"
              className="relative translate-x-4 translate-y-4 border border-[#111111] bg-[#C8C1B3] object-cover contrast-125 grayscale"
            />
          </div>
        </FadeUp>

        <div className="flex flex-col justify-center md:col-span-6 md:col-start-7">
          <FadeUp>
            <p className="font-editorial-mono text-xs font-medium tracking-[0.12em] uppercase">
              03 / Profile
            </p>
          </FadeUp>
          <h2
            id="profile-heading"
            className="font-display mt-8 text-[clamp(3rem,6vw,5rem)] leading-[0.95] font-semibold tracking-[-0.025em] uppercase"
          >
            <LineReveal>I build across</LineReveal>
            <LineReveal delay={0.08}>the whole product.</LineReveal>
          </h2>
          <FadeUp className="mt-9 max-w-2xl" delay={0.08}>
            <p className="text-xl leading-[1.55] md:text-2xl">
              {profile.introduction}
            </p>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#555249]">
              {profile.supporting}
            </p>
            <TransitionLink
              href="/about/full-profile"
              transitionLabel="Profile"
              className="font-editorial-mono mt-9 inline-flex min-h-12 items-center gap-3 border border-[#111111] px-5 py-3 text-xs font-medium tracking-[0.08em] uppercase transition-colors hover:bg-[#E4542F] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E4542F]"
            >
              View full profile <ArrowUpRight aria-hidden="true" size={16} />
            </TransitionLink>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
