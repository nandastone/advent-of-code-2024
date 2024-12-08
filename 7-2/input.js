import { readFileSync } from "node:fs";

const rawInput = readFileSync("./input.txt", "utf8");

export const input = rawInput.split("\n").map((line) => {
  const [target, terms] = line.split(": ");
  return {
    target: parseInt(target, 10),
    terms: terms.split(" ").map((item) => parseInt(item, 10)),
  };
});
