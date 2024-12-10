import createDebug from "debug";
import { input } from "./input.js";
import { renderDisk } from "./utils.js";

const debug = createDebug("aoc");

function convertMapToDisk(map) {
  const disk = map.reduce((acc, curr, idx) => {
    const gap = idx % 2;
    acc.push({
      id: !gap ? idx / 2 : undefined,
      count: parseInt(curr),
      order: idx * 50,
      checked: false,
    });

    return acc;
  }, []);

  return disk;
}

function compressDisk(disk) {
  let fileIdx = undefined;

  const findNextEmptyIdx = (minCount, maxIdx) =>
    disk.findIndex(
      (chunk, idx) =>
        typeof chunk.id === "undefined" &&
        idx < maxIdx &&
        chunk.count >= minCount
    );

  const findNextFileIdx = () => {
    const idx = disk.findLastIndex(
      (chunk) => typeof chunk.id !== "undefined" && !chunk.checked
    );
    fileIdx = idx;
    return idx;
  };

  // Instead of tracking blocks, track chunks.
  // [{ id: 0, count: 2, order: 5 }, { id: undefined, count: 2, order: 10 }
  // 1. Compare right most file chunk with left most empty chunk of large enough size.
  // 2. If file chunk count <= empty chunk count, it can fit and be moved:
  // - Change file chunk order so it now appears just before the empty chunk.
  // e.g. [11][...][22][...][99] -> [11][99][...][22][...]
  // - Reduce empty count by chunk count.
  // e.g. [11][99][...][22][...] -> [11][99][.][22][...]
  // - Increase empty chunk count just previous to file chunk to take up the vacated space.
  // e.g. [11][99][.][22][...] -> [11][99][.][22][.....]
  // - Sort all chunks so the new orders are actually applied. Without this, the next loop
  // won't correctly identify empty chunks.

  // This works but is horribly inefficient, needing nested loops inside the main chunks loop:
  // - Find index of next empty of sufficient size.
  // - Sort all chunks.
  // - Update order in all chunks.

  while (findNextFileIdx()) {
    const file = disk[fileIdx];
    file.checked = true;

    console.log(`${Math.abs(fileIdx - disk.length)}/${disk.length}`);

    const emptyIdx = findNextEmptyIdx(file.count, fileIdx);

    if (emptyIdx === -1) {
      continue;
    }

    const empty = disk[emptyIdx];
    const prevEmpty = disk[fileIdx - 1];

    empty.count -= file.count;
    file.order = empty.order - 1;
    prevEmpty.count += file.count;

    disk = disk.sort((a, b) => a.order - b.order);
    disk.forEach((item, idx) => (item.order = idx * 50));

    debug("compressing disk", renderDisk(disk));
  }

  return disk;
}

function calculateDiskChecksum(disk) {
  const flatDisk = disk
    .reduce((acc, curr) => {
      if (!curr.count) {
        return acc;
      }

      acc.push(Array.from({ length: curr.count }).map(() => curr.id));

      return acc;
    }, [])
    .flat();

  const checksum = flatDisk.reduce((acc, curr, idx) => {
    if (typeof curr === "undefined") {
      return acc;
    }
    acc += curr * idx;
    return acc;
  });

  return checksum;
}

export function run(input) {
  console.time("total runtime");

  // You can't convert a compact disk back into a disk map, as the file IDs are potentially no longer sequential.
  // 1. Convert disk map to a disk (array).
  // 2. Insertion "sort" the disk to compact blocks to the left of the disk.

  console.time("map to disk");
  let disk = convertMapToDisk(input.split(""));
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
