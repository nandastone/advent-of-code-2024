import { input } from "./input.js";

function getEquationTokens(terms) {
  return terms.reduce((acc, curr, idx) => {
    return [
      ...acc,
      { type: "term", value: curr },
      ...(idx !== terms.length - 1 ? [{ type: "operator", value: "*" }] : []),
    ];
  }, []);
}

function testAllOperatorPermutations(equationTokens, target) {
  const size = Math.floor(equationTokens.length / 2);
  const operators = ["+", "*", "||"];
  const newTokens = structuredClone(equationTokens);
  // Precalculate powers.
  const powers = Array.from({ length: size }, (_, i) => Math.pow(3, i));

  for (let i = 0; i < Math.pow(3, size); i++) {
    const combination = Array.from({ length: size }, (_, j) => {
      const trit = Math.floor(i / powers[j]) % 3;
      return operators[trit];
    });

    combination.forEach((item, idx) => (newTokens[idx * 2 + 1].value = item));

    if (calculate(newTokens) === target) {
      return true;
    }
  }

  return false;
}

function calculate(equationTokens) {
  // New calc to properly reduce conjunction operator (||):
  // 1. The first item (term) is the current total.
  // 2. Take the next two items (operator and 2nd term).
  // 3. Calculate and stores as new total.
  // 4. Repeat, incrementing by two each loop.
  // 5. Continue until the end of the array is reached.

  let result = equationTokens[0].value;

  for (let i = 1; i < equationTokens.length - 1; i += 2) {
    const operator = equationTokens[i].value;
    const nextTerm = equationTokens[i + 1].value;
    result = runExpression(result, nextTerm, operator);
  }

  return result;
}

function runExpression(term1, term2, operator) {
  if (operator === "+") {
    return term1 + term2;
  } else if (operator === "*") {
    return term1 * term2;
  } else if (operator === "||") {
    // Joining terms (not adding).
    return parseInt(`${term1}` + `${term2}`, 10);
  }

  throw new Error("Invalid operator in expression.");
}

// 1. Convert sequence of terms into tokens.
// 2. Add operator tokens, so we can easily replace operators.
// 3. Calculate all possible permutation of operator sequence.
// 4. Clone token sequence per permutation and update operators.
// 5. Calculate the result of each token sequence (applying terms and operators left to right, no eval sadface)

function run(input, benchmark = false) {
  if (benchmark) {
    console.time("total runtime");
  }

  const result = input.reduce((acc, { target, terms }) => {
    const equationTokens = getEquationTokens(terms);

    if (testAllOperatorPermutations(equationTokens, target)) {
      return (acc += target);
    }

    return acc;
  }, 0);

  console.log({ result });

  if (benchmark) {
    console.timeEnd("total runtime");
  }
}

if (process.argv.includes("--run")) {
  run(input, true);
}
