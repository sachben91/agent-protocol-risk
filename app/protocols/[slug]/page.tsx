import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllProtocols, getProtocolBySlug } from "@/lib/protocols";
import {
  RISK,
  ARCHETYPE,
  STAGE,
  KAFKA_LABELS,
  DANGEROUS_LABELS,
  Protocol,
  RiskLevel,
} from "@/lib/types";
import { Nav } from "@/components/Nav";
import { RiskPill } from "@/components/RiskPill";
import { ArchetypeBadge } from "@/components/ArchetypeBadge";

export async function generateStaticParams() {
  const protocols = getAllProtocols();
  return protocols.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProtocolBySlug(slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.fullName} | Agent Protocol Risk`,
    description: p.summary.slice(0, 155) + "...",
  };
}

function SectionHeader({ color, label }: { color: string; label: string }) {
  return (
    <div
      className="font-mono font-bold mb-4"
      style={{ fontSize: 10, color, letterSpacing: "0.12em" }}
    >
      {label}
    </div>
  );
}

function DimensionCard({
  label,
  desc,
  risk,
  note,
}: {
  label: string;
  desc: string;
  risk: RiskLevel;
  note: string;
}) {
  const r = RISK[risk];
  return (
    <div
      className="p-4 rounded-lg border"
      style={{ borderColor: `${r.color}30`, background: `${r.color}05` }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <div className="text-sm font-semibold text-gray-900">{label}</div>
          <div className="text-xs text-gray-400 mt-0.5">{desc}</div>
        </div>
        <RiskPill risk={risk} />
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{note}</p>
    </div>
  );
}

export default async function ProtocolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProtocolBySlug(slug);
  if (!p) notFound();

  const arch = ARCHETYPE[p.archetype];
  const stage = STAGE[p.stage];
  const risk = RISK[p.overallRisk];

  // Compute a simple overall Kafka score
  const riskValues: Record<RiskLevel, number> = { good: 0, warning: 1, bad: 2, critical: 3, neutral: 0 };
  const toNum = (r: RiskLevel) => riskValues[r];
  const kafkaAvg =
    Object.values(p.kafkaIndex).reduce((s, d) => s + toNum(d.risk), 0) /
    Object.values(p.kafkaIndex).length;
  const dangerAvg =
    Object.values(p.dangerousProtocol).reduce((s, d) => s + toNum(d.risk), 0) /
    Object.values(p.dangerousProtocol).length;

  return (
    <>
      <Nav />
      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-8 font-mono">
          <Link href="/" className="hover:text-gray-600 transition-colors">
            ← All Protocols
          </Link>
          <span>/</span>
          <span>{p.name}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-start gap-3 mb-4">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              {p.fullName}
            </h1>
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            <span className="font-mono text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {p.name}
            </span>
            <span className="font-mono text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {p.by}
            </span>
            <span className="font-mono text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {p.type}
            </span>
            <span className="font-mono text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {p.maturity}
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mb-5">
            <RiskPill risk={p.overallRisk} />
            <ArchetypeBadge type={p.archetype} />
            <span
              className="inline-flex items-center gap-1.5 font-mono text-xs px-2 py-1 rounded border"
              style={{ borderColor: "#d1d5db", color: "#6b7280" }}
            >
              Stage {stage.num}: {stage.label}
            </span>
          </div>

          {/* Links */}
          <div className="flex gap-4">
            {p.website && (
              <a
                href={p.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 underline underline-offset-2 hover:text-gray-900 transition-colors"
              >
                Website ↗
              </a>
            )}
            {p.spec && (
              <a
                href={p.spec}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 underline underline-offset-2 hover:text-gray-900 transition-colors"
              >
                Specification ↗
              </a>
            )}
          </div>
        </div>

        {/* Summary card */}
        <div
          className="p-5 rounded-xl mb-8"
          style={{
            borderLeft: `4px solid ${arch.color}`,
            background: `${arch.color}06`,
            border: `1px solid ${arch.color}20`,
            borderLeftWidth: 4,
            borderLeftColor: arch.color,
          }}
        >
          <div
            className="font-mono font-bold mb-2"
            style={{ fontSize: 10, color: arch.color, letterSpacing: "0.1em" }}
          >
            {arch.icon} {arch.label.toUpperCase()} — {arch.desc.toUpperCase()}
          </div>
          <p className="text-gray-700 leading-relaxed">{p.summary}</p>
          <div className="mt-3 pt-3 border-t text-xs text-gray-400 italic" style={{ borderColor: `${arch.color}20` }}>
            &ldquo;{arch.quote}&rdquo;
          </div>
        </div>

        {/* Score overview bar */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
            <div className="text-xs font-mono text-gray-400 mb-1 tracking-wider">KAFKA INDEX SCORE</div>
            <div className="text-2xl font-bold font-mono" style={{ color: RISK[["good","good","warning","bad"][Math.round(kafkaAvg)] as RiskLevel]?.color }}>
              {["Low", "Low", "Medium", "High"][Math.round(kafkaAvg)]}
            </div>
            <div className="text-xs text-gray-400 mt-1">avg. across 6 dimensions</div>
          </div>
          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
            <div className="text-xs font-mono text-gray-400 mb-1 tracking-wider">DANGEROUS PROTOCOLS SCORE</div>
            <div className="text-2xl font-bold font-mono" style={{ color: RISK[["good","good","warning","bad"][Math.round(dangerAvg)] as RiskLevel]?.color }}>
              {["Low", "Low", "Medium", "High"][Math.round(dangerAvg)]}
            </div>
            <div className="text-xs text-gray-400 mt-1">avg. across 4 dimensions</div>
          </div>
        </div>

        {/* Kafka Index */}
        <div className="mb-8">
          <SectionHeader color="#dc2626" label="◈ KAFKA INDEX — COMPLEXITY & DESIGN RISK" />
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            Evaluates whether the protocol creates complexity instead of reducing it. Named after
            Kafka&rsquo;s labyrinthine bureaucracies that trap participants in systems they can&rsquo;t
            understand or escape.
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {Object.entries(p.kafkaIndex).map(([key, val]) => {
              const meta = KAFKA_LABELS[key as keyof typeof KAFKA_LABELS];
              return (
                <DimensionCard
                  key={key}
                  label={meta.label}
                  desc={meta.kafkaItem}
                  risk={val.risk}
                  note={val.note}
                />
              );
            })}
          </div>
        </div>

        {/* Dangerous Protocols */}
        <div className="mb-8">
          <SectionHeader color="#ea580c" label="⚠ DANGEROUS PROTOCOLS ANALYSIS — SOCIAL CONTROL" />
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            Evaluates the social control dynamics of the protocol. Protocols are &ldquo;dangerous&rdquo;
            because they control us so well — the more powerful, the harder to see. Based on Nadia
            Asparouhova&rsquo;s research at the Summer of Protocols 2023.
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {Object.entries(p.dangerousProtocol).map(([key, val]) => {
              const meta = DANGEROUS_LABELS[key as keyof typeof DANGEROUS_LABELS];
              return (
                <DimensionCard
                  key={key}
                  label={meta.label}
                  desc={meta.desc}
                  risk={val.risk}
                  note={val.note}
                />
              );
            })}
          </div>
        </div>

        {/* Protocol adoption stage */}
        <div className="mb-8 p-5 rounded-xl border border-gray-200 bg-gray-50">
          <SectionHeader color="#6b7280" label="◎ ADOPTION STAGE" />
          <div className="flex gap-2">
            {(["explicit", "social", "identity"] as const).map((s) => {
              const st = STAGE[s];
              const active = s === p.stage;
              return (
                <div
                  key={s}
                  className="flex-1 p-3 rounded-lg border text-center transition-all"
                  style={{
                    borderColor: active ? "#111" : "#e5e7eb",
                    background: active ? "#111" : "#fff",
                    color: active ? "#fff" : "#9ca3af",
                  }}
                >
                  <div className="font-mono font-bold" style={{ fontSize: 10 }}>
                    STAGE {st.num}
                  </div>
                  <div className="text-xs font-semibold mt-1">{st.label}</div>
                  <div className="text-xs mt-1 opacity-70 leading-tight">{st.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Metadata footer */}
        <div className="pt-6 border-t border-gray-200 flex justify-between items-center text-xs text-gray-400 font-mono">
          <span>Last updated: {p.lastUpdated}</span>
          <Link href="/methodology" className="hover:text-gray-600 transition-colors">
            How scores are assigned →
          </Link>
        </div>
      </main>
    </>
  );
}
