import {
  ADD_COUNTER,
  ADD_TO_CART
} from "@/store/mutation-types";

export default {
  // mutations唯一的目的就是修改state中状态
  // mutations中的每个方法尽可能完成的事件比较单一一点
  // 可以跟踪，这样子分开比较才可以
  [ADD_COUNTER](state,payload){
    payload.count += 1
  },
  [ADD_TO_CART](state,payload){
    payload.checked = true
    state.cartList.push(payload)
  }
}