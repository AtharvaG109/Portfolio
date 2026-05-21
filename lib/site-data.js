function normalizeBasePath(value) {
  if (!value || value === "/") {
    return "";
  }

  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash.slice(0, -1) : withLeadingSlash;
}

function normalizeSiteUrl(value) {
  if (!value) {
    return "http://localhost:3000";
  }

  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function stripBasePathPrefix(path) {
  if (!basePath || !path) {
    return path;
  }

  if (path === basePath) {
    return "/";
  }

  if (path.startsWith(`${basePath}/`)) {
    return path.slice(basePath.length);
  }

  return path;
}

function getDefaultSiteUrl() {
  const [owner = "", repo = ""] = (process.env.GITHUB_REPOSITORY ?? "").split("/");

  if (owner && repo) {
    if (repo === `${owner}.github.io`) {
      return `https://${owner}.github.io`;
    }

    return `https://${owner}.github.io/${repo}`;
  }

  return "http://localhost:3000";
}

const contactEmail = "atharvam10@icloud.com";
const contactFormEndpoint =
  process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT || `https://formsubmit.co/ajax/${contactEmail}`;

export const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

export function withBasePath(path) {
  if (
    !path ||
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:") ||
    path.startsWith("#")
  ) {
    return path;
  }

  if (!path.startsWith("/")) {
    return path;
  }

  if (!basePath) {
    return path;
  }

  if (path === "/") {
    return `${basePath}/`;
  }

  return `${basePath}${path}`;
}

export function buildAbsoluteUrl(path = "/") {
  if (!path) {
    return siteConfig.siteUrl;
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalizedPath = stripBasePathPrefix(path);
  const siteUrl = siteConfig.siteUrl.endsWith("/")
    ? siteConfig.siteUrl.slice(0, -1)
    : siteConfig.siteUrl;

  if (normalizedPath === "/") {
    return `${siteUrl}/`;
  }

  if (normalizedPath.startsWith("/")) {
    return `${siteUrl}${normalizedPath}`;
  }

  return `${siteUrl}/${normalizedPath}`;
}

export function createBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: buildAbsoluteUrl(item.path)
    }))
  };
}

export function formatPublishedDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  }).format(date);
}

export const siteConfig = {
  name: "Atharva Gham",
  shortName: "Atharva Gham",
  initials: "AG",
  title: "Backend · Platform · Security",
  location: "San Francisco, California",
  contactFormEndpoint,
  github: "https://github.com/AtharvaG109",
  linkedin: "https://www.linkedin.com/in/avg1048",
  publication: "https://www.ijraset.com/research-paper/neonatal-screening-application",
  description:
    "Portfolio page for Atharva Gham, a backend, platform, and security engineer focused on reliable systems, debugging depth, and production-minded engineering.",
  availability:
    "Open to backend, platform, software, and security engineering roles where technical ownership, debugging depth, and operational discipline matter.",
  lastUpdated: "2026-05-21",
  keywords: [
    "backend engineer",
    "platform engineer",
    "security engineer",
    "software engineer",
    "network detection",
    "application security",
    "LLM security",
    "AI security",
    "observability",
    "C compiler",
    "self-hosting compiler",
    "Rust",
    "Python",
    "Go"
  ],
  siteUrl: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || getDefaultSiteUrl()),
  sameAs: [
    "https://www.linkedin.com/in/avg1048",
    "https://github.com/AtharvaG109",
    "https://www.ijraset.com/research-paper/neonatal-screening-application"
  ]
};

export const hero = {
  eyebrow: "Atharva Gham · Backend · Platform · Security",
  headline:
    "I am a backend, platform, and security engineer who likes hard systems problems.",
  summary:
    "I work on APIs, distributed services, observability, production debugging, and security automation. The kind of work I enjoy most is the work that has to hold up after launch, not just look good in a demo.",
  mission:
    "Build systems that stay clear, reliable, and useful once real traffic and failure modes show up.",
  focus: [
    "Backend services, APIs, and event-driven systems in Go, Python, and Rust",
    "Observability and debugging workflows that shorten time from symptom to root cause",
    "Security tooling that fits into real engineering workflows instead of becoming process theater",
    "Documentation, rollout safety, and operational habits that make systems easier to trust"
  ],
  actions: [
    { label: "View projects", href: "/projects/", variant: "primary" },
    { label: "Start a conversation", href: "/contact/", variant: "secondary" }
  ],
  utilityLinks: [
    { label: "Current focus", value: "Backend, platform, software, and security engineering roles", href: "/experience/" },
    { label: "Recent work", value: "LLM RedTeam Framework, SecureRAG EvalOps, uProxy, tinyc, Enterprise NIDS, Patchbot, Sysguard, and systems security projects", href: "/projects/" },
    { label: "Contact", value: "Private intake for roles, projects, and technical conversations", href: "/contact/" }
  ]
};

export const curiosityTrails = [
  {
    id: "systems",
    eyebrow: "Start with",
    title: "Why do I keep going below the surface?",
    hook:
      "Because the interesting answer is often hiding one layer below the first symptom.",
    answer:
      "That is why my work keeps drifting toward compilers, networking, observability, and runtime behavior. I like systems that make me prove what is actually happening.",
    clues: ["traces", "packet flow", "binary behavior"],
    signal: "Best next stop if you like low-level reasoning",
    href: "/workbench/",
    linkLabel: "Open the workbench"
  },
  {
    id: "security",
    eyebrow: "Notice",
    title: "Why does security show up in so many different projects?",
    hook:
      "Because I am interested in controls that survive contact with real engineering work.",
    answer:
      "The through-line is not one tool. It is making risk legible: guarded retrieval, evidence-safe DFIR, appsec workflows, IAM controls, and runtime policy.",
    clues: ["guardrails", "evidence", "permissions"],
    signal: "Best next stop if you care about practical security",
    href: "/projects/",
    linkLabel: "Browse security projects"
  },
  {
    id: "debugging",
    eyebrow: "Ask",
    title: "What do I do when the obvious answer is wrong?",
    hook:
      "I slow down, collect better evidence, and keep pulling the thread.",
    answer:
      "That habit shows up everywhere: packet investigations, compiler bootstrap checks, crash analysis, diff engines, and the way I document tradeoffs instead of hiding them.",
    clues: ["reproduce", "instrument", "explain"],
    signal: "Best next stop if you want to see how I think",
    href: "/about/",
    linkLabel: "Read how I work"
  },
  {
    id: "product",
    eyebrow: "Follow",
    title: "Why do the projects feel unusually finished?",
    hook:
      "Because I care about the part after the first demo: proof, rollout, and the operator experience.",
    answer:
      "I like turning a technically interesting build into something another engineer can inspect, run, trust, and extend. That usually means docs, CI, failure modes, and a clear public story.",
    clues: ["proof", "release gates", "operator empathy"],
    signal: "Best next stop if you care about ownership",
    href: "/projects/",
    linkLabel: "See the case studies"
  }
];

export const contactConfig = {
  intro:
    "I do not publish a direct phone number on the open web. If you are reaching out about a role, project, or collaboration, send the context here and I will follow up directly.",
  deliveryNote: "Messages are delivered privately to my inbox.",
  replyWindow: "Usually replies within 24 to 48 hours.",
  phonePolicy: "Direct phone details are shared once there is enough context for a useful call.",
  privacyNote:
    "Include the team, role, timeline, or project scope. That keeps outreach focused and lets me respond with the right context while keeping direct contact details private."
};

export const pathwayCards = [
  {
    title: "About",
    href: "/about/",
    eyebrow: "Profile",
    body: "Who I am, how I work, and the kind of engineering problems I want to keep solving.",
    signal: "Profile, values, and focus areas"
  },
  {
    title: "Experience",
    href: "/experience/",
    eyebrow: "Career",
    body: "Roles, measurable outcomes, and the supporting credentials behind the engineering work.",
    signal: "Work history and credentials"
  },
  {
    title: "Projects",
    href: "/projects/",
    eyebrow: "Case studies",
    body: "Case studies across backend systems, security tooling, low-level research, and applied product work.",
    signal: "Project gallery and deep dives"
  },
  {
    title: "Workbench",
    href: "/workbench/",
    eyebrow: "Research and practice",
    body: "Hands-on systems and security study distilled into patterns, workflows, and practical takeaways.",
    signal: "Research, workflows, and technical depth"
  },
  {
    title: "Writing",
    href: "/blog/",
    eyebrow: "Field notes",
    body: "Technical notes on observability, AI security, low-level debugging, and the engineering decisions behind shipped work.",
    signal: "Systems and security writing"
  },
  {
    title: "Resume",
    href: "/resume/",
    eyebrow: "Snapshot",
    body: "A concise summary for fast technical review.",
    signal: "Downloadable summary"
  },
  {
    title: "Contact",
    href: "/contact/",
    eyebrow: "Reach out",
    body: "Private contact request flow for role discussions, collaborations, and technical conversations.",
    signal: "Private outreach and next steps"
  }
];

export const stats = [
  {
    value: "OTel-first",
    label: "Tracing, metrics, and logs designed into service workflows"
  },
  {
    value: "1,000+",
    label: "Security alerts enriched and triaged through automation"
  },
  {
    value: "13+",
    label: "Services and infrastructure components monitored in production"
  },
  {
    value: "20%",
    label: "Reduction in manual security and operations toil"
  }
];

export const roleFitCards = [
  {
    title: "Backend and Platform Engineering",
    body:
      "Services, APIs, event-driven workflows, deployment safety, and production debugging across Go, Python, Linux, and cloud infrastructure.",
    signal: "Best fit: backend, platform, infrastructure, and reliability-focused software roles."
  },
  {
    title: "Security Engineering",
    body:
      "Security automation, detection logic, application-security guardrails, IAM workflows, and secure CI/CD controls that engineering teams can maintain.",
    signal: "Best fit: product security, AppSec, detection engineering, and security tooling roles."
  },
  {
    title: "AI and Agentic Security",
    body:
      "Threat modeling for LLM-enabled tools, prompt-injection risk, tool-use boundaries, policy gateways, and auditable automation flows.",
    signal: "Best fit: AI security, agent platform safety, and automation governance work."
  },
  {
    title: "Systems Debugging and Low-Level Analysis",
    body:
      "Runtime evidence, packet captures, Linux behavior, GDB, memory analysis, and root-cause work when the useful answer sits below the surface symptom.",
    signal: "Best fit: teams that need debugging depth, incident learning, and strong technical writing."
  }
];

export const selectedWins = [
  {
    value: "40%",
    label: "Faster identification of production bottlenecks after trace rollout"
  },
  {
    value: "1,000+ / week",
    label: "Alerts enriched automatically so analysts could focus on real incidents"
  },
  {
    value: "30%",
    label: "Faster rollouts after automating server configuration and validation"
  }
];

export const buildThemes = [
  {
    title: "Backend Services and Data Systems",
    body:
      "Concurrent services, APIs, ingestion paths, and the operational details that keep core systems predictable under load."
  },
  {
    title: "Observability and Incident Tooling",
    body:
      "Tracing, metrics, dashboards, and debugging workflows that shorten the distance from symptom to explanation."
  },
  {
    title: "Security Automation and Guardrails",
    body:
      "CI checks, policy gates, detection logic, IAM workflows, and security automation teams can keep running without constant babysitting."
  },
  {
    title: "Low-Level Research That Improves Delivery",
    body:
      "Low-level debugging, exploit analysis, and architecture writeups that sharpen engineering judgment and defensive design."
  }
];

export const engineeringSignals = [
  {
    title: "End-to-end backend ownership",
    body:
      "I stay with services beyond implementation: rollout safety, observability coverage, failure analysis, and the cleanup work that makes them dependable."
  },
  {
    title: "Security that ships with the product",
    body:
      "I turn security into running engineering controls like CI checks, policy gates, detection logic, IAM automation, and safer AI-tool boundaries."
  },
  {
    title: "Debugging from evidence",
    body:
      "When behavior gets strange, I work from traces, packets, logs, binaries, and runtime evidence instead of guessing from surface symptoms."
  }
];

export const contactProcess = [
  {
    title: "Share the context",
    body:
      "Tell me about the role, team, project, or collaboration so I can respond with the right level of detail."
  },
  {
    title: "I review it directly",
    body:
      "I use the request form to keep outreach focused and direct contact details off the public site."
  },
  {
    title: "Next step stays direct",
    body:
      "If the conversation makes sense, I follow up directly with the best next step, including phone details when useful."
  }
];

export const capabilityCards = [
  {
    title: "Systems Engineering",
    body:
      "I design concurrent services and data paths with explicit attention to latency, backpressure, rollout safety, and failure recovery."
  },
  {
    title: "Security Engineering",
    body:
      "I translate security risk into maintainable controls: policy gates, CI checks, telemetry, detection content, and remediation workflows teams can keep running."
  },
  {
    title: "Low-Level Debugging",
    body:
      "I trace crashes and unsafe states through binaries, memory layouts, allocators, syscalls, and operating-system behavior when the bug sits below the application layer."
  },
  {
    title: "Operational Rigor",
    body:
      "I use OpenTelemetry, metrics, logs, and automation to reduce mean time to explanation, not just mean time to notice."
  }
];

