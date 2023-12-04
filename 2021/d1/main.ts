import fs from "fs/promises";
import path from "path";

// task1

async function readInput() {
  return await fs.readFile(path.join(__dirname, "input.txt"), "utf-8");
}

async function main() {
  const input = await readInput();
  const arr = input.split("\n").map((str) => parseInt(str));
  const p1 = calculateIncrementalAmount(arr);

  console.log({
    p1,
  });
}

function calculateIncrementalAmount(arr: number[]) {
  let increasedTimes = 0;
  arr.reduce((prev, current) => {
    if (current > prev) {
      increasedTimes += 1;
    }
    return current;
  });
  return increasedTimes;
}

main();
