"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Protocol,
  RISK,
  ARCHETYPE,
  STAGE,
  KAFKA_LABELS,
  DANGEROUS_LABELS,
  RiskLevel,
} from "@/lib/types";
import { RiskPill } from "./RiskPill";
import { ArchetypeBadge } from "./ArchetypeBadge";
import { RiskBar } from "./RiskBar";

// ── Type category helpers ──────────────────────────────────────────────────
const TYPE_FILTERS = [
  "All",
  "Context & Tools",
  "Agent ↔ Agent",
  "Agent ↔ User",
  "Payments",
  "Commerce",
  "Infrastructure",
] as const;

type TypeFilter = (typeof TYPE_FILTERS)[number];

function getCategory(p: Protocol): TypeFilter {
  const t = p.type;
  if (t.includes("Context")) return "Context & Tools";
  if (t.includes("Agent ↔ Agent") || t.includes("Cross-trust") || t.includes("Decentralized") || t.includes("Lightweight")) return "Agent ↔ Agent";
  if (t.includes("Agent ↔ User") || t.includes("UI")) return "Agent ↔ User";
  if (t.includes("Payment")) return "Payments";
  if (t.includes("Commerce")) return "Commerce";
  return "Infrastructure";
}

// ── Inline dimension row ──────────────────────────────────────────────────
function DimensionRow({ label, risk, note }: { label: string; risk: RiskLevel; note: string }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-gray-100 last:border-0">
      <div className="w-20 shrink-0 pt-0.5">
        <RiskPill risk={risk} size="sm" />
      </div>
      <div>
        <div className="text-xs font-semibold text-gray-800 leading-tight">{label}</div>
        <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{note}</div>
      </div>
    </div>
  );
}

