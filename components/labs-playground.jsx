"use client";

import { useMemo, useState } from "react";

import { validateDecodedText, validateUserInput } from "@/lib/input-security";

const sampleJwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InBvcnRmb2xpby1kZW1vIn0.eyJzdWIiOiJzYW5pdGl6ZWQtdXNlciIsInJvbGUiOiJyZWFkZXIiLCJzY29wZSI6ImFydGlmYWN0OnJlYWQiLCJleHAiOjE5MDAwMDAwMDB9.signature";
const sampleLog =
  "2026-04-20T18:42:11Z WARN nids flow=198.51.100.42:443 ja3=ab12 anomaly=0.82 action=review";
const sampleRule = "action=review OR anomaly>=0.75";

function decodeBase64Url(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");

  if (typeof globalThis.atob === "function") {
    return globalThis.atob(padded);
  }

  if (typeof Buffer !== "undefined") {
    return Buffer.from(padded, "base64").toString("utf8");
  }

  throw new Error("No base64 decoder available");
}

function safeJson(value) {
  try {
    return JSON.stringify(JSON.parse(value), null, 2);
  } catch {
    return value;
  }
}

function parseLog(value) {
  const parts = value.trim().split(/\s+/);
  const fields = {};

  for (const part of parts) {
    const [key, ...rest] = part.split("=");
    if (rest.length) {
      fields[key] = rest.join("=");
    }
  }

  return {
    timestamp: parts[0] ?? "",
    level: parts[1] ?? "",
    source: parts[2] ?? "",
    fields
  };
}

function scoreRisk({ impact, likelihood, exploitability }) {
  const score = Math.min(10, Math.round(((impact * 0.45 + likelihood * 0.35 + exploitability * 0.2) / 10) * 100) / 10);

  if (score >= 8) {
    return { score, label: "Critical review" };
  }

  if (score >= 6) {
    return { score, label: "High priority" };
  }

  if (score >= 3) {
    return { score, label: "Moderate" };
  }

  return { score, label: "Low" };
}

