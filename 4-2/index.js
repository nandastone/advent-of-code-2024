import { input } from "./input.js";

// 1. Loop each row and column.
// 2. If the col contains an M, cast out in directions to find 'MAS'.
// - Directions: up-left, up-right, down-left, down-right.
// - Shortcut for boundaries.
// 3. Track cell with "A".
// 4. Sum cell counts > 1.

const DIRECTIONS = {
  "UP-LEFT": { dx: -1, dy: -1 },
  "UP-RIGHT": { dx: 1, dy: -1 },
  "DOWN-LEFT": { dx: -1, dy: 1 },
  "DOWN-RIGHT": { dx: 1, dy: 1 },
};

function cast(input, direction, pos) {
  const vector = DIRECTIONS[direction];
  const castPos = [
    { x: pos.x + vector.dx, y: pos.y + vector.dy },
    { x: pos.x + vector.dx * 2, y: pos.y + vector.dy * 2 },
  ];

  const result = castPos.map((item) => getCell(input, item));
  if (result.join("") === "AS") {
    return castPos;
  }

  return undefined;
}

function getCell(input, pos) {
  if (
    pos.x < 0 ||
    pos.x > input[0].length - 1 ||
    pos.y < 0 ||
    pos.y > input.length - 1
  ) {
    return undefined;
  }

  return input[pos.y][pos.x];
}

function run(input) {
  let intersectionCount = 0;
  const seen = new Set();

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const cell = getCell(input, { x, y });

      if (cell !== "M") {
        continue;
      }

      Object.keys(DIRECTIONS)
        .map((direction) => cast(input, direction, { x, y }))
        .filter((item) => !!item)
        .forEach((item) => {
          const key = `${item[0].x},${item[0].y}`;
          if (seen.has(key)) {
            intersectionCount++;
          }
          seen.add(key);
        });
    }
  }

  console.log(intersectionCount);
  return intersectionCount;
}

if (process.argv.includes("--run")) {
  run(input);
}
