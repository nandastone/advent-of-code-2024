import { input } from "./input.js";

const MapCell = {
  Empty: 1,
  Obstacle: 2,
  Guard: 3,
  OutOfBounds: 4,
};

const Direction = {
  Up: 1,
  Right: 2,
  Down: 3,
  Left: 4,
};

const Vector = {
  [Direction.Up]: { x: 0, y: -1 },
  [Direction.Right]: { x: 1, y: 0 },
  [Direction.Down]: { x: 0, y: 1 },
  [Direction.Left]: { x: -1, y: 0 },
};

function buildMap(input) {
  let guardStartingPos = { x: 0, y: 0 };
  const map = input.reduce((acc, curr, rowIdx) => {
    const row = curr.map((cell, colIdx) => {
      switch (cell) {
        case ".":
          return MapCell.Empty;
        case "#":
          return MapCell.Obstacle;
        case "^":
          guardStartingPos = { x: colIdx, y: rowIdx };
          return MapCell.Guard;
        default:
          throw new Error("Invalid map cell.");
      }
    });

    return [...acc, row];
  }, []);

  return { map, guardStartingPos };
}

function renderMap(map, guard) {
  const result = map
    .reduce((acc, curr, rowIdx) => {
      const row = curr
        .map((col, colIdx) => {
          switch (col) {
            case MapCell.Empty:
              const guardHasVisited = !!guard.visitedPos.get(
                posKey({ x: colIdx, y: rowIdx })
              );

              if (guardHasVisited) {
                return "X";
              }

              return ".";
            case MapCell.Obstacle:
              return "#";
            case MapCell.Guard:
              if (guard.dir === Direction.Up) {
                return "^";
              } else if (guard.dir === Direction.Down) {
                return "v";
              } else if (guard.dir === Direction.Right) {
                return ">";
              } else if (guard.dir === Direction.Left) {
                return "<";
              }
            default:
              throw new Error("Invalid map cell.");
          }
        })
        .join("");

      return [...acc, row];
    }, [])
    .join("\n");

  return result;
}

const guard = {
  pos: {
    x: 0,
    y: 0,
  },
  dir: Direction.Up,
  visitedPos: new Map(),
  move(map) {
    const { newPos } = getNextCell(map, this.pos, this.dir);
    let currentPos = { ...this.pos };
    this.pos = newPos;
    updateMap(map, currentPos, MapCell.Empty);
    updateMap(map, newPos, MapCell.Guard);
    this.trackVisitedPos();
  },
  turn() {
    this.dir = this.dir === Direction.Left ? Direction.Up : this.dir + 1;
  },
  trackVisitedPos() {
    this.visitedPos.set(
      posKey(this.pos),
      this.visitedPos.get(posKey(this.pos))
        ? this.visitedPos.get(posKey(this.pos)) + 1
        : 1
    );
  },
};

function updateMap(map, pos, cell) {
  map[pos.y][pos.x] = cell;
}

function posKey(pos) {
  return `${pos.x},${pos.y}`;
}

function getNextCell(map, pos, dir) {
  let cell;
  const vector = Vector[dir];
  const newPos = {
    x: pos.x + vector.x,
    y: pos.y + vector.y,
  };

  if (
    newPos.x >= 0 &&
    newPos.x < map[0].length &&
    newPos.y >= 0 &&
    newPos.y < map.length
  ) {
    cell = map[newPos.y][newPos.x];
  } else {
    cell = MapCell.OutOfBounds;
  }

  return { newPos, cell };
}

// 1. Track guard x/y, visited cells, direction.
// 2. Report state.
// 3. If empty, move.
// 4. If blocked, turn right.
// 5. When moving, increment counter for new cell.
// 6. Detect if moving off edge of map.

function run(input) {
  const { map, guardStartingPos } = buildMap(input);
  guard.pos = guardStartingPos;
  guard.trackVisitedPos();

  while (true) {
    const { cell: nextCell } = getNextCell(map, guard.pos, guard.dir);

    if (nextCell === MapCell.Empty) {
      guard.move(map);
    } else if (nextCell === MapCell.Obstacle) {
      guard.turn();
      guard.move(map);
    } else if (nextCell === MapCell.OutOfBounds) {
      break;
    } else {
      throw new Error("Invalid next cell.");
    }
  }

  const numVisitedPos = guard.visitedPos.size;
  // console.log(guard.visitedPos.entries());
  console.log(renderMap(map, guard));
  console.log(numVisitedPos);
}

if (process.argv.includes("--run")) {
  run(input);
}
