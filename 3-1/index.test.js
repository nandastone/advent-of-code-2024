import test from "node:test";
import assert from "node:assert";
import { extractPairs, sumPairProducts } from "./index.js";

test.describe("extractPairs", () => {
  test("extracts correctly", () => {
    const input =
      "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
    const expected = [
      [2, 4],
      [5, 5],
      [11, 8],
      [8, 5],
    ];

    assert.deepEqual(extractPairs(input), expected);
  });
});

test.describe("sumPairProducts", () => {
  test("reduces correctly", () => {
    const input = [
      [2, 4],
      [5, 5],
      [11, 8],
      [8, 5],
    ];
    const expected = 161;

    assert.equal(sumPairProducts(input), expected);
  });
});
