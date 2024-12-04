import { input } from "./input.js";

// 1. Reduce the levels.
// 2. Loop the level.
// - Track the last number and its direction.
// - If direction changes, or diff is not 1-2: false
// - Else true

function checkLevel(level) {
  let last = { num: level[0], dir: undefined };

  for (let i = 1; i < level.length; i++) {
    const diff = level[i] - last.num;
    const dir = Math.sign(diff);

    if (typeof last.dir !== "undefined" && last.dir !== dir) {
      return false;
    }

    if (![1, 2, 3].includes(Math.abs(diff))) {
      return false;
    }

    last.num = level[i];
    last.dir = dir;
  }

  return true;
}

const result = input.reduce(
  (acc, curr) => (checkLevel(curr) ? acc + 1 : acc),
  0
);
console.log(result);
