/**
 * Completed
 */

multiplicationTable = function(size) {
  const array = new Array(size);
  const initialValue = 0
  for (let i = 0; i < size; i++) {
    array[i] = new Array(size).fill(initialValue);
  }

  counter = 0
  for (let x = 0; x < array.length; x++) {
    for (let y = 0; y < array[x].length; y++) {
      array[x][y] = (x + 1) * (y + 1)
      // console.log(`[${x}][${y}] - ${array[x][y]}`);
    }
  }

  return array
}



console.log(multiplicationTable(3));