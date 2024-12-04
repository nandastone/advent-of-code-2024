import { input } from "./input.js";

export function checkLevel(level, recursive = false) {
  let last = { num: level[0], dir: undefined };

  for (let i = 1; i < level.length; i++) {
    const diff = level[i] - last.num;
    const dir = Math.sign(diff);

    const validDirection = typeof last.dir === "undefined" || last.dir === dir;
    const validMagnitude = [1, 2, 3].includes(Math.abs(diff));

    if (!validDirection || !validMagnitude) {
      if (!recursive) {
        // Gross and expensive brute-force solution to try every array permutation.
        // TODO: Find a better way.
        for (let j = 0; j < level.length; j++) {
          const newLevel = removeElementAtIndex(level, j);
          if (checkLevel(newLevel, true)) {
            return true;
          }
        }
      }

      return false;
    }

    last.num = level[i];
    last.dir = dir;
  }

  return true;
}

function removeElementAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

const result = input.reduce(
  (acc, curr) => (checkLevel(curr, false) ? acc + 1 : acc),
  0
);
console.log({ input: input.length, safe: result });
