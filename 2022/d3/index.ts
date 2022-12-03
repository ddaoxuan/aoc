import * as fs from 'fs'
import * as path from 'path'

const file = path.resolve('./2022/d3/input.txt')

fs.readFile(file, 'utf8', (err, data) => {
  if (err) {
    console.log(err)
  }


  //part 1
  const items = data.split(/\n/).filter((item) => item !== '')
  const sharedLetters = items.map((item) => {
    const { left, right } = splitStringInHalf(item)
    return getSharedLetterFrom2Strings(left, right)
  }).filter(item => item)
  const valueOfSharedLetters = getValueOfLetters(sharedLetters)


  // Part 2 
  const CHUNK_SIZE = 3;

  const chunks = createChunks(items, CHUNK_SIZE)
  const labels = chunks.map((group) => {
    const groupOfLetters = group.map((member) => member.split(''))
    return groupOfLetters[0].find((letter) => groupOfLetters[1].includes(letter) && groupOfLetters[2].includes(letter)) ?? ''

  }).flat().filter(item => item)

  const sumOfLabels = getValueOfLetters(labels)


  console.log({ valueOfSharedLetters, sumOfLabels })
})


function createChunks(array: string[], sizeOfChunk: number): string[][] {
  const chunksArray = []


  for (let i = 0; i < array.length; i += sizeOfChunk) {
    const chunk = array.slice(i, i + sizeOfChunk)
    chunksArray.push(chunk)
  }
  return chunksArray
}


function splitStringInHalf(value: string): Record<string, string[]> {

  const middle = Math.floor(value.length / 2);
  const left = value.substring(0, middle).split('')
  const right = value.substring(middle, value.length).split('')
  return { left, right }
}


function getSharedLetterFrom2Strings(leftString: string[], rightString: string[]): string {
  return leftString.find((letter) => rightString.includes(letter)) ?? ''
}


function getValueOfLetters(letters: string[]): number {
  if (!letters.length) return 0

  let sum = 0;
  // there is 26 letters in alphabet (lower case and  26 upper case)
  // lower case starts with the ASCII from 097
  // uppercase starts with the ASCII from 065
  const lowerCaseAlphabet = Array.from({ length: Number(26) }, (_, v) => ({
    letter: String.fromCharCode(v + 97),
    value: v + 1
  }))

  const upperCaseAlphabet = Array.from({ length: Number(26) }, (_, v) => ({
    letter: String.fromCharCode(v + 65),
    value: v + 27
  }))
  const alphabetsDictionary = Object.assign({}, ...[...lowerCaseAlphabet, ...upperCaseAlphabet].map(({ letter, value }) => ({ [letter]: value })))

  letters.forEach((letter) => {
    sum += alphabetsDictionary[letter]
  })

  return sum
}
