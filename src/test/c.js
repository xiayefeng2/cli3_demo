async function pool (arr) {
  const tempArr = []
  for (const item of arr) {
    const ret = await item()
    tempArr.push(ret)
  }
  return tempArr
}

const p1 = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('a')
  }, 300)
})

const p2 = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('b')
  }, 200)
})
pool([p1, p2]).then(res => {
  console.log(res)
})
