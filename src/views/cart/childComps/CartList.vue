<template>
  <div class="cart-list">
    <scroll :probe-type="3" class="content" ref="scroll">
      <cart-list-item
              v-for="(item,index) in cartList"
              :key="index"
              :item-info="item"/>
    </scroll>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import scroll from "@/components/common/scroll/Scroll";
import cartListItem from "@/views/cart/childComps/CartListItem";

export default {
  name: "CartList",
  components: {
    scroll,
    cartListItem
  },
  computed:{
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  .cart-list{
      height: calc(100% - 44px - 49px - 40px);
  }
  .content{
      height: 100%;
      overflow: hidden;
  }
</style>