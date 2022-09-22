<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Slice"
}
</script>

<style scoped>
  .slide{
      width: 100%;
      /* 当指定swiper为flex布局后，给子元素swiperitem定义width是不起效果的 */
      /* 因为子元素自动获得了flex-shrink属性，该属性在父元素宽度不够时，自己调整自己所占宽度比，这是我们不希望的。 */
      flex-shrink: 0;
  }
  .slide img{
      width: 100%;
  }
</style>