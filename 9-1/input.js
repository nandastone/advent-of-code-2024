import { readFileSync } from "node:fs";

const rawInput = readFileSync("./test-input.txt", "utf8");

export const input = rawInput.split("");
