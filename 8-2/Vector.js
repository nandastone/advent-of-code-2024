export const Vector = {
  between: (pos1, pos2) => ({
    x: pos1.x - pos2.x,
    y: pos1.y - pos2.y,
  }),
  reverse: (v) => ({ x: -v.x, y: -v.y }),
  add: (pos, v) => ({ x: pos.x + v.x, y: pos.y + v.y }),
};
