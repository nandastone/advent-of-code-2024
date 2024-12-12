import { LL } from "./LL.js";

export function convertMapToDisk(map) {
  const disk = new LL();

  for (let i = 0; i < map.length; i++) {
    const gap = !!(i % 2);
    const size = map[i];
    const value = gap ? undefined : i / 2;
    disk.appendNode(value, size);
  }

  return disk;
}

export function renderDisk(disk) {
  const flatDisk = flattenDisk(disk);
  const result = flatDisk
    .map((block) => (typeof block === "undefined" ? "." : `${block}`))
    .join("");
  return result;
}

export function flattenDisk(disk) {
  let result = [];
  let node = disk.head;

  while (node) {
    result.push(Array.from({ length: node.size }).map(() => node.value));
    node = node.next;
  }

  result = result.flat();

  return result;
}
