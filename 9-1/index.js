import createDebug from "debug";
import { input } from "./input.js";
import { renderDisk } from "./utils.js";

const debug = createDebug("aoc");

// TODO: Wrap in LL for mgmt.
class DiskNode {
  constructor(prev, id) {
    this.prev = prev;
    this.next = undefined;
    this.id = id;
    this.type = typeof id === "undefined" ? "empty" : "file";

    // TODO: How does head/tail on node work? Do you need to iterate back through and set?
    // if (!prev) {
    //   this.head = this;
    // }
  }
}

function convertMapToDisk(map) {
  let prev = undefined;
  let head = undefined;

  for (let i = 0; i < map.length; i++) {
    const gap = !!(i % 2);
    const count = map[i];
    const val = gap ? undefined : i / 2;
    let node = undefined;

    for (let k = 0; k < count; k++) {
      node = new DiskNode(prev, val);
      if (prev) {
        prev.next = node;
      }
      prev = node;

      if (i === 0 && k === 0) {
        head = node;
      }
    }
  }

  const tail = prev;

  return { head, tail };
}

function compressDisk(disk) {
  // 1. Start at tail, go backwards until finding file.
  // 2. Start at head, go forwards until finding empty.
  // 3. Swap.

  while (true) {
    let empty = disk.head;
    let file = disk.tail;

    while (empty && empty.type !== "empty") {
      if (!empty.next) {
        console.log("Nothing left to search.");
        empty = undefined;
        break;
      }

      empty = empty.next;
    }

    while (file && file.type !== "file") {
      if (!file.prev) {
        console.log("Nothing left to search.");
        file = undefined;
        break;
      }

      file = file.prev;
    }

    if (file.next === empty) {
      console.log("done!");
      break;
    }

    empty.id = file.id;
    file.id = undefined;
    empty.type = "file";
    file.type = "empty";
  }

  return disk;
}

function calculateDiskChecksum(disk) {
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

function run(input) {
  console.time("total runtime");

  // You can't convert a compact disk back into a disk map, as the file IDs are potentially no longer sequential.
  // 1. Convert disk map to a disk (array).
  // 2. Insertion "sort" the disk to compact blocks to the left of the disk.

  console.time("map to disk");
  let disk = convertMapToDisk(input);
  console.timeEnd("map to disk");

  debug("starting disk", renderDisk(disk));
  // console.time("compressing disk");
  // disk = compressDisk(disk);
  // console.timeEnd("compressing disk");
  // debug("compressed disk", renderDisk(disk));

  // console.time("disk checksum");
  // const checksum = calculateDiskChecksum(disk);
  // console.timeEnd("disk checksum");

  // console.log("Checksum: ", checksum);

  console.timeEnd("total runtime");
}

if (process.argv.includes("--run")) {
  console.log("ding!");
  run(input);
}
