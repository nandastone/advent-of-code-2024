import test from "node:test";
import assert from "node:assert";
import { tokenize, runMultiplyInstruction } from "./index.js";

test.describe("tokenize", () => {
  test("tokenizes correctly", () => {
    const input =
      "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
    const expected = [
      "mul(2,4)",
      "don't()",
      "mul(5,5)",
      "mul(11,8)",
      "do()",
      "mul(8,5)",
    ];

    assert.deepEqual(tokenize(input), expected);
  });
});

test.describe("runMultiplyInstruction", () => {
  test("runs the instruction correctly", () => {
    const input = "mul(22,7)";
    const expected = 154;

    assert.equal(runMultiplyInstruction(input), expected);
  });
});
