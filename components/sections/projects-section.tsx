"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import { FadeUp, LineReveal } from "@/components/motion/reveal";
import { TransitionLink } from "@/components/navigation/transition-link";
import { ProjectMockVisual } from "@/components/projects/project-mock-visual";
import { projects } from "@/data/projects";

const EASE = [0.76, 0, 0.24, 1] as const;
const EDGE_PADDING = 18;
const CURSOR_SIZE = 80;
const NAV_CLEARANCE = 116;
const NAV_BOTTOM = 124;

type MoveTo = (value: number) => void;

type FollowerMovers = Readonly<{
  previewX: MoveTo;
  previewY: MoveTo;
  cursorX: MoveTo;
  cursorY: MoveTo;
  labelX: MoveTo;
  labelY: MoveTo;
}>;

export function clampCenter(
  coordinate: number,
  size: number,
  viewportSize: number,
  padding: number,
) {
  const minimum = size / 2 + padding;
  const maximum = viewportSize - size / 2 - padding;
  return minimum > maximum
    ? viewportSize / 2
    : Math.min(Math.max(coordinate, minimum), maximum);
}

export function ProjectsSection() {
  const reduceMotion = Boolean(useReducedMotion());
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const moversRef = useRef<FollowerMovers | null>(null);
  const pointerValidRef = useRef(false);
  const activeIndexRef = useRef<number | null>(null);
  const [supportsHover, setSupportsHover] = useState(false);
  const [hasPointer, setHasPointer] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeFollower = useCallback((resetPointer: boolean) => {
    activeIndexRef.current = null;
    setActiveIndex(null);
    if (!resetPointer) return;
    pointerValidRef.current = false;
    setHasPointer(false);
  }, []);

  useEffect(() => {
    const query = matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => {
      setSupportsHover(query.matches);
      if (!query.matches) closeFollower(true);
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [closeFollower]);

  useEffect(() => {
    if (!supportsHover) return;
    const preview = previewRef.current;
    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!preview || !cursor || !label) return;

    const context = gsap.context(() => {
      gsap.set([preview, cursor, label], { xPercent: -50, yPercent: -50 });
      const previewDuration = reduceMotion ? 0 : 0.8;
      const cursorDuration = reduceMotion ? 0 : 0.42;
      moversRef.current = {
        previewX: gsap.quickTo(preview, "x", {
          duration: previewDuration,
          ease: "power3.out",
        }),
        previewY: gsap.quickTo(preview, "y", {
          duration: previewDuration,
          ease: "power3.out",
        }),
        cursorX: gsap.quickTo(cursor, "x", {
          duration: cursorDuration,
          ease: "power3.out",
        }),
        cursorY: gsap.quickTo(cursor, "y", {
          duration: cursorDuration,
          ease: "power3.out",
        }),
        labelX: gsap.quickTo(label, "x", {
          duration: cursorDuration,
          ease: "power3.out",
        }),
        labelY: gsap.quickTo(label, "y", {
          duration: cursorDuration,
          ease: "power3.out",
        }),
      };
    }, sectionRef);

    return () => {
      moversRef.current = null;
      context.revert();
    };
  }, [reduceMotion, supportsHover]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) closeFollower(true);
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, [closeFollower]);

  const moveFollowers = (event: React.PointerEvent<HTMLElement>) => {
    if (!supportsHover) return;
    const preview = previewRef.current;
    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!preview || !cursor || !label) return;

    const measuredWidth = preview.offsetWidth;
    const measuredHeight = preview.offsetHeight;
    const width = measuredWidth > 0 ? measuredWidth : 420;
    const height = measuredHeight > 0 ? measuredHeight : width / 1.52;
    let previewX = clampCenter(
      event.clientX,
      width,
      window.innerWidth,
      EDGE_PADDING,
    );
    const previewY = clampCenter(
      event.clientY,
      height,
      window.innerHeight,
      EDGE_PADDING,
    );
    const overlapsNavigation =
      previewY - height / 2 < NAV_BOTTOM &&
      previewX + width / 2 > window.innerWidth - NAV_CLEARANCE;
    if (overlapsNavigation) {
      previewX = Math.max(
        width / 2 + EDGE_PADDING,
        window.innerWidth - NAV_CLEARANCE - width / 2,
      );
    }
    const cursorX = clampCenter(
      event.clientX,
      CURSOR_SIZE,
      window.innerWidth,
      8,
    );
    const cursorY = clampCenter(
      event.clientY,
      CURSOR_SIZE,
      window.innerHeight,
      8,
    );

    if (!pointerValidRef.current || !moversRef.current) {
      gsap.set(preview, { x: previewX, y: previewY });
      gsap.set([cursor, label], { x: cursorX, y: cursorY });
      pointerValidRef.current = true;
      setHasPointer(true);
      return;
    }

    const movers = moversRef.current;
    movers.previewX(previewX);
    movers.previewY(previewY);
    movers.cursorX(cursorX);
    movers.cursorY(cursorY);
    movers.labelX(cursorX);
    movers.labelY(cursorY);
  };

  const activate = (index: number) => {
    activeIndexRef.current = index;
    setActiveIndex(index);
  };

  const previewOpen = hasPointer && activeIndex !== null;
  const sliderIndex = activeIndex ?? 0;

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-24 border-t border-[#111111] bg-[#F1EBDD] px-5 py-24 md:px-[clamp(32px,5vw,64px)] md:py-32"
      onPointerMove={moveFollowers}
      onPointerLeave={() => closeFollower(true)}
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
          const active = activeIndex === index;
          const inactive = activeIndex !== null && !active;
          return (
            <FadeUp key={project.id} delay={index * 0.05}>
              <TransitionLink
                href={`/projects/${project.slug}`}
                transitionLabel={project.title}
                transitionAccent={project.accent.background}
                onPointerEnter={(event) => {
                  if (!supportsHover) return;
                  moveFollowers(event);
                  activate(index);
                }}
                onFocus={() => activate(index)}
                onBlur={() =>
                  activeIndexRef.current === index && closeFollower(false)
                }
                className={`project-row group grid min-h-32 grid-cols-[40px_1fr_auto] items-center gap-x-3 border-b border-[#111111] py-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E4542F] md:min-h-40 md:grid-cols-12 md:gap-6 md:py-7 ${previewOpen && active ? "project-row--preview-active" : ""}`}
              >
                <span className="font-editorial-mono text-xs md:col-span-1">
                  {project.index}
                </span>
                <h3
                  className="font-display text-[clamp(2.7rem,6.5vw,6.3rem)] leading-[0.88] font-semibold tracking-[-0.035em] uppercase transition-[color,opacity] duration-300 md:col-span-6"
                  style={{
                    color: active ? "#E4542F" : undefined,
                    opacity: inactive ? 0.26 : 1,
                  }}
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
        <>
          <div
            ref={previewRef}
            aria-hidden="true"
            className="project-preview-follower pointer-events-none fixed top-0 left-0 z-40 w-[min(30vw,430px)]"
          >
            <motion.div
              className="overflow-hidden border border-[#111111] bg-[#F1EBDD]"
              initial={false}
              animate={
                previewOpen
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.82 }
              }
              transition={{ duration: reduceMotion ? 0.08 : 0.38, ease: EASE }}
            >
              <div className="relative aspect-[1.52/1] overflow-hidden">
                <motion.div
                  className="absolute inset-0 flex flex-col"
                  initial={false}
                  animate={{ y: `${sliderIndex * -100}%` }}
                  transition={{
                    duration: reduceMotion ? 0.08 : 0.52,
                    ease: EASE,
                  }}
                >
                  {projects.map((project) => (
                    <div key={project.id} className="h-full shrink-0">
                      <ProjectMockVisual
                        variant={project.previewVisual}
                        compact
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>

          <div
            ref={cursorRef}
            aria-hidden="true"
            className="project-preview-cursor pointer-events-none fixed top-0 left-0 z-50 size-20"
          >
            <motion.div
              className="size-full rounded-full bg-[#E4542F]"
              initial={false}
              animate={
                previewOpen
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0 }
              }
              transition={{ duration: reduceMotion ? 0.08 : 0.32, ease: EASE }}
            />
          </div>

          <div
            ref={labelRef}
            aria-hidden="true"
            className="project-preview-label pointer-events-none fixed top-0 left-0 z-50"
          >
            <motion.span
              className="font-editorial-mono block text-xs font-medium text-[#111111] uppercase"
              initial={false}
              animate={
                previewOpen
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0 }
              }
              transition={{ duration: reduceMotion ? 0.08 : 0.32, ease: EASE }}
            >
              View
            </motion.span>
          </div>
        </>
      )}
    </section>
  );
}