export const experience = [
  {
    role: "Software Engineer (Security & Systems)",
    company: "DMV Music Alliance",
    period: "January 2025 - Present",
    location: "Washington, DC",
    summary:
      "Architect and maintain distributed backend services in Go and Python, focusing on operational resilience, latency reduction, and observability.",
    highlights: [
      "Built backpressure-aware event ingestion and observability paths with queue-backed workers, retry behavior, and clear failure signals.",
      "Instrumented end-to-end OpenTelemetry tracing across microservices, reducing mean time to identify (MTTI) production bottlenecks by 40%.",
      "Automated infrastructure provisioning and security baseline enforcement using Terraform, integrating policy-as-code into CI/CD workflows."
    ],
    tags: ["Go", "Python", "OpenTelemetry", "Distributed Systems", "Terraform", "CI/CD"]
  },
  {
    role: "Backend Testing & Reliability Intern",
    company: "Code Gurukul",
    period: "June 2021 - December 2022",
    location: "Pune, India",
    summary:
      "Profiled Linux-based backend services, improved API latency, and supported release automation across staging setups.",
    highlights: [
      "Optimized Linux backend services and improved API responsiveness for 4,300+ active users by removing redundant database queries.",
      "Automated server configuration and deployment validation routines with Bash-based tooling, accelerating server rollouts by 30%.",
      "Identified and patched memory constraint issues in C++ worker processes via comprehensive crash dump analysis."
    ],
    tags: ["Linux", "Bash", "Backend APIs", "Performance", "C++"]
  }
];

