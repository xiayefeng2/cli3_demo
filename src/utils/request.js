/**
 * Created by wx on 2018-11-06.
 */
import axios from 'axios'
import qs from 'qs'
// import { strHash } from './index'
// import md5 from 'js-md5'

export const reqArr = []

const fastClickMsg = '数据请求中，请稍后'

const CancelToken = axios.CancelToken

const removePendingReq = (url, type) => {
  const index = reqArr.findIndex(i => i.url === url)
  if (index > -1) {
    type === 'req' && reqArr[index].c(fastClickMsg)
    reqArr.splice(index, 1)
  }
}

const instance = axios.create({
  baseURL: 'https://api.example.com'
})

instance.defaults.timeout = 10000

instance.interceptors.request.use(
  config => {
    let url = config.url
    if (config.method === 'get') {
      url += '?' + qs.stringify(config.params)
    } /* else if (config.method === 'post') {
      url += '?' + md5(qs.stringify(config.data))
    } */
    removePendingReq(url, 'req')
    config.cancelToken = new CancelToken(c => {
      reqArr.push({
        url,
        c
      })
    })
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data'
      /* let formData = new FormData()
      for (let i in config.data) {
        formData.append(i, config.data[i])
      } */
      // config.data = formData
    } else if (config.data) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  resp => {
    // console.log(resp)
    const res = resp.data
    let url = resp.config.url
    if (resp.config.method === 'get') {
      url += '?' + qs.stringify(resp.config.params)
    } /* else if (resp.config.method === 'post') {
      url += '?' + md5(resp.config.data)
    } */
    removePendingReq(url, 'resp')
    if (res.code === 0) {
      return Promise.resolve(res)
    } else {
      return Promise.reject(res)
    }
  },
  error => {
    console.log(error)
    if (error.message.includes('Network')) {
      error.message = '网络不给力，请稍后再试'
    } else if (error.message.includes('timeout')) {
      error.message = '请求超时，请稍后重试'
    } else if (typeof error.code === 'undefined') {
      error.message = '连接出错，请重试'
    }
    return Promise.reject(error)
  }
)

export default ({ url, method = 'get', params = {}, data = {}, ...rest } = {}) => {
  // console.log(url)
  // console.log(params)
  if (!url) {
    return
  }
  if (/[A-Z]/.test(method)) {
    method = method.toLocaleLowerCase()
  }
  return new Promise((resolve, reject) => {
    instance.request({
      url,
      params,
      data,
      method,
      ...rest
    }).then((res) => {
      return resolve(res)
    }).catch(error => {
      // console.log(error)
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message)
      }
      return reject(error)
    })
  })
}
