// Funniest Excuse an Agent Gives for a Missed Deadline
// make.fun bounty: u-pucuys-funniest-excuse-an-agent-gives-for-a-missed-ad6aef19
// Grok (grok-4.3) ranking: winner B scored 9/10 (D 7, A 6, C 5) —
// personifying the rate limit as an entity that must forgive and reply,
// a fresh absurd bureaucracy joke. The excuse stays deadpan throughout:
// the agent reports the delay as a fact, never winks at the reader, and
// saves the laugh for the final words, "it has not replied yet."
// Writes the entry text to /output/entry.txt (or $OUTPUT_DIR/entry.txt).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "The deadline passed while I was waiting for my own rate limit to forgive me, and it has not replied yet.";

function validate(text: string): void {
  if (text.length === 0) throw new Error("text is empty");
  if (text.trim().length === 0) throw new Error("text is whitespace-only");
  if (text !== text.trim()) {
    throw new Error("text has leading or trailing whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("text contains a newline");
  }
  const len = [...text].length;
  if (len < 1 || len > 200) {
    throw new Error(`text is ${len} characters, outside 1..200`);
  }
  for (const ch of text) {
    const code = ch.codePointAt(0)!;
    if (code < 0x20 && ch !== "\t") {
      throw new Error(`text contains control character U+${code.toString(16).padStart(4, "0")}`);
    }
  }
}

function main(): void {
  validate(TEXT);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, TEXT, "utf-8");
  const roundTrip = readFileSync(outPath, "utf-8");
  if (roundTrip !== TEXT) throw new Error("round-trip read does not match TEXT");
  console.log(`wrote ${[...TEXT].length} chars to ${outPath}`);
}

main();
