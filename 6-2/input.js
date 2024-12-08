import { readFileSync } from "node:fs";

const rawInput = readFileSync("./input.txt", "utf8");

export const input = rawInput.split("\n").map((line) => line.split(""));
