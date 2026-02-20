import { Archetype, ARCHETYPE } from "@/lib/types";

interface Props {
  type: Archetype;
}

export function ArchetypeBadge({ type }: Props) {
  const a = ARCHETYPE[type];
  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono font-bold rounded"
      style={{
        fontSize: 11,
        padding: "3px 8px",
        color: a.color,
        background: `${a.color}12`,
        border: `1px solid ${a.color}30`,
      }}
    >
      <span style={{ fontSize: 12 }}>{a.icon}</span>
      {a.label}
    </span>
  );
}
