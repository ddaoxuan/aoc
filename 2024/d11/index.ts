import { fetchDayInput } from "../../utils/fetch-input";

async function p1() {
  const input = await fetchDayInput({
    day: 11,
    year: 2024,
  });

  let newStones: string[] = input.trim().split(" ");

  console.log(countStones(newStones, 25));
}

function replaceZeros(str: string) {
  return str.replace(/^0+/, "") || "0";
}

function countStones(initialStones: string[], blinks: number) {
  let stoneCounts: Record<string, number> = {};

  for (let stone of initialStones) {
    stoneCounts[stone] = (stoneCounts[stone] || 0) + 1;
  }

  for (let blink = 0; blink < blinks; blink++) {
    const nextStoneCounts: Record<string, number> = {};

    for (const [stone, count] of Object.entries(stoneCounts)) {
      if (stone === "0") {
        nextStoneCounts["1"] = (nextStoneCounts["1"] || 0) + count;
      } else if (stone.length % 2 === 0) {
        const idx = Math.floor(stone.length / 2);
        const left = replaceZeros(stone.slice(0, idx));
        const right = replaceZeros(stone.slice(idx));

        nextStoneCounts[left] = (nextStoneCounts[left] || 0) + count;
        nextStoneCounts[right] = (nextStoneCounts[right] || 0) + count;
      } else {
        const newStone = `${parseInt(stone) * 2024}`;
        nextStoneCounts[newStone] = (nextStoneCounts[newStone] || 0) + count;
      }
    }

    stoneCounts = nextStoneCounts;
  }

  let totalStones = 0;
  for (const count of Object.values(stoneCounts)) {
    totalStones += count;
  }

  return totalStones;
}

p1().catch(console.error);
