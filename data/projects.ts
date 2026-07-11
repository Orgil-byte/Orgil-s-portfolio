export type ProjectVisual = "workspace" | "grading" | "rag";

export type Project = Readonly<{
  id: string;
  slug: string;
  index: string;
  title: string;
  shortDescription: string;
  year: string;
  discipline: string;
  status: string;
  previewVisual: ProjectVisual;
  accent: { background: string; foreground: string };
  overview: string;
  problem: string;
  motivation: string;
  solution: string;
  features: readonly string[];
  technicalApproach: readonly { title: string; text: string }[];
  stack: readonly string[];
  role: string;
  challenges: readonly string[];
  lessons: readonly string[];
  nextSteps: readonly string[];
  repositoryUrl: string | null;
  liveUrl: string | null;
}>;

export const projects = [
  {
    id: "knowspace-ai",
    slug: "knowspace-ai",
    index: "01",
    title: "KnowSpace AI",
    shortDescription:
      "A BYOK multi-tenant knowledge workspace where teams upload shared documents and ask source-cited questions using their own AI provider keys.",
    year: "2026",
    discipline: "PRODUCT ENGINEERING / RAG",
    status: "In development / portfolio project",
    previewVisual: "workspace",
    accent: { background: "#E4542F", foreground: "#111111" },
    overview:
      "KnowSpace AI is a portfolio-grade product concept for turning scattered team files into a shared, source-aware knowledge layer. It combines document management, retrieval, AI-provider choice, and workspace permissions in one coherent interface.",
    problem:
      "Important information becomes fragmented across PDFs, images, notes, and internal files. Generic AI chats lack persistent shared context and trustworthy citations.",
    motivation:
      "I built the concept to explore secure multi-tenant architecture, document ingestion, RAG, encrypted BYOK key handling, and polished product design in one system.",
    solution:
      "A workspace model keeps members, sources, provider credentials, conversations, and citations isolated by tenant. Ingestion creates searchable document chunks, while each response exposes the source passages used to answer.",
    features: [
      "Shared workspaces with role-aware access",
      "PDF, image, and note ingestion",
      "Bring-your-own OpenAI or Gemini key flow",
      "Source-cited answers with inspectable passages",
      "Document status and ingestion visibility",
    ],
    technicalApproach: [
      {
        title: "Tenant boundary",
        text: "Workspace-scoped records and authorization checks keep member, source, and conversation data separated.",
      },
      {
        title: "Ingestion",
        text: "Uploaded files are parsed into traceable chunks, embedded, and stored with document and page metadata.",
      },
      {
        title: "Retrieval",
        text: "Semantic search selects relevant chunks before the provider prompt is assembled with citation identifiers.",
      },
      {
        title: "BYOK security",
        text: "Provider keys are designed to be encrypted at rest, redacted from normal reads, and used only in the request path.",
      },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Hono",
      "Bun",
      "Drizzle ORM",
      "PostgreSQL",
      "Supabase Auth",
      "Supabase Storage",
      "pgvector",
      "OpenAI / Gemini APIs",
    ],
    role: "Product design and full-stack engineering",
    challenges: [
      "Keeping authorization explicit across every workspace-scoped query",
      "Designing citations that remain understandable after document reprocessing",
      "Handling provider differences without leaking them throughout the interface",
    ],
    lessons: [
      "Retrieval quality is a product concern, not only a model concern.",
      "Trust improves when users can inspect sources and processing state.",
      "A small provider abstraction is useful only after the real differences are understood.",
    ],
    nextSteps: [
      "Complete the ingestion and evaluation loop",
      "Add workspace invitations and role tests",
      "Run citation-quality checks across mixed document sets",
    ],
    repositoryUrl: null,
    liveUrl: null,
  },
  {
    id: "duntuslah-ai",
    slug: "duntuslah-ai",
    index: "02",
    title: "DunTuslah AI",
    shortDescription:
      "An AI-assisted exam grading workflow for Mongolian teachers, from question extraction and student-answer recognition to review and export.",
    year: "2026",
    discipline: "AI WORKFLOW / EDUCATION",
    status: "Prototype / hackathon project",
    previewVisual: "grading",
    accent: { background: "#111111", foreground: "#F1EBDD" },
    overview:
      "DunTuslah AI explores where vision models can remove repetitive steps from paper-exam grading without removing teacher judgment. The workflow keeps uncertain extractions visible and final scores editable.",
    problem:
      "Teachers spend significant time checking paper exams, transferring scores, and correcting extraction errors manually.",
    motivation:
      "I built the prototype to test practical AI integration where AI accelerates repetitive work but humans remain responsible for final verification.",
    solution:
      "The system guides a teacher from answer-key setup through exam upload, recognition, confidence review, scoring, and spreadsheet export. Low-confidence fields are promoted for review instead of silently accepted.",
    features: [
      "Question and answer-key extraction",
      "Student answer recognition with confidence states",
      "Teacher review before score confirmation",
      "Structured results table",
      "Excel and CSV-ready export flow",
    ],
    technicalApproach: [
      {
        title: "Capture",
        text: "Exam images are normalized and grouped into a grading batch with explicit page order.",
      },
      {
        title: "Recognition",
        text: "Vision-model responses are converted into a strict question-and-answer schema before scoring.",
      },
      {
        title: "Review",
        text: "Confidence and validation rules identify ambiguous cells for teacher confirmation.",
      },
      {
        title: "Export",
        text: "Reviewed records are flattened into a predictable tabular format for school workflows.",
      },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Supabase Auth",
      "Supabase Storage",
      "Gemini Vision",
      "Excel / CSV export",
    ],
    role: "Workflow design, interface engineering, and AI integration",
    challenges: [
      "Representing model uncertainty clearly enough for fast review",
      "Normalizing handwriting and scan quality without implying false accuracy",
      "Keeping the workflow efficient when teachers must correct multiple answers",
    ],
    lessons: [
      "Human review should be designed as the primary flow, not an exception screen.",
      "Structured model outputs still require deterministic validation.",
      "Useful automation reduces attention cost as well as click count.",
    ],
    nextSteps: [
      "Test the flow with a wider range of Mongolian exam layouts",
      "Improve batch correction controls",
      "Document recognition limitations and confidence thresholds",
    ],
    repositoryUrl: null,
    liveUrl: null,
  },
  {
    id: "pinequest",
    slug: "pinequest",
    index: "03",
    title: "PineQuest",
    shortDescription:
      "A multi-tenant document intelligence workspace with shared AI assistants, PDF uploads, workspace roles, and cited answers.",
    year: "2026",
    discipline: "FULL STACK / DOCUMENT AI",
    status: "Prototype / learning project",
    previewVisual: "rag",
    accent: { background: "#C9C2B3", foreground: "#111111" },
    overview:
      "PineQuest is an earlier learning prototype for collaborative document intelligence. It focuses on the core mechanics of workspace membership, document processing, retrieval, and source-linked conversation.",
    problem:
      "Teams need a simple way to ask questions over internal documents without losing source traceability or workspace separation.",
    motivation:
      "I built it to understand multi-tenant RAG architecture, document processing, role-based access, and collaborative AI workflows.",
    solution:
      "A shared workspace groups PDFs, members, conversations, and retrieved sources. Each answer presents document references so the result can be checked rather than taken on trust.",
    features: [
      "Workspace creation and member roles",
      "PDF upload and processing states",
      "Shared AI assistant conversations",
      "Cited answers with source references",
      "Tenant-aware document and chat queries",
    ],
    technicalApproach: [
      {
        title: "Workspace model",
        text: "Membership records define access while every resource remains connected to a workspace identifier.",
      },
      {
        title: "Document pipeline",
        text: "PDF text is extracted, chunked, embedded, and connected back to its source metadata.",
      },
      {
        title: "Conversation",
        text: "Queries retrieve workspace-scoped context before a cited response is persisted to the thread.",
      },
      {
        title: "Learning loop",
        text: "The prototype makes architectural boundaries visible so they can be evaluated before deeper abstraction.",
      },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Node / Bun",
      "PostgreSQL",
      "Prisma",
      "Supabase",
      "Gemini",
      "RAG",
    ],
    role: "Full-stack engineering and product exploration",
    challenges: [
      "Preventing cross-workspace retrieval at every layer",
      "Keeping processing feedback clear during long document operations",
      "Balancing a reusable RAG pipeline with a small prototype scope",
    ],
    lessons: [
      "Multi-tenancy must shape the data model from the first migration.",
      "Visible source context makes AI features more useful and debuggable.",
      "Prototypes are strongest when they answer one architectural question at a time.",
    ],
    nextSteps: [
      "Consolidate the strongest ideas into KnowSpace AI",
      "Add retrieval evaluation fixtures",
      "Refine role and document-lifecycle behavior",
    ],
    repositoryUrl: null,
    liveUrl: null,
  },
] as const satisfies readonly Project[];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
