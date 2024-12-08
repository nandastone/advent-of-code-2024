import { Direction, MapCell, Vector } from "./constants.js";

export class Map {
  grid = [];

  constructor(grid) {
    this.grid = grid;
  }

  static buildMap(input) {
    let startingPos = { x: 0, y: 0 };
    let startingDir = Direction.Up;

    const grid = input.reduce((acc, curr, rowIdx) => {
      const row = curr.map((cell, colIdx) => {
        switch (cell) {
          case ".":
            return MapCell.Empty;
          case "#":
            return MapCell.Obstacle;
          case "^":
            startingPos = { x: colIdx, y: rowIdx };
            startingDir = Direction.Up;
            return MapCell.Guard;
          case "v":
            startingPos = { x: colIdx, y: rowIdx };
            startingDir = Direction.Down;
            return MapCell.Guard;
          case ">":
            startingPos = { x: colIdx, y: rowIdx };
            startingDir = Direction.Right;
            return MapCell.Guard;
          case "<":
            startingPos = { x: colIdx, y: rowIdx };
            startingDir = Direction.Left;
            return MapCell.Guard;
          default:
            throw new Error(`Invalid map cell: ${cell}`);
        }
      });

      return [...acc, row];
    }, []);

    return {
      map: new Map(grid),
      guardStartingPos: startingPos,
      guardStartingDir: startingDir,
    };
  }

  getCell(pos) {
    return this.grid[pos.y][pos.x];
  }

  updateCell(pos, newCell) {
    this.grid[pos.y][pos.x] = newCell;
  }

  getNextCell(pos, dir) {
    let cell;
    const vector = Vector[dir];
    const newPos = {
      x: pos.x + vector.x,
      y: pos.y + vector.y,
    };

    return {
      pos: newPos,
      cell: this.isInBounds(newPos)
        ? this.getCell(newPos)
        : MapCell.OutOfBounds,
    };
  }

  isInBounds(newPos) {
    return (
      newPos.x >= 0 &&
      newPos.x < this.grid[0].length &&
      newPos.y >= 0 &&
      newPos.y < this.grid.length
    );
  }

  clone() {
    const newGrid = structuredClone(this.grid);
    return new Map(newGrid);
  }
}
