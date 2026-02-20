export type RiskLevel = "good" | "warning" | "bad" | "critical" | "neutral";
export type Archetype = "whitehead" | "bartleby" | "kafka";
export type Stage = "explicit" | "social" | "identity";

export interface Source {
  label: string;
  url: string;
}

export interface Dimension {
  risk: RiskLevel;
  note: string;
  sources?: Source[];
}

export interface KafkaIndex {
  feedbackLoop: Dimension;
  edgeCases: Dimension;
  ambiguity: Dimension;
  redundancy: Dimension;
  nesting: Dimension;
  exitCost: Dimension;
}

export interface DangerousProtocol {
  identityPenetration: Dimension;
  agencyPreservation: Dimension;
  controlInvisibility: Dimension;
  crisisMindset: Dimension;
}

export interface Protocol {
  slug: string;
  name: string;
  fullName: string;
  by: string;
  type: string;
  archetype: Archetype;
  stage: Stage;
  maturity: string;
  overallRisk: RiskLevel;
  lastUpdated: string;
  summary: string;
  website?: string;
  spec?: string;
  kafkaIndex: KafkaIndex;
  dangerousProtocol: DangerousProtocol;
}

export const RISK: Record<RiskLevel, { label: string; color: string; bg: string; border: string }> = {
  good:     { label: "Low",      color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
  warning:  { label: "Medium",   color: "#ca8a04", bg: "#fefce8", border: "#fef08a" },
  bad:      { label: "High",     color: "#ea580c", bg: "#fff7ed", border: "#fed7aa" },
  critical: { label: "Critical", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
  neutral:  { label: "—",        color: "#6b7280", bg: "#f9fafb", border: "#e5e7eb" },
};

export const ARCHETYPE: Record<Archetype, { label: string; quote: string; desc: string; color: string; icon: string }> = {
  whitehead: {
    label: "Whitehead",
    quote: "Civilization advances by extending the number of important operations which we can perform without thinking about them.",
    desc: "Balanced power between protocol and participant",
    color: "#16a34a",
    icon: "◎",
  },
  bartleby: {
    label: "Bartleby",
    quote: "I would prefer not to.",
    desc: "Participant holds too much power; high agency limits ability to manage complexity",
    color: "#ca8a04",
    icon: "◉",
  },
  kafka: {
    label: "Kafka",
    quote: "I can't find my way round in this darkness.",
    desc: "Protocol holds too much power; participant trapped in maze they can't understand or escape",
    color: "#dc2626",
    icon: "◈",
  },
};

export const STAGE: Record<Stage, { label: string; desc: string; num: number }> = {
  explicit: { label: "Explicit Rules",      desc: "Participants know the protocol and willingly enter", num: 1 },
  social:   { label: "Social Expectation",  desc: "Widely understood but not written down; peer-enforced", num: 2 },
  identity: { label: "Identity Layer",      desc: "Internalized; participants believe compliance is self-expression", num: 3 },
};

export const KAFKA_LABELS: Record<keyof KafkaIndex, { label: string; kafkaItem: string }> = {
  feedbackLoop: { label: "Feedback Loop",       kafkaItem: "No (or hidden) feedback loop" },
  edgeCases:    { label: "Edge Case Sprawl",    kafkaItem: "Too many edge cases addressed at once" },
  ambiguity:    { label: "Outcome Ambiguity",   kafkaItem: "Success outcomes randomized or ambiguously defined" },
  redundancy:   { label: "Protocol Redundancy", kafkaItem: "Multiple protocols solving the same problem" },
  nesting:      { label: "Recursive Nesting",   kafkaItem: "Recursive, nested protocols" },
  exitCost:     { label: "Exit Cost",           kafkaItem: "No market or alternatives exist" },
};

export const DANGEROUS_LABELS: Record<keyof DangerousProtocol, { label: string; desc: string }> = {
  identityPenetration: { label: "Identity Penetration", desc: "How deeply has the protocol entered participants' identity layer?" },
  agencyPreservation:  { label: "Agency Preservation",  desc: "How much decision-making power does the participant retain?" },
  controlInvisibility: { label: "Control Invisibility", desc: "How invisible is the protocol's control over participants?" },
  crisisMindset:       { label: "Crisis Mindset",       desc: "Is adoption driven by urgency/fear rather than genuine utility?" },
};
