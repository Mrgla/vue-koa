<template>
  <div class="ShoppingMall">
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <van-icon name="location" />
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input" placeholder="搜索" v-model="searchWord" />
        </van-col>
        <van-col span="5">
          <van-button plain type="info" size="mini">搜索</van-button>
        </van-col>
      </van-row>
    </div>

    <div class="swiper_area">
      <van-swipe :autoplay="5000" class="swiper_wrap">
        <van-swipe-item v-for="(img, index) in bannerPicArray" :key="index">
          <img v-lazy="img.image" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="type_bar">
      <div v-for="(cate, index) in category" :key="index">
        <img v-lazy="cate.image" alt width="100%" />
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>

    <div class="ad-banner">
      <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%" />
    </div>
  </div>
</template>

<script>
import { getIndex } from "@/api/index";
export default {
  name: "ShoppingMall",
  data() {
    return {
      msg: "hello world",
      searchWord: "",
      bannerPicArray: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ],
      category: "",
      adBanner: ""
    };
  },
  created() {
    // this.$toast("提示文案");
    let _this = this;
    getIndex()
      .then(res => {
        console.log(res);
        _this.category = res.data.category;
        _this.adBanner = res.data.advertesPicture;
        _this.bannerPicArray = res.data.slides;
      })
      .catch(err => {
        _this.$toast("网络错误");
      });
  }
};
</script>

<style>
::placeholder {
  font-size: 0.8rem;
}
.search-bar {
  height: 2.2rem;
  background: rgb(121, 187, 255);
  line-height: 2.2rem;
  text-align: center;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid 1px !important ;
  background-color: rgb(121, 187, 255);
  color: #fff;
}
.swiper_wrap {
  height: 9rem;
}
.swiper_wrap .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
}
.swiper_area img {
  width: 100%;
}
.type_bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
}
.type_bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
}
</style>