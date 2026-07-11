export type NavigationHref = "#" | "#projects" | "#profile" | "#contact";

export const navigationItems = [
  { label: "Home", href: "#" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#profile" },
  { label: "Contact", href: "#contact" },
] as const satisfies readonly {
  label: string;
  href: NavigationHref;
}[];

export const desktopNavigationItems = navigationItems.slice(1);

export const contact = {
  email: null,
  github: "https://github.com/Orgil-byte",
  linkedin: null,
} as const;

export const socialItems = [{ label: "GitHub", href: contact.github }] as const;

export const profile = {
  name: "Orgil Ulziitogtokh",
  role: "Software Engineer",
  location: "Mongolia",
  portrait: "/images/org.png",
  resumeUrl: null,
  introduction:
    "I’m Orgil Ulziitogtokh, a software engineer focused on building polished web products and practical AI-powered systems.",
  supporting:
    "I work across interface design, backend architecture, and AI integration—keeping systems understandable, responsive, and grounded in real product needs.",
  positioning:
    "I build polished web products and practical AI systems across frontend, backend, and product architecture.",
} as const;

export const capabilityGroups = [
  {
    title: "Frontend",
    items: [
      "React / Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Motion and interaction",
      "Responsive, accessible UI",
    ],
  },
  {
    title: "Backend",
    items: [
      "Hono",
      "Node.js / Bun",
      "PostgreSQL",
      "Prisma / Drizzle",
      "API design",
    ],
  },
  {
    title: "AI Integration",
    items: [
      "LLM API integration",
      "RAG systems",
      "Prompt pipelines",
      "Vision-model workflows",
      "OpenAI / Gemini APIs",
    ],
  },
] as const;

export const profileToolbox = [
  { title: "Frontend", items: capabilityGroups[0].items },
  { title: "Backend", items: capabilityGroups[1].items },
  { title: "AI integration", items: capabilityGroups[2].items },
  {
    title: "Infrastructure",
    items: [
      "Supabase",
      "Authentication",
      "Object storage",
      "Vercel",
      "Environment configuration",
    ],
  },
] as const;

export const profileTimeline = [
  {
    marker: "01",
    title: "Software engineering studies",
    text: "Building a practical foundation through coursework, bootcamp exercises, and complete product experiments.",
  },
  {
    marker: "02",
    title: "Multi-tenant RAG exploration",
    text: "Prototyping document ingestion, cited retrieval, workspace separation, and collaborative AI flows.",
  },
  {
    marker: "03",
    title: "AI-assisted grading prototype",
    text: "Testing a human-reviewed workflow for extracting questions, recognizing answers, and preparing results for export.",
  },
  {
    marker: "04",
    title: "KnowSpace AI development",
    text: "Combining BYOK security, shared knowledge, multi-tenant architecture, and a polished interface in one portfolio-grade system.",
  },
  {
    marker: "05",
    title: "Portfolio redesign",
    text: "Turning the work into an editorial, technically honest presentation designed and engineered as a complete product.",
  },
] as const;

export const workingPrinciples = [
  "Build for real use, not only visual demos.",
  "Keep AI outputs reviewable and source-aware.",
  "Prefer clear architecture over unnecessary complexity.",
  "Treat responsiveness and accessibility as product requirements.",
  "Learn by shipping complete systems.",
] as const;
