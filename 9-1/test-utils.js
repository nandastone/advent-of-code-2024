import { DiskNode } from "./index.js";

export function convertFilesToDisk(rawMap) {
  const map = rawMap.split("").map((item) => parseInt(item, 10));
  let prev = undefined;
  let head = undefined;

  for (let i = 0; i < map.length; i++) {
    const val = map[i];
    let node = undefined;

    node = new DiskNode(prev, val);
    if (prev) {
      prev.next = node;
    }
    prev = node;

    if (i === 0) {
      head = node;
    }
  }

  const tail = prev;

  return { head, tail };
}
