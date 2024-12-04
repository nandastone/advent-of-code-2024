import { readFileSync } from "node:fs";

const raw = readFileSync("./input.txt", "utf8");
export const input = raw.split("\n").map((line) => line.split(""));
