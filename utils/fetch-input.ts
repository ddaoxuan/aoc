// Make sure to obtain token for your account

import { config } from "dotenv";
import fs from "fs/promises";

config({
  path: ".env.local",
});

/*
 * Prefers local file over API to prevent overloading dude's API
 */
export const fetchDayInput = async ({
  year,
  day,
}: {
  year: number;
  day: number;
}) => {
  const { file } = await readInputFromFile({ year, day });

  if (!file) {
    console.log(`No input found locally, fetching from aoc..`);

    const url = `https://adventofcode.com/${year}/day/${day}/input`;
    const res = await fetch(url, {
      headers: {
        cookie: `session=${process.env.SESSION_COOKIE}`,
      },
    });
    const text = await res.text();

    await fs.writeFile(`${year}/d${day}/input.txt`, text);

    return text;
  }

  return file;
};

export const saveDayAnswer = async ({
  year,
  day,
  answer,
}: {
  year: number;
  day: number;
  answer: string;
}) => {
  let file;
  try {
    file = await fs.readFile(`${year}/d${day}/answer.txt`, "utf8");

    console.log("File found, appending to existing file");
  } catch (err) {
    console.log("File not found, creating new file");
  }

  const lineStart = !!file ? "\n" : "";
  await fs.appendFile(`${year}/d${day}/answer.txt`, lineStart + answer);

  console.log("Response saved to file: " + `${year}/d${day}/answer.txt`);
};

const readInputFromFile = async ({
  year,
  day,
}: {
  year: number;
  day: number;
}) => {
  try {
    return { file: await fs.readFile(`${year}/d${day}/input.txt`, "utf8") };
  } catch {
    return { file: null };
  }
};