// ── Expandable protocol row ───────────────────────────────────────────────
function ProtocolRow({ p, isExpanded, onToggle }: { p: Protocol; isExpanded: boolean; onToggle: () => void }) {
  const arch = ARCHETYPE[p.archetype];
  const stage = STAGE[p.stage];

  return (
    <div
      className="rounded-lg border transition-all duration-150"
      style={{
        borderColor: isExpanded ? "#d1d5db" : "#e5e7eb",
        background: isExpanded ? "#fafafa" : "#ffffff",
      }}
    >
      {/* Header */}
      <div
        onClick={onToggle}
        className="grid items-center gap-3 px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg"
        style={{ gridTemplateColumns: "minmax(160px, 1.6fr) 1fr 110px 90px 120px 28px" }}
      >
        {/* Name + type */}
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-sm text-gray-900">{p.name}</span>
            <span className="text-xs text-gray-400">{p.type}</span>
          </div>
          <div className="text-xs text-gray-400 mt-0.5">{p.by}</div>
        </div>

        {/* Kafka bar */}
        <div>
          <RiskBar items={p.kafkaIndex} />
          <div
            className="font-mono mt-1"
            style={{ fontSize: 9, color: "#9ca3af", letterSpacing: "0.1em" }}
          >
            KAFKA INDEX
          </div>
        </div>

        {/* Archetype */}
        <ArchetypeBadge type={p.archetype} />

        {/* Stage */}
        <div
          className="font-mono text-xs text-gray-500 bg-gray-100 rounded px-2 py-1 text-center"
          style={{ fontSize: 10 }}
        >
          {stage.label.split(" ")[0]} Rules
          <br />
          <span style={{ fontSize: 9, color: "#9ca3af" }}>Stage {stage.num}</span>
        </div>

        {/* Risk */}
        <RiskPill risk={p.overallRisk} />

        {/* Chevron */}
        <div
          className="text-gray-400 text-sm transition-transform duration-200 select-none"
          style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }}
        >
          ▾
        </div>
      </div>

      {/* Expanded detail */}
      {isExpanded && (
        <div className="px-5 pb-5 border-t border-gray-100">
          {/* Summary */}
          <div
            className="mt-4 mb-5 text-sm text-gray-700 leading-relaxed p-4 bg-white rounded-lg"
            style={{ borderLeft: `3px solid ${arch.color}` }}
          >
            <div
              className="font-mono font-bold mb-2"
              style={{ fontSize: 10, color: arch.color, letterSpacing: "0.1em" }}
            >
              {arch.icon} {arch.label.toUpperCase()} ARCHETYPE
            </div>
            {p.summary}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Kafka Index */}
            <div>
              <div
                className="font-mono font-bold mb-3"
                style={{ fontSize: 10, color: "#dc2626", letterSpacing: "0.12em" }}
              >
                ◈ KAFKA INDEX
              </div>
              <div className="bg-white rounded-lg border border-gray-100 px-3 py-1">
                {Object.entries(p.kafkaIndex).map(([key, val]) => (
                  <DimensionRow
                    key={key}
                    label={KAFKA_LABELS[key as keyof typeof KAFKA_LABELS].label}
                    risk={val.risk}
                    note={val.note}
                  />
                ))}
              </div>
            </div>

            {/* Dangerous Protocols */}
            <div>
              <div
                className="font-mono font-bold mb-3"
                style={{ fontSize: 10, color: "#ea580c", letterSpacing: "0.12em" }}
              >
                ⚠ DANGEROUS PROTOCOLS
              </div>
              <div className="bg-white rounded-lg border border-gray-100 px-3 py-1">
                {Object.entries(p.dangerousProtocol).map(([key, val]) => (
                  <DimensionRow
                    key={key}
                    label={DANGEROUS_LABELS[key as keyof typeof DANGEROUS_LABELS].label}
                    risk={val.risk}
                    note={val.note}
                  />
                ))}
              </div>
              {/* Links */}
              <div className="flex gap-3 mt-3">
                <Link
                  href={`/protocols/${p.slug}`}
                  className="text-xs font-semibold text-gray-900 underline underline-offset-2 hover:text-gray-600 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  Full analysis →
                </Link>
                {p.website && (
                  <a
                    href={p.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Website ↗
                  </a>
                )}
                {p.spec && (
                  <a
                    href={p.spec}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Spec ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main dashboard ────────────────────────────────────────────────────────
export function Dashboard({ protocols }: { protocols: Protocol[] }) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<"risk" | "name" | "archetype">("risk");
  const [filter, setFilter] = useState<TypeFilter>("All");
  const [showFramework, setShowFramework] = useState(false);

  const toggle = (slug: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });

  const riskOrder: Record<RiskLevel, number> = { critical: 0, bad: 1, warning: 2, good: 3, neutral: 4 };

  const filtered =
    filter === "All" ? protocols : protocols.filter((p) => getCategory(p) === filter);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "risk") return riskOrder[a.overallRisk] - riskOrder[b.overallRisk];
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "archetype") return a.archetype.localeCompare(b.archetype);
    return 0;
  });

  // Summary stats
  const counts = protocols.reduce(
    (acc, p) => { acc[p.overallRisk] = (acc[p.overallRisk] || 0) + 1; return acc; },
    {} as Record<string, number>
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="font-mono font-bold text-xs tracking-widest text-white bg-black px-2 py-0.5 rounded"
          >
            RISK
          </span>
          <span className="text-xs text-gray-400 font-mono">
            Applying Asparouhova&rsquo;s framework
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          AI Agent Protocol Risk Dashboard
        </h1>
        <p className="text-gray-500 mt-2 text-sm leading-relaxed max-w-2xl">
          Evaluating {protocols.length} agent protocols through Nadia Asparouhova&rsquo;s{" "}
          <a
            href="https://summerofprotocols.com/dangerous-protocols-web"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 text-gray-700 hover:text-gray-900"
          >
            Dangerous Protocols
          </a>{" "}
          lens and Kafka Index. How much control does each protocol exert? How visible is that
          control? How costly is exit?
        </p>

        {/* Summary counts */}
        <div className="flex gap-3 mt-5 flex-wrap">
          {(["critical", "bad", "warning", "good"] as RiskLevel[]).map((r) =>
            counts[r] ? (
              <div
                key={r}
                className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded border"
                style={{
                  color: RISK[r].color,
                  background: RISK[r].bg,
                  borderColor: RISK[r].border,
                }}
              >
                <span className="font-bold">{counts[r]}</span>
                <span>{RISK[r].label} Risk</span>
              </div>
            ) : null
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 mb-6 items-center">
        <button
          onClick={() => setShowFramework(!showFramework)}
          className="text-xs font-semibold px-3 py-1.5 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors font-mono"
        >
          {showFramework ? "Hide" : "Show"} Framework
        </button>

        <span className="text-gray-300">|</span>

        <span className="text-xs text-gray-400 font-mono">Sort:</span>
        {(["risk", "name", "archetype"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSortBy(s)}
            className="text-xs px-3 py-1.5 rounded border transition-colors capitalize font-mono"
            style={{
              borderColor: sortBy === s ? "#111" : "#e5e7eb",
              background: sortBy === s ? "#111" : "transparent",
              color: sortBy === s ? "#fff" : "#6b7280",
              fontWeight: sortBy === s ? 700 : 500,
            }}
          >
            {s}
          </button>
        ))}

        <span className="text-gray-300">|</span>

        {TYPE_FILTERS.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className="text-xs px-3 py-1.5 rounded border transition-colors"
            style={{
              borderColor: filter === t ? "#111" : "#e5e7eb",
              background: filter === t ? "#111" : "transparent",
              color: filter === t ? "#fff" : "#6b7280",
              fontWeight: filter === t ? 700 : 400,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Framework explainer */}
      {showFramework && (
        <div className="grid md:grid-cols-2 gap-4 mb-6 p-5 bg-gray-50 rounded-xl border border-gray-200">
          <div>
            <div
              className="font-mono font-bold mb-2"
              style={{ fontSize: 10, color: "#dc2626", letterSpacing: "0.12em" }}
            >
              ◈ KAFKA INDEX — BAD PROTOCOL DESIGN
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">
              Six criteria for identifying protocols that create complexity instead of reducing it.
              Named after Kafka&rsquo;s labyrinthine bureaucracies.
            </p>
            {Object.values(KAFKA_LABELS).map((k) => (
              <div key={k.label} className="text-xs py-1.5 border-b border-gray-200 last:border-0">
                <span className="font-semibold text-gray-700">{k.label}</span>
                <span className="text-gray-400"> — {k.kafkaItem}</span>
              </div>
            ))}
          </div>
          <div>
            <div
              className="font-mono font-bold mb-2"
              style={{ fontSize: 10, color: "#ea580c", letterSpacing: "0.12em" }}
            >
              ⚠ DANGEROUS PROTOCOLS — SOCIAL CONTROL DYNAMICS
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">
              Four dimensions for evaluating invisible social control. Protocols are &ldquo;dangerous&rdquo;
              because they control us so well — the more powerful, the harder to see.
            </p>
            {Object.values(DANGEROUS_LABELS).map((d) => (
              <div key={d.label} className="text-xs py-1.5 border-b border-gray-200 last:border-0">
                <span className="font-semibold text-gray-700">{d.label}</span>
                <span className="text-gray-400"> — {d.desc}</span>
              </div>
            ))}
            <div className="flex gap-2 mt-4 flex-wrap">
              {Object.values(ARCHETYPE).map((a) => (
                <div
                  key={a.label}
                  className="flex-1 min-w-24 text-xs p-2.5 rounded border"
                  style={{
                    borderColor: `${a.color}30`,
                    background: `${a.color}08`,
                    color: a.color,
                  }}
                >
                  <div className="font-bold">
                    {a.icon} {a.label}
                  </div>
                  <div className="mt-1 text-gray-500" style={{ fontSize: 10 }}>
                    {a.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Column headers */}
      <div
        className="grid items-center gap-3 px-5 mb-2"
        style={{ gridTemplateColumns: "minmax(160px, 1.6fr) 1fr 110px 90px 120px 28px" }}
      >
        {["Protocol", "Kafka Index", "Archetype", "Stage", "Overall Risk", ""].map((h) => (
          <span
            key={h}
            className="font-mono"
            style={{ fontSize: 9.5, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-2">
        {sorted.map((p) => (
          <ProtocolRow
            key={p.slug}
            p={p}
            isExpanded={expanded.has(p.slug)}
            onToggle={() => toggle(p.slug)}
          />
        ))}
      </div>

      {/* Key finding */}
      <div
        className="mt-8 p-5 bg-gray-50 rounded-xl border border-gray-200"
        style={{ borderLeft: "3px solid #ea580c" }}
      >
        <div
          className="font-mono font-bold mb-2"
          style={{ fontSize: 10, color: "#ea580c", letterSpacing: "0.12em" }}
        >
          KEY FINDING
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">
          <strong className="text-gray-900">
            The payment, commerce, and token layers are the most dangerous.
          </strong>{" "}
          Infrastructure protocols (MCP, Goose, ACP, Agent Gateway) score well — they&rsquo;re explicit,
          debuggable, and preserve human agency. But x402, AP2, UCP, and especially ElizaOS follow the
          pattern Asparouhova identifies: protocols designed to be invisible control you most completely.
          ElizaOS is the most Kafkaesque: token economics fuse financial identity with social belonging,
          making exit prohibitively expensive.
        </p>
        <p className="text-xs text-gray-400 mt-3 italic leading-relaxed">
          &ldquo;Protocols are dangerous precisely because they control us so well. Though it may seem
          contradictory, the more powerful a protocol is, the harder it is to understand or explain it
          to others.&rdquo; — Nadia Asparouhova, <em>Dangerous Protocols</em>
        </p>
      </div>

      {/* Footer */}
      <div className="mt-10 pt-6 border-t border-gray-200 flex justify-between items-center text-xs text-gray-400">
        <span className="font-mono">
          {protocols.length} protocols · Last updated {protocols[0]?.lastUpdated}
        </span>
        <a
          href="https://summerofprotocols.com/dangerous-protocols-web"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-600 transition-colors"
        >
          Framework by Nadia Asparouhova ↗
        </a>
      </div>
    </div>
  );
}
