<template>
  <tar-bar>
    <tab-bar-item path="/home" activeColor="pink">
      <!--如果文件不是通过import引入，需要在别名前面加一个~符号来使用，否则会找不到文件-->
      <img slot="item-icon" src="~assets/img/tabbar/home.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg">
      <div slot="item-text">首页</div>
    </tab-bar-item>


    <tab-bar-item path="/category" activeColor="pink">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="pink">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="pink">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tar-bar>
</template>

<script>
//如果文件时通过import引入，可以直接使用别名
import TarBar from 'components/commom/tabbar/TabBar'
import TabBarItem from "components/commom/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {
    TarBar,
    TabBarItem
  }
}
</script>

<style scoped>

</style>
