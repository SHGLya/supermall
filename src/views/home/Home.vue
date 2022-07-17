<template>
  <div id="home">
    <!--导航条-->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!--轮播图-->
    <home-swiper :banner="banner"></home-swiper>
    <!--推荐栏-->
    <recommend-view :recommend="recommend" />
  </div>
</template>

<script>
  import NavBar from "components/commom/navbar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";

  import {getHomeMultidata} from "network/home";
  export default {
    name: "Home",
    data(){
      return {
        result: null,
        banner: [],
        recommend: [],
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      RecommendView
    },
    created() {
      // 1、请求多个数据  异步操作
      getHomeMultidata().then(res => {
        this.result = res
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      })
    }
  }
</script>

<style scoped>
  .home-nav{
      background-color: var(--color-tint);
      color: white;
  }
</style>
