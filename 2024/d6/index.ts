import { fetchDayInput } from "../../utils/fetch-input";
type Directions = "up" | "down" | "left" | "right";

const DIRECTIONS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

async function p1() {
  const input = await fetchDayInput({
    day: 6,
    year: 2024,
  });

  const grid = parse(input);
  const guard = findGuard(grid)!;
  const visited = new Set();

  let direction: Directions = "up";
  let gx = guard.x;
  let gy = guard.y;

  while (true) {
    const key = `${gx} ${gy}`;

    if (isOutOfBounds(grid, gx, gy, direction)) {
      visited.add(key);

      break;
    }

    if (isInvalid(grid, gx, gy, direction)) {
      direction = changeDirection(direction);

      continue;
    }

    const nx = gx + DIRECTIONS[direction].x;
    const ny = gy + DIRECTIONS[direction].y;
    const nextPosKey = `${nx} ${ny}`;
    gx = nx;
    gy = ny;
    visited.add(nextPosKey);
  }

  console.log({ visited: visited.size });
}

async function p2() {
  const input = await fetchDayInput({
    day: 6,
    year: 2024,
  });

  const grid = parse(input);
  const guard = findGuard(grid)!;

  let obstacles = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      let direction: Directions = "up";
      let gx = guard.x;
      let gy = guard.y;
      const visited = new Set();

      while (true) {
        if (isOutOfBounds(grid, gx, gy, direction)) {
          break;
        }

        if (isInvalidWithReplacement(grid, gx, gy, direction, col, row)) {
          direction = changeDirection(direction);

          continue;
        }

        const nx = gx + DIRECTIONS[direction].x;
        const ny = gy + DIRECTIONS[direction].y;
        const nextPosKey = `${nx} ${ny} ${direction}`;

        if (visited.has(nextPosKey)) {
          obstacles += 1;
          break;
        }

        gx = nx;
        gy = ny;
        visited.add(nextPosKey);
      }
    }
  }

  console.log({ obstacles });
}

function changeDirection(direction: Directions): Directions {
  switch (direction) {
    case "up":
      return "right";
    case "right":
      return "down";
    case "down":
      return "left";
    case "left":
      return "up";
  }
}

function isOutOfBounds(
  grid: string[][],
  gx: number,
  gy: number,
  direction: Directions,
) {
  const ny = gy + DIRECTIONS[direction].y;
  const nx = gx + DIRECTIONS[direction].x;

  return ny >= grid.length || nx >= grid[0].length || ny < 0 || nx < 0;
}

function isInvalidWithReplacement(
  grid: string[][],
  gx: number,
  gy: number,
  direction: Directions,
  cx: number,
  cy: number,
) {
  const ny = gy + DIRECTIONS[direction].y;
  const nx = gx + DIRECTIONS[direction].x;

  return grid[ny][nx] === "#" || (ny === cy && nx === cx);
}

function isInvalid(
  grid: string[][],
  gx: number,
  gy: number,
  direction: Directions,
) {
  const ny = gy + DIRECTIONS[direction].y;
  const nx = gx + DIRECTIONS[direction].x;

  return grid[ny][nx] === "#";
}

function findGuard(grid: string[][]) {
  for (let y = 0; y < grid?.length; y++) {
    for (let x = 0; x < grid[x]?.length; x++) {
      if (grid[y][x] === "^") {
        return { x, y };
      }
    }
  }

  return null;
}

function parse(input: string) {
  return input
    .split("\n")
    .filter(Boolean)
    .map((r) => r.split("").filter(Boolean));
}

p1().catch(console.error);
p2().catch(console.error);
