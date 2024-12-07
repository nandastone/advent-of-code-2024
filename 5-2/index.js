import { rules, pages } from "./input.js";

/**
 * Map of numbers (key) and the numbers they MUST come after.
 */
function createNotAllowedBeforeMap(rules) {
  const notAllowedBeforeMap = rules.reduce((acc, curr) => {
    const [page1, page2] = curr;

    if (acc[page2]) {
      acc[page2].push(page1);
    } else {
      acc[page2] = [page1];
    }

    return acc;
  }, {});

  return notAllowedBeforeMap;
}

function checkPageInSequence(sequence, page, notAllowedBeforeMap) {
  if (typeof notAllowedBeforeMap[page] === "undefined") {
    return { valid: true, invalidIndexes: [] };
  }

  const pageIdx = sequence.indexOf(page);

  const invalidIndexes = sequence
    // Only check pages after the current one.
    .slice(pageIdx + 1)
    .map((followingPage, idx) =>
      notAllowedBeforeMap[page].some(
        (notAllowedPage) => followingPage === notAllowedPage
      )
        ? // Restore to index of full sequence, not just the currently examined slice.
          pageIdx + idx + 1
        : -1
    )
    .filter((pageIndex) => pageIndex !== -1)
    .sort();

  console.log({ invalidIndexes });

  return { valid: invalidIndexes.length === 0, invalidIndexes };
}

function checkSequence(sequence, notAllowedBeforeMap) {
  let reordered = false;
  let workingSequence = [...sequence];

  for (let i = 0; i < workingSequence.length; i++) {
    let valid = false;

    do {
      const result = checkPageInSequence(
        workingSequence,
        workingSequence[i],
        notAllowedBeforeMap
      );

      if (result.invalidIndexes.length) {
        const newSequence = moveElement(
          workingSequence,
          // Move the last invalid
          result.invalidIndexes[result.invalidIndexes.length - 1],
          i
        );

        workingSequence = newSequence;
        reordered = true;
      } else {
        valid = true;
      }
    } while (!valid);
  }

  return { sequence: workingSequence, reordered };
}

function run({ rules, pageSequence }) {
  const notAllowedBeforeMap = createNotAllowedBeforeMap(rules);

  const result = pageSequence.reduce((acc, curr) => {
    const { sequence, reordered } = checkSequence(curr, notAllowedBeforeMap);

    if (reordered) {
      const middlePage = sequence[Math.floor(sequence.length / 2)];
      return acc + middlePage;
    }

    return acc;
  }, 0);

  console.log(result);
}

export function moveElement(arr, fromIndex, toIndex) {
  return [
    ...arr.slice(0, toIndex),
    arr[fromIndex],
    ...arr.slice(toIndex, fromIndex),
    ...arr.slice(fromIndex + 1),
  ];
}

if (process.argv.includes("--run")) {
  run({ rules, pageSequence: pages });
}
