import fs from "fs/promises";
import path from "path";

async function readFile() {
  return await fs.readFile(path.resolve(__dirname, "input.txt"), "utf-8");
}

async function main() {
  const data = await readFile();
  const cards = data.split("\n").filter((card) => card);
  const poweredSum = [];
  const copiedCards: Record<string, number> = {};

  for (let i = 0; i < cards.length; i++) {
    const cardData = cards[i].split(": ")[1];
    const [winning, data] = cardData.split(" | ");
    const cardId = i + 1;
    copiedCards[cardId] = copiedCards[cardId] ? copiedCards[cardId] + 1 : 1;

    const winningNumbers = winning.split(" ").filter(Boolean);
    const input = data.split(" ").filter(Boolean);
    const valid = input.filter((number: string) =>
      winningNumbers.includes(number),
    );

    if (valid.length) {
      const powered = valid.length > 1 ? Math.pow(2, valid.length - 1) : 1;
      const noOfCards = valid.length;
      // range of cards to copy
      const newCardIds = Array.from({ length: noOfCards }).map(
        (_, idx) => cardId + idx + 1,
      );

      newCardIds.forEach((id) => {
        const copies = copiedCards[cardId] || 1;

        copiedCards[id] = copiedCards[id] ? copiedCards[id] + copies : copies;
      });

      poweredSum.push(powered);
    }
  }

  const p1 = poweredSum.reduce((acc, curr) => acc + curr, 0);
  const p2 = Object.values(copiedCards).reduce((acc, curr) => acc + curr, 0);

  console.log({
    p1,
    p2,
  });
}

main();
