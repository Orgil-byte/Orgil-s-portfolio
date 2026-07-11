import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { FadeUp, LineReveal } from "@/components/motion/reveal";
import { TransitionLink } from "@/components/navigation/transition-link";
import { ContactFooter } from "@/components/sections/contact-footer";
import {
  profile,
  profileTimeline,
  profileToolbox,
  workingPrinciples,
} from "@/data/site";

export function FullProfilePage() {
  return (
    <div className="bg-[#F1EBDD]">
      <main>
        <header className="px-5 pt-12 pb-20 md:px-[clamp(32px,5vw,64px)] md:pt-20 md:pb-28">
          <FadeUp>
            <TransitionLink
              href="/"
              transitionLabel="Home"
              className="font-editorial-mono inline-flex items-center gap-3 text-xs tracking-[0.08em] uppercase focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E4542F]"
            >
              <ArrowLeft aria-hidden="true" size={16} /> Back home
            </TransitionLink>
          </FadeUp>
          <div className="mt-12 grid gap-12 md:grid-cols-12 md:items-end md:gap-6">
            <div className="md:col-span-8">
              <FadeUp>
                <p className="font-editorial-mono text-xs tracking-[0.12em] uppercase">
                  Full profile / 2026
                </p>
              </FadeUp>
              <h1 className="font-display mt-8 text-[clamp(4rem,13vw,12rem)] leading-[0.76] font-semibold tracking-[-0.045em] uppercase">
                <LineReveal delay={0.1}>Orgil</LineReveal>
                <LineReveal delay={0.17}>Ulziitogtokh</LineReveal>
              </h1>
            </div>
            <FadeUp className="md:col-span-3 md:col-start-10" delay={0.1}>
              <div className="relative mr-3 mb-3 border border-[#111111] bg-[#E4542F]">
                <Image
                  src={profile.portrait}
                  alt="Portrait of Orgil Ulziitogtokh"
                  width={1638}
                  height={2048}
                  sizes="(max-width: 767px) calc(100vw - 52px), 25vw"
                  priority
                  className="translate-x-3 translate-y-3 border border-[#111111] object-cover contrast-125 grayscale"
                />
              </div>
            </FadeUp>
          </div>
          <FadeUp className="mt-16 grid gap-8 border-t border-[#111111] pt-7 md:grid-cols-12 md:gap-6">
            <dl className="font-editorial-mono grid grid-cols-2 gap-6 text-[0.6875rem] leading-5 tracking-[0.07em] uppercase md:col-span-4">
              <div>
                <dt className="text-[#111111]/45">Role</dt>
                <dd>{profile.role}</dd>
              </div>
              <div>
                <dt className="text-[#111111]/45">Location</dt>
                <dd>Based in {profile.location}</dd>
              </div>
            </dl>
            <p className="text-[clamp(1.5rem,3vw,2.7rem)] leading-[1.25] tracking-[-0.02em] md:col-span-7 md:col-start-6">
              {profile.positioning}
            </p>
          </FadeUp>
        </header>

        <div className="px-5 md:px-[clamp(32px,5vw,64px)]">
          <ProfileSection number="01" title="Introduction">
            <p className="case-study-statement">{profile.introduction}</p>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-[#555249]">
              {profile.supporting}
            </p>
          </ProfileSection>

          <ProfileSection number="02" title="Current focus">
            <div className="grid border-t border-l border-[#111111] sm:grid-cols-2">
              {[
                [
                  "Full-stack product development",
                  "Connecting product decisions from interface through data and deployment.",
                ],
                [
                  "Frontend quality",
                  "Building responsive, accessible interactions with deliberate motion and detail.",
                ],
                [
                  "Backend architecture",
                  "Learning to shape APIs, data models, authorization, and background workflows clearly.",
                ],
                [
                  "Practical AI",
                  "Using retrieval, vision, and LLM APIs where outputs remain inspectable and reviewable.",
                ],
                [
                  "Complete products",
                  "Turning portfolio ideas into coherent systems instead of isolated feature demos.",
                ],
                [
                  "Next opportunity",
                  "Preparing for junior software-engineering roles where I can contribute and keep growing.",
                ],
              ].map(([title, text], index) => (
                <article
                  key={title}
                  className="min-h-52 border-r border-b border-[#111111] p-6"
                >
                  <span className="font-editorial-mono text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display mt-7 text-3xl leading-none font-semibold uppercase">
                    {title}
                  </h2>
                  <p className="mt-5 leading-7 text-[#555249]">{text}</p>
                </article>
              ))}
            </div>
          </ProfileSection>

          <ProfileSection number="03" title="Skills and toolbox">
            <div className="grid border-t border-[#111111] md:grid-cols-2">
              {profileToolbox.map((group) => (
                <article
                  key={group.title}
                  className="border-r border-b border-[#111111] p-6 md:p-8"
                >
                  <h2 className="font-editorial-mono text-xs tracking-[0.08em] uppercase">{`{ ${group.title} }`}</h2>
                  <ul className="mt-10 space-y-3 text-lg">
                    {group.items.map((item) => (
                      <li key={item}>— {item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </ProfileSection>

          <ProfileSection number="04" title="Learning and project timeline">
            <ol className="border-t border-[#111111]">
              {profileTimeline.map((item) => (
                <li
                  key={item.marker}
                  className="grid gap-5 border-b border-[#111111] py-7 md:grid-cols-[80px_1fr_1fr] md:gap-8 md:py-9"
                >
                  <span className="font-editorial-mono text-xs">
                    {item.marker}
                  </span>
                  <h2 className="font-display text-3xl leading-none font-semibold uppercase md:text-4xl">
                    {item.title}
                  </h2>
                  <p className="leading-7 text-[#555249]">{item.text}</p>
                </li>
              ))}
            </ol>
          </ProfileSection>

          <ProfileSection number="05" title="Working principles">
            <ol className="border-t border-[#111111]">
              {workingPrinciples.map((principle, index) => (
                <li
                  key={principle}
                  className="grid grid-cols-[44px_1fr] gap-4 border-b border-[#111111] py-6 text-xl leading-7 md:grid-cols-[80px_1fr] md:py-8 md:text-3xl"
                >
                  <span className="font-editorial-mono text-xs">
                    0{index + 1}
                  </span>
                  {principle}
                </li>
              ))}
            </ol>
          </ProfileSection>

          <ProfileSection number="06" title="Availability">
            <p className="case-study-statement">
              Open to junior software-engineering opportunities and thoughtful
              collaborations where I can build, learn, and contribute.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {profile.resumeUrl ? (
                <a
                  href={profile.resumeUrl}
                  className="font-editorial-mono inline-flex min-h-12 items-center gap-3 border border-[#111111] px-5 py-3 text-xs uppercase hover:bg-[#E4542F]"
                >
                  Résumé PDF <ArrowUpRight size={16} />
                </a>
              ) : (
                // Add the final public PDF path to profile.resumeUrl in data/site.ts.
                <span
                  aria-disabled="true"
                  className="font-editorial-mono inline-flex min-h-12 cursor-not-allowed items-center border border-[#111111]/35 px-5 py-3 text-xs text-[#111111]/45 uppercase"
                >
                  Résumé PDF — Coming soon
                </span>
              )}
            </div>
          </ProfileSection>
        </div>
      </main>
      <ContactFooter />
    </div>
  );
}

function ProfileSection({
  number,
  title,
  children,
}: Readonly<{ number: string; title: string; children: React.ReactNode }>) {
  return (
    <section className="grid gap-8 border-t border-[#111111] py-16 md:grid-cols-12 md:gap-6 md:py-24">
      <FadeUp className="md:col-span-3">
        <p className="font-editorial-mono text-xs tracking-[0.1em] uppercase">
          {number} / {title}
        </p>
      </FadeUp>
      <FadeUp className="md:col-span-8 md:col-start-5" delay={0.05}>
        {children}
      </FadeUp>
    </section>
  );
}
