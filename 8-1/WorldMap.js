export class WorldMap {
  grid = [];

  constructor(grid) {
    this.grid = grid;
  }

  getSymbols() {
    const symbols = new Map();

    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[0].length; x++) {
        const cell = this.getCell({ x, y });

        if (cell === ".") {
          continue;
        }

        symbols.set(cell, [...(symbols.get(cell) ?? []), { x, y }]);
      }
    }

    return symbols;
  }

  countAntinodeLocations() {
    return this.grid.flat().filter((cell) => cell === "#").length;
  }

  addAntinode(pos) {
    this.updateCell(pos, "#");
  }

  getCell(pos) {
    return this.grid[pos.y][pos.x];
  }

  updateCell(pos, newCell) {
    this.grid[pos.y][pos.x] = newCell;
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
