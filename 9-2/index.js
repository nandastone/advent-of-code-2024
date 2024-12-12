import createDebug from "debug";
import { input } from "./input.js";
import { convertMapToDisk, flattenDisk, renderDisk } from "./utils.js";

const debug = createDebug("aoc");

function compressDisk(disk) {
  const processed = new Set();

  while (true) {
    let currentFile = disk.tail;

    // Find next unprocessed file frame.
    while (
      currentFile &&
      (currentFile.type !== "file" || processed.has(currentFile))
    ) {
      currentFile = currentFile.prev;
    }

    // No more unprocessed files.
    if (!currentFile) {
      break;
    }

    // Find the first empty frame of suitable size.
    const empty = findFirstFitEmptyFrame(
      disk.head,
      currentFile,
      currentFile.size
    );

    // If it exists, move the current file into the empty space.
    if (empty) {
      // We may have just moved the tail, check for this.
      disk.updateTail(currentFile);
      currentFile.moveBeforeEmptyFrame(empty);
    }

    processed.add(currentFile);
  }

  return disk;
}

function findFirstFitEmptyFrame(start, threshold, requiredSize) {
  let frame = start;

  while (frame) {
    // Ensure we don't search beyond the file we're moving.
    if (frame === threshold) {
      break;
    }

    if (frame.type === "empty" && frame.size >= requiredSize) {
      return frame;
    }

    frame = frame.next;
  }

  return undefined;
}

function calculateDiskChecksum(disk) {
  const flatDisk = flattenDisk(disk);
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

  console.time("map to disk");
  const map = input.split("").map((item) => parseInt(item, 10));
  let disk = convertMapToDisk(map);
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
