import test from "node:test";
import assert from "node:assert";
import { Guard } from "./Guard.js";
import { Map } from "./Map.js";
import { MapCell } from "./constants.js";

function setup(rawInput) {
  const input = rawInput.split("\n").map((line) => line.split(""));
  const { map, guardStartingPos, guardStartingDir } = Map.buildMap(input);
  const guard = new Guard(guardStartingPos, guardStartingDir);

  return { map, guard };
}

test.describe("adding obstacles", () => {
  test("correctly detects a loop for fake obstacle in { x: 7, y: 7 }", () => {
    const { map, guard } = setup(`....#.....
....^....#
..........
..#.......
.......#..
..........
.#........
........#.
#.........
......#...`);
    map.updateCell({ x: 7, y: 7 }, MapCell.FakeObstacle);

    assert.throws(() => guard.walkMap(map), { name: "InfinitePathError" });
  });
});

test.describe("other", () => {
  test("correctly goes out of bounds", () => {
    const { map, guard } = setup(`....
#...
.^#.
.#..`);

    guard.walkMap(map);

    assert.equal(guard.visitedPositions.size, 3);
  });

  test("correctly goes out of bounds", () => {
    const { map, guard } = setup(`......
..>..#
....#.`);

    guard.walkMap(map);

    assert.equal(guard.visitedPositions.size, 5);
  });
});
