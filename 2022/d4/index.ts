import * as fs from 'fs'
import * as path from 'path'


const file = path.resolve('./2022/d4/input.txt')

fs.readFile(file, 'utf8', (err, data) => {
  if (err) {
    console.log(err)
  }

  const pairsList = data.split(/\n/).filter((pair) => pair)

  let containtsFully = 0;
  let containtsPartially = 0;
  pairsList.map((pair) => {
    const sections = pair.split(',');
    const left = sections[0].split('-')
    const right = sections[1].split('-')
    const leftArr = createArrayFromRange(Number(left[0]), Number(left[1]))
    const rightArr = createArrayFromRange(Number(right[0]), Number(right[1]))

    //part 1
    if (leftArr.every((el) => rightArr.includes(el)) || rightArr.every((el) => leftArr.includes(el))) {
      containtsFully += 1
    }

    //part 2
    if (leftArr.some((el) => rightArr.includes(el)) || rightArr.some((el) => leftArr.includes(el))) {
      containtsPartially += 1
    }

  })
  console.log({ containtsFully, containtsPartially })
})


function createArrayFromRange(start: number, end: number): number[] {
  const arr = []

  for (let i = start; i <= end; i++) {
    arr.push(i)
  }

  return arr
}