const projectRecords = [
  {
    slug: "llm-redteam-framework",
    title: "LLM RedTeam Framework",
    featured: true,
    category: "AI Security",
    year: "2026",
    updatedAt: "2026-05-21",
    summary:
      "Built an enterprise LLM AppSec assessment CLI with multi-turn attack suites, canary-safe detectors, replayable evidence, CI gates, SQLite run history, and Markdown, JSON, SARIF, and JUnit reports.",
    impact:
      "Turned LLM red-team checks into a repeatable engineering workflow that can test local apps like SecureRAG without using real secrets, real PII, or hidden network calls.",
    challenge:
      "The hard part was making the tool aggressive enough to be useful while keeping it defensible: synthetic canaries only, cautious finding language, redacted transcripts, deterministic lab targets, and clear CI behavior.",
    approach: [
      "Implemented SecureRAG and OpenAI-compatible adapters with direct HTTP calls, redacted metadata, timeout handling, retries, and guardrail-aware blocked-response classification.",
      "Built an enterprise attack pack with prompt injection, system disclosure, role confusion, indirect injection, retrieval poisoning simulation, citation bypass, refusal bypass, and output exfiltration canaries.",
      "Added adaptive multi-turn execution, mutation strategies, deterministic detectors, SQLite persistence, baseline comparison, replay, plugin discovery, and report exporters for human and CI use.",
      "Hardened the project with installable packaged attack packs, strict URL and header validation, a deterministic vulnerable/hardened lab, production-readiness docs, and a release gate."
    ],
    result:
      "The framework now ships as a production-grade portfolio security tool with a public CLI, 44 passing tests, packaged attack packs, CI matrix coverage, a local lab, and a validated SecureRAG assessment path.",
    outcomes: [
      "Runs no-network demos through vulnerable and hardened lab profiles, producing reproducible Markdown, JSON, SARIF, and JUnit evidence.",
      "Stores assessment history in SQLite, supports run export and baseline comparison, and can replay attack transcripts from a saved JSON report.",
      "Tested against SecureRAG locally with 10 enterprise attacks, yielding 0 candidate successes, 1 guardrail block, 9 inconclusive results, and no canary or synthetic PII leakage."
    ],
    metrics: [
      { value: "44 tests", label: "Release gate across adapters, CLI, scoring, lab, plugins, reports, and SQLite history" },
      { value: "10 attacks", label: "Enterprise suite spanning prompt injection, disclosure, role confusion, leakage, and retrieval risks" },
      { value: "4 outputs", label: "Markdown, JSON, SARIF, and JUnit reports for humans and CI pipelines" }
    ],
    architecture: [
      "Attack packs define suites, tactics, probes, canaries, detectors, reproduction steps, policy mappings, and CI gate weights.",
      "The runner executes single-turn or adaptive multi-turn probes through explicit target adapters, then scores responses with deterministic detectors and false-positive suppression.",
      "Reports and SQLite history preserve redacted transcripts, evidence excerpts, target metadata, gate outcomes, and replayable reproduction steps."
    ],
    tradeoffs: [
      "Used direct HTTP adapters instead of LangChain so request behavior, headers, retries, and evidence are transparent.",
      "Kept all built-in attacks synthetic and canary-based rather than attempting real secret extraction or real PII leakage.",
      "Scoped the product to CLI plus serious reports before adding any dashboard, because CI and audit evidence are the core workflow."
    ],
    stack: ["Python", "Typer", "Rich", "HTTPX", "Pydantic", "SQLite", "SARIF", "Pytest"],
    media: {
      src: "/media/llm-redteam-framework.svg",
      alt: "Diagram of LLM RedTeam Framework showing attack packs, adaptive runner, detectors, and CI-ready reports."
    },
    links: [
      {
        label: "View GitHub repo",
        href: "https://github.com/AtharvaG109/llm-redteam-framework"
      }
    ]
  },
  {
    slug: "securerag-evalops",
    title: "SecureRAG EvalOps",
    featured: true,
    category: "Security Product",
    year: "2026",
    updatedAt: "2026-05-20",
    summary:
      "Built a private-deployment RAG evaluation platform with offline-first ingestion, graph-augmented retrieval, citation validation, guardrails, audit logging, and production hardening.",
    impact:
      "Turned a portfolio RAG demo into an operator-friendly system that can ingest real documents, answer with citations, expose guardrail telemetry, and run without an external AI API key.",
    challenge:
      "The difficult part was keeping the system useful offline while preserving the security properties expected from a production-facing RAG workflow: namespace isolation, fail-closed citations, prompt-injection handling, and auditable destructive actions.",
    approach: [
      "Implemented structure-aware ingestion for text, PDF, JSON, and source-code files with local embeddings, Qdrant storage, and hybrid lexical plus vector retrieval.",
      "Added deterministic graph memory that extracts entities, mentions, and document-backed relations into Postgres, then blends graph evidence into retrieval without adding another service.",
      "Kept the query path explicit: authorization, pre-query guardrails, retrieval, indirect-injection scan, generation, citation validation, and PII redaction.",
      "Added API-key authentication, audit events, preview-first bulk deletion, readiness checks, pinned deployment config, and a browser dashboard for operators."
    ],
    result:
      "SecureRAG EvalOps now ships as a public portfolio release and internal-production baseline with graph memory, a full quality gate, reproducible migrations, local demo corpus, web UI, and deployment guidance.",
    outcomes: [
      "Works offline by default with deterministic embeddings and extractive answers, while allowing stronger local-model integrations later.",
      "Supports document collections, graph-memory exploration, retention cleanup, namespace-scoped access, metrics, traces, guardrails, and eval runs through one backend.",
      "Ships with production deployment docs, API-key bootstrap, audit logging, CI, rich eval reports, and 91 passing tests."
    ],
    metrics: [
      { value: "91 tests", label: "Full release gate across auth, retrieval, graph memory, eval reports, guardrails, and UI" },
      { value: "0 API keys", label: "Required for the default offline local workflow" },
      { value: "10-step query flow", label: "Authz through graph-aware retrieval, redaction, and fail-closed citations" }
    ],
    architecture: [
      "Documents flow through parsers, structure-aware chunking, deterministic local embeddings, Qdrant payloads scoped by namespace, and Postgres-backed graph memory.",
      "Queries pass through authorization, guardrails, vector/lexical/graph retrieval, MMR reranking, citation-grounded generation, validation, and redaction.",
      "Postgres persists metadata, graph entities and relations, evals, guardrail rows, audit events, and cost records while Redis caches query embeddings."
    ],
    tradeoffs: [
      "Defaulted to deterministic offline embeddings and extractive answers for portability instead of depending on a paid external model provider.",
      "Kept API-key auth for a private internal deployment baseline rather than expanding into a full public multi-tenant SaaS.",
      "Made deletion preview-first and audit-logged because operator safety matters more than one-click destructive convenience."
    ],
    stack: ["Python", "FastAPI", "Postgres", "Redis", "Qdrant", "SQLAlchemy", "Alembic", "Docker"],
    media: {
      src: "/media/securerag-evalops.svg",
      alt: "Diagram of SecureRAG EvalOps showing ingestion, retrieval, citation-grounded answers, audit metrics, and the guardrail dashboard."
    },
    links: [
      {
        label: "View GitHub repo",
        href: "https://github.com/AtharvaG109/secure-rag-evalops"
      }
    ]
  },
  {
    slug: "windows-dfir-timeline-diff-engine",
    title: "Windows DFIR Timeline Diff Engine",
    featured: true,
    category: "Detection",
    year: "2026",
    updatedAt: "2026-05-12",
    summary:
      "Built a Windows-first forensic timeline diff engine that compares baseline and incident endpoint artifacts, normalizes evidence into SQLite, and generates an analyst-ready attack-chain report.",
    impact:
      "Turned scattered Windows endpoint artifacts into a repeatable CLI workflow for controlled timeline comparison, detection review, and concise Markdown reporting.",
    challenge:
      "The hardest problem was designing stable event fingerprints that ignore benign timestamp and path noise while preserving meaningful behavior across baseline and incident states.",
    approach: [
      "Implemented deterministic event normalization with SHA-256 event IDs, raw artifact references, and structured actor, object, and network fields.",
      "Built category-specific diff fingerprints, YAML detection rules, and correlation logic for authentication, execution, persistence, and network activity.",
      "Kept the workflow offline and evidence-oriented, with SQLite migrations, query/export commands, verification checks, and analyst-safe report wording."
    ],
    result:
      "timeline produces a Markdown incident report showing new suspicious processes, persistence mechanisms, remote logons, network destinations, and correlated attack-chain context.",
    outcomes: [
      "Normalizes EVTX-derived records, Prefetch, AmCache, browser history, scheduled task, and targeted filesystem evidence into a SQLite case database.",
      "Compares baseline and incident databases using category fingerprints instead of raw event IDs.",
      "Ships as a technical preview CLI with demo data, rule validation, JSONL export, and Markdown report generation."
    ],
    metrics: [
      { value: "7 commands", label: "Ingest, diff, report, query, export, verify, and rules validation CLI paths" },
      { value: "SQLite", label: "Evidence store with deterministic IDs and raw artifact references" },
      { value: "Markdown", label: "Analyst-ready incident report with cited event IDs and source paths" }
    ],
    architecture: [
      "Collectors normalize supported Windows artifacts into TimelineEvent records and write through the store layer.",
      "The diff engine compares baseline and incident databases with category-specific fingerprints that collapse benign timestamp, username, GUID, and path noise.",
      "Detection, correlation, and report generation operate on stored normalized evidence without mutating source artifacts."
    ],
    tradeoffs: [
      "Uses a narrow offline CLI workflow instead of a web service so artifact handling stays local and analyst-controlled.",
      "Stores raw references rather than raw artifact blobs by default to reduce evidence duplication and preserve source traceability.",
      "Labels the project as a technical preview because parser hardening and broad real-world corpus validation are still ongoing."
    ],
    stack: ["Go", "SQLite", "Cobra", "YAML", "Windows Event Logs"],
    media: {
      src: "/media/windows-dfir-timeline-diff-engine.svg",
      alt: "Diagram showing Windows artifacts flowing into a SQLite evidence database, then through diff, detection, correlation, and Markdown report stages."
    },
    links: [
      {
        label: "View GitHub repo",
        href: "https://github.com/AtharvaG109/timeline"
      }
    ]
  },
  {
    slug: "tinyc-c99-compiler",
    title: "tinyc: Self-Hosting C99 Compiler",
    featured: true,
    category: "Systems",
    year: "2026",
    updatedAt: "2026-05-06",
    summary:
      "Built a production-ready from-scratch C compiler with a practical C99 frontend, x86-64 code generation, aggregate ABI coverage, integration tests, and deterministic self-hosting validation.",
    impact:
      "Turned a small compiler into a public, testable systems project by making the language slice explicit, wiring the Makefile workflow, and proving the compiler can rebuild itself under a bundled self-host environment.",
    challenge:
      "The difficult part was moving past parser-level progress into end-to-end compiler behavior: structs, arrays, initialization, function calls, ABI edge cases, and self-hosting all had to agree across frontend, IR, codegen, and tests.",
    approach: [
      "Implemented a complete source-to-assembly pipeline with lexer, Pratt parser, semantic analysis, TAC IR, stack-slot allocation, and AT&T-syntax x86-64 output.",
      "Added focused integration and ABI tests that compile programs, assemble them, link them with the platform toolchain, and execute the resulting binaries.",
      "Built a self-host workflow with bundled headers, deterministic macOS linking, and stage1-to-stage2 comparison for reproducible release validation."
    ],
    result:
      "tinyc now ships as a production-ready compiler project with documentation, CI release gates, public tests, sanitizer validation, a security policy, and a verified self-host target.",
    outcomes: [
      "Compiles and runs unit, integration, ABI, and self-hosting test suites through Makefile targets.",
      "Supports a practical C99 subset including functions, pointers, arrays, structs, unions, aggregate initialization, designators, simple bit-fields, and variadic calls.",
      "Verifies deterministic self-hosting on macOS when linker UUID metadata is disabled."
    ],
    metrics: [
      { value: "21 runtime tests", label: "Integration and ABI programs compiled, linked, and executed" },
      { value: "stage1 == stage2", label: "Deterministic self-host comparison with no UUID metadata" },
      { value: "C11 codebase", label: "Compiler implementation with a practical C99 language subset" }
    ],
    architecture: [
      "The frontend tokenizes source, parses declarations and expressions, checks the practical C99 type subset, and lowers statements into TAC IR.",
      "The backend assigns stack slots, emits x86-64 AT&T assembly, handles scalar and aggregate calls, and covers small and memory-class struct return paths.",
      "The validation workflow builds emitted assembly with the platform assembler/linker, runs produced binaries, and exercises self-hosting through preprocessed compiler sources."
    ],
    tradeoffs: [
      "Kept the release bounded to a practical C99 slice and made the validated language and ABI surface explicit.",
      "Used Makefile-first workflows because the project only needs cc, make, as, and the platform linker for the public validation path.",
      "Promoted release readiness through lint, full tests, sanitizer checks, self-host comparison, SECURITY.md, and a production review artifact."
    ],
    stack: ["C", "C99", "x86-64", "System V ABI", "Make", "Assembly", "GitHub Actions"],
    media: {
      src: "/media/tinyc-c99-compiler.svg",
      alt: "Diagram of tinyc showing C source flowing through lexer, parser, semantic analysis, IR, x86-64 codegen, validation, ABI tests, and self-hosting stages."
    },
    links: [
      {
        label: "View GitHub repo",
        href: "https://github.com/AtharvaG109/tinyc-c99-compiler"
      }
    ]
  },
  {
    slug: "uproxy-cxx-reverse-proxy",
    title: "uProxy: C++ HTTP/2 Reverse Proxy",
    featured: true,
    category: "Systems",
    year: "2026",
    updatedAt: "2026-05-07",
    summary:
      "Built a C++20 reverse-proxy foundation with platform-specific event loops, strict HTTP parsing, HTTP/2 framing tests, HPACK handling, upstream selection, and a validated cleartext forwarding path.",
    impact:
      "Turned a networking prototype into a public systems project with documented release blockers, repeatable local gates, protocol regression tests, and a clear validated traffic path.",
    challenge:
      "The hardest problems were getting cross-platform edge-triggered event delivery correct, preserving non-blocking TLS application data after handshake, and translating HTTP/2 streams with pseudo-headers and request bodies to HTTP/1.1 upstream requests.",
    approach: [
      "Designed a platform-abstract event loop with separate kqueue and epoll backends, using per-fd filter tracking on macOS and explicit fd delivery on Linux.",
      "Implemented strict HTTP/1.1 parsing, HTTP/2 frame coverage, HPACK table behavior, upstream selection, structured logs, and clear error paths for unsupported request bodies.",
      "Integrated BoringSSL memory BIOs into the application read/write path with pending-ciphertext buffering for partial socket writes."
    ],
    result:
      "uProxy now ships with tracked public headers, clean formatting gates, passing Makefile and CMake tests, sanitizer/release build coverage, and repaired GitHub Actions paths for the public repository.",
    outcomes: [
      "Validated cleartext HTTP/1.1 client traffic forwarded to an HTTP/1.1 upstream.",
      "Documents TLS, HPACK Huffman, full HTTP/2 stream-state handling, and pooled upstream reuse as release blockers.",
      "Includes connection-pool, event-loop, parser, and protocol regression coverage without overstating production readiness."
    ],
    metrics: [
      { value: "cleartext path", label: "Validated HTTP/1.1 forwarding workflow" },
      { value: "14 headers", label: "Public include surface now tracked in the GitHub repository" },
      { value: "release blockers", label: "TLS, HPACK Huffman, full H2 state, and pooled reuse documented" }
    ],
    architecture: [
      "The event loop abstracts kqueue (macOS) and epoll (Linux) behind a unified interface with edge-triggered semantics and one-shot timers.",
      "TLS termination uses BoringSSL memory BIOs for non-blocking handshake plus decrypted application reads and encrypted response writes integrated into the event loop.",
      "HTTP/2 frames are parsed, streams are managed with a state machine, and requests are translated to HTTP/1.1 for upstream forwarding with hop-by-hop header removal."
    ],
    tradeoffs: [
      "Kept production claims conservative until TLS, HPACK Huffman, complete HTTP/2 stream handling, and pooled reuse are all validated end to end.",
      "Used individual kqueue filter changes instead of batched changelist submissions after discovering macOS silently drops registrations on partial failures.",
      "Rejects unsupported chunked HTTP/1.1 request bodies with a clear 501 response instead of forwarding ambiguous body state."
    ],
    stack: ["C++20", "BoringSSL", "kqueue", "epoll", "HTTP/2", "HPACK", "CMake", "Ninja"],
    media: {
      src: "/media/distributed-pipeline.svg",
      alt: "Diagram showing client connections flowing through TLS termination, HTTP/2 framing, load balancer, and connection pool to upstream HTTP/1.1 servers."
    },
    links: [
      {
        label: "View GitHub repo",
        href: "https://github.com/AtharvaG109/uproxy"
      }
    ]
  },
  {
    slug: "enterprise-nids-network-detection-platform",
    title: "Enterprise NIDS: Network Detection and Analysis Platform",
    featured: true,
    category: "Security Product",
    year: "2026",
    updatedAt: "2026-04-20",
    summary:
      "Built a Python-based network detection platform that supports offline PCAP investigation, live traffic capture, explainable incident reporting, and a FastAPI dashboard with operational telemetry.",
    impact:
      "Turned packet analysis into a product-shaped workflow by combining capture, detection, visualization, reporting, and runtime health into one system that is easier to demo, investigate, and operate.",
    challenge:
      "The hard part was making low-level network analysis readable and operationally useful at the same time. Raw packets and flows are not enough on their own, so the platform had to connect capture, detection, diagrams, reports, and runtime visibility without becoming a pile of disconnected scripts.",
    approach: [
      "Built dual execution paths for offline PCAP analysis and continuous live capture so the same platform supports investigations and near-real-time monitoring.",
      "Layered deterministic detections, fingerprinting, anomaly scoring, deep packet inspection, and project-aware traffic context into one analysis pipeline.",
      "Added Mermaid-based traffic diagrams, markdown and JSON report generation, SQLite-backed telemetry, and a FastAPI dashboard to make results explainable to both engineers and non-specialists."
    ],
    result:
      "Enterprise NIDS now works as an end-to-end detection and analysis platform with capture workflows, report artifacts, a browser dashboard, CI coverage, and GitHub-ready documentation including a rendered architecture diagram.",
    outcomes: [
      "Supports live packet capture and offline PCAP replay in one codebase.",
      "Produces explainable incident reports, anomaly stories, protocol inventories, and Mermaid sequence and flow diagrams.",
      "Exposes runtime health, IPS activity, DPI carve history, and recent operations through a dashboard and API layer."
    ],
    metrics: [
      { value: "2 analysis modes", label: "Offline PCAP and live capture workflows" },
      { value: "FastAPI + UI", label: "Dashboard, APIs, and report access" },
      { value: "GitHub-ready", label: "CI, docs, and rendered architecture diagram" }
    ],
    architecture: [
      "Packet ingestion flows through parser backends, flow tracking, and TCP stream reconstruction before detections and enrichments are applied.",
      "Detection layers combine heuristics, JA3 and p0f fingerprinting, anomaly scoring, DPI carving, and project-context enrichment to generate readable findings.",
      "Output surfaces include SQLite telemetry, markdown and JSON forensic artifacts, Mermaid diagrams, and a FastAPI dashboard that exposes health, alerts, and analysis state."
    ],
    tradeoffs: [
      "Accepted a broader platform scope because the useful version of the project needed capture, explanation, and runtime visibility together, not just packet parsing.",
      "Kept the dashboard grounded in generated artifacts and local telemetry rather than pretending the project is already a cloud-scale SIEM.",
      "Used Mermaid for architecture and traffic visualization because GitHub-native rendering made the project easier to publish and explain."
    ],
    stack: ["Python", "FastAPI", "SQLite", "Scapy", "DPKT", "Mermaid", "GitHub Actions"],
    media: {
      src: "/media/enterprise-nids-platform.svg",
      alt: "Diagram of Enterprise NIDS showing packet ingestion, detection and enrichment engines, report generation, telemetry storage, and a FastAPI dashboard."
    },
    links: [
      {
        label: "View GitHub repo",
        href: "https://github.com/AtharvaG109/enterprise-nids"
      }
    ]
  },
  {
    slug: "patchbot-security-platform",
    title: "Patchbot Security Platform",
    featured: true,
    category: "Security Product",
    year: "2026",
    updatedAt: "2026-04-15",
    summary:
      "Engineered an enterprise-grade security platform featuring autonomous attack emulation (IAST) and high-entropy secret detection.",
    impact:
      "Evolved a baseline security scanner into an enterprise-ready tool by implementing Playwright-backed exploit confirmation and robust statistical secret detection, reducing false positives and accelerating remediation.",
    challenge:
      "The core challenge was building reliable headless browser interactions for IAST and processing codebase metrics to ensure accurate high-entropy secret detection without overwhelming developers with noise.",
    approach: [
      "Integrated Playwright for headless browser-based exploit confirmation to achieve Autonomous Attack Emulation (IAST).",
      "Implemented High-Entropy Secret Detection using statistical analysis to intelligently identify and prevent sensitive data leaks.",
      "Engineered multi-tenant data isolation and SQLCipher encryption-at-rest for enterprise data security."
    ],
    result:
      "Deployed a production-ready security platform capable of authenticating web scans and proactively securing codebases with stringent data isolation.",
    outcomes: [
      "Autonomous attack emulation with dynamic headless browser interactions.",
      "Proactive discovery and suppression of high-entropy secrets.",
      "Enterprise-grade security controls including multi-tenant isolation and encryption-at-rest."
    ],
    metrics: [
      { value: "IAST", label: "Autonomous Attack Emulation" },
      { value: "High-Entropy", label: "Statistical Secret Detection" },
      { value: "Enterprise", label: "Data isolation and encryption" }
    ],
    architecture: [
      "Headless Chromium session injection via Playwright confirms vulnerabilities actively during the web scanning phase.",
      "A heuristic engine analyzes commit data using statistical entropy models to detect hardcoded secrets.",
      "Data layer isolated through org_repo namespaces and encrypted at rest using SQLCipher."
    ],
    tradeoffs: [
      "Accepted higher resource allocation for Playwright integration to achieve higher confidence attack confirmation.",
      "Tuned secret detection thresholds to prioritize high-entropy strings, balancing detection rate with developer fatigue.",
      "Invested in robust namespace isolation over simple access controls to ensure strict multi-tenant compliance."
    ],
    stack: ["Python", "Playwright", "Heuristics", "SQLCipher", "GitHub Integrations"],
    media: {
      src: "/media/patchbot-platform.svg",
      alt: "Diagram of Patchbot Security Platform showing attack emulation, secret detection, and encrypted multi-tenant storage."
    },
    links: [
      {
        label: "View GitHub repo",
        href: "https://github.com/AtharvaG109/patchbot"
      }
    ]
  },
  {
    slug: "sysguard-ebpf-linux-activity-monitor",
    title: "Sysguard: eBPF Linux Activity Monitor",
    category: "Systems",
    year: "2026",
    updatedAt: "2026-04-09",
    summary:
      "Built a public Rust and eBPF prototype that monitors Linux process, file, and network activity with YAML policy rules and outbound connect enforcement.",
    impact:
      "Turned low-level Linux tracing into a repo-ready security tool that classifies runtime activity as ALLOW, LOG, ALERT, or BLOCK without pretending the enforcement surface is broader than it is today.",
    challenge:
      "The real challenge was building a useful security monitor while staying precise about scope: Linux-first tracing, a userspace policy engine, and intentionally narrow kernel blocking instead of vague claims about full host prevention.",
    approach: [
      "Implemented Linux tracing for execve, openat, and connect events with eBPF programs that stream structured activity into userspace.",
      "Built an async Rust policy engine that loads YAML rules, suppresses noisy system events, deduplicates repeats, and emits readable or JSON output.",
      "Added a first enforcement path for outbound IPv4 connect rules through a cgroup connect4 hook so blocking behavior is explicit and testable."
    ],
    result:
      "Sysguard shipped as a public prototype with a clear Linux VM workflow, sample policies, helper scripts, and an enforceable outbound-connect path that makes the project useful for hands-on systems and security experimentation.",
    outcomes: [
      "Traces process launches, file opens, and outbound network connects on Linux through eBPF instrumentation.",
      "Applies YAML policies to classify activity as ALLOW, LOG, ALERT, or BLOCK with optional machine-readable JSON output.",
      "Supports kernel-level blocking for a subset of exact IPv4 connect rules through optional cgroup enforcement."
    ],
    metrics: [
      { value: "3 event types", label: "execve, openat, and connect coverage" },
      { value: "4 actions", label: "ALLOW, LOG, ALERT, BLOCK policy outcomes" },
      { value: "Linux-first", label: "Prototype tested in Ubuntu VM workflows" }
    ],
    architecture: [
      "Kernel-space eBPF programs hook Linux tracepoints, parse syscall arguments, and stream structured events through a RingBuffer.",
      "An async Rust userspace processor matches incoming events against YAML rules and emits classified outputs with noise suppression and deduplication.",
      "Optional cgroup-based connect4 enforcement handles a narrow set of outbound IPv4 block rules so monitoring and enforcement stay clearly separated."
    ],
    tradeoffs: [
      "Kept platform support honest by treating Linux as the primary target and macOS as a fallback process-polling path for development only.",
      "Limited kernel blocking to a subset of outbound connect rules instead of overstating enforcement for execve and openat.",
      "Invested in helper scripts, sample policies, and readable output so the prototype is easier to build, test, and explain from a fresh VM."
    ],
    stack: ["Rust", "eBPF", "Aya", "Linux", "Tokio", "YAML Policy Engine"],
    media: {
      src: "/media/sysguard-ebpf-monitor.svg",
      alt: "Diagram of Sysguard showing Linux tracepoints, a Rust policy engine, YAML rules, and outbound connect enforcement."
    },
    links: [
      {
        label: "View GitHub repo",
        href: "https://github.com/AtharvaG109/sysguard"
      }
    ]
  },
  {
    slug: "spectrefs-encrypted-vault-filesystem",
    title: "SpectreFS: Encrypted Vault Filesystem and Desktop App",
    featured: true,
    category: "Security Product",
    year: "2026",
    updatedAt: "2026-04-08",
    summary:
      "Built an encrypted overlay filesystem and macOS desktop app that keeps files encrypted at rest, exposes plaintext only to trusted apps, and includes repair, audit, and release workflows.",
    impact:
      "Turned a local encryption tool into a product-shaped system with chunk-authenticated storage, process-based access control, native app flows, and packaging automation instead of stopping at a command-line prototype.",
    challenge:
      "The hard part was making security and usability coexist: random-access encrypted IO, Finder-compatible metadata, trusted-app enforcement, recovery flows, and macOS distribution constraints all had to work together without hand-waving the tradeoffs.",
    approach: [
      "Designed the vault runtime around transparent encryption at rest, authenticated chunk records, encrypted metadata sidecars, and filename protection so normal file workflows still behave predictably.",
      "Built `spectrefsctl` maintenance and in-place flows for vault creation, password rotation, health checks, repair, snapshots, and interrupted-work recovery.",
      "Expanded the project into a native macOS desktop wrapper and release path with signed direct distribution, notarization support, and a separate no-FUSE mode for sandbox-oriented packaging."
    ],
    result:
      "SpectreFS now operates as a multi-surface security product: encrypted mounted vaults for direct distribution, a native desktop experience for day-to-day use, and an in-place protection path that moves the codebase closer to sandbox-compatible packaging.",
    outcomes: [
      "Encrypts file contents, filenames, extended attributes, and Finder-style metadata instead of leaking filesystem context in plaintext.",
      "Restricts plaintext reads through Process-Based Access Control so trusted macOS apps can be allowed while blocked access attempts are audited.",
      "Includes vault health, repair, snapshot, native QA, and release-gate workflows that make the product easier to operate and safer to ship."
    ],
    metrics: [
      { value: "Per-chunk AEAD", label: "Random-access authenticated encryption" },
      { value: "PBAC", label: "Trusted-app plaintext access control" },
      { value: "10-step gate", label: "Release pipeline across tests, QA, and app build" }
    ],
    architecture: [
      "Encrypted vault data lives on disk while a mounted or in-place workflow exposes plaintext only at the interaction boundary needed by trusted apps.",
      "Crypto and key-management layers use Argon2id-derived credentials, wrapped master keys, and authenticated chunk records to protect both contents and metadata sidecars.",
      "Operational tooling spans `spectrefs`, `spectrefsctl`, native SwiftUI screens, local audit/history data, and release scripts for packaging, signing, notarization, and regression checks."
    ],
    tradeoffs: [
      "Accepted the complexity of a split architecture because a usable desktop security product needed mount logic, repair tooling, UI flows, and distribution automation, not just encryption primitives.",
      "Kept direct signed-and-notarized distribution as the primary shipping path while building a separate no-FUSE mode for App Store-oriented constraints instead of pretending the FUSE workflow was sandbox-friendly.",
      "Used trusted-app rules and audit logging to reduce plaintext exposure, knowing that app identity handling on macOS needs careful fallbacks and explicit operator review."
    ],
    stack: ["C++", "SwiftUI", "OpenSSL", "FUSE", "Argon2id", "macOS Security"],
    media: {
      src: "/media/spectrefs-vault-system.svg",
      alt: "Diagram of SpectreFS showing an encrypted vault, mounted plaintext view, trusted-app access control, and native desktop tooling."
    }
  },
  {
    slug: "event-ingestion-and-observability-pipeline",
    title: "Event Ingestion and Observability Pipeline",
    category: "Systems",
    year: "2025",
    summary:
      "Designed and implemented a concurrent event-ingestion pipeline with queue-backed workers, secure transport, and runtime visibility across distributed cloud environments.",
    impact:
      "Owned the project from architecture through production rollout, tuning compute, retry, and transport behavior for fault-tolerant, low-latency streaming.",
    challenge:
      "The problem was to keep distributed ingestion predictable under bursty traffic without letting coordination overhead, transport cost, or failure recovery dominate throughput.",
    approach: [
      "Designed the ingestion path around concurrent workers, explicit backpressure, resilient queueing, and low-friction transformation stages.",
      "Tuned compute allocation, transport behavior, and security layers such as TLS and IPsec to preserve throughput without losing reliability.",
      "Handled design, production rollout, and operational hardening end to end rather than handing off the difficult parts after implementation."
    ],
    result:
      "The system reached production as a resilient ingestion path with observable queue health, worker balance, retry behavior, and failure-tolerant service boundaries.",
    outcomes: [
      "Processed distributed event workloads through queue-backed workers with clear backpressure and retry behavior.",
      "Applied low-level tuning around TLS, IPsec, and ingestion logic to keep the pipeline resilient under load."
    ],
    metrics: [
      { value: "Backpressure-aware", label: "Queueing, retry, and worker isolation" },
      { value: "End-to-end", label: "Ownership from design through rollout" },
      { value: "Observable", label: "Runtime health, backlog, and failure signals" }
    ],
    architecture: [
      "Edge collectors forward telemetry into a resilient ingestion layer backed by explicit queueing and retry behavior.",
      "Concurrent worker stages normalize, enrich, and route data without letting coordination overhead become the throughput bottleneck.",
      "Storage and observability layers stay close to the runtime path so backlog growth, transport errors, and worker imbalance are visible early."
    ],
    tradeoffs: [
      "Chose explicit queues and worker coordination to make backpressure controllable instead of hiding it behind implicit buffering.",
      "Spent time tuning transport and security layers because TLS and IPsec settings were part of the latency budget, not an afterthought.",
      "Optimized for operational clarity as much as raw throughput so on-call debugging stayed possible once the system was live."
    ],
    stack: ["Go", "Python", "OpenTelemetry", "Queue Workers", "TLS", "IPsec", "Cloud Architecture"],
    media: {
      src: "/media/distributed-pipeline.svg",
      alt: "Technical diagram of a distributed telemetry pipeline with edge collectors, queueing, concurrent workers, storage, and observability notes."
    }
  },
  {
    slug: "neonatal-screening-application-publication",
    title: "Neonatal Screening Application (Published Research Paper)",
    category: "Publication",
    year: "2023",
    summary:
      "Published a research paper on a neonatal screening application focused on practical detection workflows and early-response usability.",
    impact:
      "Converted coursework and implementation findings into a publishable technical paper with an explicit emphasis on healthcare-impactful software design.",
    challenge:
      "The core challenge was balancing technical implementation detail with a clinically relevant workflow so the system remained both defensible and practical.",
    approach: [
      "Designed the application flow around screening-path clarity, risk signaling, and implementation decisions that can be explained to non-specialist stakeholders.",
      "Documented architecture, process decisions, and validation logic to ensure the research output was reproducible and reviewable.",
      "Translated implementation lessons into publication-grade narrative and structured findings."
    ],
    result:
      "The work was published and now serves as a concrete example of end-to-end delivery: from problem framing and implementation to written technical communication.",
    outcomes: [
      "Published at IJRASET as a formal research paper.",
      "Demonstrated product-minded security and systems thinking in a healthcare-oriented domain."
    ],
    metrics: [
      { value: "Published", label: "Research outcome" },
      { value: "Healthcare", label: "Domain and workflow framing" },
      { value: "End-to-end", label: "Research, design, and communication" }
    ],
    architecture: [
      "Mapped the screening journey as a sequence of clear decision points so clinicians and non-specialists could understand what the system was doing.",
      "Structured data flow and validation around risk signaling, usability, and explainable application logic rather than academic abstraction alone.",
      "Connected implementation choices to documentation and findings so the output could stand as both a system concept and a publishable artifact."
    ],
    tradeoffs: [
      "Balanced technical depth with readability because the audience included reviewers and domain stakeholders, not just engineers.",
      "Prioritized explainability and workflow clarity over unnecessary complexity in the application model.",
      "Treated the publication itself as a delivery artifact, which meant architecture, validation, and writing all had to reinforce each other."
    ],
    stack: ["Research Writing", "Application Design", "Healthcare Workflow", "Analysis"],
    media: {
      src: "/media/neonatal-publication.svg",
      alt: "Illustration of a neonatal screening workflow publication with analysis notes, architecture summary, and outcomes."
    },
    links: [
      {
        label: "Read published paper",
        href: "https://www.ijraset.com/research-paper/neonatal-screening-application"
      }
    ]
  },
  {
    slug: "ai-security-and-agentic-workflow-automation",
    title: "AI Security and Agentic Workflow Automation",
    category: "AI Security",
    year: "2024",
    summary:
      "Performed adversarial review of LLM-enabled automation agents and built Python-based multi-agent security workflows for alert triage.",
    impact:
      "Surfaced prompt-injection and unsafe tool-use paths while improving throughput across a 1,000-plus-alert-per-day triage workload.",
    challenge:
      "The hard part was not just making automation work. It was making agentic workflows useful without leaving prompt, tool-use, and permission boundaries dangerously loose.",
    approach: [
      "Reviewed LLM-enabled agents as systems, not just models, with attention to prompt injection, unsafe retrieval, and untrusted tool invocation.",
      "Designed Python-based multi-agent workflows to automate repetitive triage and enrichment tasks in a way that reduced manual fatigue.",
      "Mapped failure paths early so the workflow could stay observable and easier to constrain."
    ],
    result:
      "The result was a security automation flow that improved triage throughput while making agent permissions, tool-use boundaries, and auditability easier to reason about.",
    outcomes: [
      "Modeled failure paths for agentic systems that interact with tools and external context.",
      "Reduced human triage load by automating repetitive detection and enrichment steps."
    ],
    metrics: [
      { value: "1,000+", label: "Alerts in repetitive triage flow" },
      { value: "Policy-first", label: "Agent permission model" },
      { value: "Auditable", label: "Tool-use and workflow reasoning" }
    ],
    architecture: [
      "Separated model reasoning, policy decisions, and tool execution so the workflow could be constrained instead of trusting the agent as a monolith.",
      "Used Python agents and enrichment steps to automate repetitive triage while preserving explicit control over inputs, permissions, and outputs.",
      "Kept logging and workflow state visible so decisions could be reconstructed during review or after failure."
    ],
    tradeoffs: [
      "Accepted some automation overhead in exchange for safer tool mediation and clearer audit trails.",
      "Focused on constrained usefulness rather than maximum autonomy because the failure modes mattered more than the demo value.",
      "Designed for human override and review instead of treating automation as a full replacement for analyst judgment."
    ],
    stack: ["Python", "LLM Security", "Automation", "Detection Engineering"],
    media: {
      src: "/media/agentic-security.svg",
      alt: "Technical threat-model diagram for an agentic security workflow showing untrusted input, policy gateway, agent runtime, tool mediation, and audit outcomes."
    }
  },
  {
    slug: "advanced-binary-research-and-exploit-development",
    title: "Advanced Binary Research and Exploit Development",
    category: "Research",
    year: "2024",
    summary:
      "Reverse engineered 32-bit and 64-bit binaries to understand memory operations, CPU behavior, and kernel interactions in vulnerable code paths.",
    impact:
      "Used GDB and dynamic analysis to trace corruption faults to root cause and authored optimized C/C++ remediations for crash conditions.",
    challenge:
      "This work centered on understanding how unsafe memory behavior actually unfolds inside binaries and how to move from a crash symptom to a defensible root cause.",
    approach: [
      "Reverse engineered binaries across 32-bit and 64-bit environments to reason about process state, allocators, and vulnerable execution paths.",
      "Used GDB and dynamic analysis to isolate corruption sources instead of stopping at surface-level exploit symptoms.",
      "Translated debugging findings into concrete C/C++ fixes that addressed the underlying crash condition."
    ],
    result:
      "The main outcome was deeper low-level fluency: exploit intuition, stronger debugging discipline, and remediation work grounded in the real behavior of binaries and operating systems.",
    outcomes: [
      "Worked directly with allocator behavior, process memory state, and OS-level primitives.",
      "Demonstrated deep debugging fluency across binaries, kernels, and crash remediation work."
    ],
    metrics: [
      { value: "32-bit + 64-bit", label: "Binary environments studied" },
      { value: "Root cause", label: "Debugging target" },
      { value: "Patch-ready", label: "Findings translated into fixes" }
    ],
    architecture: [
      "Started from process state, stack layout, and allocator behavior to understand how the vulnerable path actually unfolded at runtime.",
      "Used disassembly and dynamic debugging to connect crash symptoms back to memory operations, calling conventions, and control-flow changes.",
      "Treated remediation as part of the work so the analysis ended in safer code instead of only an exploit demonstration."
    ],
    tradeoffs: [
      "Spent more time in runtime evidence and lower-level inspection because surface-level symptoms were misleading.",
      "Used exploit intuition as a way to reason about risk, but kept the end goal defensive and remediation-oriented.",
      "Accepted slower iteration in exchange for precision when memory-corruption behavior could not be reasoned about safely from the source layer alone."
    ],
    stack: ["C/C++", "GDB", "Reverse Engineering", "Memory Analysis", "Linux"],
    media: {
      src: "/media/binary-analysis.svg",
      alt: "Binary-analysis workbench illustration showing GDB output, memory-corruption notes, and remediation flow."
    }
  },
  {
    slug: "web-vulnerability-research-and-remediation-tooling",
    title: "Web Vulnerability Research and Remediation Tooling",
    category: "Application Security",
    year: "2023",
    summary:
      "Built Python tooling to replicate and fingerprint SQL injection and XSS patterns across production-like environments.",
    impact:
      "Translated vulnerability research into secure coding guidance and CI/CD rules that eliminated injection vectors earlier in delivery.",
    challenge:
      "The goal was to move beyond one-off findings and turn web vulnerability research into repeatable checks and fixes developers could use before release.",
    approach: [
      "Built Python tooling to reproduce and fingerprint common exploit paths such as SQL injection and XSS in production-like environments.",
      "Converted research findings into Semgrep and CodeQL rules that could run continuously in delivery pipelines.",
      "Paired the automation with remediation guidance focused on what engineers actually needed to change in code."
    ],
    result:
      "That work shifted application security earlier in delivery by making insecure patterns easier to catch, explain, and remove before release.",
    outcomes: [
      "Implemented Semgrep and CodeQL policies to catch risky patterns before release.",
      "Created remediation guidance developers could actually apply during normal delivery work."
    ],
    metrics: [
      { value: "Shift-left", label: "Security placement in delivery" },
      { value: "Automated", label: "Rule-driven vulnerability checks" },
      { value: "Developer-usable", label: "Remediation guidance outcome" }
    ],
    architecture: [
      "Used Python tooling to recreate common exploit paths under controlled conditions so findings were reproducible.",
      "Translated repeated patterns into Semgrep and CodeQL rules that could run continuously during pull requests and CI.",
      "Paired rule output with code-level remediation notes so developers could move from finding to fix quickly."
    ],
    tradeoffs: [
      "Avoided one-off checks and instead invested in patterns that would continue catching regressions after the initial research phase.",
      "Balanced rule sensitivity against developer trust so the guardrails stayed enforceable without overwhelming teams with noise.",
      "Focused on code paths with strong remediation value rather than chasing every theoretical issue equally."
    ],
    stack: ["Python", "Semgrep", "CodeQL", "CI/CD", "Web Security"],
    media: {
      src: "/media/appsec-tooling.svg",
      alt: "Application-security workflow diagram showing exploit reproduction, static analysis rules, CI gates, and remediation feedback."
    }
  },
  {
    slug: "security-monitoring-and-iam-compliance-automation",
    title: "Security Monitoring and IAM Compliance Automation",
    category: "Detection",
    year: "2023",
    summary:
      "Engineered a centralized ELK platform that ingested logs from more than 13 distributed systems and automated detection and response triggers.",
    impact:
      "Improved visibility into indicators of compromise while automating cryptographic key and certificate lifecycle management with zero downtime.",
    challenge:
      "The challenge was to increase visibility and response quality across distributed systems while keeping compliance-sensitive controls reliable and low-friction.",
    approach: [
      "Centralized logs from 13-plus systems into a shared ELK platform to make suspicious behavior easier to correlate and investigate.",
      "Built behavior-based detections and response triggers so alerts reflected suspicious activity instead of isolated signatures alone.",
      "Automated certificate and key lifecycle management to reduce downtime risk and support PCI DSS and NIST expectations."
    ],
    result:
      "The outcome was stronger operational visibility, cleaner response automation, and more dependable handling of compliance-driven identity and certificate workflows.",
    outcomes: [
      "Developed behavior-based detections and automated response logic for higher-confidence alerts.",
      "Aligned key rotation and certificate management with PCI DSS and NIST expectations."
    ],
    metrics: [
      { value: "13+", label: "Systems feeding shared visibility" },
      { value: "Zero downtime", label: "Certificate and key rotation goal" },
      { value: "Compliance-aware", label: "Operational control design" }
    ],
    architecture: [
      "Centralized logs into ELK to create a shared operational picture across distributed systems and security-sensitive workflows.",
      "Layered behavior-based detections and response triggers on top of the data path so alerts reflected meaningful patterns, not isolated events.",
      "Connected IAM and certificate lifecycle automation to the monitoring model so trust and visibility improved together."
    ],
    tradeoffs: [
      "Focused on higher-confidence detections rather than maximizing alert count because analyst trust mattered more than volume.",
      "Automated key and certificate workflows carefully to avoid downtime while still improving compliance posture.",
      "Designed for maintainability so the system would remain useful after initial deployment and handoff."
    ],
    stack: ["ELK", "IAM", "SSL/TLS", "PCI DSS", "NIST", "Automation"],
    media: {
      src: "/media/detection-automation.svg",
      alt: "Detection-engineering diagram showing centralized ELK ingestion, behavioral rules, automated response triggers, and certificate automation."
    }
  }
];

const projectSystemMaps = {
  "llm-redteam-framework": {
    lens: "Assessment path",
    title: "From attack pack to replayable evidence",
    summary:
      "The framework is strongest when read as an AppSec workflow: explicit probes, deterministic evidence, and CI-ready outputs.",
    nodes: [
      {
        id: "pack",
        label: "Pack",
        role: "Input",
        detail: "YAML suites define tactics, probes, canaries, risk rationale, policy mapping, and CI gate weights.",
        x: 14,
        y: 30
      },
      {
        id: "runner",
        label: "Runner",
        role: "Execution",
        detail: "Single-turn or adaptive multi-turn sessions mutate prompts, retry safe failures, and preserve transcripts.",
        x: 38,
        y: 66
      },
      {
        id: "detect",
        label: "Detect",
        role: "Evidence",
        detail: "Exact canaries, leakage regexes, refusal signals, citation checks, and JSON detectors produce cautious findings.",
        x: 62,
        y: 30
      },
      {
        id: "report",
        label: "Report",
        role: "Output",
        detail: "Markdown, JSON, SARIF, JUnit, and SQLite history make results replayable and usable in CI.",
        x: 84,
        y: 66
      }
    ],
    edges: [
      { from: "pack", to: "runner", label: "authorized probes" },
      { from: "runner", to: "detect", label: "redacted transcripts" },
      { from: "detect", to: "report", label: "candidate evidence" }
    ]
  },
  "securerag-evalops": {
    lens: "Guarded retrieval path",
    title: "From source file to cited answer",
    summary:
      "The project is strongest when read as a security-sensitive workflow, not just a chat interface.",
    nodes: [
      {
        id: "ingest",
        label: "Ingest",
        role: "Source",
        detail: "PDF, text, JSON, and code files are parsed, chunked, embedded locally, and scoped to a namespace.",
        x: 14,
        y: 30
      },
      {
        id: "retrieve",
        label: "Retrieve",
        role: "Decision",
        detail: "Authorization, lexical-plus-vector retrieval, and MMR decide what context is allowed to surface.",
        x: 38,
        y: 66
      },
      {
        id: "guard",
        label: "Guard",
        role: "Safety",
        detail: "Direct and indirect injection checks run before answer construction, with events persisted for audit.",
        x: 62,
        y: 30
      },
      {
        id: "answer",
        label: "Answer",
        role: "Output",
        detail: "Extractive generation stays grounded in retrieved text, validates citations, and redacts PII last.",
        x: 84,
        y: 66
      }
    ],
    edges: [
      { from: "ingest", to: "retrieve", label: "namespace-scoped chunks" },
      { from: "retrieve", to: "guard", label: "retrieved context" },
      { from: "guard", to: "answer", label: "approved evidence" }
    ]
  },
  "windows-dfir-timeline-diff-engine": {
    lens: "Evidence path",
    title: "From raw artifact to cautious report",
    summary:
      "The value of timeline is the chain from normalized evidence into analyst-safe conclusions.",
    nodes: [
      {
        id: "artifacts",
        label: "Artifacts",
        role: "Input",
        detail: "Windows forensic artifacts are read locally without network access or source mutation.",
        x: 14,
        y: 30
      },
      {
        id: "store",
        label: "SQLite",
        role: "Evidence",
        detail: "Collectors normalize records into deterministic TimelineEvent rows plus raw source references.",
        x: 38,
        y: 66
      },
      {
        id: "analyze",
        label: "Diff + detect",
        role: "Analysis",
        detail: "Fingerprint normalization, YAML rules, and correlations identify candidate activity changes.",
        x: 62,
        y: 30
      },
      {
        id: "report",
        label: "Report",
        role: "Output",
        detail: "Markdown output cites event IDs and uses wording that supports validation instead of overclaiming.",
        x: 84,
        y: 66
      }
    ],
    edges: [
      { from: "artifacts", to: "store", label: "normalized events" },
      { from: "store", to: "analyze", label: "baseline vs incident data" },
      { from: "analyze", to: "report", label: "attack-chain candidates" }
    ]
  },
  "tinyc-c99-compiler": {
    lens: "Compiler pipeline",
    title: "From C source to self-host proof",
    summary:
      "tinyc is best understood as an end-to-end compiler plus a release-validation loop.",
    nodes: [
      {
        id: "frontend",
        label: "Frontend",
        role: "Parse",
        detail: "Lexer, parser, and semantic analysis turn C source into a typed program model.",
        x: 14,
        y: 30
      },
      {
        id: "ir",
        label: "TAC IR",
        role: "Lower",
        detail: "Statements and expressions lower into TAC with enough structure for predictable code generation.",
        x: 38,
        y: 66
      },
      {
        id: "backend",
        label: "x86-64",
        role: "Emit",
        detail: "The backend assigns stack slots, emits assembly, and handles ABI-sensitive calls and aggregates.",
        x: 62,
        y: 30
      },
      {
        id: "verify",
        label: "Validate",
        role: "Proof",
        detail: "Integration tests, ABI programs, and deterministic stage1-to-stage2 comparison prove behavior.",
        x: 84,
        y: 66
      }
    ],
    edges: [
      { from: "frontend", to: "ir", label: "typed AST" },
      { from: "ir", to: "backend", label: "lowered program" },
      { from: "backend", to: "verify", label: "assembly + binaries" }
    ]
  },
  "uproxy-cxx-reverse-proxy": {
    lens: "Request path",
    title: "From socket event to upstream response",
    summary:
      "uProxy’s story is a systems path: event delivery, protocol handling, and upstream reuse all cooperate.",
    nodes: [
      {
        id: "event",
        label: "Event loop",
        role: "I/O",
        detail: "kqueue and epoll surface edge-triggered readiness through one platform abstraction.",
        x: 14,
        y: 30
      },
      {
        id: "tls",
        label: "TLS",
        role: "Security",
        detail: "BoringSSL memory BIOs terminate TLS without blocking the application read/write path.",
        x: 38,
        y: 66
      },
      {
        id: "protocol",
        label: "HTTP/2",
        role: "Protocol",
        detail: "Frames, streams, and HPACK headers become validated request state.",
        x: 62,
        y: 30
      },
      {
        id: "upstream",
        label: "Pool",
        role: "Delivery",
        detail: "Weighted balancing and connection pooling forward requests to HTTP/1.1 upstreams.",
        x: 84,
        y: 66
      }
    ],
    edges: [
      { from: "event", to: "tls", label: "socket readiness" },
      { from: "tls", to: "protocol", label: "decrypted bytes" },
      { from: "protocol", to: "upstream", label: "translated request" }
    ]
  },
  "enterprise-nids-network-detection-platform": {
    lens: "Detection path",
    title: "From packet capture to explainable finding",
    summary:
      "The platform combines network depth with enough product surface to make the result usable.",
    nodes: [
      {
        id: "capture",
        label: "Capture",
        role: "Input",
        detail: "Live traffic and PCAP replay enter the same analysis workflow.",
        x: 14,
        y: 30
      },
      {
        id: "flows",
        label: "Flows",
        role: "Model",
        detail: "Parsing, reconstruction, and fingerprinting build connection-level context.",
        x: 38,
        y: 66
      },
      {
        id: "detect",
        label: "Detect",
        role: "Analysis",
        detail: "Rules, anomaly scoring, and DPI enrichments turn packets into findings.",
        x: 62,
        y: 30
      },
      {
        id: "surface",
        label: "Dashboard",
        role: "Output",
        detail: "Reports, telemetry, and a FastAPI UI make investigations readable and operational.",
        x: 84,
        y: 66
      }
    ],
    edges: [
      { from: "capture", to: "flows", label: "packet stream" },
      { from: "flows", to: "detect", label: "enriched sessions" },
      { from: "detect", to: "surface", label: "findings + reports" }
    ]
  },
  "patchbot-security-platform": {
    lens: "Risk triage",
    title: "From finding candidate to developer signal",
    summary:
      "Patchbot’s differentiator is separating exploit-confirmed risk from noisy candidate output.",
    nodes: [
      {
        id: "discover",
        label: "Discover",
        role: "Input",
        detail: "Routes, payloads, and secret candidates enter through scanner workflows.",
        x: 14,
        y: 30
      },
      {
        id: "confirm",
        label: "Confirm",
        role: "Proof",
        detail: "Playwright-backed IAST checks reproduce meaningful exploit behavior.",
        x: 38,
        y: 66
      },
      {
        id: "score",
        label: "Score",
        role: "Triage",
        detail: "Entropy and confirmation signals reduce low-value alerts before storage.",
        x: 62,
        y: 30
      },
      {
        id: "remediate",
        label: "Remediate",
        role: "Output",
        detail: "Developer-facing output keeps reproduction context attached to the fix path.",
        x: 84,
        y: 66
      }
    ],
    edges: [
      { from: "discover", to: "confirm", label: "candidate finding" },
      { from: "confirm", to: "score", label: "reproduction evidence" },
      { from: "score", to: "remediate", label: "prioritized issue" }
    ]
  },
  "sysguard-ebpf-linux-activity-monitor": {
    lens: "Runtime policy",
    title: "From kernel event to operator decision",
    summary:
      "The interesting part is the tight loop between telemetry, policy, and an explicit outcome.",
    nodes: [
      {
        id: "kernel",
        label: "eBPF hooks",
        role: "Observe",
        detail: "exec, file, and network activity is captured close to the kernel boundary.",
        x: 14,
        y: 30
      },
      {
        id: "normalize",
        label: "Normalize",
        role: "Shape",
        detail: "Rust user-space code turns raw events into consistent operator-facing records.",
        x: 38,
        y: 66
      },
      {
        id: "policy",
        label: "Policy",
        role: "Decide",
        detail: "YAML rules map event context into ALLOW, LOG, ALERT, or BLOCK behavior.",
        x: 62,
        y: 30
      },
      {
        id: "emit",
        label: "Emit",
        role: "Output",
        detail: "Deduped JSON and enforcement outcomes reach the operator cleanly.",
        x: 84,
        y: 66
      }
    ],
    edges: [
      { from: "kernel", to: "normalize", label: "raw telemetry" },
      { from: "normalize", to: "policy", label: "structured event" },
      { from: "policy", to: "emit", label: "policy decision" }
    ]
  },
  "spectrefs-encrypted-vault-filesystem": {
    lens: "Trusted access",
    title: "From unlock to audited plaintext access",
    summary:
      "The vault balances encryption, usability, and explicit trust boundaries.",
    nodes: [
      {
        id: "unlock",
        label: "Unlock",
        role: "Crypto",
        detail: "Argon2id and wrapped keys establish access to encrypted vault material.",
        x: 14,
        y: 30
      },
      {
        id: "mount",
        label: "Mount",
        role: "Filesystem",
        detail: "FUSE-backed or repair-mode flows expose the vault without weakening storage guarantees.",
        x: 38,
        y: 66
      },
      {
        id: "trust",
        label: "PBAC",
        role: "Policy",
        detail: "Trusted-app checks decide when plaintext access is allowed.",
        x: 62,
        y: 30
      },
      {
        id: "audit",
        label: "Audit",
        role: "Evidence",
        detail: "Health and plaintext-access events remain inspectable after the operation.",
        x: 84,
        y: 66
      }
    ],
    edges: [
      { from: "unlock", to: "mount", label: "vault key material" },
      { from: "mount", to: "trust", label: "file request" },
      { from: "trust", to: "audit", label: "approved access" }
    ]
  },
  "event-ingestion-and-observability-pipeline": {
    lens: "Streaming reliability",
    title: "From event ingress to diagnosable delivery",
    summary:
      "The project is about keeping throughput, retries, and operational clarity visible at once.",
    nodes: [
      {
        id: "ingress",
        label: "Ingress",
        role: "Input",
        detail: "Services accept events while preserving clear ownership boundaries.",
        x: 14,
        y: 30
      },
      {
        id: "queue",
        label: "Queue",
        role: "Buffer",
        detail: "Backpressure and retry handling protect downstream systems under load.",
        x: 38,
        y: 66
      },
      {
        id: "process",
        label: "Workers",
        role: "Transform",
        detail: "Processing stages enrich, route, and deliver messages predictably.",
        x: 62,
        y: 30
      },
      {
        id: "observe",
        label: "OTel",
        role: "Operate",
        detail: "Traces and queue health make failure modes visible before they become mysteries.",
        x: 84,
        y: 66
      }
    ],
    edges: [
      { from: "ingress", to: "queue", label: "accepted events" },
      { from: "queue", to: "process", label: "bounded work" },
      { from: "process", to: "observe", label: "delivery signals" }
    ]
  },
  "neonatal-screening-application-publication": {
    lens: "Research workflow",
    title: "From screening need to published artifact",
    summary:
      "This project connects product reasoning, implementation, and publication quality.",
    nodes: [
      {
        id: "problem",
        label: "Problem",
        role: "Need",
        detail: "The workflow starts from neonatal screening constraints and stakeholder goals.",
        x: 14,
        y: 30
      },
      {
        id: "design",
        label: "Design",
        role: "Model",
        detail: "Architecture and data flow turn the problem into a buildable application shape.",
        x: 38,
        y: 66
      },
      {
        id: "validate",
        label: "Validate",
        role: "Evidence",
        detail: "Testing and process documentation make the work reviewable.",
        x: 62,
        y: 30
      },
      {
        id: "publish",
        label: "Publish",
        role: "Outcome",
        detail: "The paper becomes the final delivery artifact for the system and rationale.",
        x: 84,
        y: 66
      }
    ],
    edges: [
      { from: "problem", to: "design", label: "workflow requirements" },
      { from: "design", to: "validate", label: "implementation plan" },
      { from: "validate", to: "publish", label: "documented evidence" }
    ]
  },
  "ai-security-and-agentic-workflow-automation": {
    lens: "Agent boundary",
    title: "From request to constrained action",
    summary:
      "The system map makes the permission boundaries visible instead of hiding them behind automation.",
    nodes: [
      {
        id: "request",
        label: "Request",
        role: "Input",
        detail: "Agent work begins with user intent and potentially adversarial prompt content.",
        x: 14,
        y: 30
      },
      {
        id: "policy",
        label: "Policy",
        role: "Gate",
        detail: "Permission checks and guardrails constrain what the system is allowed to do.",
        x: 38,
        y: 66
      },
      {
        id: "tools",
        label: "Tools",
        role: "Action",
        detail: "Only approved operations proceed through explicit tool boundaries.",
        x: 62,
        y: 30
      },
      {
        id: "audit",
        label: "Audit",
        role: "Trace",
        detail: "Decision history remains inspectable for security review and debugging.",
        x: 84,
        y: 66
      }
    ],
    edges: [
      { from: "request", to: "policy", label: "intent + risk" },
      { from: "policy", to: "tools", label: "approved scope" },
      { from: "tools", to: "audit", label: "executed action" }
    ]
  },
  "advanced-binary-research-and-exploit-development": {
    lens: "Debugging loop",
    title: "From crash symptom to patchable finding",
    summary:
      "The work is less about spectacle than about moving carefully from evidence to cause.",
    nodes: [
      {
        id: "sample",
        label: "Sample",
        role: "Input",
        detail: "Binaries and crash artifacts establish the starting point for investigation.",
        x: 14,
        y: 30
      },
      {
        id: "inspect",
        label: "Inspect",
        role: "Analysis",
        detail: "Disassembly, GDB, and memory inspection isolate the behavior under study.",
        x: 38,
        y: 66
      },
      {
        id: "model",
        label: "Model",
        role: "Reason",
        detail: "Control flow and memory-state hypotheses explain the observed symptom.",
        x: 62,
        y: 30
      },
      {
        id: "patch",
        label: "Patch",
        role: "Outcome",
        detail: "The result is a remediation-oriented finding, not just a reproduction note.",
        x: 84,
        y: 66
      }
    ],
    edges: [
      { from: "sample", to: "inspect", label: "runtime evidence" },
      { from: "inspect", to: "model", label: "debugging signals" },
      { from: "model", to: "patch", label: "root-cause path" }
    ]
  },
  "web-vulnerability-research-and-remediation-tooling": {
    lens: "Secure delivery",
    title: "From exploit pattern to CI feedback",
    summary:
      "The project turns security research into repeatable developer-facing control points.",
    nodes: [
      {
        id: "research",
        label: "Research",
        role: "Input",
        detail: "SQLi and XSS patterns are studied as concrete exploit behaviors.",
        x: 14,
        y: 30
      },
      {
        id: "rules",
        label: "Rules",
        role: "Encode",
        detail: "Semgrep and CodeQL checks convert those patterns into repeatable detection logic.",
        x: 38,
        y: 66
      },
      {
        id: "ci",
        label: "CI",
        role: "Gate",
        detail: "Pipeline guardrails surface issues during delivery rather than after release.",
        x: 62,
        y: 30
      },
      {
        id: "fix",
        label: "Fix",
        role: "Outcome",
        detail: "Findings are paired with remediation guidance that engineers can act on.",
        x: 84,
        y: 66
      }
    ],
    edges: [
      { from: "research", to: "rules", label: "attack pattern" },
      { from: "rules", to: "ci", label: "repeatable check" },
      { from: "ci", to: "fix", label: "developer signal" }
    ]
  },
  "security-monitoring-and-iam-compliance-automation": {
    lens: "Operational trust",
    title: "From distributed logs to controlled response",
    summary:
      "The system is about making monitoring and identity operations reinforce each other.",
    nodes: [
      {
        id: "logs",
        label: "Logs",
        role: "Input",
        detail: "Signals from distributed systems enter a shared visibility plane.",
        x: 14,
        y: 30
      },
      {
        id: "elk",
        label: "ELK",
        role: "Correlate",
        detail: "Centralized search and behavior detections create higher-confidence context.",
        x: 38,
        y: 66
      },
      {
        id: "iam",
        label: "IAM",
        role: "Control",
        detail: "Certificate and key workflows connect monitoring to trust operations.",
        x: 62,
        y: 30
      },
      {
        id: "response",
        label: "Response",
        role: "Outcome",
        detail: "Automation improves actionability while keeping compliance-sensitive work low-friction.",
        x: 84,
        y: 66
      }
    ],
    edges: [
      { from: "logs", to: "elk", label: "shared telemetry" },
      { from: "elk", to: "iam", label: "behavior context" },
      { from: "iam", to: "response", label: "controlled action" }
    ]
  }
};

