import fs from "fs/promises";
import path from "path";

async function readInput() {
  return fs.readFile(path.join(__dirname, "input.txt"), "utf8");
}

const cap = {
  red: 12,
  green: 13,
  blue: 14,
};

// This checks every color in the serie
function isSerieValid(serie: string) {
  const colors = serie.split(", ");
  const values = [];

  for (const color of colors) {
    const [count, colorName] = color.split(" ") as [string, keyof typeof cap];
    const numberCount = parseInt(count);
    values.push(numberCount > cap[colorName]);
  }

  return values.every((value) => value === false);
}

function gameLeast(game: string) {
  const values: Record<string, number> = {};
  const series = game.split("; ");

  for (const serie of series) {
    const colors = serie.split(", ");
    for (const color of colors) {
      const [count, colorName] = color.split(" ");
      const numberCount = parseInt(count);
      if (!values[colorName] || numberCount > values[colorName]) {
        values[colorName] = numberCount;
      }
    }
  }

  return Object.values(values);
}

async function main() {
  const input = await readInput();
  const valid: string[] = [];
  const numbers = [];

  const games = input.split("\n").filter((line) => line.length > 0);

  for (const game of games) {
    const [id, value] = game.split(": ");
    const gameID = id.split(" ")[1];
    const series = value.split("; ").map((serie) => isSerieValid(serie));
    const isValid = series.every((serie) => serie === true);

    const least = gameLeast(value);
    const multiplied = least.reduce((acc, curr) => acc * curr, 1);

    numbers.push(multiplied);

    if (isValid) {
      valid.push(gameID);
    }
  }

  const p1 = valid.reduce((acc, curr) => acc + parseInt(curr), 0);
  const p2 = numbers.reduce((acc, curr) => acc + curr, 0);

  console.log({
    p1,
    p2,
  });
}

main();
