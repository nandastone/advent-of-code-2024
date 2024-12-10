import createDebug from "debug";
import { input } from "./input.js";
import { renderDisk } from "./utils.js";

const debug = createDebug("aoc");

class DiskNode {
  constructor(prev, id) {
    this.prev = prev;
    this.next = undefined;
    this.id = id;

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

  // TODO: How does head/tail work? Do you need to iterate back through and set?
  // prev.tail = prev

  // const disk = map.reduce((acc, curr, idx) => {
  //   const gap = idx % 2;

  //   if (gap) {
  //     acc.push(...Array.from({ length: curr }));
  //     return acc;
  //   } else {
  //     acc.push(...Array.from({ length: curr }).map(() => idx / 2));
  //   }

  //   return acc;
  // }, []);

  // return disk;
}

function compressDisk(disk) {
  const emptyIndexes = disk.reduce((acc, curr, idx) => {
    if (typeof curr === "undefined") {
      acc.push(idx);
    }

    return acc;
  }, []);

  let moved = 0;
  for (let i = disk.length - 1; i > 0; i--) {
    console.log(`${i - disk.length}/${disk.length}`);

    if (typeof disk[i] === "undefined") {
      continue;
    }

    // Swap rightmost non-empty with leftmost empty.
    const itemIndex = i;
    const emptyIndex = emptyIndexes[moved];

    // TODO: Can I build this into the array iteration instead?
    if (itemIndex < emptyIndex) {
      break;
    }

    disk[emptyIndex] = disk[itemIndex];
    disk[itemIndex] = undefined;

    moved += 1;

    debug("compressing disk", renderDisk(disk));
  }

  return disk;
}

function calculateDiskChecksum(disk) {
  const checksum = disk.reduce((acc, curr, idx) => {
    if (typeof curr === "undefined") {
      return acc;
    }

    acc += curr * idx;

    return acc;
  });
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
