const metadata = [
  { label: "[ ROLE ]", value: "SOFTWARE ENGINEER" },
  {
    label: "[ EXPERTISE ]",
    value: "FRONTEND / BACKEND / AI INTEGRATION",
  },
  {
    label: "[ LOCATION ]",
    value: "BASED IN ULAANBAATAR, MONGOLIA",
  },
] as const;

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="min-h-[calc(100svh-var(--header-height))] bg-[#F1EBDD] px-5 pt-[clamp(48px,9svh,76px)] pb-10 md:px-[clamp(32px,5vw,64px)] md:pt-[clamp(64px,12svh,128px)] md:pb-14"
    >
      <div className="grid w-full grid-cols-[3px_minmax(0,1fr)] gap-4 md:grid-cols-[4px_minmax(0,1fr)] md:gap-8 lg:gap-9">
        <div aria-hidden="true" className="bg-[#E4542F]" />

        <div className="min-w-0">
          <h1
            id="hero-heading"
            className="font-display text-[clamp(3.625rem,18.2vw,6rem)] leading-[0.84] font-bold tracking-[-0.035em] text-[#111111] uppercase md:text-[clamp(6rem,11vw,7rem)] lg:text-[clamp(7rem,10.5vw,10rem)]"
          >
            <span className="block whitespace-nowrap">I Build</span>
            <span className="block whitespace-nowrap">Useful</span>
            <span className="block whitespace-nowrap">Software</span>
          </h1>

          <dl className="font-editorial-mono mt-[clamp(40px,8svh,72px)] grid gap-[18px] border-t border-[rgba(17,17,17,0.42)] pt-4 text-right uppercase md:grid-cols-3 md:gap-6 md:pt-4">
            {metadata.map((item, index) => (
              <div
                key={item.label}
                className={
                  index === 0
                    ? "md:text-left"
                    : index === 1
                      ? "md:text-center"
                      : "md:text-right"
                }
              >
                <dt className="text-[0.625rem] leading-4 tracking-[0.08em] text-[#111111]/65 md:text-[0.65rem]">
                  {item.label}
                </dt>
                <dd className="ml-0 text-[0.6875rem] leading-[1.45] font-medium tracking-[-0.015em] md:text-[0.675rem] lg:text-[0.72rem]">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
