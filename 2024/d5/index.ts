import { fetchDayInput } from "../../utils/fetch-input";

async function p1() {
  const input = await fetchDayInput({
    day: 5,
    year: 2024,
  });

  const { dict, updates } = parse(input);

  const validUpdates: number[][] = [];

  for (const update of updates) {
    const checks = update
      .split(",")
      .filter(Boolean)
      .map((e) => parseInt(e, 10));

    const res = checks.map((val, i) => isValid(checks, dict, val, i));

    if (res.every(Boolean)) {
      validUpdates.push(checks);
    }
  }

  let total = 0;

  validUpdates.map((update) => (total += findMiddle(update)));
  console.log({ total });
}

async function p2() {
  const input = await fetchDayInput({
    day: 5,
    year: 2024,
  });

  const { dict, updates } = parse(input);

  const invalidUpdates: number[][] = [];

  for (const update of updates) {
    const checks = update
      .split(",")
      .filter(Boolean)
      .map((e) => parseInt(e, 10));

    const res = checks.map((val, i) => isValid(checks, dict, val, i));

    if (res.some((check) => !check)) {
      invalidUpdates.push(checks);
    }
  }

  let total = 0;

  invalidUpdates.map((update) => {
    const ordered = reorder(update, dict);
    total += findMiddle(ordered);
  });
  console.log({ total });
}

type DictType = Record<string, Record<number, number[]>>;

function isValid(checks: number[], dict: DictType, val: number, i: number) {
  const toLeft = checks.slice(0, i);
  const toRight = checks.slice(i + 1);
  const shouldBeToRight = dict.l[val];
  const shouldBeToLeft = dict.r[val];

  const validLeft = toLeft.every((leftEl) => {
    if (!shouldBeToRight?.length) {
      return true;
    }

    return !shouldBeToRight.includes(leftEl);
  });
  const validRight = toRight.every((rightEl) => {
    if (!shouldBeToLeft?.length) {
      return true;
    }
    return !shouldBeToLeft.includes(rightEl);
  });

  return validLeft && validRight;
}

function parse(input: string) {
  const dict: DictType = {
    l: {},
    r: {},
  };

  const lines = input.split("\n");
  const separator = lines.indexOf("");
  const rules = lines.slice(0, separator);
  const updates = lines.slice(separator).filter(Boolean);

  for (const rule of rules) {
    const [left, right] = rule.split("|").map((e) => parseInt(e, 10));

    if (dict.l[left]) {
      dict.l[left].push(right);
    } else {
      dict.l[left] = [right];
    }

    if (dict.r[right]) {
      dict.r[right].push(left);
    } else {
      dict.r[right] = [left];
    }
  }

  return { dict, updates };
}

function reorder(invalidUpdate: number[], dict: DictType): number[] {
  let copy: number[] = invalidUpdate;

  if (copy.length > 0 && copy.every((el, i) => isValid(copy, dict, el, i))) {
    return copy;
  }
  for (let i = 0; i < copy.length; i++) {
    const val = copy[i];
    const toLeft = copy.slice(0, i);
    const toRight = copy.slice(i);

    const shouldBeToRight = dict.l[val];
    const shouldBeToLeft = dict.r[val];

    const valsToLeft = [...toLeft, ...toRight].filter((el) =>
      shouldBeToLeft?.includes(el),
    );
    const valsToRight = [...toLeft, ...toRight].filter((el) =>
      shouldBeToRight?.includes(el),
    );

    const final = [...valsToLeft, val, ...valsToRight];
    const indexOfPos = final.indexOf(val);
    const indexOfVal = copy.indexOf(val);

    const temp = copy[indexOfPos];
    copy[indexOfPos] = val;
    copy[indexOfVal] = temp;
  }

  return reorder(copy, dict);
}

function findMiddle(arr: number[]) {
  return arr[Math.floor(arr.length / 2)];
}

p1().catch((err) => console.error(err));
p2().catch((err) => console.error(err));
