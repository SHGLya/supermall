<template>
  <div id="home">
    <!--导航条-->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control"
                :titles="['流行','新款','精选']"
                @tabClick="tabClick"
                ref="tabControl1"
                v-show="isTabFixed"/>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            :pull-up-load="true" 
            @scroll="contentScroll"
            @pullingUp="loadMore">
        <!--轮播图-->
        <home-swiper :banner="banner" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <!--推荐栏-->
        <recommend-view :recommend="recommend" />
        <!--今日流行-->
        <feature-view/>
        <!--控制栏-->
        <tab-control :titles="['流行','新款','精选']"
                    @tabClick="tabClick"
                    ref="tabControl2"/>
        <!--商品列表-->
        <goods-list :goods="showGoods"/>
    </scroll>
    <!-- 组件是否能直接监听click：不可以。如果想要，必须要加上.native -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll"
  import BackTop from "components/content/backTop/BackTop";

  import {getHomeMultidata} from "network/home";
  import {getHomeGoods} from "@/network/home";
  import { debounce } from "@/common/utils";
  import {itemListenerMixin} from "@/common/mixin";

  export default {
    name: "Home",
    mixins:[itemListenerMixin],
    data(){
      return {
        result: null,
        banner: [],
        recommend: [],
        goods:{
          'pop': {page:0,list:[]},
          'new': {page:0,list:[]},
          'sell': {page:0,list:[]},
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed:false,
        saveY: 0,
      }
    },
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      GoodsList,
      NavBar,
      TabControl,
      Scroll,
      BackTop
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    destroyed(){
      console.log('home destoryed')
    },
    activated(){
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated(){
      //1、保存y值
      this.saveY = this.$refs.scroll.getScrollY()
      //2、 取消全局事件的监听
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    created() {
      // 1、请求多个数据  异步操作
      this.getHomeMultidata()

      // 2、请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted(){
      // 1、图片加载完成的事件监听
    },
    methods:{
      /**
       * 事件监听相关的方法
       */
      tabClick(index){
        switch (index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        // 让两个TabControl的currentIndex保持一致
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0,1000)
      },
      contentScroll(position){
        // 1、判断我们的BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000
        // 2、决定tabControl是否吸顶（position：fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        // 2、获取tabControl的offsetTop
        // 所有的组件都有一个属性$el：用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      /**
       * 网络请求相关的方法
       */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          this.result = res
          this.banner = res.data.banner.list;
          this.recommend = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page
        getHomeGoods(type,page+1).then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          // 完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      },
      
    }
  }
</script>

<style scoped>
  #home{
      /* padding-top: 44px; */
      height: 100vh;
      position: relative;
  }
  .home-nav{
      background-color: var(--color-tint);
      color: #fff;
      /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
      /* position: fixed;
      left: 0;
      right: 0;
      top: 0;
      z-index: 9; */
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
