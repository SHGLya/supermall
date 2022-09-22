<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
              :is-check="isSelectAll"
              class="check-button"
              @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">合计：{{totalPrice}}</div>
    <div class="calculate" @click="calcClick">
      去计算：{{checkLength}}
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
import {mapGetters} from "vuex";

export default {
  name: "CartBottomBar",
  components:{
    CheckButton
  },
  methods:{
    checkClick(){
      if(this.isSelectAll){
        this.cartList.map(item=>item.checked = false)
      }else{
        this.cartList.map(item=>item.checked = true)
      }
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择购买的商品',2000)
      }
    }
  }
  ,
  computed:{
    ...mapGetters(['cartList']),
    totalPrice(){
      return '￥' + this.$store.getters.cartList.filter(item=>{
        return item.checked
      }).reduce((preValue, item)=>{
        return preValue + item.price*item.count
      },0)
    },
    checkLength(){
      return this.cartList.filter(item=>item.checked).length
    },
    isSelectAll(){
      if(this.cartList.length === 0) return false
      //return !(this.cartList.filter(item => !item.checked).length)
      return !this.cartList.find(item => !item.checked)
    }
  }
}
</script>

<style scoped>
  .bottom-bar{
      height: 40px;
      background-color: #eee;
      position: relative;
      line-height: 40px;
      display: flex;
      font-size: 14px;
  }
  .check-content{
      display: flex;
      align-items: center;
      margin-left: 10px;
      width: 60px;
  }
  .check-button{
      width: 20px;
      height: 20px;
      line-height: 20px;
      margin-right: 5px;
  }
  .price{
      margin-left: 20px;
      flex: 1;
  }
  .calculate{
      width: 90px;
      background-color: red;
      color: #fff;
      text-align: center;
  }
</style>