export function LabsPlayground() {
  const [jwt, setJwt] = useState(sampleJwt);
  const [logLine, setLogLine] = useState(sampleLog);
  const [rule, setRule] = useState(sampleRule);
  const [risk, setRisk] = useState({ impact: 8, likelihood: 7, exploitability: 6 });
  const [packetMode, setPacketMode] = useState("tls");
  const [inputWarning, setInputWarning] = useState("");

  function updateSafeInput(nextValue, setter, options) {
    const result = validateUserInput(nextValue, options);

    if (!result.ok) {
      setInputWarning(result.message);
      return;
    }

    setInputWarning("");
    setter(result.value);
  }

  const jwtDecoded = useMemo(() => {
    const [header = "", payload = ""] = jwt.split(".");

    try {
      const decodedHeader = safeJson(decodeBase64Url(header));
      const decodedPayload = safeJson(decodeBase64Url(payload));
      const headerSafety = validateDecodedText(decodedHeader, "Decoded JWT header");
      const payloadSafety = validateDecodedText(decodedPayload, "Decoded JWT payload");

      if (!headerSafety.ok || !payloadSafety.ok) {
        return {
          header: "Blocked unsafe decoded header",
          payload: "Blocked unsafe decoded payload",
          validShape: false,
          warning: headerSafety.message || payloadSafety.message
        };
      }

      return {
        header: decodedHeader,
        payload: decodedPayload,
        validShape: jwt.split(".").length === 3,
        warning: ""
      };
    } catch {
      return {
        header: "Unable to decode header",
        payload: "Unable to decode payload",
        validShape: false,
        warning: ""
      };
    }
  }, [jwt]);

  const parsedLog = useMemo(() => parseLog(logLine), [logLine]);
  const ruleMatch = useMemo(() => {
    const anomaly = Number(parsedLog.fields.anomaly ?? 0);
    return rule.includes("action=review") && parsedLog.fields.action === "review"
      ? "Matched action=review"
      : anomaly >= 0.75
        ? "Matched anomaly threshold"
        : "No match";
  }, [parsedLog, rule]);
  const riskScore = useMemo(() => scoreRisk(risk), [risk]);
  const packetSteps =
    packetMode === "tls"
      ? ["Client hello", "JA3 fingerprint", "Certificate metadata", "Encrypted application data", "Detection summary"]
      : ["SYN", "SYN/ACK", "HTTP request", "Header parsing", "Rule evaluation"];

  return (
    <div className="labs-playground">
      <section className="surface lab-tool lab-tool-wide">
        <div className="lab-tool-head">
          <p className="eyebrow">JWT Inspector</p>
          <h2>Decode headers and claims without sending data anywhere.</h2>
        </div>
        <textarea
          value={jwt}
          onChange={(event) =>
            updateSafeInput(event.target.value, setJwt, {
              label: "JWT input",
              maxLength: 4096,
              allowPattern: /^[A-Za-z0-9._-]*$/,
              allowMultiline: false
            })
          }
          aria-label="JWT value"
          maxLength="4096"
        />
        <div className="lab-output-grid">
          <pre>{jwtDecoded.header}</pre>
          <pre>{jwtDecoded.payload}</pre>
        </div>
        <p className={jwtDecoded.validShape ? "lab-status lab-status-ok" : "lab-status lab-status-warn"}>
          {jwtDecoded.warning ||
            (jwtDecoded.validShape ? "Three-part token shape detected." : "Token does not look like header.payload.signature.")}
        </p>
      </section>

      <section className="surface lab-tool">
        <div className="lab-tool-head">
          <p className="eyebrow">Log Parser</p>
          <h2>Turn one operational line into fields.</h2>
        </div>
        <textarea
          value={logLine}
          onChange={(event) =>
            updateSafeInput(event.target.value, setLogLine, {
              label: "Log input",
              maxLength: 1200,
              allowMultiline: true
            })
          }
          aria-label="Log line"
          maxLength="1200"
        />
        <pre>{JSON.stringify(parsedLog, null, 2)}</pre>
      </section>

      <section className="surface lab-tool">
        <div className="lab-tool-head">
          <p className="eyebrow">Detection Matcher</p>
          <h2>Preview a rule against parsed event state.</h2>
        </div>
        <input
          value={rule}
          onChange={(event) =>
            updateSafeInput(event.target.value, setRule, {
              label: "Detection rule",
              maxLength: 240
            })
          }
          aria-label="Detection rule"
          maxLength="240"
        />
        <div
          className="lab-result"
          data-status={ruleMatch.startsWith("Matched") ? "hit" : "miss"}
          key={ruleMatch}
        >
          <strong>{ruleMatch}</strong>
          <span>Rule input stays local in the browser.</span>
        </div>
      </section>

      {inputWarning ? (
        <section className="surface lab-tool lab-tool-wide lab-security-warning" role="alert">
          <div className="lab-tool-head">
            <p className="eyebrow">Input Guard</p>
            <h2>Potentially unsafe input blocked.</h2>
          </div>
          <p>{inputWarning}</p>
        </section>
      ) : null}

      <section className="surface lab-tool">
        <div className="lab-tool-head">
          <p className="eyebrow">Risk Scorer</p>
          <h2>Estimate priority from impact and exploitability.</h2>
        </div>
        {Object.entries(risk).map(([key, value]) => (
          <label key={key} className="lab-slider">
            <span>{key}</span>
            <input
              type="range"
              min="0"
              max="10"
              value={value}
              onChange={(event) => setRisk((current) => ({ ...current, [key]: Number(event.target.value) }))}
            />
            <strong>{value}</strong>
          </label>
        ))}
        <div
          className="lab-result"
          data-status={riskScore.score >= 8 ? "critical" : riskScore.score >= 6 ? "high" : "calm"}
          key={riskScore.score}
        >
          <strong>{riskScore.score}/10</strong>
          <span>{riskScore.label}</span>
        </div>
      </section>

      <section className="surface lab-tool">
        <div className="lab-tool-head">
          <p className="eyebrow">Packet Flow</p>
          <h2>Explain the shape of a network exchange.</h2>
        </div>
        <div className="chip-row" role="toolbar" aria-label="Packet mode">
          {["tls", "http"].map((mode) => (
            <button
              key={mode}
              type="button"
              className={`chip ${packetMode === mode ? "chip-active" : ""}`}
              onClick={() => setPacketMode(mode)}
              aria-pressed={packetMode === mode}
            >
              {mode.toUpperCase()}
            </button>
          ))}
        </div>
        <ol className="flow-list">
          {packetSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="surface lab-tool lab-tool-wide">
        <div className="lab-tool-head">
          <p className="eyebrow">CI Security Preview</p>
          <h2>A compact gate model for portfolio-quality delivery.</h2>
        </div>
        <div className="ci-grid">
          {[
            ["Static build", "pass"],
            ["Content validation", "pass"],
            ["Accessibility smoke", "review"],
            ["Secret scan", "pass"],
            ["Link check", "review"]
          ].map(([label, status]) => (
            <div key={label} className={`ci-check ci-${status}`}>
              <strong>{label}</strong>
              <span>{status}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
