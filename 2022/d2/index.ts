import * as fs from 'fs'
import * as path from 'path'

const file = path.resolve('./2022/d2/input.txt');


type Shape = 'Rock' | 'Paper' | 'Scissors'
type Result = 'win' | 'lose' | 'draw'

const opponentShapes: Record<string, Shape> = {
  'A': 'Rock',
  'B': 'Paper',
  'C': 'Scissors'
}

const playerShapes: Record<string, Shape> = {
  'X': 'Rock',
  'Y': 'Paper',
  'Z': 'Scissors'
}

const letterToResultMap: Record<string, Result> = {
  'X': 'lose',
  'Y': 'draw',
  'Z': 'win',
}
const shapeToValueMap: Record<Shape, number> = {
  'Rock': 1,
  'Paper': 2,
  'Scissors': 3
}

const resultToValueMap: Record<Result, number> = {
  'win': 6,
  'draw': 3,
  'lose': 0
}


fs.readFile(file, 'utf8', (err, data) => {
  if (err) {
    console.log(err)
  }

  const battles: string[] = data.split(/\n/)
  let playerScore: number = 0
  let playerScorePart2: number = 0;

  battles.map((battle) => {
    // We know that first move is opponent and second is player move
    const moves = battle.trim().split(/\s/)// data looks like this : A X, C Z, B A ...

    // Guard to make sure we only run game against existing moves
    if (moves.length < 2) {
      return
    }

    const opponentMove = moves[0]
    const playerMove = moves[1]
    const opponentShape = getValueFromMapping(opponentMove, opponentShapes)
    const playerShape = getValueFromMapping(playerMove, playerShapes)

    playerScore += getBattleScore(opponentShape, playerShape)

    // part 2
    const expectedResultLetter = moves[1]
    const expectedResult = getValueFromMapping(expectedResultLetter, letterToResultMap)
    const expectedShape = getShapeBasedOnResult(opponentShape, expectedResult)
    const shapeValue = getValueBasedOnShape(expectedShape)
    const battleValue = getValueBasedOnResult(expectedResult)

    playerScorePart2 += shapeValue + battleValue

  })

  console.log({ playerScore, playerScorePart2 })

})


function getValueFromMapping<T>(letter: string, mapping: Record<string, T>): T {
  return mapping[letter]
}


function getBattleResult(opponentShape: Shape, playerShape: Shape): Result {
  if (opponentShape === playerShape) {
    return 'draw'
  }
  switch (opponentShape) {
    case 'Rock':
      if (playerShape === 'Paper') {
        return 'win'
      }
      if (playerShape === 'Scissors') {
        return 'lose'
      }

    case 'Paper':
      if (playerShape === 'Scissors') {
        return 'win'
      }
      if (playerShape === 'Rock') {
        return 'lose'
      }

    case 'Scissors':
      if (playerShape === 'Rock') {
        return 'win'
      }
      if (playerShape === 'Paper') {
        return 'lose'
      }
    default:
      throw new Error('Sorry mate it breaks the rule of the game, opponent have shown an invalid shape')
  }
}

// Logic: We want to calculate player score not opponent
function getBattleScore(opponentShape: Shape, playerShape: Shape): number {
  const result = getBattleResult(opponentShape, playerShape)
  return calculateScore(playerShape, result)
}

// Logic: score is the value of the shape + the value of the result hence why need for a shape
function calculateScore(shape: Shape, result: Result): number {
  switch (result) {
    case 'win':
      return resultToValueMap.win + getValueBasedOnShape(shape)
    case 'draw':
      return resultToValueMap.draw + getValueBasedOnShape(shape)
    case 'lose':
      return resultToValueMap.lose + getValueBasedOnShape(shape)
  }
}

// Part 2

function getShapeBasedOnResult(opponentShape: Shape, result: Result): Shape {
  if (result === 'draw') {
    return opponentShape
  }
  switch (result) {
    case 'lose':
      if (opponentShape === 'Scissors') {
        return 'Paper'
      }
      if (opponentShape === 'Rock') {
        return 'Scissors'
      }
      if (opponentShape === 'Paper') {
        return 'Rock'
      }
    case 'win':
      if (opponentShape === 'Scissors') {
        return 'Rock'
      }
      if (opponentShape === 'Rock') {
        return 'Paper'
      }
      if (opponentShape === 'Paper') {
        return 'Scissors' // Rock
      }
    default:
      throw new Error('There can be only win, lose or draw')
  }

}


function getValueBasedOnShape(shape: Shape): number {
  return getValueFromMapping(shape, shapeToValueMap)
}

function getValueBasedOnResult(result: Result): number {
  return getValueFromMapping(result, resultToValueMap)
}

