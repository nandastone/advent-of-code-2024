import { readFileSync } from "node:fs";
import path from "node:path";

const rawInput = readFileSync(
  path.resolve(import.meta.dirname, "./test-input.txt"),
  "utf8"
);

export const input = rawInput;
