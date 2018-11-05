/**
 * Created by Administrator on 2018-03-22.
 */
import axios from 'axios'
import qs from 'query-string'
import { isObject } from './index'
/* import NProgress from 'nprogress' // progress bar
import URL from '../config/url' */
// NProgress.configure({showSpinner: false, trickleSpeed: 100})

const service = axios.create({
  timeout: 15000, // 请求超时时间
  withCredentials: true
  // maxRedirects: 5,
})

service.interceptors.request.use(
  config => {
    if (config.isPlan) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
      config.data = qs.stringify({ csjson: JSON.stringify(config.data) })
    } else if (config.isFormData) {
      config.headers['Content-Type'] = 'multipart/form-data'
      let formData = new FormData()
      for (let i in config.data) {
        formData.append(i, config.data[i])
      }
      config.data = formData
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  resp => {
    // console.log(resp)
    // NProgress.set(0.8)
    let res = resp.data
    if (res.code === 0) {
      Promise.resolve(res)
    } else {
      Promise.reject(res)
    }
  },
  error => {
    console.log(error)
    if (error.code === 'ECONNABORTED' || error.message.indexOf('Network') !== -1) {
      error.message = '网络不给力，请稍后再试'
    } else if (typeof error.code === 'undefined') {
      error.message = '连接出错，请重试'
    }
    return Promise.reject(error)
  }
)

export default (url, params, options) => {
  // NProgress.start()
  // console.log(url)
  // console.log(params)
  if (options && options.url) {
    url = options.url
  }
  return new Promise((resolve, reject) => {
    service.post(url, params, { isPlan: true, isFormData: false }).then((res) => {
      // NProgress.done()
      resolve(res)
      // NProgress.remove()
    }).catch(function (thrown) {
      console.log(thrown)
      if (axios.isCancel(thrown)) {
        console.log('canceled', thrown.message)
      }
      // NProgress.done()
      // NProgress.remove()
      reject(thrown)
    })
  })
}