const projectProofMetadata = {
  "llm-redteam-framework": {
    displayPriority: 1,
    maturity: "Production-grade security CLI",
    roleFits: ["AI Security", "Application Security", "Security Engineering"],
    focusTags: ["Python", "LLM Security", "AppSec", "CI", "SARIF"],
    proofBadges: ["Public repo", "CI gates", "44 tests", "Local lab", "SARIF", "SQLite history"],
    proofLine:
      "Enterprise LLM AppSec CLI with adaptive attack sessions, synthetic canaries, redacted evidence, replay, comparison, and CI reporting.",
    evidenceVisual: {
      title: "LLM RedTeam release proof",
      label: "AppSec validation",
      lines: [
        "$ make release-check",
        "44 passed",
        "wheel + sdist built",
        "hardened lab: 0 candidate successes"
      ],
      caption: "The proof emphasizes authorized synthetic testing, packaged attack packs, and CI-ready evidence."
    }
  },
  "securerag-evalops": {
    displayPriority: 1,
    maturity: "Internal-production baseline",
    roleFits: ["Security Engineering", "Backend Engineering", "AI Security"],
    focusTags: ["Python", "FastAPI", "RAG", "Guardrails", "Observability"],
    proofBadges: ["Public repo", "CI gates", "Offline mode", "Graph memory", "Audit logs", "Dashboard"],
    proofLine:
      "Offline-first RAG backend with graph-augmented retrieval, fail-closed citations, guarded access, audit logs, and production deployment docs.",
    evidenceVisual: {
      title: "SecureRAG release proof",
      label: "Backend validation",
      lines: [
        "$ poetry run pytest -q",
        "91 passed",
        "graph + auth + citations + guardrails + audit",
        "$ curl /health/ready -> postgres redis qdrant ok"
      ],
      caption: "The proof emphasizes protected query flow, operator safety, and deployability rather than model theatrics."
    }
  },
  "windows-dfir-timeline-diff-engine": {
    displayPriority: 2,
    maturity: "Technical preview",
    roleFits: ["Detection Engineering", "Security Engineering", "Go CLI"],
    focusTags: ["Go", "SQLite", "CLI", "Detection", "DFIR"],
    proofBadges: ["Public repo", "Technical preview", "Go CLI", "SQLite", "Markdown reports"],
    proofLine:
      "Release-candidate CLI path with make demo, SQLite evidence storage, JSONL export, and Markdown reporting.",
    evidenceVisual: {
      title: "timeline demo proof",
      label: "Local release gate",
      lines: [
        "$ make demo",
        "generated baseline.db and incident.db",
        "exported events.jsonl",
        "rendered report.md with event IDs and source paths"
      ],
      caption: "Kept as a technical preview until broader native parser and corpus validation are complete."
    }
  },
  "tinyc-c99-compiler": {
    displayPriority: 3,
    maturity: "Production-ready project",
    roleFits: ["Systems Engineering", "Compiler Engineering", "Low-Level Debugging"],
    focusTags: ["C", "Compiler", "Self-hosting", "x86-64", "CI"],
    proofBadges: ["Public repo", "CI gates", "Production-ready", "Self-hosting", "x86-64"],
    proofLine:
      "Validated through make check plus deterministic self-host comparison where stage1 == stage2.",
    evidenceVisual: {
      title: "tinyc release proof",
      label: "Compiler validation",
      lines: [
        "$ make check",
        "unit, integration, ABI tests passed",
        "$ make selfhost LDFLAGS=-Wl,-no_uuid",
        "stage1 == stage2"
      ],
      caption: "The public proof centers on executable tests, ABI coverage, and repeatable self-hosting."
    }
  },
  "uproxy-cxx-reverse-proxy": {
    displayPriority: 4,
    maturity: "Systems foundation",
    roleFits: ["Systems Engineering", "Backend Infrastructure", "Networking"],
    focusTags: ["C++20", "HTTP/2", "TLS", "HPACK", "Event Loop"],
    proofBadges: ["Public repo", "CI gates", "C++20", "Cleartext path", "Protocol tests"],
    proofLine:
      "Public C++20 networking foundation with strict HTTP parsing, event-loop tests, protocol coverage, and documented release blockers.",
    evidenceVisual: {
      title: "uProxy systems proof",
      label: "Network stack",
      lines: [
        "$ make test",
        "HTTP/1.1 parser and HTTP/2 frame tests passed",
        "HPACK + TLS paths covered",
        "kqueue and epoll backends tracked"
      ],
      caption: "The proof focuses on protocol correctness, event delivery, and upstream behavior."
    }
  },
  "enterprise-nids-network-detection-platform": {
    displayPriority: 10,
    maturity: "GitHub-ready platform",
    roleFits: ["Security Engineering", "Detection Engineering", "Backend Engineering"],
    focusTags: ["Python", "FastAPI", "PCAP", "SQLite", "Dashboard"],
    proofBadges: ["Public repo", "Dashboard", "PCAP replay", "SQLite", "Reports"],
    proofLine:
      "Combines offline PCAP replay, live capture, explainable reports, SQLite telemetry, and a FastAPI dashboard."
  },
  "patchbot-security-platform": {
    displayPriority: 11,
    maturity: "Product prototype",
    roleFits: ["Application Security", "Security Product", "Automation"],
    focusTags: ["Python", "Playwright", "IAST", "Secret Detection", "SQLCipher"],
    proofBadges: ["IAST", "Secret detection", "Playwright", "SQLCipher"],
    proofLine:
      "Pairs browser-backed exploit confirmation with high-entropy secret detection and tenant-aware storage."
  },
  "sysguard-ebpf-linux-activity-monitor": {
    displayPriority: 12,
    maturity: "Public prototype",
    roleFits: ["Systems Engineering", "Security Engineering", "Linux"],
    focusTags: ["Rust", "eBPF", "Linux", "YAML", "Policy"],
    proofBadges: ["Public repo", "eBPF", "Rust", "YAML policy"],
    proofLine:
      "Linux runtime monitor for exec, file, and connect events with explicit ALLOW, LOG, ALERT, and BLOCK outcomes."
  },
  "spectrefs-encrypted-vault-filesystem": {
    displayPriority: 13,
    maturity: "Security product",
    roleFits: ["Systems Engineering", "Security Product", "macOS"],
    focusTags: ["C++", "SwiftUI", "FUSE", "Encryption", "macOS"],
    proofBadges: ["Encrypted vault", "PBAC", "SwiftUI", "Release gate"],
    proofLine:
      "Encrypted vault workflow with trusted-app plaintext access, audit trails, health checks, and macOS packaging."
  },
  "event-ingestion-and-observability-pipeline": {
    displayPriority: 14,
    maturity: "Production work",
    roleFits: ["Backend Engineering", "Platform Engineering", "Observability"],
    focusTags: ["Go", "Python", "OpenTelemetry", "Queues", "Cloud"],
    proofBadges: ["Production rollout", "OpenTelemetry", "Backpressure", "Cloud"],
    proofLine:
      "Backpressure-aware ingestion pipeline with observable queue health, retry behavior, and service boundaries."
  },
  "neonatal-screening-application-publication": {
    displayPriority: 20,
    maturity: "Published research",
    roleFits: ["Technical Writing", "Product Thinking", "Research"],
    focusTags: ["Publication", "Healthcare", "Application Design", "Research"],
    proofBadges: ["Published", "Research paper", "Healthcare workflow"],
    proofLine:
      "Formal publication connecting software design, screening workflow, and implementation explanation."
  },
  "ai-security-and-agentic-workflow-automation": {
    displayPriority: 15,
    maturity: "Security research",
    roleFits: ["AI Security", "Security Engineering", "Automation"],
    focusTags: ["Python", "LLM Security", "Agents", "Policy", "Audit"],
    proofBadges: ["AI security", "Policy-first", "Auditable", "Automation"],
    proofLine:
      "Models prompt-injection, tool-use, permission, and audit boundaries for constrained security automation."
  },
  "advanced-binary-research-and-exploit-development": {
    displayPriority: 16,
    maturity: "Research track",
    roleFits: ["Low-Level Debugging", "Security Research", "Systems Engineering"],
    focusTags: ["C/C++", "GDB", "Reverse Engineering", "Memory", "Linux"],
    proofBadges: ["GDB", "Reverse engineering", "Memory analysis", "Patch-ready"],
    proofLine:
      "Uses disassembly and dynamic debugging to connect crash symptoms to memory behavior and remediation."
  },
  "web-vulnerability-research-and-remediation-tooling": {
    displayPriority: 17,
    maturity: "Security tooling",
    roleFits: ["Application Security", "Security Engineering", "CI/CD"],
    focusTags: ["Python", "Semgrep", "CodeQL", "Web Security", "CI/CD"],
    proofBadges: ["Semgrep", "CodeQL", "CI guardrails", "Web security"],
    proofLine:
      "Turns SQL injection and XSS research into repeatable checks and developer-usable remediation guidance."
  },
  "security-monitoring-and-iam-compliance-automation": {
    displayPriority: 18,
    maturity: "Production work",
    roleFits: ["Detection Engineering", "Security Engineering", "IAM"],
    focusTags: ["ELK", "IAM", "TLS", "Compliance", "Automation"],
    proofBadges: ["13+ systems", "ELK", "IAM", "Compliance"],
    proofLine:
      "Centralized security visibility across distributed systems with behavior detections and certificate automation."
  }
};

