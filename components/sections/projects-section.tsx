"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FadeUp, LineReveal } from "@/components/motion/reveal";
import { TransitionLink } from "@/components/navigation/transition-link";
import { ProjectMockVisual } from "@/components/projects/project-mock-visual";
import { projects } from "@/data/projects";

const EASE = [0.76, 0, 0.24, 1] as const;

export function ProjectsSection() {
  const reduceMotion = Boolean(useReducedMotion());
  const followerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const activeIndexRef = useRef<number | null>(null);
  const [supportsHover, setSupportsHover] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const query = matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setSupportsHover(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(
    () => () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  const moveFollower = () => {
    const follower = followerRef.current;
    if (!follower) {
      frameRef.current = null;
      return;
    }
    const weight = reduceMotion ? 1 : 0.14;
    currentRef.current.x +=
      (targetRef.current.x - currentRef.current.x) * weight;
    currentRef.current.y +=
      (targetRef.current.y - currentRef.current.y) * weight;
    follower.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0)`;
    const distance = Math.hypot(
      targetRef.current.x - currentRef.current.x,
      targetRef.current.y - currentRef.current.y,
    );
    frameRef.current =
      distance > 0.4 ? requestAnimationFrame(moveFollower) : null;
  };

  const trackPointer = (event: React.PointerEvent<HTMLElement>) => {
    if (!supportsHover) return;
    const width = followerRef.current?.offsetWidth ?? 420;
    const height = followerRef.current?.offsetHeight ?? 270;
    const x = Math.min(
      Math.max(18, event.clientX + 24),
      window.innerWidth - width - 108,
    );
    const y = Math.min(
      Math.max(18, event.clientY - height * 0.48),
      window.innerHeight - height - 18,
    );
    targetRef.current = { x, y };
    if (activeIndexRef.current === null) currentRef.current = { x, y };
    if (!frameRef.current)
      frameRef.current = requestAnimationFrame(moveFollower);
  };

  const activate = (index: number) => {
    const previous = activeIndexRef.current;
    if (previous !== null && previous !== index)
      setDirection(index > previous ? 1 : -1);
    activeIndexRef.current = index;
    setActiveIndex(index);
  };

  const deactivate = () => {
    activeIndexRef.current = null;
    setActiveIndex(null);
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-24 border-t border-[#111111] bg-[#F1EBDD] px-5 py-24 md:px-[clamp(32px,5vw,64px)] md:py-32"
      onPointerMove={trackPointer}
      onPointerLeave={deactivate}
    >
      <FadeUp>
        <p className="font-editorial-mono text-xs font-medium tracking-[0.12em] uppercase">
          02 / Selected Projects
        </p>
      </FadeUp>
      <div className="mt-8 flex items-end justify-between gap-8 md:mt-12">
        <h2
          id="projects-heading"
          className="font-display text-[clamp(3.6rem,9vw,8rem)] leading-[0.85] font-semibold tracking-[-0.035em] uppercase"
        >
          <LineReveal>Selected work</LineReveal>
        </h2>
        <FadeUp className="font-editorial-mono hidden max-w-xs pb-2 text-right text-[0.6875rem] leading-5 tracking-[0.06em] uppercase md:block">
          Concepts and prototypes exploring useful software, careful systems,
          and practical AI.
        </FadeUp>
      </div>

      <div className="mt-14 border-t border-[#111111] md:mt-20">
        {projects.map((project, index) => {
          const inactive = activeIndex !== null && activeIndex !== index;
          return (
            <FadeUp key={project.id} delay={index * 0.05}>
              <TransitionLink
                href={`/projects/${project.slug}`}
                transitionLabel={project.title}
                transitionAccent={project.accent.background}
                onPointerEnter={() => supportsHover && activate(index)}
                onFocus={() => activate(index)}
                onBlur={() => activeIndexRef.current === index && deactivate()}
                className="project-row group grid min-h-32 grid-cols-[40px_1fr_auto] items-center gap-x-3 border-b border-[#111111] py-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E4542F] md:min-h-40 md:grid-cols-12 md:gap-6 md:py-7"
              >
                <span className="font-editorial-mono text-xs md:col-span-1">
                  {project.index}
                </span>
                <h3
                  className="font-display text-[clamp(2.7rem,6.5vw,6.3rem)] leading-[0.88] font-semibold tracking-[-0.035em] uppercase transition-opacity duration-300 md:col-span-6"
                  style={{ opacity: inactive ? 0.26 : 1 }}
                >
                  {project.title}
                </h3>
                <ArrowUpRight
                  className="project-mobile-arrow md:hidden"
                  aria-hidden="true"
                  size={20}
                />
                <span className="font-editorial-mono col-start-2 mt-3 text-[0.625rem] leading-4 tracking-[0.05em] uppercase md:col-span-3 md:col-start-auto md:mt-0">
                  {project.discipline}
                </span>
                <span className="font-editorial-mono col-start-3 row-start-2 mt-3 text-right text-xs md:col-span-2 md:col-start-auto md:row-start-auto md:mt-0">
                  [ {project.year} ]
                </span>
                <div className="project-mobile-visual col-span-3 mt-5 overflow-hidden border border-[#111111]">
                  <ProjectMockVisual variant={project.previewVisual} compact />
                </div>
                <span className="project-mobile-view font-editorial-mono col-span-3 mt-4 flex items-center justify-between text-[0.6875rem] tracking-[0.08em] uppercase">
                  View project <ArrowUpRight aria-hidden="true" size={16} />
                </span>
              </TransitionLink>
            </FadeUp>
          );
        })}
      </div>

      {supportsHover && (
        <motion.div
          ref={followerRef}
          aria-hidden="true"
          className="project-preview-follower pointer-events-none fixed top-0 left-0 z-40 w-[min(30vw,430px)] overflow-hidden border border-[#111111] bg-[#F1EBDD]"
          initial={false}
          animate={
            activeIndex === null
              ? { opacity: 0, scale: 0.82 }
              : { opacity: 1, scale: 1 }
          }
          transition={{ duration: reduceMotion ? 0.1 : 0.38, ease: EASE }}
        >
          <div className="relative aspect-[1.52/1] overflow-hidden">
            <AnimatePresence
              mode="popLayout"
              custom={direction}
              initial={false}
            >
              {activeIndex !== null && (
                <motion.div
                  key={projects[activeIndex].id}
                  className="absolute inset-0"
                  custom={direction}
                  initial={{
                    y: direction * 80,
                    clipPath:
                      direction > 0 ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)",
                    scale: 1.05,
                  }}
                  animate={{ y: 0, clipPath: "inset(0 0 0 0)", scale: 1 }}
                  exit={{
                    y: direction * -60,
                    clipPath:
                      direction > 0 ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)",
                  }}
                  transition={{
                    duration: reduceMotion ? 0.1 : 0.42,
                    ease: EASE,
                  }}
                >
                  <ProjectMockVisual
                    variant={projects[activeIndex].previewVisual}
                    compact
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="font-editorial-mono absolute top-1/2 left-1/2 z-10 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#E4542F] text-xs font-medium uppercase">
              View
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
