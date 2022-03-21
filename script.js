import Grid, { GRID_SIZE } from "./grid.js"
import Tile from "./tile.js"

const UP = -GRID_SIZE
const DOWN = GRID_SIZE
const LEFT = 1
const RIGHTT = -1

const gameBoard = document.getElementById("game-board")

const grid = new Grid(gameBoard)

let snake = [
    Math.floor(GRID_SIZE * GRID_SIZE / 2) - 1,
    Math.floor(GRID_SIZE * GRID_SIZE / 2),
    Math.floor(GRID_SIZE * GRID_SIZE / 2) + 1]
let foodID
let direction = LEFT

createFood()
displaySnake()
move()

function move() {
    const headValue = snake[snake.length - 1] + direction
    snake.push(headValue)
    displayTrunk(headValue)
    deleteSnakeTail()
    snake.shift()
}

function deleteSnakeTail() {
    
}

function displayTrunk(trunkID) {
    const trunk = document.createElement("div")
    trunk.classList = "tile"
    trunk.id = trunkID
    trunk.style.setProperty("--x", trunkID % GRID_SIZE)
    trunk.style.setProperty("--y", Math.floor(trunkID / GRID_SIZE))
    gameBoard.append(trunk)
}

function displaySnake() {
    for (let i = 0; i < snake.length; i++) {
        displayTrunk(snake[i])
    }
}

function createFood() {
    const food = document.createElement("div")
    food.classList = "food"
    food.id = Math.floor(Math.random() * GRID_SIZE * GRID_SIZE)
    while (snake.includes(food.id)) {
        food.id = Math.floor(Math.random() * GRID_SIZE * GRID_SIZE)
    }
    foodID = food.id
    food.style.setProperty("--x", food.id % GRID_SIZE)
    food.style.setProperty("--y", Math.floor(food.id / GRID_SIZE))
    gameBoard.append(food)
    console.log(food.id)
}

function deleteOldFood()
{
    document.getElementById(foodID).classList.remove("food")
}

setupInput()

function setupInput() {
  window.addEventListener("keydown", handleInput, { once: true })
}

async function handleInput(e) {
  switch (e.key) {
    case "ArrowUp":
      move()
      break
    default:
      setupInput()
      return
  }

  setupInput()
}