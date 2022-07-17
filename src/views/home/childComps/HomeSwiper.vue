<template>
  <swiper>
    <swiper-item v-for="item in banner">
      <a :href="item.link">
        <img :src="item.image">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from "components/commom/swiper";

export default {
  name: "HomeSwiper",
  props:{
    banner: {
      type: Array,
      // 默认值
      default(){
        return []
      }
    }
  },
  components:{
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>

</style>