import { LL } from "./LL.js";

export function convertFilesToDisk(rawMap) {
  const map = rawMap.split("").map((item) => parseInt(item, 10));
  const disk = new LL();

  for (let i = 0; i < map.length; i++) {
    disk.appendNode(map[i]);
  }

  return disk;
}
