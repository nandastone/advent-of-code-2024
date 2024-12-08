import { rules, pages } from "./input.js";

/* Used Claude to generate documentation because the solution was (imo) complex.
Forgive me. */

/**
 * Creates a map of dependencies where each key is a page number,
 * and its value is an array of page numbers that must appear BEFORE it.
 * Example: { 53: [47] } means "47 must appear before 53"
 */
function createDependencyMap(rules) {
  return rules.reduce(
    (map, [before, after]) => ({
      ...map,
      [after]: [...(map[after] || []), before],
    }),
    {}
  );
}

/**
 * Checks if a page violates any dependency rules by looking at following pages.
 * Returns index of first page that should be before current page, or -1 if valid.
 * Example: If 53 requires 47 to be before it, and we see [53, 47], returns index of 47
 */
function findFirstViolation(sequence, currentIdx, dependencyMap) {
  const currentPage = sequence[currentIdx];
  const dependencies = dependencyMap[currentPage];

  if (!dependencies) {
    return -1;
  }

  return sequence.findIndex(
    (page, idx) => idx > currentIdx && dependencies.includes(page)
  );
}

/**
 * Sorts sequence using insertion-sort approach where:
 * 1. For each position, check if any later pages violate dependency rules.
 * 2. If violation found, move violating page before current position.
 * 3. Repeat until current position has no violations
 * Returns new sorted sequence
 */
function sortSequence(sequence, dependencyMap) {
  const result = [...sequence];

  for (let i = 0; i < result.length; i++) {
    let violationIdx;
    while (
      (violationIdx = findFirstViolation(result, i, dependencyMap)) !== -1
    ) {
      const [removed] = result.splice(violationIdx, 1);
      result.splice(i, 0, removed);
    }
  }

  return result;
}

function run(rules, sequences) {
  const dependencyMap = createDependencyMap(rules);

  const result = sequences.reduce((sum, sequence) => {
    const sorted = sortSequence(sequence, dependencyMap);
    // Compare arrays to check if reordering occurred.
    const wasReordered = !sequence.every((num, idx) => num === sorted[idx]);
    if (wasReordered) {
      return sum + sorted[Math.floor(sorted.length / 2)];
    }
    return sum;
  }, 0);

  console.log(result);
}

if (process.argv.includes("--run")) {
  run(rules, pages);
}
