import {
  ADD_COUNTER,
  ADD_TO_CART
} from "@/store/mutation-types";

export default {
  // 异步操作、判断逻辑
  addCart(context,payload){
    //查找到对应的商品
    return new Promise((resolve,reject)=>{
      let oldProduct = null
      for(let item of context.state.cartList){
        if(item.iid === payload.iid){
          oldProduct = item
        }
      }
      if(oldProduct){
        context.commit(ADD_COUNTER,oldProduct)
        resolve('当前的商品数量+1')
      }else{
        payload.count = 1
        context.commit(ADD_TO_CART,payload)
        resolve('添加了新的商品')
      }
    })
  }
}