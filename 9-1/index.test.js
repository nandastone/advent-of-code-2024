import test from "node:test";
import assert from "node:assert";
import { run } from "./index.js";

test.describe("run", () => {
  test("2333133121414131402", () => {
    assert.equal(run("2333133121414131402"), 1928);
  });
});
