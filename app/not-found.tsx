import { TransitionLink } from "@/components/navigation/transition-link";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100svh-var(--header-height))] flex-col justify-between bg-[#F1EBDD] px-5 py-16 md:px-[clamp(32px,5vw,64px)] md:py-24">
      <p className="font-editorial-mono text-xs tracking-[0.1em] uppercase">
        404 / Not found
      </p>
      <div>
        <h1 className="font-display text-[clamp(5rem,17vw,15rem)] leading-[0.75] font-semibold tracking-[-0.05em] uppercase">
          Wrong turn.
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-7">
          This route does not match a project or page in the portfolio.
        </p>
      </div>
      <TransitionLink
        href="/"
        transitionLabel="Home"
        className="font-editorial-mono w-fit border border-[#111111] px-5 py-3 text-xs uppercase hover:bg-[#E4542F]"
      >
        Return home
      </TransitionLink>
    </main>
  );
}
