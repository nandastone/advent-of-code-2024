import { rules, pages } from "./input.js";

// 1. For each number, store a sorted list of the numbers that CAN'T appear after.
// 2. Iterate pages.
// - For each page,
// - Check pages after to make sure they can appear.

function createDependencyMap(rules) {
  return rules.reduce(
    (map, [before, after]) => ({
      ...map,
      [after]: [...(map[after] || []), before],
    }),
    {}
  );
}

function run({ rules, pageSequence }) {
  const dependencyMap = createDependencyMap(rules);

  const result = pageSequence.reduce((acc, curr) => {
    const inOrder = curr.every((item, idx) => {
      // 1. Does it have a mapping of allowed after values?
      // - If not, everything is allowed, return.
      // - If so, iterate the rest of the array (after this index) and make sure none are in the map.

      if (typeof dependencyMap[item] === "undefined") {
        return true;
      }

      return curr
        .slice(idx + 1)
        .every((restItem) => !dependencyMap[item].includes(restItem));
    });

    if (inOrder) {
      const middlePage = curr[Math.floor(curr.length / 2)];
      return acc + middlePage;
    }

    return acc;
  }, 0);

  console.log(result);
}

if (process.argv.includes("--run")) {
  run({ rules, pageSequence: pages });
}
