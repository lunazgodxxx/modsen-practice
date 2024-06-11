/**
 * Completed https://www.codewars.com/kata/5839edaa6754d6fec10000a2/train/javascript
 */



function ascii (a) { return a.charCodeAt(0); }

function findMissingLetter(array)
{
  // use asci
  for (let i = 1; i < array.length; i++) {
    var dif = ascii(array[i]) - ascii(array[i - 1])
    if (dif == 2) {
      return String.fromCharCode(ascii(array[i]) - 1)
    }
  }
}
