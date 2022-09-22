<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list/>
    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import CartList from "@/views/cart/childComps/CartList";
  import CartBottomBar from "@/views/cart/childComps/CartBottomBar";

  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    data(){
      return{
        //count:0,
      }
    },
    computed: {
      //两种语法
      //...mapGetters(['cartLength'])
      ...mapGetters({
        length: 'cartLength'
      })
    }
  }
</script>

<style scoped>
  .cart{
      height: 100vh;
  }
  .nav-bar{
      background-color: var(--color-tint);
      color: white;
  }
</style>
