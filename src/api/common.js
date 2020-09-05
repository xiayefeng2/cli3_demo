import req from '@/utils/request'

export function reqGet (url, params) {
  return req({ url, params })
}

export function reqPost (url, data) {
  return req({ url, data, method: 'post' })
}
