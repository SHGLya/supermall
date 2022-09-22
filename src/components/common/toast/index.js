//封装成插件的方式
import Toast from "./Toast";
const obj = {}

// 使用vue.use(toast)，就会在这里执行安装操作
obj.install = function (Vue){
  //1、创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  //2、new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastConstructor()
  //3、将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  //4、toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj