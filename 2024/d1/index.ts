import { fetchDayInput, saveDayAnswer } from "../../utils/fetch-input";

async function p1() {
  const input = await fetchDayInput({
    day: 1,
    year: 2024,
  });

  const { firstArr, secondArr } = normalizeInput(input);

  firstArr.sort((a, b) => (a < b ? -1 : 1));
  secondArr.sort((a, b) => (a < b ? -1 : 1));
  let totalDistance = 0;

  firstArr.forEach((el, idx) => {
    const distance = el - secondArr[idx];
    totalDistance += distance < 0 ? -distance : distance;
  });

  await saveDayAnswer({
    day: 1,
    year: 2024,
    answer: `${totalDistance} - p1`,
  });
}

async function p2() {
  const input = await fetchDayInput({
    day: 1,
    year: 2024,
  });

  const { firstArr, secondArr } = normalizeInput(input);

  let similarityScore = 0;

  firstArr.map((el) => {
    const occurences = secondArr.filter((num) => num === el).length;

    similarityScore += el * occurences;
  });

  await saveDayAnswer({
    day: 1,
    year: 2024,
    answer: `${similarityScore} - p2`,
  });
}

p2().catch((err) => {
  console.error(err);
});

function normalizeInput(input: string) {
  const lines = input.split("\n").filter((el) => !!el);

  const firstArr: number[] = [];
  const secondArr: number[] = [];

  lines.forEach((line) => {
    const [a, b] = line.split(/\s+/);

    firstArr.push(Number(a));
    secondArr.push(Number(b));
  });

  return { firstArr, secondArr };
}
