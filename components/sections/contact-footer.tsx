"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { FadeUp, LineReveal } from "@/components/motion/reveal";
import { contact, profile } from "@/data/site";

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
  return (
    <footer
      id="contact"
      className="contact-footer flex scroll-mt-0 flex-col bg-[#181817] px-5 pt-20 pb-[calc(32px+env(safe-area-inset-bottom))] text-[#F7F3EA] md:px-[clamp(32px,5vw,64px)] md:pt-24"
    >
      <div className="grid gap-7 md:grid-cols-12 md:items-start">
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
          <h2 className="font-display mt-5 text-[clamp(4.3rem,11vw,10rem)] leading-[0.77] font-semibold tracking-[-0.04em] uppercase">
            <LineReveal>Let’s build</LineReveal>
            <LineReveal delay={0.07}>something</LineReveal>
            <LineReveal delay={0.14}>useful.</LineReveal>
          </h2>
        </div>
        <FadeUp className="md:col-span-2 md:col-start-11 md:pt-20">
          <ArrowDownRight
            className="size-12 text-[#E4542F] md:size-20"
            strokeWidth={1.2}
            aria-hidden="true"
          />
        </FadeUp>
      </div>

      <div className="mt-12 border-t border-white/25 md:mt-14" />

      <div className="mt-7 grid min-w-0 gap-3 md:grid-cols-2 xl:grid-cols-4">
        <a className="contact-pill" href={contact.phone.href}>
          <span>
            Phone <span className="text-white/45">/</span>{" "}
            {contact.phone.display}
          </span>
        </a>
        {contact.email ? (
          <a className="contact-pill" href={`mailto:${contact.email}`}>
            Email <ArrowUpRight size={15} />
          </a>
        ) : (
          <span className="contact-pill opacity-45" aria-disabled="true">
            Email — coming soon
          </span>
        )}
        <a
          className="contact-pill"
          href={contact.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub <ArrowUpRight aria-hidden="true" size={15} />
        </a>
        {contact.linkedin ? (
          <a
            className="contact-pill"
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn <ArrowUpRight aria-hidden="true" size={15} />
          </a>
        ) : (
          <span className="contact-pill opacity-45" aria-disabled="true">
            LinkedIn — coming soon
          </span>
        )}
      </div>

      <div className="font-editorial-mono mt-14 grid grid-cols-1 gap-x-6 gap-y-7 border-t border-white/20 pt-7 text-[0.6875rem] leading-5 tracking-[0.06em] uppercase min-[360px]:grid-cols-2 md:mt-auto md:grid-cols-4 md:pt-10">
        <div>
          <span className="block text-white/40">Edition</span>2026 / 01
        </div>
        <div>
          <span className="block text-white/40">Local time</span>
          <LocalTime />
        </div>
        <div>
          <span className="block text-white/40">Social</span>
          <a
            className="hover:text-[#E4542F] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E4542F]"
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
          >
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
