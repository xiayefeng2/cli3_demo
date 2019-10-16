import utils from './index'
export function getLocalImgData (localId) {
  return new Promise((resolve, reject) => {
    wx.getLocalImgData({
      localId,
      success (res) {
        resolve(res)
      },
      fail (err) {
        reject(err)
      }
    })
  })
}

export function myFn (time) {
  return new Promise((resolve, reject) => {
    utils.testFn({ success (res) {
      resolve(res)
    }
    })
  })
}
