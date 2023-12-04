import fs from "fs/promises";
import path from "path";

async function main() {
  const startPos = {
    depth: 0,
    horizontal: 0,
  };

  const newPos = {
    depth: 0,
    horizontal: 0,
    aim: 0,
  };

  const data = await fs.readFile(path.join(__dirname, "input.txt"), "utf-8");
  const lines = data.split("\n");

  lines.forEach((item) => {
    const i = item.split(" ");
    const k = i[0];
    const v = parseInt(i[1], 10);
    switch (k) {
      case "forward":
        startPos.horizontal += v;
        break;
      case "up":
        startPos.depth -= v;
        break;
      case "down":
        startPos.depth += v;
        break;
      default:
        return null;
    }
  });

  lines.forEach((item) => {
    const i = item.split(" ");
    const k = i[0];
    const v = parseInt(i[1], 10);
    switch (k) {
      case "forward":
        newPos.horizontal += v;
        newPos.depth += newPos.aim * v;
        break;
      case "up":
        newPos.aim -= v;
        break;
      case "down":
        newPos.aim += v;
        break;
      default:
        return null;
    }
  });

  const p1 = startPos.depth * startPos.horizontal;
  const p2 = newPos.depth * newPos.horizontal;
  console.log({
    p1,
    p2,
  });
}

main();
