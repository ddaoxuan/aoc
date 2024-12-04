import { fetchDayInput } from "../../utils/fetch-input";

async function p1() {
  const input = await fetchDayInput({
    day: 4,
    year: 2024,
  });

  const matrix = parse(input);
  let total = 0;

  for (let row = 0; row < matrix.length; row++) {
    for (let line = 0; line < matrix[row].length; line++) {
      if (matrix[row][line] === "X") {
        total += validxmas(matrix, row, line);
      }
    }
  }

  console.log({ total });
}

async function p2() {
  const input = await fetchDayInput({
    day: 4,
    year: 2024,
  });

  const matrix = parse(input);
  let total = 0;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === "A") {
        if (validMas(matrix, i, j)) {
          total += 1;
        }
      }
    }
  }

  console.log({ total });
}

function validxmas(matrix: string[][], row: number, line: number) {
  let totalValidDirections = 0;
  const horizontal = Array.from({ length: 4 }, (_, idx) => [row, line + idx]);
  const oppositeHorizontal = Array.from({ length: 4 }, (_, idx) => [
    row,
    line - idx,
  ]);
  const vertical = Array.from({ length: 4 }, (_, idx) => [idx + row, line]);
  const oppositeVertical = Array.from({ length: 4 }, (_, idx) => [
    row - idx,
    line,
  ]);

  const diagonalRight = Array.from({ length: 4 }, (_, idx) => [
    row + idx,
    line + idx,
  ]);

  const diagonalLeft = Array.from({ length: 4 }, (_, idx) => [
    row + idx,
    line - idx,
  ]);

  const oppositeDiagonalRight = Array.from({ length: 4 }, (_, idx) => [
    row - idx,
    line + idx,
  ]);

  const oppositeDiagonalLeft = Array.from({ length: 4 }, (_, idx) => [
    row - idx,
    line - idx,
  ]);

  for (const direction of [
    horizontal,
    oppositeHorizontal,
    vertical,
    oppositeVertical,
    diagonalRight,
    diagonalLeft,
    oppositeDiagonalRight,
    oppositeDiagonalLeft,
  ]) {
    const word = direction.map(([x, y]) => matrix?.[x]?.[y]).join("");
    if (word.toLowerCase() === "xmas") {
      totalValidDirections += 1;
    }
  }
  return totalValidDirections;
}

function validMas(matrix: string[][], row: number, line: number) {
  return (
    ((matrix?.[row + 1]?.[line - 1] === "M" &&
      matrix?.[row - 1]?.[line + 1] === "S") ||
      (matrix?.[row + 1]?.[line - 1] === "S" &&
        matrix?.[row - 1]?.[line + 1] === "M")) &&
    ((matrix?.[row + 1]?.[line + 1] === "M" &&
      matrix?.[row - 1]?.[line - 1] === "S") ||
      (matrix?.[row + 1]?.[line + 1] === "S" &&
        matrix?.[row - 1]?.[line - 1] === "M"))
  );
}

function parse(input: string): string[][] {
  return input
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(""));
}

p1().catch((err) => console.error(err));
p2().catch((err) => console.error(err));
