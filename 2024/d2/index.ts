import { fetchDayInput, saveDayAnswer } from "../../utils/fetch-input";

async function p1() {
  const input = await fetchDayInput({
    day: 2,
    year: 2024,
  });

  const { reports } = parse(input);

  const validReports = reports.map(isValidReport).filter(Boolean).length;

  await saveDayAnswer({
    day: 2,
    year: 2024,
    answer: `${validReports} - p1`,
  });
}

async function p2() {
  const input = await fetchDayInput({
    day: 2,
    year: 2024,
  });

  const { reports } = parse(input);

  const validReports = reports
    .map((report) => isValidReport(report) || isValidDumpenerReport(report))
    .filter(Boolean).length;

  await saveDayAnswer({
    day: 2,
    year: 2024,
    answer: `${validReports} - p2`,
  });
}

function isValidDumpenerReport(report: number[]) {
  for (let i = 0; i <= report.length; i++) {
    const valid = isValidReport([
      ...report.slice(0, i),
      ...report.slice(i + 1),
    ]);

    if (valid) return true;
  }

  return false;
}

function isValidReport(report: number[]): boolean {
  let style: "decreasing" | "increasing" | null = null;

  for (let i = 0; i < report.length - 1; i++) {
    const newStyle = getStyle(report[i + 1], report[i]);
    const distance = calcDistance(report[i + 1], report[i]);

    if (!style) {
      style = newStyle;
    }

    if (style !== newStyle || !isValidDistance(distance)) return false;
  }

  return true;
}

function getStyle(p1: number, p2: number) {
  if (p1 === p2) {
    return null;
  }
  if (p1 < p2) return "increasing";

  return "decreasing";
}

function isValidDistance(distance: number) {
  if (distance === 0) {
    return false;
  }

  return distance > 0 && distance < 4;
}

function calcDistance(p1: number, p2: number) {
  const delta = p1 - p2;

  return Math.abs(delta);
}

function parse(input: string) {
  return {
    reports: input
      .split("\n")
      .filter((el) => !!el)
      .map((report) => report.split(" ").map((el) => parseInt(el, 10))),
  };
}

p2().catch((err) => console.error(err));
