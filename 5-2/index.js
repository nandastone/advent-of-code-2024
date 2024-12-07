import { rules, pages } from "./input.js";

// 1. For each number, store a sorted list of the numbers that CAN'T appear after.
// 2. Iterate pages.
// - For each page,
// - Check pages after to make sure they can appear.

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
  // 1. Does it have a mapping of not allowed after values?
  // - If not, everything is allowed, return.
  // - If so, iterate the rest of the array (after this index) and make sure none are in the map.

  if (typeof notAllowedBeforeMap[page] === "undefined") {
    return true;
  }

  const pageIdx = sequence.indexOf(page);

  // Get indexes of anything in not allowed map.
  // If index, rearrange curr to have item after index
  const invalidIndexes = sequence
    .slice(pageIdx + 1)
    // List of indexes for invalid pages.
    .map((followingPage) =>
      // console.log({ page, map: notAllowedBeforeMap[page], followingPage }) &&
      notAllowedBeforeMap[page].findIndex(
        (notAllowedPage) => followingPage === notAllowedPage
      )
    )
    .filter((pageIndex) => pageIndex !== -1);

  // console.log({ invalidIndexes });

  return { valid: invalidIndexes.length === 0, indexes: invalidIndexes };
}

function run({ rules, pageSequence }) {
  const notAllowedBeforeMap = createNotAllowedBeforeMap(rules);

  console.log(notAllowedBeforeMap);

  const result = pageSequence.reduce((acc, curr) => {
    const inOrder = true;
    // const inOrder = curr.every(
    //   (item) => checkPageInSequence(curr, item, notAllowedBeforeMap).valid
    // );

    curr.forEach((item) =>
      console.log(checkPageInSequence(curr, item, notAllowedBeforeMap))
    );

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
