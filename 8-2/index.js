import { input } from "./input.js";
import { renderMap } from "./utils.js";
import { Vector } from "./Vector.js";
import { WorldMap } from "./WorldMap.js";

// 1. Get vector for each pos as before.
// 2. Loop and apply vector, creating antinode, until the antinode is out of bounds.

function createAntinodesForPair(pair, map) {
  const [pos1, pos2] = pair;
  const vector = Vector.between(pos1, pos2);

  return [
    ...generateAntinodes(pos2, Vector.reverse(vector), map),
    ...generateAntinodes(pos1, vector, map),
    // Include original symbol positions as antinodes.
    pos1,
    pos2,
  ];
}

function generateAntinodes(start, vector, map) {
  const antinodes = [];
  let pos = Vector.add(start, vector);

  while (map.isInBounds(pos)) {
    antinodes.push({ ...pos });
    pos = Vector.add(pos, vector);
  }

  return antinodes;
}

function run(input, benchmark = false) {
  if (benchmark) {
    console.time("total runtime");
  }

  const map = new WorldMap(input);

  map
    .getPairs()
    .flatMap((pair) => createAntinodesForPair(pair, map))
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
