import createDebug from "debug";
import { input } from "./input.js";

const debug = createDebug("aoc");

const VECTOR = {
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
};

const START_HEIGHT = 0;
const STOP_HEIGHT = 9;

export function walkTrail(trail, startPos, startHeight, total) {
  let height = startHeight;
  let nextSteps = findNextSteps(trail, startPos, height);

  for (let i = 0; i < nextSteps.length; i++) {
    const nextStep = nextSteps[i];
    const nextHeight = height + 1;

    debug({ nextStep, step: trail[nextStep.y][nextStep.x] });

    if (nextHeight === STOP_HEIGHT) {
      debug("New peak!", total);
      total += 1;
    } else {
      total = walkTrail(trail, nextStep, height + 1, total);
    }
  }

  return total;
}

function findNextSteps(trail, pos, height) {
  let steps = [];

  if (pos.x > 0) {
    const leftPos = { x: pos.x + VECTOR.LEFT.x, y: pos.y + VECTOR.LEFT.y };
    if (trail[leftPos.y][leftPos.x] === height + 1) {
      steps.push(leftPos);
    }
  }

  if (pos.x < trail[0].length - 1) {
    const rightPos = { x: pos.x + VECTOR.RIGHT.x, y: pos.y + VECTOR.RIGHT.y };
    if (trail[rightPos.y][rightPos.x] === height + 1) {
      steps.push(rightPos);
    }
  }

  if (pos.y > 0) {
    const upPos = { x: pos.x + VECTOR.UP.x, y: pos.y + VECTOR.UP.y };
    if (trail[upPos.y][upPos.x] === height + 1) {
      steps.push(upPos);
    }
  }

  if (pos.y < trail.length - 1) {
    const downPos = { x: pos.x + VECTOR.DOWN.x, y: pos.y + VECTOR.DOWN.y };
    if (trail[downPos.y][downPos.x] === height + 1) {
      steps.push(downPos);
    }
  }

  return steps;
}

// 1. Remove the "reached" concept to allow a peak to be reached by many trails.

export function run(input) {
  console.time("total runtime");

  debug("input", input);

  let total = 0;

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === 0) {
        const reached = new Set();
        total += walkTrail(input, { x, y }, START_HEIGHT, 0, reached);
      }
    }
  }

  console.log(total);
  console.timeEnd("total runtime");

  return total;
}

if (process.argv.includes("--run")) {
  run(input);
}
