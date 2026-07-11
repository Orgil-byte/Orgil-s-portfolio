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
  phone: {
    display: "+976 8885 4768",
    href: "tel:+97688854768",
  },
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

export type CapabilityToolGroup = Readonly<{
  label: string;
  tools: readonly string[];
}>;

export type CapabilityCategory = Readonly<{
  id: string;
  index: string;
  title: string;
  summaryCount: number;
  groups: readonly CapabilityToolGroup[];
}>;

const infrastructureTools = [
  "Supabase Postgres",
  "Supabase Auth",
  "Supabase Storage",
  "Object storage",
  "Vercel",
  "Environment configuration",
  "Deployment workflows",
] as const;

export const capabilityGroups = [
  {
    id: "frontend",
    index: "01",
    title: "Frontend",
    summaryCount: 6,
    groups: [
      {
        label: "Core",
        tools: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js"],
      },
      {
        label: "UI & Styling",
        tools: [
          "Tailwind CSS",
          "Responsive design",
          "Accessible UI",
          "CSS layouts",
          "Component systems",
        ],
      },
      {
        label: "Interaction & State",
        tools: ["Framer Motion", "Client-side state management"],
      },
      {
        label: "Delivery",
        tools: ["Git", "GitHub", "Vercel"],
      },
    ],
  },
  {
    id: "backend",
    index: "02",
    title: "Backend",
    summaryCount: 5,
    groups: [
      {
        label: "Runtime & Frameworks",
        tools: ["Node.js", "Bun", "Hono", "Express"],
      },
      {
        label: "APIs & Validation",
        tools: ["REST APIs", "API design", "Structured data validation"],
      },
      {
        label: "Database & ORM",
        tools: [
          "PostgreSQL",
          "Prisma",
          "Drizzle ORM",
          "pgvector",
          "Database schema design",
        ],
      },
      { label: "Platforms & Services", tools: infrastructureTools },
    ],
  },
  {
    id: "ai-integration",
    index: "03",
    title: "AI Integration",
    summaryCount: 5,
    groups: [
      {
        label: "Models & APIs",
        tools: [
          "OpenAI API",
          "Gemini API",
          "Vision-model workflows",
          "Structured model output",
        ],
      },
      {
        label: "Knowledge Systems",
        tools: [
          "RAG",
          "Embeddings",
          "Vector search",
          "pgvector",
          "Document ingestion",
          "Chunking",
          "Source citations",
          "Retrieval pipelines",
        ],
      },
      {
        label: "AI Product Architecture",
        tools: [
          "Prompt pipelines",
          "Human review workflows",
          "BYOK architecture",
          "Multi-tenant AI workspaces",
          "Model-provider integration",
          "AI-assisted extraction",
          "AI response validation",
        ],
      },
    ],
  },
] as const satisfies readonly CapabilityCategory[];

export const profileToolbox = [
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
    title: "AI integration",
    items: [
      "LLM API integration",
      "RAG systems",
      "Prompt pipelines",
      "Vision-model workflows",
      "OpenAI / Gemini APIs",
    ],
  },
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
