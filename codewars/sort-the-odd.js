/**
 * Complete https://www.codewars.com/kata/578aa45ee9fd15ff4600090d/train/javascript
 */

function sortArray(array) {

  const isOdd = (el) => {
    return Math.abs(el % 2) == 1;
  };

  for (let i = 0; i < array.length - 1; i++) {
    if (!isOdd(array[i])) continue
    for (let j = i; j < array.length; j++) {
      if (array[i] > array[j] && isOdd(array[j])) {
        var temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
    }
  }

  return array;
}

console.log(sortArray([ -43, 29, -48, -49, -46, -17, 33, 35, 14, -7, -41, 44, -12, -29, 37, -9 ]));