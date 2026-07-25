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

// Web3Forms uses a public-safe access key (a UUID) instead of an email address,
// so the destination inbox is never exposed in the client bundle.
const contactFormAccessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";
const contactFormEndpoint =
  process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT || "https://api.web3forms.com/submit";

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
  title: "Software Security Engineer",
  location: "San Francisco, California",
  contactFormEndpoint,
  contactFormAccessKey,
  github: "https://github.com/AtharvaG109",
  linkedin: "https://www.linkedin.com/in/avg1048",
  publication: "https://www.ijraset.com/research-paper/neonatal-screening-application",
  description:
    "Portfolio of Atharva Gham, a product, systems, and security engineer building local-first workflows, defensive tools, secure software, and evidence-backed technical products.",
  availability:
    "Product, systems, and security engineering across local-first software, defensive tooling, secure workflows, and evidence-backed delivery.",
  lastUpdated: "2026-07-25",
  keywords: [
    "software security engineer",
    "security engineer",
    "application security",
    "offensive security",
    "red team",
    "detection engineering",
    "AI security",
    "LLM security",
    "secure software development",
    "product engineering",
    "local-first software",
    "SwiftUI",
    "SwiftData",
    "clinical workflow software",
    "cyber range",
    "macOS security",
    "encrypted vault",
    "XPC",
    "Endpoint Security",
    "AEAD",
    "PBAC",
    "release gates",
    "DFIR",
    "reverse engineering",
    "network detection",
    "Go",
    "Python",
    "Rust"
  ],
  siteUrl: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || getDefaultSiteUrl()),
  sameAs: [
    "https://www.linkedin.com/in/avg1048",
    "https://github.com/AtharvaG109",
    "https://www.ijraset.com/research-paper/neonatal-screening-application"
  ]
};

export const hero = {
  eyebrow: "Atharva Gham — security, systems, and product engineering",
  headline:
    "I build ambitious software and make every claim prove itself.",
  summary:
    "From clinical iPad workflows to cyber ranges and encrypted vaults, I turn complex domains into focused products with visible safety boundaries and executable proof.",
  mission:
    "Build useful systems that remain honest about risk, limits, and what the evidence actually proves.",
  focus: [
    "Product engineering: complex workflows made clear, fast, accessible, and safe to operate",
    "Security engineering: offensive validation, detection, encryption, audit, and secure delivery",
    "Local-first systems: bounded data, explicit permissions, deterministic rules, and privacy-preserving defaults",
    "Software depth: Swift, C++, Go, Python, Rust, and TypeScript backed by real validation"
  ],
  actions: [
    { label: "View case studies", href: "/projects/", variant: "primary" },
    { label: "Read technical notes", href: "/blog/", variant: "secondary" }
  ],
  utilityLinks: [
    { label: "Current focus", value: "Local-first products, secure systems, and evidence-driven engineering", href: "/now/" },
    { label: "Recent work", value: "ProsthPlan, BreachOps, and FocusForge", href: "/projects/" },
    { label: "Contact", value: "Private intake for security work, collaboration, and focused technical conversations", href: "/contact/" }
  ]
};

export const curiosityTrails = [
  {
    id: "systems",
    eyebrow: "Start here",
    title: "Why do I keep going below the surface?",
    hook:
      "Because the answer that matters usually lives one layer beneath the first symptom.",
    answer:
      "It is why my work gravitates toward compilers, networking, observability, and runtime behavior. I am drawn to systems that force me to prove what is actually happening, not what I assume is happening.",
    clues: ["traces", "packet flow", "binary behavior"],
    signal: "Best next stop if you value low-level reasoning",
    href: "/workbench/",
    linkLabel: "Open the workbench"
  },
  {
    id: "security",
    eyebrow: "Notice",
    title: "Why does security run through every project?",
    hook:
      "Because the controls worth building are the ones that survive contact with real engineering work.",
    answer:
      "The through-line is not a single tool. It is making risk legible: guarded retrieval, evidence-safe DFIR, application-security workflows, IAM controls, and runtime policy that teams can actually operate.",
    clues: ["guardrails", "evidence", "permissions"],
    signal: "Best next stop if you care about security that ships",
    href: "/projects/",
    linkLabel: "Browse security projects"
  },
  {
    id: "debugging",
    eyebrow: "Ask",
    title: "What happens when the obvious answer is wrong?",
    hook:
      "I slow down, gather better evidence, and keep pulling the thread until the system explains itself.",
    answer:
      "That discipline shows up everywhere: packet investigations, compiler bootstrap checks, crash analysis, diff engines, and a habit of documenting tradeoffs in the open rather than hiding them.",
    clues: ["reproduce", "instrument", "explain"],
    signal: "Best next stop if you want to see how I think",
    href: "/about/",
    linkLabel: "Read how I work"
  },
  {
    id: "product",
    eyebrow: "Follow",
    title: "Why do the projects feel genuinely finished?",
    hook:
      "Because the part after the first demo is the part I care about most: proof, rollout, and the operator experience.",
    answer:
      "I take a technically interesting build and turn it into something another engineer can inspect, run, trust, and extend. In practice that means documentation, CI, deliberate failure modes, and a clear public story.",
    clues: ["proof", "release gates", "operator empathy"],
    signal: "Best next stop if you care about ownership",
    href: "/projects/",
    linkLabel: "See the case studies"
  }
];

export const contactConfig = {
  intro:
    "I keep direct contact details off the open web. If you are reaching out about engineering work, security research, collaboration, writing, or a technical discussion, send the context here and I will review it directly.",
  deliveryNote: "Messages are delivered privately to my inbox.",
  replyWindow: "Usually replies within 24 to 48 hours.",
  phonePolicy: "Direct contact details are shared once there is enough context for a useful technical conversation.",
  privacyNote:
    "Include the system, project, research area, collaboration context, or engineering question. That keeps outreach focused and lets me respond with the right context while keeping direct contact details private."
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
    body: "Private contact flow for technical conversations, collaboration, research discussion, and focused engineering context.",
    signal: "Technical context and direct follow-up"
  }
];