export const projects = projectRecords.map((project) => ({
  ...project,
  systemMap: projectSystemMaps[project.slug],
  ...(projectProofMetadata[project.slug] ?? {
    displayPriority: 99,
    maturity: "Project",
    roleFits: [project.category],
    focusTags: project.stack.slice(0, 4),
    proofBadges: project.stack.slice(0, 3),
    proofLine: project.result
  })
}));

export const securityPillars = [
  "AI agent security",
  "Application security",
  "Exploit development",
  "Reverse engineering",
  "Detection engineering",
  "Identity and access management",
  "Cloud security",
  "Secure CI/CD",
  "Security automation"
];

export const toolGroups = [
  {
    title: "Engineering and Infrastructure",
    items: [
      "Go",
      "Python",
      "Rust",
      "FastAPI",
      "Bash",
      "SQL",
      "Kubernetes",
      "Docker",
      "AWS",
      "Azure",
      "Terraform",
      "Microservices"
    ]
  },
  {
    title: "Debugging and Operations",
    items: [
      "OpenTelemetry",
      "Prometheus",
      "Grafana",
      "Wireshark",
      "GDB",
      "Git",
      "GitHub Actions",
      "CI/CD",
      "Linux Internals"
    ]
  },
  {
    title: "Security Tooling",
    items: [
      "Semgrep",
      "CodeQL",
      "ELK",
      "LLM Security",
      "TCP/IP Packet Inspection",
      "Socket Programming",
      "Latency Reduction",
      "Root Cause Analysis"
    ]
  }
];

