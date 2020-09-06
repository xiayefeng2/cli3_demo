import Vue from 'vue'
import Message from './HelloWorld.vue'

// 构造子类
let MessageConstructor = Vue.extend(Message)
// 实例化组件
let messageInstance = new MessageConstructor()
// $mount可以传入选择器字符串，表示挂载到该选择器
// 如果不传入选择器，将渲染为文档之外的的元素，你可以想象成 document.createElement()在内存中生成dom
messageInstance.$mount()
// messageInstance.$el获取的是dom元素
document.body.appendChild(messageInstance.$el)
