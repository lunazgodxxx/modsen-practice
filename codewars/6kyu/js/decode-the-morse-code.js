/*
 * Uncompleted https://www.codewars.com/kata/54b724efac3d5402db00065e/train/javascript
 */


decodeMorse = function(morseCode){
  // Your code here
  // You can use MORSE_CODE[morse]

  morseCode.trim()

  var fixedString = new Array()
  for (let index = 0; index < morseCode.length; index++) {
    if (morseCode[index] == " " && morseCode[index + 1] == " ") {
      break
    }

    fixedString.push(morseCode[index])
  }
  var words = fixedString.split(' ')

  var res = new Array()
  words.forEach(element => {
    res.push(MORSE_CODE[element])
  });
  return res.join('')
}