export const stats = [
  {
    value: "OSCP",
    label: "Offensive Security Certified Professional, with hands-on exploitation and privilege escalation"
  },
  {
    value: "170",
    label: "Documented green tests across ProsthPlan unit and UI suites"
  },
  {
    value: "18",
    label: "Documented builds across security, systems, product engineering, and applied research"
  },
  {
    value: "430+",
    label: "Automated tests across the strongest current product and security builds"
  }
];

export const roleFitCards = [
  {
    title: "Product Engineering",
    body:
      "Complex workflows shaped into clear, local-first products with explicit safety boundaries, accessible interaction, and proof that maps to what the interface claims.",
    signal: "Evidence shown through ProsthPlan, BreachOps, FocusForge, and SpectreFS."
  },
  {
    title: "Offensive Security",
    body:
      "LLM and AI red-teaming, web and binary exploitation, and IAST-style exploit confirmation that turns findings into reproducible evidence.",
    signal: "Evidence shown through the LLM RedTeam Framework, Patchbot IAST, binary and web vulnerability research, and OSCP."
  },
  {
    title: "Detection and Response",
    body:
      "Network detection, DFIR timeline analysis, runtime monitoring, and SIEM automation that make suspicious behavior legible and actionable.",
    signal: "Evidence shown through Enterprise NIDS, the Windows DFIR Timeline engine, ELK and IAM monitoring, and Sysguard."
  },
  {
    title: "Secure Systems and AI Security",
    body:
      "Guardrails, IAM, secure CI/CD, encryption, and threat-modeled AI workflows built into delivery instead of bolted on afterward.",
    signal: "Evidence shown through SecureRAG EvalOps, SpectreFS, hardened ingestion, and agentic-workflow security."
  },
  {
    title: "Software Engineering Depth",
    body:
      "Native apps, backend services, compilers, networking, and interactive systems in Swift, Go, Python, Rust, TypeScript, and C/C++.",
    signal: "Evidence shown through ProsthPlan, BreachOps, tinyc, uProxy, and production backend work."
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
      "CI checks, policy gates, detection logic, IAM workflows, and security automation that teams can keep running without constant manual oversight."
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
    body: "Tell me what you are building, investigating, reviewing, or trying to solve."
  },
  {
    title: "I review it directly",
    body: "I use this form to keep outreach focused and direct contact details private."
  },
  {
    title: "Keep the next step specific",
    body: "If the conversation makes sense, I follow up with the most useful next step."
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
    slug: "prosthplan-clinical-workstation",
    title: "ProsthPlan: Local-First Clinical Workstation",
    featured: true,
    category: "Clinical Product",
    year: "2026",
    updatedAt: "2026-07-19",
    summary:
      "Built a local-first iPadOS workflow and decision-support app for prosthodontists, with clinician-controlled drafts, durable record history, and explicit doctor-confirmation gates.",
    impact:
      "Turned a complex clinical workflow into one coherent workstation while keeping the safety boundary visible: doctors make clinical decisions, generated text stays draft-only, original files remain untouched, and signed records are corrected through addenda.",
    challenge:
      "Clinical workflow software must reduce friction without hiding provenance, changing source evidence, or presenting decision support as autonomous diagnosis.",
    approach: [
      "Designed a patient-centered iPad workflow that keeps records local and makes review state, history, and source custody visible.",
      "Kept every classification, treatment option, and generated suggestion behind explicit doctor review and confirmation.",
      "Preserved original clinical files, versioned approved records, and made signed documents immutable so corrections require addenda."
    ],
    result:
      "The latest documented suite reports 161 unit tests and 9 UI tests with 0 failures. The app remains local-first, generates no prescriptions, and presents every classification or clinical suggestion as doctor-confirmed decision support.",
    outcomes: [
      "One clinician-centered workspace replaces disconnected tools while keeping review status and missing-record blockers visible.",
      "Clinical records retain audit and version history; signed documents are immutable, corrections use addenda, and generated text remains draft-only until doctor approval.",
      "Production mode starts empty while optional sample cases are clearly labeled demo data."
    ],
    metrics: [
      { value: "161 + 9", label: "Documented unit and UI tests with zero failures" },
      { value: "Local-first", label: "SwiftData records with no cloud dependency in the MVP" },
      { value: "Doctor-gated", label: "Classification, planning, and suggestions require clinician confirmation" }
    ],
    tradeoffs: [
      "Kept the MVP local-first instead of adding cloud sync so privacy, file custody, and audit behavior stay inspectable.",
      "Kept the product strictly clinician-controlled: no autonomous diagnosis, no prescription generation, and no generated clinical text treated as final without approval.",
      "Limited public detail to product boundaries and measured proof; internal clinical implementation stays intentionally undisclosed."
    ],
    stack: ["Swift", "SwiftUI", "SwiftData", "Local-First", "Clinical Workflow", "XCTest"],
    media: {
      alt: "Editorial project summary covering ProsthPlan purpose, clinician control, validation evidence, and stated limits."
    }
  },
  {
    slug: "breachops-cyber-range",
    title: "BreachOps: Cyber Range Command",
    featured: true,
    category: "Detection",
    year: "2026",
    updatedAt: "2026-07-16",
    summary:
      "Built a cinematic defensive SOC training game with synthetic missions, evolving incident timelines, evidence-chain grading, proportionate response decisions, and a shared authoring validator.",
    impact:
      "Turned static alert-triage exercises into a replayable investigation system where player choices affect business damage, forensic quality, response time, and the final debrief.",
    challenge:
      "Security training needed enough realism to teach prioritization and evidence handling without using real infrastructure, operational attack instructions, or scenario logic hidden inside UI code.",
    approach: [
      "Modeled missions as validated JSON data with fictional hosts and users, reserved domains, documentation IP ranges, alerts, logs, evidence, actions, answer keys, and timed consequences.",
      "Built a pure scoring engine for verdict, evidence F1, response actions, speed, chain reconstruction, tactic accuracy, and five-axis debrief reporting.",
      "Created an interactive React Three Fiber command center and topology view while keeping mission state in one explicit Zustand phase machine.",
      "Added one shared mission validator used by both the CLI and a development-only authoring console so previewed scoring cannot drift from shipping behavior."
    ],
    result:
      "The current local build validates 12 complete missions and passes 26 engine, scoring, and validator tests. All content remains fictional, defensive, and educational.",
    outcomes: [
      "Timed events inject new alerts and logs unless the player deploys every required preventative action before the mission clock deadline.",
      "Destructive actions taken before evidence preservation reduce the forensics score, making response order part of the lesson.",
      "Debriefs explain what worked, what was missed, what damage occurred, and how a senior responder would sequence the investigation."
    ],
    metrics: [
      { value: "12 missions", label: "Validated synthetic investigations across multiple difficulty tiers" },
      { value: "26 tests", label: "Passing validator, consequence-engine, graph, and scoring checks" },
      { value: "5 axes", label: "Security, business impact, forensics, response time, and confidence" }
    ],
    architecture: [
      "Mission JSON supplies topology, telemetry, actions, evidence, scoring weights, timed events, and debrief content without hardcoded scenario branches.",
      "Pure TypeScript engines resolve consequences, graph paths, evidence chains, and score reports before Zustand exposes state to the screens.",
      "Next.js renders the training workflow while React Three Fiber maintains a persistent 3D command center and interactive topology."
    ],
    tradeoffs: [
      "Used synthetic `.example` domains and RFC 5737 addresses so training content cannot be mistaken for real targets.",
      "Kept the authoring console development-only and shared its validator with the CLI to avoid shipping internal answer-key tooling.",
      "Made response actions one-way with explicit confirmation so consequences feel meaningful without enabling real operational changes."
    ],
    stack: ["TypeScript", "Next.js", "React", "Three.js", "React Three Fiber", "Zustand", "Vitest"],
    media: {
      alt: "Investigation-flow diagram showing BreachOps mission data, live telemetry, evidence decisions, response consequences, and scored debrief."
    }
  },
  {
    slug: "focusforge-macos-focus-utility",
    title: "FocusForge: Privacy-Aware Focus Utility",
    featured: true,
    category: "macOS Utility",
    year: "2026",
    updatedAt: "2026-07-17",
    summary:
      "Built a native macOS menu-bar utility that temporarily suspends keyboard input while preserving pointer control, adds screen-share-private controls, and runs animated focus companions entirely on device.",
    impact:
      "Turned a small keyboard-cleaning tool into a usable focus product with quick timers, scheduling, visible recovery controls, privacy-preserving diagnostics, launch-at-login, and local companion characters.",
    challenge:
      "Input interception must fail safely. The app needed to remain recoverable by pointer, avoid keylogging behavior, explain Accessibility permissions, and keep its own controls out of supported screen-sharing captures.",
    approach: [
      "Used a session-level Core Graphics event tap that passes input through whenever permission or setup fails and never operates at login or FileVault unlock.",
      "Added pointer-clickable status and floating controls, quick durations, scheduling, launch-at-login, blocked-attempt counts, and diagnostics without storing typed characters or key codes.",
      "Applied macOS window-sharing privacy to app-owned windows and documented the boundary as a best-effort request to supported capture software.",
      "Built ten bundled local focus companions and deterministic title-based distraction alerts without screenshots, video analysis, network calls, or runtime dependency on an AI service."
    ],
    result:
      "The current local build passes 38 tests, including keyboard-gate timing and fail-safe behavior plus screen-capture privacy checks.",
    outcomes: [
      "Pointer, click, and scroll stay available while keyboard input is suspended, preserving a clear recovery path.",
      "Away Guard stores only timestamp and frontmost app or window context when available, never typed text, key codes, passwords, or messages.",
      "All companion art ships inside the app bundle and the selected companion persists locally across launches."
    ],
    metrics: [
      { value: "38 tests", label: "Passing timing, state, privacy-window, and control-path checks" },
      { value: "10 companions", label: "Bundled animated focus characters with no network dependency" },
      { value: "Fail-open", label: "Keyboard input continues when required Accessibility control is unavailable" }
    ],
    architecture: [
      "A menu-bar SwiftUI app coordinates event-tap state, timers, schedules, diagnostics, and app-owned floating panels.",
      "Pure core services model suspension duration, keyboard-gate state, pet animation state, and privacy-window handling for testability.",
      "Local assets and user defaults retain visual preferences while sensitive input content is never persisted."
    ],
    tradeoffs: [
      "Scoped input blocking to the active user session because system-wide pre-login control would require a very different privilege and safety model.",
      "Used deterministic app and window-title heuristics for distraction alerts instead of invasive screenshot or video analysis.",
      "Described window privacy as capture-software dependent rather than promising universal invisibility."
    ],
    stack: ["Swift", "SwiftUI", "Core Graphics", "AppKit", "SwiftPM", "XCTest"],
    media: {
      alt: "Product-flow diagram showing FocusForge keyboard-gate state, pointer-safe controls, private app windows, and local companion assets."
    },
    links: [
      {
        label: "View public foundation",
        href: "https://github.com/AtharvaG109/KeyboardPause"
      }
    ]
  },
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
    updatedAt: "2026-06-02",
    summary:
      "Built a Python/FastAPI network detection platform with offline PCAP replay, live capture, SQLite-backed run state, deterministic fixture tests, benchmark tooling, and a faster command-center dashboard.",
    impact:
      "Turned packet analysis into a product-shaped workflow by unifying offline and live analysis, persisting dashboard state in SQLite, and redesigning the UI so operators see verdicts, key metrics, latest incidents, and next steps immediately.",
    challenge:
      "The hard part was keeping a broad NIDS prototype honest and usable. Offline replay, live capture, reports, SQLite telemetry, and the FastAPI dashboard had started to drift, so the platform needed shared analysis and persistence without a rewrite.",
    approach: [
      "Created a shared AnalysisPipeline service so offline PCAP analysis and live capture use the same packet summary, flow tracking, alert generation, report, and runtime-metrics path.",
      "Added a configurable SQLite persistence layer for runs, flows, alerts, DPI artifacts, and metrics so the dashboard prefers database state instead of guessing from the latest report file.",
      "Defined a normalized packet schema, parser parity tests, golden detection fixtures, and benchmark scripts for parser throughput, memory, detection latency, report latency, and SQLite write latency.",
      "Redesigned the dashboard into a compact command center with Overview, Incidents, Traffic, Intel, Operations, and Report tabs, lazy report and Mermaid rendering, and lightweight stats polling."
    ],
    result:
      "Enterprise NIDS now has a shared analysis core, SQLite-first dashboard state, deterministic fixture coverage, benchmark output, and a faster first viewport: the initial dashboard render dropped to 393 DOM nodes with no Mermaid or Markdown report work until those tabs open.",
    outcomes: [
      "Offline PCAP replay and live capture now call the same analysis pipeline instead of duplicating behavior.",
      "SQLite stores the run, flow, alert, DPI artifact, and metric state that the dashboard reads by default.",
      "The UI avoids heavy hidden work by polling lightweight stats every 15 seconds and loading report markdown or Mermaid diagrams only when the matching tab is opened.",
      "Validation includes 69 passing unit/API/frontend-structure tests plus a benchmark run on the demo PCAP."
    ],
    metrics: [
      { value: "69 tests", label: "Unit, API, fixture, persistence, benchmark, and frontend-structure coverage" },
      { value: "393 nodes", label: "Measured initial dashboard DOM after command-center redesign" },
      { value: "26.8 KB", label: "Dashboard payload when report content is excluded from the normal refresh path" }
    ],
    architecture: [
      "Packet ingestion adapters emit normalized packet dictionaries before AnalysisPipeline builds summaries, tracks flows, runs detectors, records parser errors, and emits runtime metrics.",
      "The persistence layer writes run, flow, alert, DPI artifact, and metric records inside explicit transactions with a configurable database path for tests and local operation.",
      "Report files remain generated artifacts, while the FastAPI dashboard reads SQLite state first and loads heavier markdown or Mermaid views only through progressive tabs."
    ],
    tradeoffs: [
      "Kept the existing FastAPI/static-dashboard architecture instead of introducing a frontend framework for one performance pass.",
      "Kept reports as artifacts rather than primary dashboard state so manual uploads, replay, and live capture have a consistent source of truth.",
      "Scoped detection work to precision improvements and deterministic fixtures, without claiming production-grade fingerprinting or full stream-forensics accuracy."
    ],
    stack: ["Python", "FastAPI", "SQLite", "Scapy", "DPKT", "Mermaid", "GitHub Actions"],
    media: {
      src: "/media/enterprise-nids-platform.svg",
      alt: "Diagram of Enterprise NIDS showing normalized packet ingestion, shared analysis, SQLite-backed state, generated artifacts, and a command-center FastAPI dashboard."
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
    title: "SpectreFS: Verified macOS Encrypted Vault",
    featured: true,
    category: "Security Product",
    year: "2026",
    updatedAt: "2026-07-06",
    summary:
      "Built a macOS technical-preview encrypted vault with a C++20 core, SwiftUI app, bundled XPC service, signed share capsules, policy-aware file workflows, and explicit release evidence.",
    impact:
      "Turned a local encryption prototype into a proof-driven security product: authenticated chunk storage, HMAC audit integrity, policy-mediated access, XPC isolation, sender trust, and reports that separate implemented hardening from production-readiness gaps.",
    challenge:
      "Desktop encryption often breaks normal file workflows or hides where plaintext appears. SpectreFS had to keep files usable while being explicit about what is encrypted, what is merely app-mediated, and what still needs OS-level containment.",
    approach: [
      "Designed the vault runtime around OpenSSL-backed scrypt/PBKDF2 compatibility, wrapped master keys, HKDF domain-separated subkeys, per-chunk AES-256-GCM, authenticated manifests, encrypted metadata, and nonce-reuse verification.",
      "Added a bundled `SpectreFSCore.xpc` service with a direct C++ bridge, release-policy enforcement, signed share capsules, sender-key trust, expiration, replay tracking, and Keychain user-presence controls.",
      "Built `spectrefsctl` and SwiftUI workflows for vault operations, policy, audit and health evidence, snapshots, quarantine, protected open, Full Disk Access status, Endpoint Security visibility, and controlled fallback behavior.",
      "Added static, runtime, tamper, auth, E2EE, memory-safety, packaging, signing, and release gates while keeping external review and plaintext-containment limits explicit."
    ],
    result:
      "SpectreFS v0.3 is a hardened technical preview, not production-ready encryption software. The current static audit records 105 implemented features and 0 missing; the retained 115/0 runtime snapshot predates v0.3 and is not presented as current release proof.",
    outcomes: [
      "Core vault demos prove create, put, get, hash-matched recovery, wrong-password failure, plaintext-content absence, plaintext-filename absence, and tamper detection.",
      "Generated reports classify implementation evidence, runtime behavior, packaging posture, and remaining release blockers for review.",
      "The macOS app prefers the XPC boundary and signed release policy, but the writeup avoids claiming endpoint containment or external cryptographic assurance."
    ],
    metrics: [
      { value: "105", label: "Implemented rows in the current static evidence audit" },
      { value: "0 missing", label: "Current static implementation-status result" },
      { value: "v0.3", label: "XPC, signed capsule, trust, policy, and packaging hardening" }
    ],
    architecture: [
      "SwiftUI app -> SpectreFSCore.xpc -> direct C++ bridge -> C++20 vault runtime -> OpenSSL-backed crypto provider -> encrypted chunks.",
      "PBAC, no-FUSE protected open, optional FUSE, HMAC audit chain, manifest verification, repair/quarantine, snapshots, and release gates make access and failure modes inspectable.",
      "Signed release policy controls fallback behavior while the verification harness produces static, runtime, packaging, benchmark, and security reports."
    ],
    tradeoffs: [
      "Kept SpectreFS labeled as a technical preview because there is no external crypto audit, production key lifecycle, or Endpoint Security/system-extension containment yet.",
      "Accepted temporary plaintext workspaces for usable no-FUSE editing, with chmod 700, cleanup, quarantine-on-failure, and clear limits instead of claiming secure deletion or malware resistance.",
      "Separated current static implementation evidence from the older runtime snapshot so v0.3 hardening is not overstated before a fresh release-gate run."
    ],
    stack: ["C++20", "SwiftUI", "OpenSSL", "scrypt", "AES-GCM", "PBAC", "macOS Security"],
    media: {
      src: "/media/spectrefs-vault-system.svg",
      alt: "Diagram of SpectreFS showing a SwiftUI app, spectrefsctl, PBAC, audit chain, vault runtime, crypto provider, and encrypted chunks."
    },
    links: [
      {
        label: "View GitHub repo",
        href: "https://github.com/AtharvaG109/SpectreFs"
      }
    ]
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
  "breachops-cyber-range": {
    lens: "Investigation loop",
    title: "From synthetic telemetry to scored judgment",
    summary:
      "Mission data drives the incident, while pure engines keep consequences and scoring reviewable.",
    nodes: [
      {
        id: "mission",
        label: "Mission",
        role: "Scenario",
        detail: "Validated JSON defines fictional topology, alerts, logs, evidence, actions, deadlines, and answer keys.",
        x: 14,
        y: 30
      },
      {
        id: "investigate",
        label: "Investigate",
        role: "Player",
        detail: "The player triages telemetry, builds an evidence chain, tags tactics, and tracks the evolving timeline.",
        x: 38,
        y: 66
      },
      {
        id: "respond",
        label: "Respond",
        role: "Decision",
        detail: "One-way actions change consequences; destructive choices before preservation reduce forensic quality.",
        x: 62,
        y: 30
      },
      {
        id: "debrief",
        label: "Debrief",
        role: "Learning",
        detail: "Pure scoring produces a five-axis report, missed evidence, damage, and a senior response playbook.",
        x: 84,
        y: 66
      }
    ],
    edges: [
      { from: "mission", to: "investigate", label: "synthetic telemetry" },
      { from: "investigate", to: "respond", label: "evidence + verdict" },
      { from: "respond", to: "debrief", label: "timed consequences" }
    ]
  },
  "focusforge-macos-focus-utility": {
    lens: "Safe input-control path",
    title: "From explicit pause to pointer-safe recovery",
    summary:
      "FocusForge treats recoverability and privacy as product behavior, not footnotes.",
    nodes: [
      {
        id: "intent",
        label: "Intent",
        role: "Control",
        detail: "A menu, status window, schedule, or widget starts a bounded pause with visible duration.",
        x: 14,
        y: 30
      },
      {
        id: "gate",
        label: "Gate",
        role: "Input",
        detail: "A session event tap drops keyboard events only after Accessibility permission succeeds.",
        x: 38,
        y: 66
      },
      {
        id: "recover",
        label: "Recover",
        role: "Safety",
        detail: "Pointer controls remain active so resume, extend, status, and quit paths stay reachable.",
        x: 62,
        y: 30
      },
      {
        id: "privacy",
        label: "Privacy",
        role: "Boundary",
        detail: "App windows request capture exclusion; diagnostics omit typed content and companions remain local.",
        x: 84,
        y: 66
      }
    ],
    edges: [
      { from: "intent", to: "gate", label: "explicit pause state" },
      { from: "gate", to: "recover", label: "keyboard blocked, pointer active" },
      { from: "recover", to: "privacy", label: "local-only controls" }
    ]
  },
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
    lens: "Verified vault",
    title: "From SwiftUI action to verified encrypted chunks",
    summary:
      "The system map emphasizes the measured boundary: app-mediated workflows over client-side authenticated encryption.",
    nodes: [
      {
        id: "swiftui",
        label: "SwiftUI",
        role: "macOS app",
        detail: "Desktop UI delegates sensitive workflows to spectrefsctl JSON commands and keeps raw crypto out of Swift.",
        x: 10,
        y: 34
      },
      {
        id: "ctl",
        label: "spectrefsctl",
        role: "CLI boundary",
        detail: "Vault, auth, policy, protected-open, health, repair, audit, and verification commands pass secrets through stdin.",
        x: 30,
        y: 66
      },
      {
        id: "pbac",
        label: "PBAC",
        role: "Policy",
        detail: "Default-deny rules mediate protected opens and audited access decisions.",
        x: 50,
        y: 34
      },
      {
        id: "runtime",
        label: "Vault runtime",
        role: "C++20 core",
        detail: "Manifest, encrypted metadata, chunks, snapshots, repair, and quarantine stay in the core library.",
        x: 68,
        y: 66
      },
      {
        id: "crypto",
        label: "Crypto provider",
        role: "OpenSSL",
        detail: "scrypt/PBKDF2 compatibility, HKDF subkeys, AES-256-GCM chunks, manifest auth, and HMAC audit chain.",
        x: 88,
        y: 34
      },
      {
        id: "verify",
        label: "Verification",
        role: "Evidence",
        detail: "Static audit, runtime demo, tamper checks, auth demo, E2EE demo, and final reports prove the claim set.",
        x: 74,
        y: 18
      }
    ],
    edges: [
      { from: "swiftui", to: "ctl", label: "JSON commands" },
      { from: "ctl", to: "pbac", label: "policy checks" },
      { from: "pbac", to: "runtime", label: "allowed workflow" },
      { from: "runtime", to: "crypto", label: "AEAD chunks" },
      { from: "runtime", to: "verify", label: "reports + audit" }
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
  "prosthplan-clinical-workstation": {
    displayPriority: 1,
    track: "Product Engineering",
    maturity: "Active local-first iPad product",
    roleFits: ["Product Engineering", "Swift Engineering", "Safety-Critical UX"],
    focusTags: ["SwiftUI", "SwiftData", "Clinical Workflow", "Local-First", "Audit", "Accessibility"],
    proofBadges: ["161 unit tests", "9 UI tests", "Doctor confirmation", "Audit history", "Local-first", "Demo data labeled"],
    outcomeLine:
      "Built a local-first iPad clinical workstation with 170 documented green tests, deterministic support, doctor-confirmation gates, and immutable signed records.",
    readIf:
      "Read this if you care about turning a complex, safety-sensitive workflow into a coherent product without hiding clinical judgment or provenance.",
    proofLine:
      "161 unit + 9 UI tests, 0 failures; every clinical suggestion remains a doctor-reviewed draft and production mode starts empty.",
    evidenceVisual: {
      title: "ProsthPlan safety and release proof",
      label: "Clinical product validation",
      lines: [
        "$ xcodebuild test -scheme ProsthPlan",
        "161 unit + 9 UI / 0 failures",
        "suggestion -> draft -> doctor confirmation",
        "signed document -> immutable -> addendum"
      ],
      caption: "The proof centers on clinician control, local custody, record history, and deterministic behavior."
    }
  },
  "breachops-cyber-range": {
    displayPriority: 3,
    track: "Detection & Response",
    maturity: "Active defensive training product",
    roleFits: ["Security Engineering", "Detection Engineering", "Frontend Engineering"],
    focusTags: ["TypeScript", "Next.js", "Three.js", "SOC Training", "Scoring", "Synthetic Data"],
    proofBadges: ["12 valid missions", "26 tests", "Pure scoring engine", "Timed consequences", "Synthetic telemetry", "3D command center"],
    outcomeLine:
      "Built a synthetic SOC range where evidence handling and response order change incident consequences, backed by 12 validated missions and 26 passing tests.",
    readIf:
      "Read this if you care about teaching defensive judgment through realistic systems instead of static multiple-choice content.",
    proofLine:
      "12 complete missions validate against shared safety rules; 26 engine, graph, scoring, and validator tests pass.",
    evidenceVisual: {
      title: "BreachOps mission proof",
      label: "Defensive range validation",
      lines: [
        "$ npm run validate:missions",
        "12 complete missions / all valid",
        "$ npm test",
        "26 passed"
      ],
      caption: "All hosts, identities, domains, and external IPs are fictional or reserved for documentation."
    }
  },
  "focusforge-macos-focus-utility": {
    displayPriority: 7,
    track: "Product Engineering",
    maturity: "Working native macOS utility",
    roleFits: ["macOS Engineering", "Product Engineering", "Privacy Engineering"],
    focusTags: ["SwiftUI", "Core Graphics", "AppKit", "Accessibility", "Local-Only", "Privacy"],
    proofBadges: ["38 tests", "Fail-open input gate", "Pointer-safe recovery", "Private app windows", "No keylogging", "10 local companions"],
    outcomeLine:
      "Turned safe keyboard suspension into a complete local macOS focus product with 38 passing tests and privacy-aware recovery controls.",
    readIf:
      "Read this if you care about native utilities where permissions, failure behavior, privacy, and small interaction details define product quality.",
    proofLine:
      "38 tests pass across keyboard-gate timing, state, and screen-capture privacy; typed content is never stored.",
    evidenceVisual: {
      title: "FocusForge local proof",
      label: "macOS utility validation",
      lines: [
        "$ swift test --disable-sandbox",
        "38 passed / 0 failures",
        "permission missing -> input passes through",
        "typed content stored: never"
      ],
      caption: "Input blocking stays scoped to the active user session and app-window capture privacy remains best effort."
    }
  },
  "llm-redteam-framework": {
    displayPriority: 5,
    track: "Offensive Security",
    maturity: "Production-grade security CLI",
    roleFits: ["AI Security", "Application Security", "Security Engineering"],
    focusTags: ["Python", "LLM Security", "AppSec", "CI", "SARIF"],
    proofBadges: ["Public repo", "CI gates", "44 tests", "Local lab", "SARIF", "SQLite history"],
    outcomeLine:
      "Turned scattered LLM red-team checks into a repeatable, CI-gated workflow with 44 passing tests and replayable, redacted evidence.",
    readIf:
      "Read this if you care about making AI/LLM security testing repeatable, auditable, and safe to run in CI.",
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
    displayPriority: 6,
    track: "Secure Systems",
    maturity: "Internal-production baseline",
    roleFits: ["Security Engineering", "Backend Engineering", "AI Security"],
    focusTags: ["Python", "FastAPI", "RAG", "Guardrails", "Observability"],
    proofBadges: ["Public repo", "CI gates", "Offline mode", "Graph memory", "Audit logs", "Dashboard"],
    outcomeLine:
      "Shipped an offline-first RAG backend that answers with fail-closed citations and full audit telemetry, validated by 91 passing tests and zero required API keys.",
    readIf:
      "Read this if you care about deploying retrieval systems that stay private, auditable, and defensible in production.",
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
    displayPriority: 11,
    track: "Detection & Response",
    maturity: "Technical preview",
    roleFits: ["Detection Engineering", "Security Engineering", "Go CLI"],
    focusTags: ["Go", "SQLite", "CLI", "Detection", "DFIR"],
    proofBadges: ["Public repo", "Technical preview", "Go CLI", "SQLite", "Markdown reports"],
    outcomeLine:
      "Compressed scattered Windows endpoint artifacts into one analyst-ready attack-chain report through a deterministic, offline diff workflow.",
    readIf:
      "Read this if you care about turning noisy forensic evidence into a clear, reproducible incident timeline.",
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
    displayPriority: 12,
    track: "Systems Depth",
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
    displayPriority: 13,
    track: "Systems Depth",
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
    displayPriority: 8,
    track: "Detection & Response",
    maturity: "GitHub-ready platform",
    roleFits: ["Security Engineering", "Detection Engineering", "Backend Engineering"],
    focusTags: ["Python", "FastAPI", "PCAP", "SQLite", "Dashboard"],
    proofBadges: ["69 tests", "Command center UI", "PCAP replay", "SQLite state", "Benchmarks"],
    proofLine:
      "Shared offline/live analysis, SQLite-first dashboard state, lazy report rendering, golden fixtures, and measured UI performance."
  },
  "patchbot-security-platform": {
    displayPriority: 9,
    track: "Offensive Security",
    maturity: "Product prototype",
    roleFits: ["Application Security", "Security Product", "Automation"],
    focusTags: ["Python", "Playwright", "IAST", "Secret Detection", "SQLCipher"],
    proofBadges: ["IAST", "Secret detection", "Playwright", "SQLCipher"],
    proofLine:
      "Pairs browser-backed exploit confirmation with high-entropy secret detection and tenant-aware storage."
  },
  "sysguard-ebpf-linux-activity-monitor": {
    displayPriority: 10,
    track: "Detection & Response",
    maturity: "Public prototype",
    roleFits: ["Systems Engineering", "Security Engineering", "Linux"],
    focusTags: ["Rust", "eBPF", "Linux", "YAML", "Policy"],
    proofBadges: ["Public repo", "eBPF", "Rust", "YAML policy"],
    proofLine:
      "Linux runtime monitor for exec, file, and connect events with explicit ALLOW, LOG, ALERT, and BLOCK outcomes."
  },
  "spectrefs-encrypted-vault-filesystem": {
    displayPriority: 4,
    track: "Secure Systems",
    maturity: "v0.3 hardening technical preview",
    roleFits: ["Systems Engineering", "Security Product", "macOS"],
    focusTags: ["macOS Security", "Encrypted Vault", "XPC", "Signed Share Capsules", "AEAD", "PBAC", "Release Gates"],
    proofBadges: ["105 static checks", "0 missing", "XPC boundary", "Signed capsules", "Release gates", "External audit pending"],
    proofLine:
      "Static audit records 105 implemented and 0 missing; retained 115/0 runtime proof predates v0.3 and must be regenerated before release claims.",
    evidenceVisual: {
      title: "SpectreFS v0.3 proof status",
      label: "Security boundary evidence",
      lines: [
        "$ tools/spectrefs_feature_audit.py",
        "105 implemented / 0 missing",
        "v0.3 runtime proof: regenerate",
        "external crypto audit: pending"
      ],
      caption: "Current copy separates implemented hardening from retained older runtime evidence and production-readiness blockers."
    }
  },
  "event-ingestion-and-observability-pipeline": {
    displayPriority: 14,
    track: "Secure Systems",
    maturity: "Production work",
    roleFits: ["Backend Engineering", "Platform Engineering", "Observability"],
    focusTags: ["Go", "Python", "OpenTelemetry", "Queues", "Cloud"],
    proofBadges: ["Production rollout", "OpenTelemetry", "Backpressure", "Cloud"],
    proofLine:
      "Backpressure-aware ingestion pipeline with observable queue health, retry behavior, and service boundaries."
  },
  "neonatal-screening-application-publication": {
    displayPriority: 20,
    track: "Research",
    maturity: "Published research",
    roleFits: ["Technical Writing", "Product Thinking", "Research"],
    focusTags: ["Publication", "Healthcare", "Application Design", "Research"],
    proofBadges: ["Published", "Research paper", "Healthcare workflow"],
    proofLine:
      "Formal publication connecting software design, screening workflow, and implementation explanation."
  },
  "ai-security-and-agentic-workflow-automation": {
    displayPriority: 9,
    track: "Offensive Security",
    maturity: "Security research",
    roleFits: ["AI Security", "Security Engineering", "Automation"],
    focusTags: ["Python", "LLM Security", "Agents", "Policy", "Audit"],
    proofBadges: ["AI security", "Policy-first", "Auditable", "Automation"],
    proofLine:
      "Models prompt-injection, tool-use, permission, and audit boundaries for constrained security automation."
  },
  "advanced-binary-research-and-exploit-development": {
    displayPriority: 10,
    track: "Offensive Security",
    maturity: "Research track",
    roleFits: ["Low-Level Debugging", "Security Research", "Systems Engineering"],
    focusTags: ["C/C++", "GDB", "Reverse Engineering", "Memory", "Linux"],
    proofBadges: ["GDB", "Reverse engineering", "Memory analysis", "Patch-ready"],
    proofLine:
      "Uses disassembly and dynamic debugging to connect crash symptoms to memory behavior and remediation."
  },
  "web-vulnerability-research-and-remediation-tooling": {
    displayPriority: 8,
    track: "Offensive Security",
    maturity: "Security tooling",
    roleFits: ["Application Security", "Security Engineering", "CI/CD"],
    focusTags: ["Python", "Semgrep", "CodeQL", "Web Security", "CI/CD"],
    proofBadges: ["Semgrep", "CodeQL", "CI guardrails", "Web security"],
    proofLine:
      "Turns SQL injection and XSS research into repeatable checks and developer-usable remediation guidance."
  },
  "security-monitoring-and-iam-compliance-automation": {
    displayPriority: 11,
    track: "Detection & Response",
    maturity: "Production work",
    roleFits: ["Detection Engineering", "Security Engineering", "IAM"],
    focusTags: ["ELK", "IAM", "TLS", "Compliance", "Automation"],
    proofBadges: ["13+ systems", "ELK", "IAM", "Compliance"],
    proofLine:
      "Centralized security visibility across distributed systems with behavior detections and certificate automation."
  }
};

export const projects = projectRecords.map((project) => {
  const proofMeta = projectProofMetadata[project.slug] ?? {
    displayPriority: 99,
    track: project.category,
    maturity: "Project",
    roleFits: [project.category],
    focusTags: project.stack.slice(0, 4),
    proofBadges: project.stack.slice(0, 3),
    proofLine: project.result
  };

  return {
    ...project,
    systemMap: projectSystemMaps[project.slug],
    ...proofMeta,
    // Outcome-first lead line; fall back to the project's own impact statement.
    outcomeLine: proofMeta.outcomeLine ?? project.impact,
    // Reader-oriented framing; derive from role fits when not authored explicitly.
    readIf:
      proofMeta.readIf ??
      `Read this if you care about ${(proofMeta.roleFits ?? [project.category])
        .slice(0, 2)
        .join(" and ")
        .toLowerCase()}.`
  };
});

export const projectTracks = [
  {
    track: "Product Engineering",
    eyebrow: "Make it useful",
    blurb:
      "Turn complex domains into coherent products: local-first workflows, explicit safety gates, accessible interaction, and evidence-backed delivery."
  },
  {
    track: "Offensive Security",
    eyebrow: "Break it",
    blurb:
      "Find the flaws before someone else does: LLM and AI red-teaming, web and binary exploitation, and exploit confirmation."
  },
  {
    track: "Detection & Response",
    eyebrow: "Catch it",
    blurb:
      "Make attacks legible in production: network detection, DFIR timelines, runtime monitoring, and SIEM automation."
  },
  {
    track: "Secure Systems",
    eyebrow: "Build it",
    blurb:
      "Engineer software that stays defensible: guardrails, encryption, IAM, secure CI/CD, and threat-modeled AI."
  },
  {
    track: "Systems Depth",
    eyebrow: "Prove it",
    blurb:
      "The low-level fluency that keeps the security work honest: compilers, networking, and high-performance services."
  }
];

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
      "Swift",
      "SwiftUI",
      "SwiftData",
      "TypeScript",
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

// Credibility strip: only verifiable, already-referenced credentials.
export const credentials = [
  {
    kind: "Certification",
    label: "OSCP",
    detail: "Offensive Security Certified Professional",
    href: null
  },
  {
    kind: "Graduate degree",
    label: "M.Eng. Cybersecurity",
    detail: "University of Maryland, College Park",
    href: null
  },
  {
    kind: "Publication",
    label: "Peer-reviewed paper",
    detail: "Neonatal screening application, IJRASET",
    href: siteConfig.publication
  },
  {
    kind: "Open source",
    label: "Public repositories",
    detail: "Security and systems projects on GitHub",
    href: siteConfig.github
  }
];

// Maintained "now" snapshot for the dedicated /now page.
export const nowSnapshot = {
  updated: "2026-07-25",
  intro:
    "A short, honestly maintained snapshot of what I am building, studying, and thinking about right now.",
  building: [
    "Expanding ProsthPlan as a local-first iPad clinical workstation while keeping every classification and suggestion doctor-confirmed.",
    "Building BreachOps missions where evidence handling and response order change the defensive outcome.",
    "Hardening FocusForge recovery behavior while keeping every companion local and privacy-preserving."
  ],
  studying: [
    "Safety boundaries for deterministic decision support in high-consequence workflows.",
    "Ways to present complex engineering work clearly without oversharing internal implementation details.",
    "Native macOS and iPad interaction design where privacy and recoverability are part of the architecture."
  ],
  reading: [
    "Incident writeups and post-mortems for systems under real load.",
    "Clinical workflow, local data custody, and human-confirmation design patterns.",
    "Engineering work on operability, evidence quality, and secure-by-default products."
  ]
};

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
      "Much of modern engineering sits behind powerful abstractions, but failures do not respect those layers. Memory state, scheduler behavior, kernel interactions, and binary semantics still decide what a system does under stress.",
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

export function getProjectsByTrack(track, items = projects) {
  return getSortedProjects(items).filter((project) => project.track === track);
}

export function getNewestProject() {
  return [...projects].sort((a, b) => getProjectSortValue(b) - getProjectSortValue(a))[0] ?? null;
}

export function getRecentProjects(limit = 4, items = projects) {
  return [...items]
    .sort((a, b) => getProjectSortValue(b) - getProjectSortValue(a))
    .slice(0, limit);
}

export function getFeaturedProject() {
  return getSortedProjects().find((project) => project.featured) ?? projects[0] ?? null;
}

export function getPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
