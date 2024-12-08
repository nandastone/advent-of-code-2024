export const MapCell = {
  Empty: 0,
  Obstacle: 5,
  FakeObstacle: 6,
  Guard: 10,
  OutOfBounds: 15,
};

export const Direction = {
  Up: 1,
  Right: 2,
  Down: 3,
  Left: 4,
};

export const Vector = {
  [Direction.Up]: { x: 0, y: -1 },
  [Direction.Right]: { x: 1, y: 0 },
  [Direction.Down]: { x: 0, y: 1 },
  [Direction.Left]: { x: -1, y: 0 },
};
