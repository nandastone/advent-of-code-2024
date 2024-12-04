import { input } from "./input.js";

// 1. Extract instructions from input using regex.
// 2. Parse instruction (multiply numbers).
// 3. Add instruction results.

export function extractPairs(input) {
  const matches = input.matchAll(/mul\((\d+),(\d+)\)/g);
  const pairs = [...matches].map(([_value, factor1, factor2]) => [
    parseInt(factor1, 10),
    parseInt(factor2, 10),
  ]);
  return pairs;
}

export function sumPairProducts(pairs) {
  return pairs.reduce((acc, [factor1, factor2]) => {
    return (acc += factor1 * factor2);
  }, 0);
}

function run(input) {
  const pairs = extractPairs(input);
  const result = sumPairProducts(pairs);
  console.log(result);
}

if (process.argv.includes("--run")) {
  run(input);
}
