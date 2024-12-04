import { input } from "./input.js";

/**
 * Convert a command string into a sequence of instruction tokens.
 *
 * @example
 * extractInstructions("xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))")
 * // => [
 * //      "mul(2,4)",
 * //      "don't()",
 * //      "mul(5,5)",
 * //      "mul(11,8)",
 * //      "do()",
 * //      "mul(8,5)",
 * // ]
 */
export function tokenize(input) {
  const matches = input.matchAll(/(mul\(\d+,\d+\)|don't\(\)|do\(\))/g);
  return [...matches].map(([instruction]) => instruction);
}

export function runMultiplyInstruction(instruction) {
  // FIXME: Could combined regex but ... that's enough regex for one year.
  const matches = instruction.matchAll(/mul\((\d+),(\d+)\)/g);
  const [_instruction, factor1, factor2] = [...matches][0];
  return factor1 * factor2;
}

function run(input) {
  const instructions = tokenize(input);

  let processing = true;
  const result = instructions.reduce((acc, curr) => {
    if (curr === "don't()") {
      processing = false;
    } else if (curr === "do()") {
      processing = true;
    } else if (processing) {
      return acc + runMultiplyInstruction(curr);
    }

    return acc;
  }, 0);

  console.log(result);
}

if (process.argv.includes("--run")) {
  run(input);
}
