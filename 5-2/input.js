import { readFileSync } from "node:fs";

const raw = readFileSync("./input.txt", "utf8");

const [rawRules, rawPages] = raw.split("\n\n");

export const rules = rawRules
  .split("\n")
  .map((line) => line.split("|").map((item) => parseInt(item, 10)));
export const pages = rawPages
  .split("\n")
  .map((line) => line.split(",").map((item) => parseInt(item, 10)));