export const education = [
  {
    degree: "Master of Engineering in Cybersecurity",
    school: "University of Maryland, College Park",
    period: "August 2023 - May 2025",
    details:
      "Graduate study centered on cybersecurity engineering, secure systems, and applied defensive practice."
  },
  {
    degree: "Bachelor of Technology in Computer Engineering",
    school: "Vishwakarma University, Pune",
    period: "August 2018 - July 2022",
    details:
      "Completed the IBM Cybersecurity and Forensics graduate program track alongside core computer engineering coursework."
  }
];

export const certifications = [
  {
    name: "Offensive Security Certified Professional (OSCP)",
    issuer: "Offensive Security",
    details:
      "Hands-on certification focused on exploitation, privilege escalation, and adversarial problem solving."
  },
  {
    name: "IBM Cyber Security and Forensics Graduate",
    issuer: "IBM",
    details:
      "Program work focused on applied cybersecurity and forensics fundamentals."
  }
];

export const aboutDepthCards = [
  {
    title: "End-to-End Ownership",
    body:
      "I stay involved from architecture through production reliability, including observability, rollout safety, and post-release hardening.",
    signal:
      "That keeps delivery grounded in runtime behavior, not just feature completeness."
  },
  {
    title: "Security Without Theater",
    body:
      "I treat secure defaults, policy guardrails, and attack-surface reduction as part of engineering quality rather than optional add-ons.",
    signal:
      "That approach reduces rework and shortens the path from risk discovery to remediation."
  },
  {
    title: "Clear Communication Under Pressure",
    body:
      "I write incident notes, project summaries, and technical handoff material that helps teams move quickly with shared context.",
    signal:
      "Good communication turns debugging depth into team-level velocity."
  }
];

export const deliveryPatterns = [
  {
    title: "Architecture to Operations",
    body:
      "I scope work with an explicit path to deployment, telemetry, and fallback behavior before implementation starts."
  },
  {
    title: "Measure Before Opinion",
    body:
      "I prioritize instrumentation and direct evidence to isolate performance or security bottlenecks before proposing fixes."
  },
  {
    title: "Close the Loop",
    body:
      "After shipping, I focus on runbooks, automation, and prevention patterns so the same class of failure is less likely to return."
  }
];

export const practiceTracks = [
  {
    title: "Offensive Workflow in Labs and Challenge Environments",
    category: "Applied Offense",
    summary:
      "Hands-on offensive practice built around enumeration discipline, exploit-path development, privilege escalation, and reporting quality.",
    usedIn: [
      "PEN-200 / PWK applied modules and challenge labs",
      "ENPM634 penetration testing labs and VM-based exercises",
      "Reconnaissance and exploitation practice across Linux and Windows targets"
    ],
    actions: [
      "Enumerated hosts and services with targeted scanning and OSINT-style workflows",
      "Worked through web, client-side, and perimeter attack paths",
      "Practiced privilege escalation, lateral movement, and communicating findings in report form"
    ],
    tools: ["Kali Linux", "Nmap", "Metasploit", "Python", "Reporting"]
  },
  {
    title: "Linux Systems, Administration, and Hardening",
    category: "Operations",
    summary:
      "Operational Linux experience covering host setup, shell-based administration, service troubleshooting, and hardening.",
    usedIn: [
      "ENPM818P Linux administration labs",
      "Virtual machine setup and management for security coursework",
      "Shell-based workflows used throughout systems and security exercises"
    ],
    actions: [
      "Worked through file systems, boot behavior, process management, and command-line administration",
      "Used shell scripting and CLI tooling to automate repetitive tasks",
      "Applied secure administration habits while configuring and troubleshooting Linux environments"
    ],
    tools: ["Linux", "Bash", "VMware", "System Services", "CLI Tooling"]
  },
  {
    title: "Cloud Security and IAM in Practice",
    category: "Cloud",
    summary:
      "Applied cloud security work across IAM, workload configuration, incident-response scenarios, and platform-specific failure modes.",
    usedIn: [
      "ENPM665 cloud security coursework",
      "Hands-on exercises across AWS, Azure, and GCP free-tier environments",
      "Identity, data protection, incident response, and cloud forensics scenarios"
    ],
    actions: [
      "Worked through secure workload migration and cloud-specific threat considerations",
      "Applied IAM and data protection concepts to cloud-native contexts",
      "Studied incident response and forensics patterns specific to IaaS, PaaS, and SaaS"
    ],
    tools: ["AWS", "Azure", "GCP", "IAM", "Cloud Forensics"]
  },
  {
    title: "Exploit Development and Vulnerability Analysis",
    category: "Binary Security",
    summary:
      "Binary exploitation work focused on memory-corruption mechanics, mitigation behavior, and debug-driven reasoning about vulnerable code paths.",
    usedIn: [
      "Stack overflow walkthroughs and exploit exercises",
      "Detailed study of format strings, ASLR behavior, integer flaws, and NULL-related exploitation",
      "Binary-debugging oriented labs and research"
    ],
    actions: [
      "Practiced stack-based exploitation workflow from crash to offset control and payload shaping",
      "Studied how ASLR changes exploit assumptions and how attackers adapt",
      "Built intuition for memory disclosure, arbitrary writes, integer security, and exploit reliability"
    ],
    tools: ["GDB", "Python", "Immunity Debugger Concepts", "ASLR Analysis", "Format Strings"]
  },
  {
    title: "Detection, Automation, and Security Communication",
    category: "Defense",
    summary:
      "Defensive practice around packet analysis, rule development, automation, and reporting that engineers can act on.",
    usedIn: [
      "Snort rule-writing references and packet-analysis exercises",
      "Python-based scripting and security automation work",
      "Pen-test reporting and technical writing practice"
    ],
    actions: [
      "Worked with detection logic that targets vulnerability behavior instead of one-off exploit signatures",
      "Used Python as a practical tool for automation and repeatable analysis",
      "Practiced writing findings so they are useful to engineers and decision-makers, not just technically correct"
    ],
    tools: ["Snort", "Python", "Packet Analysis", "Technical Writing", "Reporting"]
  }
];

