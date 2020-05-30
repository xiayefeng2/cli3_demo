import utils from './index'
import wx from 'wx'
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

export function myFn (item) {
  return new Promise((resolve, reject) => {
    return utils.testFn({
      success () {
        resolve(item.id)
      },
      time: item.time,
      fail: reject
    })
  })
}
