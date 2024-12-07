import test from "node:test";
import assert from "node:assert";
import { moveElement } from "./index.js";

test.describe("moveElement", () => {
  test("moves an element correctly", () => {
    const input = [1, 3, 4, 5, 2];
    const expected = [1, 2, 3, 4, 5];

    assert.deepEqual(moveElement(input, 4, 1), expected);
  });
});
