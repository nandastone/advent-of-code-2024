import { Direction, MapCell } from "./constants.js";
import { posKey } from "./utils.js";
import { InfinitePathError } from "./InfinitePathError.js";

export class Guard {
  pos = { x: 0, y: 0 };
  dir = Direction.Up;
  visitedPositions = new Map();

  constructor(startingPos, startingDir) {
    this.pos = startingPos;
    this.dir = startingDir;
    this.trackVisitedPos();
  }

  walkMap(map) {
    while (true) {
      const { cell: nextCell } = map.getNextCell(this.pos, this.dir);

      if (nextCell === MapCell.Empty) {
        this.move(map);
      } else if (
        nextCell === MapCell.Obstacle ||
        nextCell === MapCell.FakeObstacle
      ) {
        this.turn();
      } else if (nextCell === MapCell.OutOfBounds) {
        break;
      } else {
        throw new Error("Invalid next cell.");
      }
    }
  }

  move(map) {
    const { pos: newPos } = map.getNextCell(this.pos, this.dir);
    map.updateCell(this.pos, MapCell.Empty);
    this.pos = newPos;
    map.updateCell(this.pos, MapCell.Guard);
    this.trackVisitedPos();
  }

  turn() {
    this.dir = this.dir === Direction.Left ? Direction.Up : this.dir + 1;
  }

  trackVisitedPos() {
    // Infinite loop detection:
    // 1. When visiting cell, track cell visit with dir.
    // 2. If guard enters cell again in same direction:
    // - Infinite loop detected.

    const pos = this.visitedPositions.get(posKey(this.pos)) ?? new Set();

    if (pos.has(this.dir)) {
      throw new InfinitePathError("Guard detected walking infinite path.");
    }

    pos.add(this.dir);
    this.visitedPositions.set(posKey(this.pos), pos);
  }
}
