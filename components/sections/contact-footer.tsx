"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { FadeUp, LineReveal } from "@/components/motion/reveal";
import { contact, profile, socialItems } from "@/data/site";

function LocalTime() {
  const [time, setTime] = useState("—");

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Ulaanbaatar",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  return <span suppressHydrationWarning>{time} ULAT</span>;
}

export function ContactFooter() {
  const ctaRef = useRef<HTMLSpanElement>(null);

  const moveCta = (event: React.PointerEvent<HTMLSpanElement>) => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.13;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.13;
    if (ctaRef.current)
      ctaRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  return (
    <footer
      id="contact"
      className="scroll-mt-0 overflow-hidden bg-[#181817] px-5 pt-24 pb-[calc(28px+env(safe-area-inset-bottom))] text-[#F7F3EA] md:px-[clamp(32px,5vw,64px)] md:pt-32"
    >
      <div className="grid gap-10 md:grid-cols-12 md:items-start">
        <div className="md:col-span-9">
          <FadeUp className="flex items-center gap-4">
            <Image
              src={profile.portrait}
              alt=""
              width={96}
              height={96}
              className="size-14 rounded-full border border-white/30 object-cover grayscale md:size-20"
            />
            <p className="font-editorial-mono text-xs tracking-[0.12em] text-white/55 uppercase">
              Have a useful idea?
            </p>
          </FadeUp>
          <h2 className="font-display mt-7 text-[clamp(4.3rem,12vw,11rem)] leading-[0.77] font-semibold tracking-[-0.04em] uppercase">
            <LineReveal>Let’s build</LineReveal>
            <LineReveal delay={0.07}>something</LineReveal>
            <LineReveal delay={0.14}>useful.</LineReveal>
          </h2>
        </div>
        <FadeUp className="md:col-span-2 md:col-start-11 md:pt-24">
          <ArrowDownRight
            className="size-12 text-[#E4542F] md:size-20"
            strokeWidth={1.2}
            aria-hidden="true"
          />
        </FadeUp>
      </div>

      <div className="relative mt-20 border-t border-white/25 md:mt-28">
        <span
          ref={ctaRef}
          aria-disabled="true"
          onPointerMove={moveCta}
          onPointerLeave={() => {
            if (ctaRef.current)
              ctaRef.current.style.transform = "translate3d(0, 0, 0)";
          }}
          className="font-editorial-mono absolute -top-20 right-0 flex size-40 cursor-not-allowed items-center justify-center rounded-full bg-[#E4542F] px-7 text-center text-xs leading-5 font-medium tracking-[0.05em] text-[#111111] uppercase transition-transform duration-300 md:-top-28 md:right-[12%] md:size-56"
        >
          Get in touch
          <br />
          details coming soon
        </span>
      </div>

      <div className="mt-28 flex flex-col gap-3 md:mt-32 md:flex-row md:flex-wrap">
        {contact.email ? (
          <a className="contact-pill" href={`mailto:${contact.email}`}>
            Email <ArrowUpRight size={15} />
          </a>
        ) : (
          <span className="contact-pill opacity-45" aria-disabled="true">
            Email — coming soon
          </span>
        )}
        {socialItems.map((social) => (
          <a
            key={social.label}
            className="contact-pill"
            href={social.href}
            target="_blank"
            rel="noreferrer"
          >
            {social.label} <ArrowUpRight size={15} />
          </a>
        ))}
        {contact.linkedin ? (
          <a
            className="contact-pill"
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <ArrowUpRight size={15} />
          </a>
        ) : (
          <span className="contact-pill opacity-45" aria-disabled="true">
            LinkedIn — coming soon
          </span>
        )}
      </div>

      <div className="font-editorial-mono mt-20 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/20 pt-7 text-[0.6875rem] leading-5 tracking-[0.06em] uppercase md:mt-28 md:grid-cols-4">
        <div>
          <span className="block text-white/40">Edition</span>2026 / 01
        </div>
        <div>
          <span className="block text-white/40">Local time</span>
          <LocalTime />
        </div>
        <div>
          <span className="block text-white/40">Social</span>
          <a className="hover:text-[#E4542F]" href={contact.github}>
            GitHub
          </a>
        </div>
        <div className="md:text-right">
          <span className="block text-white/40">
            © {new Date().getFullYear()}
          </span>
          Engineered for impact
        </div>
      </div>
    </footer>
  );
}
