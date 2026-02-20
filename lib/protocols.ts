import { Protocol } from "./types";
import fs from "fs";
import path from "path";

const PROTOCOLS_DIR = path.join(process.cwd(), "data", "protocols");

export function getAllProtocols(): Protocol[] {
  const files = fs.readdirSync(PROTOCOLS_DIR).filter((f) => f.endsWith(".json"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(PROTOCOLS_DIR, file), "utf-8");
      return JSON.parse(raw) as Protocol;
    })
    .sort((a, b) => {
      const order = { critical: 0, bad: 1, warning: 2, good: 3, neutral: 4 };
      return order[a.overallRisk] - order[b.overallRisk];
    });
}

export function getProtocolBySlug(slug: string): Protocol | undefined {
  const filePath = path.join(PROTOCOLS_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return undefined;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Protocol;
}
