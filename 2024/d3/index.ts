import { fetchDayInput, saveDayAnswer } from "../../utils/fetch-input";

const REGEX = /mul\((\d{1,3}),(\d{1,3})\)/gi;
const ENDS_WITH_REGEX = /mul\((\d{1,3}),(\d{1,3})\)$/i;

async function p1() {
  const input = await fetchDayInput({
    day: 3,
    year: 2024,
  });

  const { instructions } = parse(input);

  let total = 0;

  const matches = instructions.flatMap((instruction) => [
    ...instruction.matchAll(REGEX),
  ]);

  for (let i = 0; i < matches.length; i++) {
    const [_, x, y] = matches[i];
    total += parseInt(x, 10) * parseInt(y, 10);
  }

  console.log({ total });
  await saveDayAnswer({
    day: 3,
    year: 2024,
    answer: `${total} - p1`,
  });
}

async function p2() {
  const input = await fetchDayInput({
    day: 3,
    year: 2024,
  });

  const { instructions } = parse(input);
  let isOn = true;
  let validTokens = "";
  let tempChecker = "";
  let total = 0;

  const chars = instructions.join("").split("");

  for (const char of chars) {
    tempChecker += char;
    if (tempChecker.endsWith("don't()")) {
      isOn = false;
      tempChecker = "";
    }

    if (tempChecker.endsWith("do()")) {
      isOn = true;
      tempChecker = "";
    }

    if (!isOn) continue;

    validTokens += char;

    const match = validTokens.match(ENDS_WITH_REGEX);

    if (match) {
      const [_, x, y] = match;
      total += parseInt(x, 10) * parseInt(y, 10);
      validTokens = "";
    }
  }

  console.log({ total });

  await saveDayAnswer({
    day: 3,
    year: 2024,
    answer: `${total} - p2`,
  });
}

// p1().catch((err) => console.error(err));
p2().catch((err) => console.error(err));

function parse(input: string) {
  return { instructions: input.split("\n").filter(Boolean) };
}
