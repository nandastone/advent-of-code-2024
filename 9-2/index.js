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
    disk.appendNode(val, count);
  }

  return disk;
}

function compressDisk(disk) {
  // 1. Start at tail, go backwards until finding file.
  // 2. Start at head, go forwards until finding empty.
  // 3. Swap.
  // 4. Continue until files would be moved to empty spaces behind.
  let file;
  let loops = 0;

  do {
    loops += 1;
    console.log("loops", loops);
    file = findLastFile(disk.tail);
    // console.log({ file });
    const empty = findFirstEmpty(disk.head, file.count);
    // console.log({ empty });

    file.checked = true;

    // console.log({ file, empty });

    if (
      // We've passed the point where files would be moved forward instead of backwards.
      file.next === empty
    ) {
      break;
    }

    if (empty) {
      if (file === disk.tail && disk.tail.prev) {
        disk.tail = disk.tail.prev;
      }

      file.swapWith(empty);
    }

    console.log(renderDisk(disk));

    // break;
  } while (file);

  return disk;
}

function findFirstEmpty(start, minCount) {
  let node = start;

  function isEmpty(node) {
    return node.type === "empty" && node.count >= minCount;
  }

  while (node && !isEmpty(node)) {
    node = node.next;
  }
  return node;
}

function findLastFile(start) {
  let node = start;

  function isFile(node) {
    return node.type === "file" && !node.checked;
  }

  while (node && !isFile(node)) {
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
  console.log(renderDisk(disk));
  console.timeEnd("map to disk");

  debug("starting disk", renderDisk(disk));
  console.time("compressing disk");
  disk = compressDisk(disk);
  console.timeEnd("compressing disk");
  debug("compressed disk", renderDisk(disk));

  // console.time("disk checksum");
  // const checksum = calculateDiskChecksum(disk);
  // console.timeEnd("disk checksum");

  // console.log("Checksum: ", checksum);
  console.timeEnd("total runtime");

  // return checksum;
}

if (process.argv.includes("--run")) {
  run(input);
}
