import { Direction, MapCell } from "./constants.js";

export function renderMap(map, guard) {
  const result = map.grid
    .reduce((acc, curr, rowIdx) => {
      const row = curr
        .map((col, colIdx) => {
          switch (col) {
            case MapCell.Empty:
              const guardHasVisited = !!guard.visitedPositions.get(
                posKey({ x: colIdx, y: rowIdx })
              );

              if (guardHasVisited) {
                return "X";
              }

              return ".";
            case MapCell.Obstacle:
              return "#";
            case MapCell.FakeObstacle:
              return "O";
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

export function posKey(pos) {
  return `${pos.x},${pos.y}`;
}
