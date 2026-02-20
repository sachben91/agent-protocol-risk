import { RISK, RiskLevel, Dimension, KafkaIndex, DangerousProtocol } from "@/lib/types";

type DimensionMap = KafkaIndex | DangerousProtocol;

interface Props {
  items: DimensionMap;
}

export function RiskBar({ items }: Props) {
  return (
    <div className="flex gap-0.5 h-1.5 rounded overflow-hidden w-full">
      {(Object.entries(items) as [string, Dimension][]).map(([k, v]) => {
        const r = RISK[v.risk as RiskLevel] ?? RISK.neutral;
        return (
          <div
            key={k}
            className="flex-1"
            style={{ background: r.color, opacity: 0.75 }}
          />
        );
      })}
    </div>
  );
}
