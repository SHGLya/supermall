<template>
  <swiper>
    <swiper-item v-for="item in banner" >
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad">
        <!-- @load（事件会在页面或图像加载完成后立即发生。） -->
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from "components/common/swiper";

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
  data(){
    return {
      isLoad: false
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad(){
      if(!this.isLoad){
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style scoped>

</style>