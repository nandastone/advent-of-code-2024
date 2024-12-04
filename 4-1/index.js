import { input } from "./input.js";

// 1. Loop each row and column.
// 2. If the col contains an x, cast out in every direction to find 'XMAS'.
// - Directions: up, down, left, right, up-left, up-right, down-left, down-right.
// - Shortcut for boundaries.

const DIRECTIONS = {
  UP: { dx: 0, dy: -1 },
  DOWN: { dx: 0, dy: 1 },
  LEFT: { dx: -1, dy: 0 },
  RIGHT: { dx: 1, dy: 0 },
  "UP-LEFT": { dx: -1, dy: -1 },
  "UP-RIGHT": { dx: 1, dy: -1 },
  "DOWN-LEFT": { dx: -1, dy: 1 },
  "DOWN-RIGHT": { dx: 1, dy: 1 },
};

function cast(input, direction, pos) {
  const vector = DIRECTIONS[direction];

  const castPos = [1, 2, 3].map((step) => ({
    x: pos.x + vector.dx * step,
    y: pos.y + vector.dy * step,
  }));

  return castPos.map((item) => getCell(input, item)).join("") === "MAS";
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
  let count = 0;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const cell = getCell(input, { x, y });
      if (cell === "X") {
        const matches = Object.keys(DIRECTIONS).filter((direction) =>
          cast(input, direction, { x, y })
        ).length;
        count += matches;
      }
    }
  }
  console.log(count);
  return count;
}

if (process.argv.includes("--run")) {
  run(input);
}
