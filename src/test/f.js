var isValid = function (s) {
  const map = { '{': '}', '(': ')', '[': ']' }
  const stack = []
  for (let i of s) {
    if (map[i]) {
      stack.push(i)
    } else {
      if (map[stack[stack.length - 1]] === i) {
        stack.pop()
      } else {
        return false
      }
    }
  }
  return stack.length === 0
}

console.log(isValid('[{()}]'))
