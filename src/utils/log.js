const color = {
  default: '#35495e',
  primary: '#3488ff',
  success: '#43B883',
  warning: '#e6a23c',
  danger: '#f56c6c'
}

const log = {
  capsule (title, info, type = 'primary') {
    console.log(
      `%c ${title} %c ${info} %c`,
      'background:#35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;',
      `background:${color[type]}; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;`,
      'background:transparent'
    )
  },
  colorful (textArr) {
    console.log(
      `%c${textArr.map(t => t.text || '').join('%c')}`,
      ...textArr.map(t => `color: ${color[t.type]};`)
    )
  },
  default (text) {
    this.colorful([{ text, type: 'primary' }])
  },
  primary (text) {
    this.colorful([{ text, type: 'primary' }])
  },
  success (text) {
    this.colorful([{ text, type: 'success' }])
  },
  warning (text) {
    this.colorful([{ text, type: 'warning' }])
  },
  danger (text) {
    this.colorful([{ text, type: 'danger' }])
  }
}

export default log
