import test from "node:test";
import assert from "node:assert";
import { checkLevel } from "./index.js";

// See: https://www.reddit.com/r/adventofcode/comments/1h4shdu/2024_day_2_part2_edge_case_finder/
test.describe("safe levels", () => {
  test("7,6,4,2,1 is safe", () => {
    assert.ok(checkLevel([7, 6, 4, 2, 1]));
  });

  test("1,3,2,4,5 is safe", () => {
    assert.ok(checkLevel([1, 3, 2, 4, 5]));
  });

  test("8,6,4,4,1 is safe", () => {
    assert.ok(checkLevel([8, 6, 4, 4, 1]));
  });

  test("1,3,6,7,9 is safe", () => {
    assert.ok(checkLevel([1, 3, 6, 7, 9]));
  });

  test("48,46,47,49,51,54,56 is safe", () => {
    assert.ok(checkLevel([48, 46, 47, 49, 51, 54, 56]));
  });

  test("1,1,2,3,4,5 is safe", () => {
    assert.ok(checkLevel([1, 1, 2, 3, 4, 5]));
  });

  test("1,2,3,4,5,5 is safe", () => {
    assert.ok(checkLevel([1, 2, 3, 4, 5, 5]));
  });

  test("5,1,2,3,4,5 is safe", () => {
    assert.ok(checkLevel([5, 1, 2, 3, 4, 5]));
  });

  test("1,4,3,2,1 is safe", () => {
    assert.ok(checkLevel([1, 4, 3, 2, 1]));
  });

  test("1,6,7,8,9 is safe", () => {
    assert.ok(checkLevel([1, 6, 7, 8, 9]));
  });

  test("1,2,3,4,3 is safe", () => {
    assert.ok(checkLevel([1, 2, 3, 4, 3]));
  });

  test("9,8,7,6,7 is safe", () => {
    assert.ok(checkLevel([9, 8, 7, 6, 7]));
  });

  test("7,10,8,10,11 is safe", () => {
    assert.ok(checkLevel([7, 10, 8, 10, 11]));
  });

  test("29,28,27,25,26,25,22,20 is safe", () => {
    assert.ok(checkLevel([29, 28, 27, 25, 26, 25, 22, 20]));
  });

  test("7,10,8,10,11 is safe", () => {
    assert.ok(checkLevel([7, 10, 8, 10, 11]));
  });

  test("29,28,27,25,26,25,22,20 is safe", () => {
    assert.ok(checkLevel([29, 28, 27, 25, 26, 25, 22, 20]));
  });

  test("8,9,10,11 is safe", () => {
    assert.ok(checkLevel([8, 9, 10, 11]));
  });

  test("90,89,86,84,83,79 is safe", () => {
    assert.ok(checkLevel([90, 89, 86, 84, 83, 79]));
  });

  test("97,96,93,91,85 is safe", () => {
    assert.ok(checkLevel([97, 96, 93, 91, 85]));
  });

  test("29,26,24,25,21 is safe", () => {
    assert.ok(checkLevel([29, 26, 24, 25, 21]));
  });

  test("36,37,40,43,47 is safe", () => {
    assert.ok(checkLevel([36, 37, 40, 43, 47]));
  });

  test("43,44,47,48,49,54 is safe", () => {
    assert.ok(checkLevel([43, 44, 47, 48, 49, 54]));
  });

  test("35,33,31,29,27,25,22,18 is safe", () => {
    assert.ok(checkLevel([35, 33, 31, 29, 27, 25, 22, 18]));
  });

  test("77,76,73,70,64 is safe", () => {
    assert.ok(checkLevel([77, 76, 73, 70, 64]));
  });

  test("68,65,69,72,74,77,80,83 is safe", () => {
    assert.ok(checkLevel([68, 65, 69, 72, 74, 77, 80, 83]));
  });

  test("37,40,42,43,44,47,51 is safe", () => {
    assert.ok(checkLevel([37, 40, 42, 43, 44, 47, 51]));
  });

  test("70,73,76,79,86 is safe", () => {
    assert.ok(checkLevel([70, 73, 76, 79, 86]));
  });

  test("31,34,32,30,28,27,24,22 is safe", () => {
    assert.ok(checkLevel([31, 34, 32, 30, 28, 27, 24, 22]));
  });
});

test.describe("unsafe levels", () => {
  test("1,2,7,8,9 is unsafe", () => {
    assert.ok(!checkLevel([1, 2, 7, 8, 9]));
  });

  test("9,7,6,2,1 is unsafe", () => {
    assert.ok(!checkLevel([9, 7, 6, 2, 1]));
  });
});