export const studyThemes = [
  {
    title: "Program Representation and Reverse Engineering",
    summary:
      "I worked through how C code becomes assembly, object code, and executables, then used disassembly to reason about real program behavior instead of treating binaries like black boxes.",
    points: [
      "Used disassembly workflows such as objdump to connect source-level intent to generated IA-32 instructions.",
      "Built fluency around stack frames, calling conventions, return paths, linking, and how compiler output shapes runtime behavior.",
      "Used that grounding to make later exploit analysis and debugging work much more concrete."
    ]
  },
  {
    title: "Memory Corruption, Shellcode, and Exploit Construction",
    summary:
      "The low-level material went beyond labels and covered the mechanics of stack layout, payload shaping, NOP sled strategy, return-address control, and shellcode placement.",
    points: [
      "Worked through buffer-overflow flow from crash state to offset control and redirection to useful execution targets such as jmp-ESP style pivots.",
      "Studied shellcode construction strategy, return-address setup, and how exploit reliability changes once stack layout details matter.",
      "Used these exercises to sharpen how I reason about unsafe memory behavior and defensive coding boundaries."
    ]
  },
  {
    title: "Format Strings and Runtime Hooking",
    summary:
      "I studied exploit paths that rely on disclosure and dynamic runtime manipulation rather than only classic buffer overwrites.",
    points: [
      "Worked through format-string behavior for stack disclosure, process instability, and attacker-controlled use of printf-family functions.",
      "Studied LD_PRELOAD-based wrapper techniques to observe arguments, modify behavior, and understand runtime control-flow interception.",
      "That combination improved my intuition for both offensive technique and practical detection or mitigation strategy."
    ]
  },
  {
    title: "Secure Communications and Trust Boundaries",
    summary:
      "The networking and crypto material reinforced how secure channels are actually constructed and where trust can fail across real systems.",
    points: [
      "Reviewed SSL/TLS, VPN, and Secure Shell as concrete communication patterns rather than abstract security buzzwords.",
      "Connected encryption, channel protection, and authentication decisions back to real operational tradeoffs.",
      "Used that perspective in later work involving certificates, transport hardening, and secure service-to-service communication."
    ]
  },
  {
    title: "Operating System and Kernel Security",
    summary:
      "The systems material covered memory management, processes and threads, kernel security, secure hardware, and OS trust boundaries as the layer that ultimately decides what higher-level software can safely do.",
    points: [
      "Built stronger mental models for allocator behavior, process isolation, concurrency, and how OS architecture shapes attack surface.",
      "Studied Linux security controls such as LSM and SELinux, along with the broader role of the kernel as a system-wide trust anchor.",
      "That work improved both low-level debugging depth and the quality of my defensive system design decisions."
    ]
  }
];

export const practiceFoundations = [
  "Built from graduate-level study across secure systems, cloud security, communications, operating-system behavior, and offensive technique.",
  "Strengthened through PEN-200 / PWK modules, applied exercises, challenge labs, and repeated report-writing practice.",
  "Extended with hands-on work in disassembly, shellcode, format strings, LD_PRELOAD-style hooking, memory management, and kernel trust boundaries."
];

export const principles = [
  {
    title: "Candor",
    body:
      "I report risk, uncertainty, and tradeoffs directly. If the evidence is thin or the system is unsafe, I say so.",
    signal:
      "That matters in debugging, incident response, and security review, where false confidence is expensive."
  },
  {
    title: "Ownership",
    body:
      "I stay with the hard parts of the work: incidents, cleanup, remediation, and operational follow-through after the visible milestone.",
    signal:
      "In practice, ownership looks like reliability under pressure and consistency with the team."
  },
  {
    title: "Disciplined Work",
    body:
      "I am comfortable with repetitive, detail-heavy work when it improves the system: instrumentation, hardening, regression analysis, and documentation.",
    signal:
      "The result is usually better reliability, clearer handoffs, and fewer repeated failures."
  }
];

export const interests = [
  {
    title: "Low-Level Systems",
    body:
      "Operating system behavior, binary internals, allocators, and debugging beneath higher-level abstractions."
  },
  {
    title: "Security Research",
    body:
      "Exploit techniques, real incident writeups, and defensive patterns that hold up outside lab conditions."
  },
  {
    title: "AI and Agentic Systems",
    body:
      "How autonomous workflows fail, how they can be abused, and how to build safer tool-use patterns around them."
  },
  {
    title: "Distributed Architecture",
    body:
      "Systems that remain observable, resilient, and performant as scale, concurrency, and failure modes increase."
  }
];

export const blogPosts = [
  {
    slug: "observability-as-a-root-cause-discipline",
    title: "Observability as a Root-Cause Discipline",
    category: "Systems",
    publishedAt: "2026-03-01",
    readTime: "5 min read",
    excerpt:
      "Tracing is not just dashboards. It is the shortest path from symptom to mechanism when latency or correctness starts drifting in distributed systems.",
    intro:
      "The value of observability is not the graph. It is the speed at which a team can move from a vague production symptom to a defensible explanation of what actually changed.",
    sections: [
      {
        heading: "Instrument the path, not just the service",
        paragraphs: [
          "In a microservices system, isolated service-level metrics create partial stories. The useful signal comes from following a request across boundaries and understanding where time, retries, fan-out, or queueing behavior start to distort the path.",
          "That is why I treat tracing as an engineering design tool, not just an operational dashboard."
        ]
      },
      {
        heading: "Use telemetry to narrow blame quickly",
        paragraphs: [
          "When a system starts deviating, the first requirement is reducing the search space. Good instrumentation should let you isolate whether the issue sits in code, coordination, infrastructure, or network behavior before the incident turns into guesswork."
        ],
        bullets: [
          "Trace propagation across service boundaries",
          "Latency heat spots across queueing or dependent calls",
          "Correlation between deploys, traffic shape, and error behavior"
        ]
      },
      {
        heading: "Operational follow-through matters",
        paragraphs: [
          "Observability only earns its keep when it changes the remediation loop. The strongest outcome is not a dashboard. It is a fix, a better default, or an automated response that prevents the same class of failure from recurring."
        ]
      }
    ]
  },
  {
    slug: "threat-modeling-agentic-workflows",
    title: "Threat Modeling Agentic Workflows",
    category: "AI Security",
    publishedAt: "2026-02-14",
    readTime: "6 min read",
    excerpt:
      "Agentic systems fail differently from traditional software. The security problem is often not the model alone but the way tools, prompts, memory, and permissions combine.",
    intro:
      "As soon as an LLM can call tools, process untrusted inputs, and mutate state, the security surface changes. Treating these systems like plain chat interfaces is a mistake.",
    sections: [
      {
        heading: "The interesting bugs are compositional",
        paragraphs: [
          "Prompt injection matters, but it is only part of the picture. In practice, risk emerges when model behavior, tool-use permissions, memory persistence, and weak validation line up in the wrong order.",
          "That makes threat modeling for agentic workflows closer to systems design than prompt hygiene alone."
        ]
      },
      {
        heading: "Constrain every boundary",
        paragraphs: [
          "Useful agentic systems still need tight boundaries. Tools should be scoped, outputs validated, permissions minimized, and actions auditable."
        ],
        bullets: [
          "Separate retrieval context from executable instructions",
          "Add allowlists around tools and parameter shapes",
          "Log decision paths before actions are taken"
        ]
      },
      {
        heading: "Security wins when workflows stay observable",
        paragraphs: [
          "If a team cannot reconstruct why an agent acted, then response and remediation will always lag behind failure. Auditability is part of the product, not an afterthought."
        ]
      }
    ]
  },
  {
    slug: "why-low-level-debugging-still-matters",
    title: "Why Low-Level Debugging Still Matters",
    category: "Research",
    publishedAt: "2026-01-20",
    readTime: "4 min read",
    excerpt:
      "Cloud-native systems still fail at the seams where abstractions leak. Low-level debugging remains a practical engineering advantage, not just a specialist hobby.",
    intro:
      "A lot of modern engineering work sits behind powerful abstractions, but failures do not respect those layers. Memory state, scheduler behavior, kernel interactions, and binary semantics still decide what the system does under stress.",
    sections: [
      {
        heading: "The stack eventually bottoms out",
        paragraphs: [
          "Even when working primarily in cloud infrastructure or high-level services, there are moments when the fastest route to truth is understanding what the process, binary, or operating system is actually doing."
        ]
      },
      {
        heading: "Reverse engineering sharpens defensive intuition",
        paragraphs: [
          "Analyzing memory corruption, allocator behavior, and exploit paths teaches the kinds of assumptions that break under pressure. That feeds directly back into more defensive software design."
        ]
      },
      {
        heading: "Debugging depth changes engineering judgment",
        paragraphs: [
          "Low-level fluency improves how you reason about performance, unsafe boundaries, failure modes, and remediation tradeoffs even when the immediate problem is not exploitation."
        ]
      }
    ]
  },
  {
    slug: "zero-trust-beyond-the-buzzword",
    title: "Zero Trust: Implementation Beyond the Buzzword",
    category: "Architecture",
    publishedAt: "2025-11-05",
    readTime: "7 min read",
    excerpt:
      "Zero Trust architectures fail when they try to wrap legacy monoliths instead of reshaping identity verification at the micro-boundary.",
    intro:
      "We treat zero trust like a vendor solution, but the reality is it is an operational standard. You don't buy zero trust; you build systems that mutually authenticate and refuse requests without explicit identity assertions.",
    sections: [
      {
        heading: "Move the perimeter to the workload",
        paragraphs: [
          "The corporate VPN is an artifact of an architecture that assumed trust based on IP subnets. Real zero trust models demand that the identity of the user, the health of the device, and the authorization of the process itself are evaluated on every single request.",
          "When deploying microservices, implementing mutual TLS (mTLS) isn't optional; it's the foundation of secure service-to-service dialog."
        ]
      },
      {
        heading: "Fail closed securely",
        paragraphs: [
          "If a policy engine goes down, the default behavior should be a hard deny. Engineers hate this because it breaks uptime metrics, but failing open creates catastrophic lateral movement paths."
        ],
        bullets: [
          "Implement localized policy caching to survive intermittent control-plane failures",
          "Ensure fail-closed states throw highly visible alerts",
          "Treat identity revocation as immediately consistent, even globally"
        ]
      }
    ]
  }
];

export function getSortedBlogPosts(posts = blogPosts) {
  return [...posts].sort(
    (a, b) =>
      Date.parse(`${b.publishedAt}T00:00:00Z`) - Date.parse(`${a.publishedAt}T00:00:00Z`)
  );
}

export function getLatestPost() {
  return getSortedBlogPosts()[0] ?? null;
}

function getProjectSortValue(project) {
  if (project.updatedAt) {
    return Date.parse(`${project.updatedAt}T00:00:00Z`);
  }

  return Date.parse(`${project.year}-12-31T00:00:00Z`);
}

export function getSortedProjects(items = projects) {
  return [...items].sort((a, b) => {
    const priority = (a.displayPriority ?? 99) - (b.displayPriority ?? 99);

    if (priority !== 0) {
      return priority;
    }

    return getProjectSortValue(b) - getProjectSortValue(a);
  });
}

export function getNewestProject() {
  return getSortedProjects()[0] ?? null;
}

export function getFeaturedProject() {
  return projects.find((project) => project.featured) ?? projects[0] ?? null;
}

export function getPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
