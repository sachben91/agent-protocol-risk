import { RiskLevel, RISK } from "@/lib/types";

interface Props {
  risk: RiskLevel;
  size?: "sm" | "md";
}

export function RiskPill({ risk, size = "md" }: Props) {
  const r = RISK[risk] ?? RISK.neutral;
  const isSmall = size === "sm";

  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono font-semibold rounded"
      style={{
        fontSize: isSmall ? 10 : 11,
        padding: isSmall ? "2px 6px" : "3px 8px",
        color: r.color,
        background: r.bg,
        border: `1px solid ${r.border}`,
        letterSpacing: "0.02em",
      }}
    >
      <span
        style={{
          width: isSmall ? 5 : 6,
          height: isSmall ? 5 : 6,
          borderRadius: "50%",
          background: r.color,
          flexShrink: 0,
          display: "inline-block",
        }}
      />
      {r.label}
    </span>
  );
}
