import test from "node:test";
import assert from "node:assert";
import { run, walkTrail } from "./index.js";

// test.describe("run", () => {
//   test("correctly runs the program", () => {
//     const map = [
//       [8, 9, 0, 1, 0, 1, 2, 3],
//       [7, 8, 1, 2, 1, 8, 7, 4],
//       [8, 7, 4, 3, 0, 9, 6, 5],
//       [9, 6, 5, 4, 9, 8, 7, 4],
//       [4, 5, 6, 7, 8, 9, 0, 3],
//       [3, 2, 0, 1, 9, 0, 1, 2],
//       [0, 1, 3, 2, 9, 8, 0, 1],
//       [1, 0, 4, 5, 6, 7, 3, 2],
//     ];

//     const total = run(map);

//     assert.equal(total, 36);
//   });
// });

test.describe("walkTrail", () => {
  test("correctly rates a full trail", () => {
    const map = [
      [-1, -1, -1, -1, -1, 0, -1],
      [-1, -1, 4, 3, 2, 1, -1],
      [-1, -1, 5, -1, -1, 2, -1],
      [-1, -1, 6, 5, 4, 3, -1],
      [-1, -1, 7, -1, -1, 4, -1],
      [-1, -1, 8, 7, 6, 5, -1],
      [-1, -1, 9, -1, -1, -1, -1],
    ];

    const total = walkTrail(map, { x: 5, y: 0 }, 0, 0);

    assert.equal(total, 3);
  });

  test("correctly rates a full trail", () => {
    const map = [
      [-1, -1, 9, 0, -1, -1, 9],
      [-1, -1, -1, 1, -1, 9, 8],
      [-1, -1, -1, 2, -1, -1, 7],
      [6, 5, 4, 3, 4, 5, 6],
      [7, 6, 5, -1, 9, 8, 7],
      [8, 7, 6, -1, -1, -1, -1],
      [9, 8, 7, -1, -1, -1, -1],
    ];

    const total = walkTrail(map, { x: 3, y: 0 }, 0, 0);

    assert.equal(total, 13);
  });

  test("correctly rates a full trail", () => {
    const map = [
      [0, 1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5, 6],
      [2, 3, 4, 5, 6, 7],
      [3, 4, 5, 6, 7, 8],
      [4, -1, 6, 7, 8, 9],
      [5, 6, 7, 8, 9, -1],
    ];

    const total = walkTrail(map, { x: 0, y: 0 }, 0, 0);

    assert.equal(total, 227);
  });
});
