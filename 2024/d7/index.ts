import { fetchDayInput } from "../../utils/fetch-input";

async function p1() {
  const input = await fetchDayInput({
    day: 7,
    year: 2024,
  });

  const equastions = parse(input);
  const validValues: number[] = [];

  for (const equastion of equastions) {
    const [testValue, inputs] = equastion.split(": ");

    const combinations = generateCombinations(
      ["*", "+", "||"],
      inputs.split(" ").length - 1,
    );

    const value = parseInt(testValue, 10);

    if (
      hasValidCombination(
        value,
        combinations,
        inputs.split(" ").map((el) => parseInt(el, 10)),
      )
    ) {
      validValues.push(value);
    }
  }

  console.log({ validValues });
  const total = validValues.reduce((acc, curr) => {
    return (acc += curr);
  }, 0);

  console.log({ total });
}

p1().catch(console.error);

function parse(input: string) {
  return input.split("\n").filter(Boolean);
}

// cartesian product
function generateCombinations(choices: string[], length: number): string[][] {
  if (length === 0) return [[]]; // Base case: an empty combination
  const smallerCombinations = generateCombinations(choices, length - 1); // Recursively generate smaller combinations
  const result = [];
  for (const choice of choices) {
    for (const combo of smallerCombinations) {
      result.push([choice, ...combo]); // Add each choice to each smaller combination
    }
  }
  return result;
}

function hasValidCombination(
  testValue: number,
  combinations: string[][],
  inputs: number[],
) {
  for (let i = 0; i < combinations.length; i++) {
    let total = inputs[0];
    for (
      let operatorId = 0;
      operatorId < combinations[i].length;
      operatorId++
    ) {
      const operator = combinations[i][operatorId];
      const val = inputs[operatorId + 1];

      if (operator === "+") {
        total += val;
      }

      if (operator === "*") {
        total = total * val;
      }
      if (operator === "||") {
        total = parseInt(`${total}${val}`, 10);
      }
    }

    if (total === testValue) return true;
  }
}
