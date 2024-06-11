/*
 * Uncompleted https://www.codewars.com/kata/52449b062fb80683ec000024/train/javascript
 */

function generateHashtag (str) {
  str = str.trim()
  if (str.length === 0) {
    return false
  }

  newstr = new Array()
  newstr.push(str[0].toUpperCase())
  for (let i = 1; i < str.length; i++) {
    if (str[i] != ' ') {
      newstr.push(str[i])
    }

    if (str[i] == ' ' && str[i + 1] != ' ') {
      newstr.push(str[i + 1].toUpperCase())
      i++
    }
  }


  const result = '#' + newstr.join('')

  if (result.length > 140) {
    return false
  }

  return result
}

string = "      asd  asd  asd   "
console.log(generateHashtag(string));

