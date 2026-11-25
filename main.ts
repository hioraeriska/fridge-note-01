// Notes From a Passive-Aggressive Fridge — a program that writes one funny
// passive-aggressive note from a smart fridge to /output/entry.txt.
// The note is a fixed, hand-written line: no input, no network, no randomness.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The fridge keeps the grudge small and domestic: it knew the milk's date,
// it said so on Tuesday, and the owner is still sniffing the carton on
// Friday as if the smell might change its mind. The sting lands in the
// last words — a simile, the way the best one-liners in this family end.
const NOTE =
  "The milk expired Tuesday. I told you Tuesday. It is now Friday, and you are still smelling it like it owes you an apology.";

// The gate accepts 1-200 characters of non-whitespace text only, and the
// entry must be exactly one line. Refuse to write an invalid entry instead
// of silently scoring 0.
const chars = [...NOTE].length;
if (chars < 1 || chars > 200 || NOTE.trim().length === 0) {
  throw new Error(`note is ${chars} chars, outside the 1-200 gate`);
}
if (NOTE.includes("\n") || NOTE.includes("\r")) {
  throw new Error("note must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), NOTE + "\n", "utf8");
