import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { ARCHETYPE, KAFKA_LABELS, DANGEROUS_LABELS, STAGE, RISK } from "@/lib/types";
import { RiskPill } from "@/components/RiskPill";

export const metadata: Metadata = {
  title: "Methodology | Agent Protocol Risk",
  description:
    "How we evaluate AI agent protocols. Scoring rubric, decision rules, archetypes, and the Dangerous Protocols framework by Nadia Asparouhova.",
};

function Rule({ label, desc }: { label: string; desc: string }) {
  return (
    <div className="py-3 border-b border-gray-100 last:border-0">
      <div className="text-sm font-semibold text-gray-800">{label}</div>
      <div className="text-sm text-gray-500 mt-1 leading-relaxed">{desc}</div>
    </div>
  );
}

function ScoreRule({ level, criteria }: { level: string; criteria: string }) {
  const map: Record<string, "good" | "warning" | "bad" | "critical"> = {
    Low: "good", Medium: "warning", High: "bad", Critical: "critical",
  };
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-gray-100 last:border-0">
      <div className="shrink-0 pt-0.5">
        <RiskPill risk={map[level]} />
      </div>
      <div className="text-sm text-gray-600 leading-relaxed">{criteria}</div>
    </div>
  );
}

export default function MethodologyPage() {
  return (
    <>
      <Nav />
      <main className="max-w-3xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-400 mb-8 font-mono">
          <Link href="/" className="hover:text-gray-600 transition-colors">
            ← All Protocols
          </Link>
          {" / "}
          <span>Methodology</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
          Methodology
        </h1>
        <p className="text-gray-500 leading-relaxed mb-10">
          How scores are assigned, what the criteria mean, and how to challenge them.
          Every score on this site is an analytical judgment, not a fact — we welcome corrections
          and disagreements via{" "}
          <a
            href="https://github.com"
            className="underline underline-offset-2 text-gray-700 hover:text-gray-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub issues
          </a>
          .
        </p>

        {/* Theoretical foundation */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Theoretical Foundation</h2>
          <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 mb-4">
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              This analysis applies Nadia Asparouhova&rsquo;s framework from{" "}
              <a
                href="https://summerofprotocols.com/dangerous-protocols-web"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-2 text-gray-900"
              >
                Dangerous Protocols
              </a>{" "}
              (Summer of Protocols, 2023) to AI agent infrastructure. Asparouhova argues that protocols
              are &ldquo;procedural systems of social control&rdquo; — and that the most powerful ones are
              invisible. Participants follow them not because they were commanded to, but because they
              believe compliance reflects their authentic selves.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              The emergence of AI agent protocols in 2024–25 is a live instance of Asparouhova&rsquo;s
              &ldquo;Protocolization 2.0&rdquo;: rather than managing data, these protocols manage ideas,
              decisions, and autonomous action at machine speed. Understanding their control dynamics now
              — before they become invisible infrastructure — is the goal.
            </p>
          </div>
          <blockquote className="border-l-4 border-gray-200 pl-4 py-1 text-sm text-gray-500 italic leading-relaxed">
            &ldquo;Protocols are dangerous precisely because they control us so well. Though it may seem
            contradictory, the more powerful a protocol is, the harder it is to understand or explain
            it to others.&rdquo;
            <br />
            <span className="not-italic font-medium text-gray-700 mt-1 block">
              — Nadia Asparouhova
            </span>
          </blockquote>
        </section>

        {/* Kafka Index */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-1">◈ Kafka Index</h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-4">
            Six criteria for identifying bad protocol design — protocols that create complexity instead
            of abstracting it away. Each dimension is scored Low / Medium / High / Critical.
          </p>
          <div className="rounded-xl border border-gray-200 overflow-hidden mb-4">
            {Object.entries(KAFKA_LABELS).map(([key, meta]) => (
              <Rule key={key} label={meta.label} desc={meta.kafkaItem} />
            ))}
          </div>
          <h3 className="text-sm font-bold text-gray-700 mb-2">Exit Cost — Decision Rules</h3>
          <div className="bg-gray-50 rounded-xl border border-gray-200 px-4 py-1">
            <ScoreRule level="Low" criteria="No lock-in. Standard open protocol. Trivial to replace with any alternative." />
            <ScoreRule level="Medium" criteria="Some ecosystem effects (e.g. tooling, community) but technical switching is straightforward." />
            <ScoreRule level="High" criteria="50+ enterprise partners OR dominant market share (>40%) with no credible alternative at comparable scale." />
            <ScoreRule level="Critical" criteria="Financial lock-in (tokens, sunk costs) OR protocol controls access to a market participants cannot afford to leave (merchants must adopt or become invisible)." />
          </div>
        </section>

        {/* Dangerous Protocols */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-1">⚠ Dangerous Protocols Analysis</h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-4">
            Four dimensions evaluating the social control dynamics of each protocol, drawn directly from
            Asparouhova&rsquo;s framework.
          </p>
          <div className="rounded-xl border border-gray-200 overflow-hidden mb-4">
            {Object.entries(DANGEROUS_LABELS).map(([key, meta]) => (
              <Rule key={key} label={meta.label} desc={meta.desc} />
            ))}
          </div>
          <h3 className="text-sm font-bold text-gray-700 mb-2">Control Invisibility — Decision Rules</h3>
          <div className="bg-gray-50 rounded-xl border border-gray-200 px-4 py-1">
            <ScoreRule level="Low" criteria="Protocol mechanisms are explicit, well-documented, and visible in normal operation." />
            <ScoreRule level="Medium" criteria="Some mechanisms are implicit — protocol shapes behavior through defaults or constraints without requiring explicit compliance." />
            <ScoreRule level="High" criteria="Protocol control operates through financial incentives, social norms, or identity without participants recognizing it as external control." />
            <ScoreRule level="Critical" criteria="Protocol control is fully internalized as identity. Participants cannot distinguish protocol compliance from self-expression. Exit feels like self-betrayal." />
          </div>
        </section>

        {/* Archetypes */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Archetypes</h2>
          <div className="grid gap-4">
            {Object.entries(ARCHETYPE).map(([key, a]) => (
              <div
                key={key}
                className="p-4 rounded-xl border"
                style={{ borderColor: `${a.color}30`, background: `${a.color}05` }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span style={{ color: a.color, fontSize: 18 }}>{a.icon}</span>
                  <span className="font-bold text-gray-900">{a.label}</span>
                  <span
                    className="font-mono text-xs px-2 py-0.5 rounded"
                    style={{ background: `${a.color}15`, color: a.color }}
                  >
                    {key === "whitehead" ? "Desirable" : "Undesirable"}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-2">{a.desc}</p>
                <blockquote className="text-xs text-gray-400 italic">
                  &ldquo;{a.quote}&rdquo;
                </blockquote>
              </div>
            ))}
          </div>
        </section>

        {/* Adoption stages */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Adoption Stages</h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-4">
            From Asparouhova&rsquo;s framework. Protocols move through these stages as they mature
            — and become progressively harder to exit as they advance.
          </p>
          <div className="flex flex-col gap-3">
            {Object.entries(STAGE).map(([key, s]) => (
              <div
                key={key}
                className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 bg-gray-50"
              >
                <div className="font-mono font-bold text-2xl text-gray-200">{s.num}</div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{s.label}</div>
                  <div className="text-sm text-gray-500 mt-0.5">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Overall risk */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Overall Risk Score</h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-4">
            The overall risk rating is an editorial judgment, not a mechanical average. It weighs:
          </p>
          <ul className="text-sm text-gray-600 leading-relaxed space-y-2 pl-4 mb-4">
            <li className="list-disc">Exit cost (weighted most heavily — reversibility matters)</li>
            <li className="list-disc">Control invisibility (designed-in opacity is more dangerous than incidental opacity)</li>
            <li className="list-disc">Crisis mindset (urgency-driven adoption is a red flag)</li>
            <li className="list-disc">Protocol redundancy (fragmentation has systemic costs)</li>
          </ul>
          <div className="bg-gray-50 rounded-xl border border-gray-200 px-4 py-1">
            {(["good", "warning", "bad", "critical"] as const).map((r) => (
              <div key={r} className="flex items-start gap-3 py-2.5 border-b border-gray-100 last:border-0">
                <div className="shrink-0 pt-0.5"><RiskPill risk={r} /></div>
                <div className="text-sm text-gray-600 leading-relaxed">
                  {r === "good" && "Protocol design is generally sound. Explicit, debuggable, preserves human agency."}
                  {r === "warning" && "Notable concerns in 1–2 dimensions. Worth monitoring, especially as adoption grows."}
                  {r === "bad" && "Significant control risks. High exit cost or invisible control mechanisms present."}
                  {r === "critical" && "Severe, compounding risks. Financial identity fusion, near-zero exit, or designed opacity. Proceed with eyes open."}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How to contribute */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-3">How to Contribute or Challenge a Score</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            Every score on this site can be challenged. If you believe a dimension is wrong, open
            a GitHub issue with:
          </p>
          <ol className="text-sm text-gray-600 leading-relaxed space-y-2 pl-4 mb-4">
            <li className="list-decimal">Which protocol and dimension you&rsquo;re challenging</li>
            <li className="list-decimal">The score you think it should be</li>
            <li className="list-decimal">Evidence (links, not assertions)</li>
          </ol>
          <p className="text-sm text-gray-500 leading-relaxed">
            To add a new protocol, submit a PR with a new JSON file in{" "}
            <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">
              /data/protocols/
            </code>{" "}
            following the schema in{" "}
            <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">
              /data/schema/protocol.schema.json
            </code>
            .
          </p>
        </section>

        <div className="pt-6 border-t border-gray-200 text-xs text-gray-400 font-mono">
          Framework by{" "}
          <a
            href="https://summerofprotocols.com/dangerous-protocols-web"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600 transition-colors"
          >
            Nadia Asparouhova
          </a>{" "}
          · Summer of Protocols 2023
        </div>
      </main>
    </>
  );
}
