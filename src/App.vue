<template>
  <div id="app">
    <div id="app_content">
      <router-view />
    </div>

    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" replace to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="edit" replace to="/CategoryList">分类</van-tabbar-item>
      <van-tabbar-item icon="cart-o" replace to="/shopCar">购物车</van-tabbar-item>
      <!-- <van-tabbar-item icon=contact>标签</van-tabbar-item> -->
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style>
</style>
