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

    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%" />
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFilter}} (￥{{item.mallPrice}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <div>
      <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
      <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
      <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>
    </div>

    <div style="overflow: hidden;">
      <p class="floor-title">热卖商品</p>
      <van-list>
        <van-row gutter="20">
          <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
            <goodsInfo :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goodsInfo>
          </van-col>
        </van-row>
      </van-list>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import floorComponent from "../component/floorComponent";
import goodsInfo from "../component/goodsInfoComponent";

import { toMoney } from "@/filter/index";
import { getIndex } from "@/api/index";
export default {
  name: "ShoppingMall",
  components: {
    swiper,
    swiperSlide,
    floorComponent,
    goodsInfo,
  },
  data() {
    return {
      msg: "hello world",
      searchWord: "",
      bannerPicArray: [],
      category: "",
      adBanner: "",
      recommendGoods: "",
      floorName: "",
      floor1: [],
      floor2: [],
      floor3: [],
      swiperOption: {
        slidesPerView: 3
      },
      hotGoods: []
    };
  },
  created() {
    // this.$toast("提示文案");
    let _this = this;
    getIndex()
      .then(res => {
        // console.log(res);
        _this.category = res.data.category;
        _this.adBanner = res.data.advertesPicture;
        _this.bannerPicArray = res.data.slides;
        _this.recommendGoods = res.data.recommend;
        _this.floor1 = res.data.floor1; //楼层1数据
        _this.floor2 = res.data.floor2; //楼层1数据
        _this.floor3 = res.data.floor3; //楼层1数据
        _this.floorName = res.data.floorName; //楼层1数据
        _this.hotGoods = res.data.hotGoods;
      })
      .catch(err => {
        _this.$toast("网络错误");
      });
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
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

.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem 0.6rem;
  color: #e5017d;
}

.recommend-body {
  border-bottom: 1px solid #eee;
}

.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}

.floor_name {
  text-align: center;
  background: pink;
}

.floor-anomaly {
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}
.floor-anomaly div {
  width: 10rem;

  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.floor-one {
  border-right: 1px solid #ddd;
}
.floor-two {
  border-bottom: 1px solid #ddd;
}
.floor-rule {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #fff;
}
.floor-rule div {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 10rem;
  border-bottom: 1px solid #ddd;
}
.floor-rule div:nth-child(odd) {
  border-right: 1px solid #ddd;
}

.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
</style>