import test from "node:test";
import assert from "node:assert";
import { convertFilesToDisk } from "./test-utils.js";
import { calculateDiskChecksum, run } from "./index.js";

test.describe("run", () => {
  test("correctly runs the program", () => {
    assert.equal(run("2333133121414131402"), 1928);
  });
});

test.describe("calculateDiskChecksum", () => {
  test("correctly calculates the checksum", () => {
    const disk = convertFilesToDisk("0099811188827773336446555566");
    const expected = 1928;
    assert.equal(calculateDiskChecksum(disk), expected);
  });

  test("correctly calculates the checksum", () => {
    const disk = convertFilesToDisk(
      "0000000999911111111299999999999999993333399999999999999989998999899989997444444999799"
    );
    const expected = 26919;
    assert.equal(calculateDiskChecksum(disk), expected);
  });
});
