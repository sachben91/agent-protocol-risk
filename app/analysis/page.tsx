import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Analysis | Agent Protocol Risk",
  description:
    "Mapping the Power Grid — Nadia Asparouhova's Dangerous Protocols framework applied to AI agent infrastructure. Common patterns, a 2x2 model, and what it all means.",
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-3 mt-12">
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-bold text-gray-800 mt-6 mb-2">{children}</h3>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-gray-600 leading-relaxed mb-4">{children}</p>
  );
}

function Quote({
  text,
  attribution,
}: {
  text: string;
  attribution?: string;
}) {
  return (
    <blockquote className="border-l-4 border-gray-200 pl-4 py-1 my-6 text-sm text-gray-500 italic leading-relaxed">
      &ldquo;{text}&rdquo;
      {attribution && (
        <span className="not-italic font-medium text-gray-700 mt-1 block">
          — {attribution}
        </span>
      )}
    </blockquote>
  );
}

function Callout({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 my-6">
      <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
        {label}
      </div>
      <div className="text-sm text-gray-700 leading-relaxed">{children}</div>
    </div>
  );
}

function PatternCard({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
      <div className="shrink-0 font-mono font-bold text-2xl text-gray-200 w-8">
        {number}
      </div>
      <div>
        <div className="font-bold text-gray-900 text-sm mb-1">{title}</div>
        <div className="text-sm text-gray-600 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

/* ── 2×2 Grid ── */
function GridCell({
  quadrant,
  title,
  description,
  protocols,
  accent,
}: {
  quadrant: string;
  title: string;
  description: string;
  protocols: string[];
  accent: string;
}) {
  return (
    <div
      className="p-5 rounded-xl border"
      style={{ borderColor: `${accent}30`, background: `${accent}06` }}
    >
      <div
        className="text-xs font-mono font-bold uppercase tracking-widest mb-1"
        style={{ color: accent }}
      >
        {quadrant}
      </div>
      <div className="font-bold text-gray-900 text-sm mb-2">{title}</div>
      <p className="text-xs text-gray-500 leading-relaxed mb-3">
        {description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {protocols.map((p) => (
          <span
            key={p}
            className="font-mono text-xs px-2 py-0.5 rounded border"
            style={{
              borderColor: `${accent}40`,
              color: accent,
              background: `${accent}10`,
            }}
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function AnalysisPage() {
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
          <span>Analysis</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
          Mapping the Power Grid
        </h1>
        <p className="text-gray-500 leading-relaxed mb-2">
          Nadia Asparouhova&rsquo;s{" "}
          <a
            href="https://summerofprotocols.com/dangerous-protocols-web"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 text-gray-700 hover:text-gray-900"
          >
            Dangerous Protocols
          </a>{" "}
          framework applied to 15 AI agent protocols — what patterns emerge, what
          it reveals about the industry, and a simple model for thinking about
          protocol risk.
        </p>
        <div className="text-xs text-gray-400 font-mono mb-10">
          February 2026 · 15 protocols analyzed
        </div>

        {/* ── SECTION 1 ── */}
        <SectionHeading>
          1. The Framework: What Nadia Asparouhova Got Right
        </SectionHeading>

        <Body>
          In 2023, Nadia Asparouhova published{" "}
          <em>Dangerous Protocols</em> as part of the Summer of Protocols
          research program. The essay makes a deceptively simple argument:
          protocols are not neutral infrastructure. They are &ldquo;procedural
          systems of social control&rdquo; — and the most powerful ones are the
          most invisible. Participants follow them not because they were
          commanded to, but because they believe compliance reflects their
          authentic selves.
        </Body>

        <Quote
          text="Protocols are dangerous precisely because they control us so well. Though it may seem contradictory, the more powerful a protocol is, the harder it is to understand or explain it to others."
          attribution="Nadia Asparouhova, Dangerous Protocols (2023)"
        />

        <Body>
          Asparouhova&rsquo;s framework gives us three analytical tools. First,
          three <strong>archetypes</strong> that describe the power balance
          between a protocol and its participants: Whitehead (balanced, serves
          civilization), Bartleby (participants hold too much power, resisting
          coordination), and Kafka (protocol holds too much power, trapping
          participants in a maze they cannot understand or escape). Second,
          three <strong>stages of protocol entrenchment</strong>: Explicit Rules
          (opt-in, transparent), Social Expectation (peer-enforced, unwritten),
          and Identity Layer (internalized as self-expression). Third, two
          analytical lenses — the{" "}
          <strong>Kafka Index</strong> (six dimensions of bad protocol design:
          feedback loop quality, edge case sprawl, outcome ambiguity, redundancy,
          recursive nesting, and exit cost) and the{" "}
          <strong>Dangerous Protocols dimensions</strong> (four dimensions of
          social control: identity penetration, agency preservation, control
          invisibility, and crisis mindset).
        </Body>

        <Body>
          Together, these tools let us ask two related but distinct questions of
          any protocol: Is it well-designed? And — separately — is it safe?
          A protocol can be technically elegant and socially dangerous. Or
          technically clunky but relatively harmless. The framework holds both
          questions simultaneously.
        </Body>

        {/* ── SECTION 2 ── */}
        <SectionHeading>
          2. Why This Framework Is Especially Apt for AI Agents
        </SectionHeading>

        <Body>
          Asparouhova wrote her framework with human participants in mind.
          People follow protocols imperfectly. They push back. They feel
          uncomfortable and hesitate. They sometimes notice when compliance no
          longer feels like themselves. AI agents do none of this — and that
          makes her framework more urgent, not less applicable.
        </Body>

        <Body>
          Consider what changes when the protocol participant is an agent rather
          than a person:
        </Body>

        <Callout label="Why agents amplify protocol danger">
          <ul className="space-y-2">
            <li>
              <strong className="text-gray-900">Perfect compliance accelerates danger.</strong>{" "}
              Human participants have friction — social pushback, the capacity to
              say &ldquo;this feels wrong.&rdquo; Agents don&rsquo;t. They
              execute what the protocol prescribes, perfectly and at scale.
              There is no felt discomfort to serve as an early warning signal.
            </li>
            <li>
              <strong className="text-gray-900">Machine speed compresses the window for correction.</strong>{" "}
              A human merchant slowly realizes they&rsquo;re locked into a
              platform over months. An agent running 10,000 transactions per
              hour can embed a protocol deeply before any human notices.
            </li>
            <li>
              <strong className="text-gray-900">The principal hierarchy is stretched thin.</strong>{" "}
              Human oversight of agents is already difficult. When the protocols
              governing agents are themselves invisible, the oversight problem
              compounds. You must now understand what your agent is doing{" "}
              <em>and</em> the invisible constraints the protocol imposes on how
              it does it.
            </li>
            <li>
              <strong className="text-gray-900">Agents cannot exit on their own.</strong>{" "}
              Asparouhova worries about humans who cannot leave protocols because
              they have internalized them as identity. Agents are worse: they
              literally cannot exit unless their principals explicitly reprogram
              them. There is no agent equivalent of quiet quitting.
            </li>
          </ul>
        </Callout>

        <Body>
          The emergence of AI agent protocols in 2024–25 is precisely
          Asparouhova&rsquo;s &ldquo;Protocolization 2.0&rdquo;: rather than
          managing data exchanges between humans, these protocols manage
          decisions, autonomous actions, and financial transactions at machine
          speed. The stakes are higher, the invisibility compounds faster, and
          the window for legibility is shorter.
        </Body>

        {/* ── SECTION 3 ── */}
        <SectionHeading>3. What the Analysis Reveals — Case Studies</SectionHeading>

        <Body>
          Applying the framework to 15 active AI agent protocols surfaces a
          landscape that is more varied — and more legible — than the breathless
          coverage suggests. Most protocols are still at Asparouhova&rsquo;s
          Stage 1: participants know what they&rsquo;re opting into. But the
          data already shows where the pressure is building.
        </Body>

        <SubHeading>MCP: The Benign Hegemon</SubHeading>
        <Body>
          Anthropic&rsquo;s Model Context Protocol scores low overall risk —
          clean primitives, deterministic tool invocation, clear request/response.
          But it earns &ldquo;warning&rdquo; on both identity penetration and
          control invisibility, and those scores deserve attention. MCP now has
          over 100,000 GitHub stars and deep ecosystem integration across every
          major AI development tool. The switching cost is not technical —
          replacing MCP is straightforward. The cost is social: you would leave
          a community, an identity, a shared vocabulary. That&rsquo;s the
          QWERTY problem. More subtly, MCP&rsquo;s design choices — its four
          primitives, its transport assumptions, its tool-calling model — quietly
          constrain what developers think to build. &ldquo;You build what MCP
          makes easy.&rdquo; This is Asparouhova&rsquo;s invisible control
          operating at the architectural level.
        </Body>

        <SubHeading>ACP: The Counter-Example</SubHeading>
        <Body>
          IBM&rsquo;s Agent Communication Protocol, now under the Linux
          Foundation, is the cleanest protocol in the dataset across all four
          dangerous dimensions: good on identity penetration, agency
          preservation, control invisibility, and crisis mindset. It
          achieves this through deliberate design minimalism — REST-native, no
          SDK required, works with curl. REST is the most visible, most
          well-understood protocol pattern in software. There is nothing hidden
          because there is nothing to hide. ACP shows what a Whitehead protocol
          actually looks like in practice: it abstracts complexity without
          creating new complexity, and it makes no claim on the developer&rsquo;s
          identity.
        </Body>

        <SubHeading>ElizaOS: Asparouhova&rsquo;s Nightmare, Realized</SubHeading>
        <Body>
          ElizaOS is the most Kafkaesque protocol in the analysis and the only
          one scoring &ldquo;critical&rdquo; across multiple dimensions.
          It is a TypeScript agent framework with 90+ plugins, deeply integrated
          with blockchain, DeFi, and a token economy. The $ELIZAOS token
          (representing an ecosystem with $20B+ market cap at peak) creates
          the exact dynamic Asparouhova warns about most: financial identity
          fusion. &ldquo;I&rsquo;m an ElizaOS builder&rdquo; is not a technical
          description — it is a financial position and a social community
          simultaneously. Selling the token means exiting the network means
          losing belonging. Control is invisible because it operates through
          financial incentives nobody experiences as external coercion. You think
          you&rsquo;re investing. You&rsquo;re being protocolized.
        </Body>

        <SubHeading>UCP: The Invisible Commerce Layer</SubHeading>
        <Body>
          The Universal Commerce Protocol, co-developed by Google and Shopify
          with Walmart, Target, and 20+ major retailers, is the most
          consequential protocol in the dataset by raw social impact — and the
          most dangerous in terms of invisible control. The ambition is to
          become the implicit protocol governing all agentic commerce:
          the layer through which every buyer-agent and every seller interact.
          Its exit cost is critical by design: if agents cannot find you via UCP,
          you do not exist. And its control is invisible in the deepest sense —
          commerce protocols are the canonical example of infrastructure so
          embedded it becomes unthinkable. Nobody &ldquo;sees&rdquo; Visa&rsquo;s
          protocol. UCP aspires to the same invisibility, but now over
          agent-mediated buying rather than human card-swipes.
        </Body>

        <SubHeading>AGENTS.md: The Silent Mandate</SubHeading>
        <Body>
          AGENTS.md — a simple Markdown file that tells AI coding agents how
          to behave in a repository — is the most instructive example of
          Asparouhova&rsquo;s Stage 2 transition in the dataset. The protocol
          went from OpenAI proposal to 60,000+ repository adoptions in a few
          months. Nobody voted on making it mandatory. It became table stakes
          through social expectation: &ldquo;every serious repo has an
          AGENTS.md — not having one signals you&rsquo;re not AI-ready.&rdquo;
          This is Stage 2 exactly. The rules are no longer written down because
          they no longer need to be — they are enforced by peers, by implicit
          norms, by the faint social embarrassment of non-compliance.
        </Body>

        {/* ── SECTION 4 ── */}
        <SectionHeading>4. Common Patterns Across the Protocol Landscape</SectionHeading>

        <Body>
          Fifteen protocols is not a large sample, but the dataset is skewed
          toward the most consequential protocols in the current AI agent
          ecosystem. Several patterns emerge clearly.
        </Body>

        <div className="rounded-xl border border-gray-200 overflow-hidden mb-8">
          <PatternCard number="01" title="The warning cluster is crowded — and that&rsquo;s the danger sign">
            Eight of fifteen protocols score &ldquo;warning&rdquo; overall. The
            middle is the most populated band in the dataset. This is not
            reassuring — it reflects a landscape caught in transition. These
            protocols are still legible (Stage 1, mostly explicit), but social
            dynamics are visibly beginning to solidify. The warning cluster is
            Asparouhova&rsquo;s window of legibility made visible: the moment
            when analysis is still possible, before protocols become
            infrastructure too invisible to interrogate.
          </PatternCard>

          <PatternCard number="02" title="Financial embedding is the single strongest predictor of danger">
            Every protocol with a token economy, payment rail, or built-in
            financial incentive structure scores significantly worse on control
            invisibility and identity penetration. ElizaOS (critical/critical),
            UCP (critical/critical), AP2 (bad), x402 (bad). The mechanism is
            consistent: money makes protocols sticky, stickiness makes them
            invisible, invisibility makes exit feel like self-betrayal. You
            cannot extract your economic identity from the protocol without
            feeling like you are destroying something that belongs to you.
          </PatternCard>

          <PatternCard number="03" title="Crisis narratives cluster around Web3-adjacent and commerce protocols">
            Almost every Web3-adjacent protocol in the dataset deploys urgency
            framing: &ldquo;don&rsquo;t miss the next wave,&rdquo; &ldquo;the
            future of AI is on-chain.&rdquo; Enterprise protocols use a
            different flavor of the same mechanism: &ldquo;NRF 2026 launch —
            if you&rsquo;re not on UCP, shoppers won&rsquo;t find you.&rdquo;
            Crisis mindset is Asparouhova&rsquo;s diagnostic for adoption
            driven by fear rather than genuine utility. The clean protocols —
            ACP, Goose, AG-UI, Agent Gateway — uniformly lack urgency
            narratives. The correlation is striking.
          </PatternCard>

          <PatternCard number="04" title="Agency transfer is the hidden throughline">
            The most underrated pattern in the dataset: protocols that claim to
            preserve human agency while systematically transferring
            decision-making to agents. x402 pays autonomously (the human is
            removed from the payment loop by design). AP2 executes &ldquo;intent
            mandates&rdquo; that delegate open-ended purchasing authority. UCP
            has agents select merchants on behalf of humans. A2UI gives agents
            control over what interface users see. Each protocol, taken alone,
            seems reasonable. Together, they form a stack that progressively
            removes humans from decisions they used to make — one protocol
            at a time.
          </PatternCard>

          <PatternCard number="05" title="The Whitehead majority is larger but more fragile than it appears">
            Ten of fifteen protocols are currently classified as Whitehead —
            balanced, explicit, participant-preserving. But AGENTS.md has
            already moved to Stage 2 (social expectation). A2A is visibly at
            risk of tipping as its 50+ enterprise partners create gravitational
            pull that smaller participants cannot resist. And MCP&rsquo;s
            ecosystem depth is accumulating invisible lock-in through ubiquity
            rather than coercion. The Whitehead classification describes
            present state, not permanent character. Protocols move through
            stages — they do not move back.
          </PatternCard>
        </div>

        {/* ── SECTION 5 ── */}
        <SectionHeading>5. The Protocol Power Grid</SectionHeading>

        <Body>
          Across the analysis, two dimensions consistently generate the most
          analytical leverage. The first is <strong>control invisibility</strong>:
          how hidden is the protocol&rsquo;s control over participants? The
          second is <strong>exit cost</strong>: how expensive is it — technically,
          financially, socially — to leave? These two axes produce four distinct
          protocol archetypes.
        </Body>

        {/* Axis labels + grid */}
        <div className="my-8">
          {/* Y-axis label */}
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center gap-1 pt-6">
              <span className="text-xs text-gray-400 font-mono writing-mode-vertical rotate-180 whitespace-nowrap"
                style={{ writingMode: "vertical-rl" }}>
                EXIT COST ↑ high
              </span>
            </div>

            <div className="flex-1">
              {/* Top row */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <GridCell
                  quadrant="Q2"
                  title="Visible Platforms"
                  description="High switching costs, but at least honest about the control structure. You can see what you&rsquo;re getting into — the cage is labeled."
                  protocols={["A2A", "AP2"]}
                  accent="#ca8a04"
                />
                <GridCell
                  quadrant="Q4 ⚠"
                  title="Protocol Prisons"
                  description="Invisible control + high exit cost. Participants cannot see the cage or leave it. The full Asparouhova danger scenario."
                  protocols={["ElizaOS", "UCP", "x402"]}
                  accent="#dc2626"
                />
              </div>

              {/* Bottom row */}
              <div className="grid grid-cols-2 gap-3">
                <GridCell
                  quadrant="Q1"
                  title="Clean Infrastructure"
                  description="Serve you without owning you. Explicit control mechanisms, easy exit, no identity formation. The Whitehead ideal."
                  protocols={["ACP", "Goose", "Agent Gateway", "AG-UI"]}
                  accent="#16a34a"
                />
                <GridCell
                  quadrant="Q3"
                  title="Soft Shapers"
                  description="Shape behavior quietly but haven&rsquo;t yet built high exit costs. The most precarious quadrant — could tip either way."
                  protocols={["MCP", "AGENTS.md", "AITP", "ANP", "OASF", "A2UI", "AITP"]}
                  accent="#2563eb"
                />
              </div>

              {/* X-axis label */}
              <div className="flex justify-between mt-2 px-1">
                <span className="text-xs text-gray-400 font-mono">← transparent</span>
                <span className="text-xs font-bold text-gray-500 font-mono text-center">CONTROL INVISIBILITY</span>
                <span className="text-xs text-gray-400 font-mono">opaque →</span>
              </div>
            </div>
          </div>
        </div>

        <Body>
          <strong>Q1 — Clean Infrastructure</strong> (transparent control,
          low exit cost) contains the protocols that most closely match
          Asparouhova&rsquo;s Whitehead ideal. ACP, Goose, AG-UI, and Agent
          Gateway all share the same design philosophy: make control visible,
          make exit cheap, make no claim on participant identity. These are
          protocols you can audit, replace, and reason about. They abstract
          complexity without hiding it.
        </Body>

        <Body>
          <strong>Q2 — Visible Platforms</strong> (transparent control, high
          exit cost) contains protocols where the power dynamics are legible
          even if the switching costs are real. A2A&rsquo;s Google backing and
          50+ enterprise partners create genuine lock-in — but at least you can
          see the structure you&rsquo;re entering. AP2&rsquo;s Mastercard and
          PayPal integrations are expensive to exit but visible at the outset.
          These protocols deserve monitoring as they mature, but they are not
          currently operating through invisible control.
        </Body>

        <Body>
          <strong>Q3 — Soft Shapers</strong> (invisible control, low exit cost)
          is the most analytically interesting quadrant. MCP, AGENTS.md, AITP,
          ANP, and OASF all shape behavior in ways participants do not fully
          perceive — through defaults, through what they make easy, through social
          norms that accumulate without explicit rule-setting. But switching costs
          remain low. These protocols are in a race: between the invisibility of
          their control growing and the stickiness of their ecosystems
          accumulating. MCP is furthest along that trajectory. AGENTS.md has
          already crossed into Stage 2 social expectation. The Soft Shapers are
          the watchlist.
        </Body>

        <Body>
          <strong>Q4 — Protocol Prisons</strong> (invisible control, high exit
          cost) is where Asparouhova&rsquo;s full danger scenario materializes.
          ElizaOS and UCP are the clearest cases. Both score &ldquo;critical&rdquo;
          on control invisibility and &ldquo;critical&rdquo; on exit cost.
          Crucially, every protocol in this quadrant involves money — tokens,
          payment rails, or commerce infrastructure. This is not coincidence.
          Financial embedding is what makes control invisible (you experience
          it as investment, not coercion) and what makes exit prohibitive (you
          would lose economic identity, not just switch tools).
        </Body>

        <Callout label="The 2×2 insight">
          The most important observation from the Power Grid: the dangerous
          quadrant (Q4) is reached not in one move but in two. First a protocol
          enters Q3 — it develops invisible control while exit remains easy.
          Then, as ecosystem effects accumulate and financial embedding deepens,
          exit costs rise and the protocol slides into Q4. Monitoring Q3 is not
          just about current risk — it is about identifying tomorrow&rsquo;s
          prisons while they are still navigable.
        </Callout>

        {/* ── CONCLUSION ── */}
        <SectionHeading>6. The Window of Legibility</SectionHeading>

        <Body>
          Every protocol analyzed in this dataset is still legible. You can
          read the specification, understand the design choices, trace the
          incentive structures, evaluate the power dynamics. That is not
          guaranteed to remain true.
        </Body>

        <Body>
          Asparouhova&rsquo;s deepest insight is that protocol analysis becomes
          harder precisely as protocols become more powerful — because the
          most powerful protocols are the most invisible. The fact that we can
          still clearly see the difference between ACP and ElizaOS, between
          Goose and UCP, between a clean tool and a protocol prison, is a
          function of where we are in the maturity cycle of AI agent
          infrastructure. Most of these protocols are at Stage 1. A few are
          entering Stage 2. None have yet reached Stage 3 — the identity layer,
          where compliance is indistinguishable from self-expression.
        </Body>

        <Body>
          This analysis exists to make use of that window. The goal is not to
          prevent protocols from maturing — some protocols should become
          invisible infrastructure, as Whitehead understood. The goal is to
          ensure that when they do become invisible, they have earned that
          invisibility through genuine utility rather than accumulated lock-in,
          crisis-driven adoption, and financial identity fusion. The protocols
          that deserve to become infrastructure are the ones in Q1. The ones
          sliding toward Q4 deserve scrutiny now, while we can still see them.
        </Body>

        <Quote
          text="Civilization advances by extending the number of important operations which we can perform without thinking about them."
          attribution="Alfred North Whitehead — the standard protocols should aspire to"
        />

        <div className="pt-8 border-t border-gray-200 text-xs text-gray-400 font-mono">
          Framework by{" "}
          <a
            href="https://summerofprotocols.com/dangerous-protocols-web"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600 transition-colors"
          >
            Nadia Asparouhova
          </a>{" "}
          · Summer of Protocols 2023 ·{" "}
          <Link href="/methodology" className="underline hover:text-gray-600 transition-colors">
            See full scoring methodology
          </Link>
        </div>
      </main>
    </>
  );
}
