"use client";

import { useMemo, useState } from "react";

const demos = {
  "tinyc-c99-compiler": {
    title: "Compiler bootstrap trace",
    intro: "A compact model of how tinyc moves from source input to tested self-hosting output.",
    modes: ["Compile", "Self-host"],
    events: [
      { time: "parse", label: "C source loaded", signal: "Lexer, parser, and semantic checks build a typed AST", severity: "ok" },
      { time: "lower", label: "IR generated", signal: "Statements become TAC with stack-slot allocation", severity: "ok" },
      { time: "emit", label: "Assembly produced", signal: "x86-64 AT&T output feeds as and cc", severity: "warn" },
      { time: "stage2", label: "Bootstrap compared", signal: "stage1 and stage2 match with linker UUIDs disabled", severity: "ok" }
    ]
  },
  "enterprise-nids-network-detection-platform": {
    title: "Command-center investigation timeline",
    intro: "A compact model of how the NIDS keeps replay, persistence, and dashboard state aligned.",
    modes: ["PCAP replay", "Live capture", "Dashboard"],
    events: [
      { time: "00:00.120", label: "Packets normalized", signal: "Parser adapters emit the shared packet schema", severity: "ok" },
      { time: "00:00.460", label: "Pipeline run", signal: "Offline and live paths share AnalysisPipeline", severity: "ok" },
      { time: "00:00.780", label: "SQLite committed", signal: "Runs, flows, alerts, artifacts, and metrics persist together", severity: "warn" },
      { time: "00:01.020", label: "Dashboard refreshed", signal: "Stats polling updates the command center without hidden report rendering", severity: "ok" }
    ]
  },
  "patchbot-security-platform": {
    title: "Security scan preview",
    intro: "A client-side model of how Patchbot separates noisy findings from confirmed risk.",
    modes: ["IAST confirmation", "Secret scan"],
    events: [
      { time: "step 1", label: "Route discovered", signal: "/admin/export accepts query input", severity: "warn" },
      { time: "step 2", label: "Browser proof", signal: "Playwright confirms reflected payload", severity: "high" },
      { time: "step 3", label: "Secret candidate", signal: "Entropy 4.8, allowlist miss", severity: "warn" },
      { time: "step 4", label: "Developer output", signal: "Fix guidance with reproduction context", severity: "ok" }
    ]
  },
  "sysguard-ebpf-linux-activity-monitor": {
    title: "eBPF policy simulator",
    intro: "A narrow, honest model of how events become ALLOW, LOG, ALERT, or BLOCK outcomes.",
    modes: ["Monitor", "Enforce"],
    events: [
      { time: "execve", label: "/usr/bin/curl", signal: "Rule: network tool execution", severity: "warn" },
      { time: "openat", label: "/etc/ssh/sshd_config", signal: "Rule: sensitive file read", severity: "high" },
      { time: "connect4", label: "203.0.113.24:443", signal: "Rule: outbound block exact IPv4", severity: "high" },
      { time: "emit", label: "JSON output", signal: "Deduped event delivered to operator", severity: "ok" }
    ]
  },
  "spectrefs-encrypted-vault-filesystem": {
    title: "Verified vault flow",
    intro: "A proof-oriented model of client-side authenticated encryption with app-mediated plaintext workflows.",
    modes: ["Runtime proof", "No-FUSE mode"],
    events: [
      { time: "create", label: "Vault created", signal: "OpenSSL-backed scrypt/PBKDF2 compatibility wraps a random master key", severity: "ok" },
      { time: "put/get", label: "AEAD chunks", signal: "Recovered SHA-256 matches and plaintext markers stay out of vault storage", severity: "ok" },
      { time: "tamper", label: "Tamper detected", signal: "Wrong password, chunk mutation, manifest mutation, and audit mutation fail verification", severity: "high" },
      { time: "planned", label: "Next boundary", signal: "XPC helper and E2EE sender signatures remain explicitly planned, not overclaimed", severity: "warn" }
    ]
  }
};

const severityCopy = {
  ok: "Normal",
  warn: "Review",
  high: "High signal"
};

export function ProjectDemo({ slug }) {
  const demo = demos[slug];
  const [activeMode, setActiveMode] = useState(demo?.modes?.[0] ?? "");
  const [activeIndex, setActiveIndex] = useState(0);

  const activeEvent = useMemo(() => demo?.events?.[activeIndex] ?? demo?.events?.[0], [activeIndex, demo]);

  if (!demo) {
    return null;
  }

  return (
    <section className="article-section project-demo-shell" aria-labelledby="project-demo-heading">
      <div className="section-heading project-section-heading">
        <p className="eyebrow">Interactive Demo</p>
        <h2 id="project-demo-heading">{demo.title}</h2>
        <p className="muted">{demo.intro}</p>
      </div>

      <div className="demo-console">
        <div className="demo-toolbar" role="toolbar" aria-label="Demo mode">
          {demo.modes.map((mode) => (
            <button
              key={mode}
              type="button"
              className={`chip ${mode === activeMode ? "chip-active" : ""}`}
              onClick={() => setActiveMode(mode)}
              aria-pressed={mode === activeMode}
            >
              {mode}
            </button>
          ))}
        </div>

        <div className="demo-grid">
          <div className="event-stream" aria-label={`${demo.title} event stream`}>
            {demo.events.map((event, index) => (
              <button
                key={`${event.time}-${event.label}`}
                type="button"
                className={`event-row event-${event.severity} ${index === activeIndex ? "event-row-active" : ""}`}
                onClick={() => setActiveIndex(index)}
              >
                <span>{event.time}</span>
                <strong>{event.label}</strong>
                <em>{severityCopy[event.severity]}</em>
              </button>
            ))}
          </div>

          <div className={`event-detail event-${activeEvent.severity}`}>
            <p className="micro-label">{activeMode}</p>
            <h3>{activeEvent.label}</h3>
            <p>{activeEvent.signal}</p>
            <div className="trace-bar" aria-hidden="true">
              {demo.events.map((event, index) => (
                <span
                  key={`${event.label}-bar`}
                  className={`trace-segment trace-${event.severity} ${index <= activeIndex ? "trace-segment-lit" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
