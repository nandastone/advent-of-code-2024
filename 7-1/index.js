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
  for (let i = 0; i < Math.pow(2, size); i++) {
    const combination = Array.from({ length: size }, (_, j) =>
      i & (1 << j) ? "+" : "*"
    );

    const newTokens = structuredClone(equationTokens);
    combination.forEach((item, idx) => (newTokens[idx * 2 + 1].value = item));

    if (calculate(newTokens) === target) {
      return true;
    }
  }

  return false;
}

function calculate(equationTokens) {
  let operator = undefined;
  return equationTokens.reduce((acc, curr) => {
    if (curr.type === "term") {
      if (operator === "+") {
        acc = acc + curr.value;
      } else if (operator === "*") {
        acc = acc * curr.value;
      } else {
        acc = curr.value;
      }

      operator = undefined;
    } else if (curr.type === "operator") {
      operator = curr.value;
    }

    return acc;
  }, 0);
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

  console.log(result);

  if (benchmark) {
    console.timeEnd("total runtime");
  }
}

if (process.argv.includes("--run")) {
  run(input, true);
}
