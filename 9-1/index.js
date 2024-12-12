import createDebug from "debug";
import { input } from "./input.js";
import { renderDisk } from "./utils.js";
import { LL } from "./LL.js";

const debug = createDebug("aoc");

export function convertMapToDisk(rawMap) {
  const map = rawMap.split("").map((item) => parseInt(item, 10));
  const disk = new LL();

  for (let i = 0; i < map.length; i++) {
    const gap = !!(i % 2);
    const count = map[i];
    const val = gap ? undefined : i / 2;

    for (let k = 0; k < count; k++) {
      disk.appendNode(val);
    }
  }
  return disk;
}

function compressDisk(disk) {
  // 1. Start at tail, go backwards until finding file.
  // 2. Start at head, go forwards until finding empty.
  // 3. Swap.
  // 4. Continue until files would be moved to empty spaces behind.

  while (true) {
    const empty = findFirstEmpty(disk.head);
    const file = findLastFile(disk.tail);

    if (
      !empty ||
      !file ||
      // We've passed the point where files would be moved forward instead of backwards.
      file.next === empty
    ) {
      break;
    }

    file.swapWith(empty);
  }

  return disk;
}

function findFirstEmpty(start) {
  let node = start;
  while (node && node.type !== "empty") {
    node = node.next;
  }
  return node;
}

function findLastFile(start) {
  let node = start;
  while (node && node.type !== "file") {
    node = node.prev;
  }
  return node;
}

export function calculateDiskChecksum(disk) {
  let idx = 0;
  let checksum = 0;
  let node = disk.head;

  while (node) {
    if (node.type === "file") {
      checksum += node.id * idx;
    }

    node = node.next;
    idx += 1;
  }

  return checksum;
}

export function run(input) {
  console.time("total runtime");

  console.time("map to disk");
  let disk = convertMapToDisk(input);
  console.timeEnd("map to disk");

  debug("starting disk", renderDisk(disk));
  console.time("compressing disk");
  disk = compressDisk(disk);
  console.timeEnd("compressing disk");
  debug("compressed disk", renderDisk(disk));

  console.time("disk checksum");
  const checksum = calculateDiskChecksum(disk);
  console.timeEnd("disk checksum");

  console.log("Checksum: ", checksum);
  console.timeEnd("total runtime");

  return checksum;
}

if (process.argv.includes("--run")) {
  run(input);
}
