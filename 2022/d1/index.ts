import * as fs from 'fs'
import * as path from 'path'

const file = path.resolve('./2022/d1/input.txt')

const elvesDictionary: { [key: string]: number[] } = {}
const elvesMap: { [key: string]: number } = {}
let nbOfElves = 1;

// read file
fs.readFile(file, 'utf8', (err, data) => {
  if (err) {
    console.log(err)
  }

  const string = JSON.stringify(data)
  const lines = string.replace(/\"/g, '').split(/\\n/)

  lines.forEach((line) => {
    if (line === '') {
      ++nbOfElves;
    }
    // hehe
    //@ts-ignore
    elvesDictionary[nbOfElves] = [...elvesDictionary[nbOfElves] ?? '', Number(line)]
  })

  Object.keys(elvesDictionary).forEach((key) => {
    const newValue = sum(elvesDictionary[key])
    elvesMap[key] = newValue
  })

  const sizeOfAll = sum(Object.values(elvesMap))
  const sorted = sortByCapacity(elvesMap)

  const sizeOfFirst = sorted[0]

  const topThree = sorted.slice(0, 3)
  const sizeOfTopThree = sum(topThree)

  console.log({
    sizeOfFirst,
    sizeOfTopThree,
    sizeOfAll,
  })
})

function sortByCapacity(obj: { [key: string]: number }): number[] {
  return Object.values(obj).sort((a, b) => b - a)
}


function sum(arr: number[]): number {
  return arr.reduce((prev, curr) => {
    curr += prev
    return curr
  })
}

