import { MapCell } from "./constants.js";
import { input } from "./input.js";
import { Guard } from "./Guard.js";
import { Map } from "./Map.js";
import { InfinitePathError } from "./InfinitePathError.js";
import { posKey } from "./utils.js";

function run(input, benchmark = false) {
  if (benchmark) {
    console.time("total runtime");
  }

  let infinitePaths = 0;
  const {
    map: startingMap,
    guardStartingPos,
    guardStartingDir,
  } = Map.buildMap(input);

  console.log(startingMap, guardStartingPos, guardStartingDir);

  // First pass - walk the map to identify which cells are even reachable.
  const baselineGuard = new Guard(guardStartingPos, guardStartingDir);
  const baselineMap = startingMap.clone();
  baselineGuard.walkMap(baselineMap);
  const reachableCells = new Set(baselineGuard.visitedPositions.keys());

  // Brute force approach to try every single empty cell.
  // 1. Reset map.
  // 2. Select new cell for new obstacle.
  // 3. Check cell is reachable.
  // 4. Walk map and detect infinite loop.
  for (let y = 0; y < startingMap.grid.length; y++) {
    for (let x = 0; x < startingMap.grid[y].length; x++) {
      // Only test cells that were reachable.
      if (!reachableCells.has(posKey({ x, y }))) {
        continue;
      }

      const cell = startingMap.getCell({ x, y });

      if (cell !== MapCell.Empty) {
        continue;
      }

      /* FIXME: Instead of creating new map and guard objects in the hot loop, reset 
      and reuse them. */
      const guard = new Guard(guardStartingPos, guardStartingDir);
      const map = startingMap.clone();
      map.updateCell({ x, y }, MapCell.FakeObstacle);

      try {
        guard.walkMap(map);
      } catch (err) {
        if (err instanceof InfinitePathError) {
          console.log("Infinite path detected when adding obstacle at", {
            x,
            y,
          });
          infinitePaths += 1;
          continue;
        } else {
          throw err;
        }
      }
    }
  }

  if (benchmark) {
    console.timeEnd("total runtime");
  }

  console.log(infinitePaths);
}

if (process.argv.includes("--run")) {
  run(input, true);
}
