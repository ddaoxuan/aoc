import fs from "fs/promises";
import path from "path";

const copy = {
  one: "one1one",
  two: "two2two",
  three: "three3three",
  four: "four4four",
  five: "five5five",
  six: "six6six",
  seven: "seven7seven",
  eight: "eight8eight",
  nine: "nine9nine",
};

async function readInput() {
  return fs.readFile(path.join(__dirname, "input.txt"), { encoding: "utf-8" });
}

function filterNumbers(line: string) {
  return line.split("").filter((char) => char.match(/\d/));
}

async function main() {
  const input = await readInput();
  const lines = input.split("\n").filter(Boolean);
  let p1 = 0;
  let p2 = 0;

  for (const line of lines) {
    const p1Numbers = filterNumbers(line);
    const value = parseInt(p1Numbers[0] + p1Numbers[p1Numbers.length - 1]);

    p1 += value;

    const wordsReplaced = Object.entries(copy).reduce(
      (acc, [key, value]) => acc.replace(new RegExp(key, "g"), value),
      line,
    );

    const finalNumbers = filterNumbers(wordsReplaced);
    const p2Value = parseInt(
      finalNumbers[0] + finalNumbers[finalNumbers.length - 1],
    );

    p2 += p2Value;
  }

  console.log({
    p1,
    p2,
  });
}

main();
