import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FadeUp, LineReveal } from "@/components/motion/reveal";
import { TransitionLink } from "@/components/navigation/transition-link";
import { ProjectMockVisual } from "@/components/projects/project-mock-visual";
import { ContactFooter } from "@/components/sections/contact-footer";
import type { Project } from "@/data/projects";

function CaseStudySection({
  number,
  title,
  children,
}: Readonly<{
  number: string;
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <section className="grid gap-7 border-t border-[#111111] py-16 md:grid-cols-12 md:gap-6 md:py-24">
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

function ProjectAction({
  label,
  href,
}: Readonly<{ label: string; href: string | null }>) {
  if (!href) {
    return (
      <span
        aria-disabled="true"
        className="font-editorial-mono inline-flex min-h-12 cursor-not-allowed items-center border border-[#111111]/35 px-5 py-3 text-xs tracking-[0.07em] text-[#111111]/45 uppercase"
      >
        {label} — Coming soon
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-editorial-mono inline-flex min-h-12 items-center gap-3 border border-[#111111] px-5 py-3 text-xs tracking-[0.07em] uppercase hover:bg-[#E4542F] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E4542F]"
    >
      {label} <ArrowUpRight aria-hidden="true" size={16} />
    </a>
  );
}

export function ProjectCaseStudy({
  project,
  nextProject,
}: Readonly<{ project: Project; nextProject: Project }>) {
  return (
    <div className="bg-[#F1EBDD]">
      <main>
        <article>
          <header className="px-5 pt-16 pb-20 md:px-[clamp(32px,5vw,64px)] md:pt-24 md:pb-28">
            <FadeUp className="font-editorial-mono flex items-center justify-between gap-6 text-xs tracking-[0.1em] uppercase">
              <span>Project / {project.index}</span>
              <span>{project.status}</span>
            </FadeUp>
            <h1 className="font-display mt-10 text-[clamp(4.6rem,14vw,13rem)] leading-[0.76] font-semibold tracking-[-0.045em] uppercase">
              <LineReveal delay={0.12}>{project.title}</LineReveal>
            </h1>
            <div className="mt-12 grid gap-10 border-t border-[#111111] pt-7 md:grid-cols-12 md:gap-6">
              <FadeUp className="md:col-span-7">
                <p className="max-w-3xl text-[clamp(1.35rem,2.4vw,2.2rem)] leading-[1.35] tracking-[-0.015em]">
                  {project.shortDescription}
                </p>
              </FadeUp>
              <FadeUp className="font-editorial-mono grid grid-cols-2 gap-x-6 gap-y-6 text-[0.6875rem] leading-5 tracking-[0.05em] uppercase md:col-span-4 md:col-start-9">
                <div>
                  <span className="block text-[#111111]/45">Year</span>
                  {project.year}
                </div>
                <div>
                  <span className="block text-[#111111]/45">Category</span>
                  {project.discipline}
                </div>
                <div>
                  <span className="block text-[#111111]/45">Role</span>
                  {project.role}
                </div>
                <div>
                  <span className="block text-[#111111]/45">Technology</span>
                  {project.stack.slice(0, 3).join(" / ")}
                </div>
              </FadeUp>
            </div>
            <FadeUp className="mt-10 flex flex-wrap gap-3">
              <ProjectAction label="GitHub" href={project.repositoryUrl} />
              <ProjectAction label="Live app" href={project.liveUrl} />
            </FadeUp>
          </header>

          <section className="border-y border-[#111111] px-5 py-5 md:px-[clamp(32px,5vw,64px)] md:py-10">
            <FadeUp className="mx-auto aspect-[1.45/1] max-h-[78vh] max-w-[1280px] overflow-hidden border border-[#111111] md:aspect-[1.75/1]">
              <ProjectMockVisual variant={project.previewVisual} />
            </FadeUp>
          </section>

          <div className="px-5 md:px-[clamp(32px,5vw,64px)]">
            <CaseStudySection number="01" title="Overview">
              <p className="case-study-lead">{project.overview}</p>
            </CaseStudySection>
            <CaseStudySection number="02" title="Why I built it">
              <p className="case-study-lead">{project.motivation}</p>
            </CaseStudySection>
            <CaseStudySection number="03" title="Problem">
              <p className="case-study-statement">{project.problem}</p>
            </CaseStudySection>
            <CaseStudySection number="04" title="Proposed solution">
              <p className="case-study-lead">{project.solution}</p>
            </CaseStudySection>
            <CaseStudySection number="05" title="Key features">
              <ol className="border-t border-[#111111]">
                {project.features.map((feature, index) => (
                  <li
                    key={feature}
                    className="grid grid-cols-[42px_1fr] gap-4 border-b border-[#111111] py-5 text-xl leading-7 md:grid-cols-[72px_1fr] md:py-7 md:text-2xl"
                  >
                    <span className="font-editorial-mono text-xs">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {feature}
                  </li>
                ))}
              </ol>
            </CaseStudySection>
            <CaseStudySection number="06" title="Technical architecture">
              <div className="grid border-t border-l border-[#111111] md:grid-cols-2">
                {project.technicalApproach.map((item, index) => (
                  <article
                    key={item.title}
                    className="min-h-52 border-r border-b border-[#111111] p-6"
                  >
                    <span className="font-editorial-mono text-xs">
                      0{index + 1}
                    </span>
                    <h2 className="font-display mt-8 text-4xl leading-none font-semibold uppercase">
                      {item.title}
                    </h2>
                    <p className="mt-5 leading-7 text-[#555249]">{item.text}</p>
                  </article>
                ))}
              </div>
            </CaseStudySection>
            <CaseStudySection number="07" title="Technology stack">
              <ul className="font-editorial-mono flex flex-wrap gap-x-7 gap-y-4 border-t border-[#111111] pt-6 text-xs tracking-[0.07em] uppercase">
                {project.stack.map((technology) => (
                  <li key={technology}>[ {technology} ]</li>
                ))}
              </ul>
            </CaseStudySection>
            <CaseStudySection number="08" title="My role">
              <p className="case-study-statement">{project.role}</p>
            </CaseStudySection>
            <CaseStudySection number="09" title="Challenges and tradeoffs">
              <EditorialList items={project.challenges} />
            </CaseStudySection>
            <CaseStudySection number="10" title="Lessons learned">
              <EditorialList items={project.lessons} />
            </CaseStudySection>
            <CaseStudySection number="11" title="Status and next steps">
              <p className="font-editorial-mono text-xs tracking-[0.08em] text-[#B83B1D] uppercase">
                {project.status}
              </p>
              <div className="mt-8">
                <EditorialList items={project.nextSteps} />
              </div>
            </CaseStudySection>
          </div>

          <section className="border-t border-[#111111] px-5 py-20 md:px-[clamp(32px,5vw,64px)] md:py-28">
            <FadeUp>
              <p className="font-editorial-mono text-xs tracking-[0.1em] uppercase">
                Next project / {nextProject.index}
              </p>
              <TransitionLink
                href={`/projects/${nextProject.slug}`}
                transitionLabel={nextProject.title}
                transitionAccent={nextProject.accent.background}
                className="group mt-8 grid gap-9 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E4542F] md:grid-cols-12 md:items-end md:gap-6"
              >
                <h2 className="font-display text-[clamp(4rem,11vw,10rem)] leading-[0.8] font-semibold tracking-[-0.04em] uppercase md:col-span-8">
                  {nextProject.title}
                </h2>
                <div className="overflow-hidden border border-[#111111] md:col-span-3 md:col-start-10">
                  <ProjectMockVisual
                    variant={nextProject.previewVisual}
                    compact
                  />
                </div>
                <span className="font-editorial-mono flex items-center gap-3 text-xs uppercase md:col-span-12">
                  View next case study{" "}
                  <ArrowRight
                    className="transition-transform group-hover:translate-x-2"
                    size={18}
                  />
                </span>
              </TransitionLink>
            </FadeUp>
          </section>
        </article>
      </main>
      <ContactFooter />
    </div>
  );
}

function EditorialList({ items }: Readonly<{ items: readonly string[] }>) {
  return (
    <ul className="border-t border-[#111111]">
      {items.map((item) => (
        <li
          key={item}
          className="border-b border-[#111111] py-5 text-lg leading-7 md:py-6 md:text-xl"
        >
          <span className="mr-4 text-[#E4542F]">—</span>
          {item}
        </li>
      ))}
    </ul>
  );
}
