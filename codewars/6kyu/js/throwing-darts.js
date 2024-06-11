/**
 * Completed https://www.codewars.com/kata/525dfedb5b62f6954d000006/train/javascript
 */

const groupResult = (value) => {
  if (value > 10) {
    return 0
  } else if (value >= 5 && value <= 10) {
    return 5
  } else {
    return 10
  }
}

function scoreThrows(radii){
  //Return total number of points\

  if (radii.length == 0) {
    return 0
  }

  const isBonus = (() => {
    const filtered = radii.filter(num => num < 5);
    return filtered.length == radii.length
  })();

  var res = 0
  radii.forEach(el => {
    res += groupResult(el)
  });

  return res + isBonus * 100
}