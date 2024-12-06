import { fetchDayInput } from "../../utils/fetch-input";
type Directions = "up" | "down" | "left" | "right";

async function p1() {
  const input = await fetchDayInput({
    day: 6,
    year: 2024,
  });

  const grid = parse(input);
  let hasNextPosition = true;
  let currentDirection: Directions = "up";

  while (hasNextPosition) {
    const guard = findGuard(grid)!;
    const nextPosition = nextValidPos(grid, guard, currentDirection);

    if (!nextPosition) {
      hasNextPosition = false;
      grid[guard.y][guard.x] = "X";
      break;
    }

    grid[guard.y][guard.x] = "X";
    grid[nextPosition.y][nextPosition.x] = "^";
    currentDirection = nextPosition.direction as Directions;
  }

  const total = countPath(grid);
  console.log({ total });
}

async function p2() {
  const input = await fetchDayInput({
    day: 6,
    year: 2024,
  });

  const grid = parse(input);
  const visitedPath = new LinkedList();

  let obstacles = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let cell = 0; cell < grid[0].length; cell++) {
      // add single obstacle and test if cycle exists
      let hasNextPosition = true;
      let currentDirection: Directions = "up";
      grid[row][cell] = "0";

      while (hasNextPosition) {
        const guard = findGuard(grid)!;
        const nextPosition = nextValidPos(grid, guard, currentDirection);
        const hasCycle = nextPosition
          ? detectCycle(
              new Node([nextPosition.y, nextPosition.x], visitedPath.tail),
            )
          : false;

        console.log({ nextPosition });

        if (hasCycle) {
          obstacles += 1;
          hasNextPosition = false;
          grid[guard.y][guard.x] = "X";
          break;
        }

        if (!nextPosition) {
          hasNextPosition = false;
          grid[guard.y][guard.x] = "X";
          break;
        }

        visitedPath.append([nextPosition.y, nextPosition.x]);
        grid[guard.y][guard.x] = "X";
        grid[nextPosition.y][nextPosition.x] = "^";
        currentDirection = nextPosition.direction as Directions;
      }
    }
  }
  console.log({ obstacles });
}

function detectCycle(head: Node) {
  if (!head || !head.next) {
    return false;
  }

  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    if (slow === fast) {
      return true;
    }

    //@ts-ignore
    slow = slow.next;
    //@ts-ignore
    fast = fast.next.next;
  }

  return false;
}

function parse(input: string) {
  return input
    .split("\n")
    .filter(Boolean)
    .map((r) => r.split("").filter(Boolean));
}

//p1().catch(console.error);
p2().catch(console.error);

function findGuard(grid: string[][]) {
  for (let y = 0; y < grid?.length; y++) {
    for (let x = 0; x < grid[x]?.length; x++) {
      if (grid[y][x] === "^") {
        return { x, y };
      }
    }
  }
}

function nextValidPos(
  grid: string[][],
  guardPos: { x: number; y: number },
  direction: Directions = "up",
) {
  // upwards default if not rotate to right 90deg
  const nextUp = grid?.[guardPos.y - 1]?.[guardPos.x];
  const nextDown = grid?.[guardPos.y + 1]?.[guardPos.x];
  const nextLeft = grid?.[guardPos.y]?.[guardPos.x - 1];
  const nextRight = grid?.[guardPos.y]?.[guardPos.x + 1];
  console.log({ nextUp, nextDown, nextLeft, nextRight, direction });

  if (!nextUp || !nextDown || !nextLeft || !nextRight) return;

  switch (direction) {
    case "up":
      return [
        { content: nextUp, y: guardPos.y - 1, x: guardPos.x, direction: "up" },
        {
          content: nextRight,
          y: guardPos.y,
          x: guardPos.x + 1,
          direction: "right",
        },
        {
          content: nextDown,
          y: guardPos.y + 1,
          x: guardPos.x,
          direction: "down",
        },
        {
          content: nextLeft,
          y: guardPos.y,
          x: guardPos.x - 1,
          direction: "left",
        },
      ].find(({ content }) => content === "." || content === "X");

    case "right":
      return [
        {
          content: nextRight,
          y: guardPos.y,
          x: guardPos.x + 1,
          direction: "right",
        },
        {
          content: nextDown,
          y: guardPos.y + 1,
          x: guardPos.x,
          direction: "down",
        },
        {
          content: nextLeft,
          y: guardPos.y,
          x: guardPos.x - 1,
          direction: "left",
        },
        { content: nextUp, y: guardPos.y - 1, x: guardPos.x, direction: "up" },
      ].find(({ content }) => content === "." || content === "X");

    case "down":
      return [
        {
          content: nextDown,
          y: guardPos.y + 1,
          x: guardPos.x,
          direction: "down",
        },
        {
          content: nextLeft,
          y: guardPos.y,
          x: guardPos.x - 1,
          direction: "left",
        },
        { content: nextUp, y: guardPos.y - 1, x: guardPos.x, direction: "up" },
        {
          content: nextRight,
          y: guardPos.y,
          x: guardPos.x + 1,
          direction: "right",
        },
      ].find(
        ({ content }) => content === "." || content === "X" || content === "^",
      );

    case "left":
      return [
        {
          content: nextLeft,
          y: guardPos.y,
          x: guardPos.x - 1,
          direction: "left",
        },
        { content: nextUp, y: guardPos.y - 1, x: guardPos.x, direction: "up" },
        {
          content: nextRight,
          y: guardPos.y,
          x: guardPos.x + 1,
          direction: "right",
        },
        {
          content: nextDown,
          y: guardPos.y + 1,
          x: guardPos.x,
          direction: "down",
        },
      ].find(({ content }) => content === "." || content === "X");

    default:
      return;
  }
}

function countPath(grid: string[][]) {
  let total = 0;

  for (let y = 0; y < grid?.length; y++) {
    for (let x = 0; x < grid[x]?.length; x++) {
      if (grid[y][x] === "X") {
        total += 1;
      }
    }
  }
  return total;
}

class Node {
  constructor(
    public data: [number, number],
    public next: Node | null,
  ) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  public head: Node | null;
  public tail: Node | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(value: [number, number]) {
    const newNode = new Node(value, null);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return null;
    }
    // @ts-expect-error
    this.tail.next = newNode;
    this.tail = newNode;
  }
}
