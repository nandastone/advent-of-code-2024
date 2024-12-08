import { input } from "./input.js";
import { renderMap } from "./utils.js";
import { WorldMap } from "./WorldMap.js";

// 1. Find pairs of symbols.
// - Count instance and pos of symbols.
// - For each symbol, save a pair with every other symbol.

function getPairs(map) {
  const symbols = map.getSymbols();
  const pairs = [...symbols.values()].reduce((acc, curr) => {
    let pairs = [];

    for (let i = 0; i < curr.length; i++) {
      for (let k = i + 1; k < curr.length; k++) {
        pairs.push([curr[i], curr[k]]);
      }
    }

    return [...acc, ...pairs];
  }, []);

  return pairs;
}

// 1. For each pair of symbols.
// 2. Cast a vector between one of them to get angle, magnitude.
// 3. Duplicate and reverse the vector.
// 4. With each vector, cast out to find where the antinode should be.

function getAntinodePositions(pair) {
  const [pos1, pos2] = pair;
  const vector = {
    x: pos1.x - pos2.x,
    y: pos1.y - pos2.y,
  };
  const reverseVector = {
    x: -vector.x,
    y: -vector.y,
  };

  return [
    {
      x: pos2.x + reverseVector.x,
      y: pos2.y + reverseVector.y,
    },
    {
      x: pos1.x + vector.x,
      y: pos1.y + vector.y,
    },
  ];
}

function run(input, benchmark = false) {
  if (benchmark) {
    console.time("total runtime");
  }

  const map = new WorldMap(input);

  getPairs(map)
    .flatMap((pair) => getAntinodePositions(pair))
    .filter((pos) => map.isInBounds(pos))
    .forEach((pos) => map.addAntinode(pos));

  const result = map.countAntinodeLocations();

  console.log(renderMap(map));
  console.log(result);

  if (benchmark) {
    console.timeEnd("total runtime");
  }
}

if (process.argv.includes("--run")) {
  run(input, true);
}
