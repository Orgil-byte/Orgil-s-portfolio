import { ArrowUpRight } from "lucide-react";
import { FadeUp, LineReveal } from "@/components/motion/reveal";
import { capabilityGroups } from "@/data/site";

export function CapabilitiesSection() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="scroll-mt-24 border-t border-[#111111] bg-[#F1EBDD] px-5 py-24 md:px-[clamp(32px,5vw,64px)] md:py-32"
    >
      <FadeUp>
        <p className="font-editorial-mono text-xs font-medium tracking-[0.12em] uppercase">
          04 / Capabilities
        </p>
      </FadeUp>
      <h2
        id="capabilities-heading"
        className="font-display mt-9 text-[clamp(3.6rem,9vw,8rem)] leading-[0.86] font-semibold tracking-[-0.035em] uppercase"
      >
        <LineReveal>Tools for useful</LineReveal>
        <LineReveal delay={0.08}>digital products.</LineReveal>
      </h2>

      <div className="mt-16 grid border-t border-l border-[#111111] md:mt-20 md:grid-cols-3">
        {capabilityGroups.map((group, index) => (
          <FadeUp key={group.title} delay={index * 0.08} className="h-full">
            <article className="group flex h-full min-h-80 flex-col border-r border-b border-[#111111] p-6 transition-colors duration-300 hover:bg-[#DED7C9] md:p-8">
              <header className="flex items-start justify-between">
                <p className="font-editorial-mono text-xs tracking-[0.08em] uppercase">
                  {String(index + 1).padStart(2, "0")} / {`{ ${group.title} }`}
                </p>
                <ArrowUpRight
                  aria-hidden="true"
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </header>
              <ul className="mt-auto space-y-3 pt-16 text-lg leading-6">
                {group.items.map((item) => (
                  <li key={item} className="border-t border-[#111111]/25 pt-3">
                    — {item}
                  </li>
                ))}
              </ul>
            </article>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
