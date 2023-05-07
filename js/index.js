const numRows = 11; // odd number to ensure the center cell is accessible
const numCols = 11; // odd number to ensure the center cell is accessible

// initialize the labyrinth with walls
let labyrinth = [];
for (let row = 0; row < numRows; row++) {
  labyrinth[row] = [];
  for (let col = 0; col < numCols; col++) {
    labyrinth[row][col] = 1;
  }
}

// mark the starting cell as visited and create a stack of visited cells
let currentRow = 1;
let currentCol = 1;
labyrinth[currentRow][currentCol] = 0;
let visited = [{ row: currentRow, col: currentCol }];

// create a recursive function to carve out the labyrinth
function carveLabyrinth(row, col) {
  // create a list of unvisited neighbors
  let neighbors = [];
  if (row > 1 && labyrinth[row - 2][col] === 1) {
    neighbors.push({ row: row - 2, col: col });
  }
  if (col > 1 && labyrinth[row][col - 2] === 1) {
    neighbors.push({ row: row, col: col - 2 });
  }
  if (row < numRows - 2 && labyrinth[row + 2][col] === 1) {
    neighbors.push({ row: row + 2, col: col });
  }
  if (col < numCols - 2 && labyrinth[row][col + 2] === 1) {
    neighbors.push({ row: row, col: col + 2 });
  }

  // if there are unvisited neighbors, choose one and carve a path to it
  while (neighbors.length > 0) {
    let randomIndex = Math.floor(Math.random() * neighbors.length);
    let neighbor = neighbors[randomIndex];
    let pathRow = (row + neighbor.row) / 2;
    let pathCol = (col + neighbor.col) / 2;
    labyrinth[pathRow][pathCol] = 0;
    labyrinth[neighbor.row][neighbor.col] = 0;
    visited.push(neighbor);
    carveLabyrinth(neighbor.row, neighbor.col);
    neighbors.splice(randomIndex, 1);
  }
}

carveLabyrinth(currentRow, currentCol);

// make sure the center cell is accessible
labyrinth[Math.floor(numRows / 2)][Math.floor(numCols / 2)] = 0;

// output the labyrinth to the console
console.log(labyrinth);