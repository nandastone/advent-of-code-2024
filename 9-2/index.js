import createDebug from "debug";
import { input } from "./input.js";
import { convertMapToDisk, flattenDisk, renderDisk } from "./utils.js";

const debug = createDebug("aoc");

function compressDisk(disk) {
  const processed = new Set();

  while (true) {
    // Find rightmost unprocessed file frame
    let currentFrame = disk.tail;
    while (
      currentFrame &&
      (currentFrame.type !== "file" || processed.has(currentFrame))
    ) {
      currentFrame = currentFrame.prev;
    }

    // No more unprocessed files
    if (!currentFrame) {
      break;
    }

    // Try to move the file
    const empty = findFirstFitEmptyFrame(
      disk.head,
      currentFrame,
      currentFrame.size
    );
    if (empty) {
      disk.updateTail(currentFrame);
      currentFrame.moveToEmptyFrame(empty);
    }

    processed.add(currentFrame);
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
