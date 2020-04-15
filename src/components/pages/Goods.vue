<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="商品详情" left-arrow @click-left="onClickLeft"  />
    </div>

    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1" width="100%" />
    </div>

    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">价格：￥{{goodsInfo.PRESENT_PRICE | moneyFilter}}</div>

    <div>
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="评价">正在制作中</van-tab>
      </van-tabs>
    </div>

    <div class="goods-bottom">
      <div>
        <van-button size="large" type="default">加入购物车</van-button>
      </div>
      <div>
        <van-button size="large" type="primary">购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getDetailGoodsInfo } from "@/api/index";
import { toMoney } from "@/filter/index";

export default {
  name: "goods",
  components: {},
  data() {
    return {
      goodsId: "",
      goodsInfo: ""
    };
  },

  created() {
    let params = this.$route.query
    this.goodsId = params.goodsId
    this.getGoodsInfo();
  },

  methods: {
    getGoodsInfo() {
      getDetailGoodsInfo(this.goodsId).then(res => {
        // console.log(res);
        if (res.code == 200) {
          this.goodsInfo = res.data;
        } else {
          this.$toast(res.msg);
        }
      });
    },

    onClickLeft() {
      this.$router.go(-1);
    }
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  }
};
</script>

<style>
.detail {
  font-size: 0px;
  margin-bottom: 60px;
}
.goods-name {
  background-color: #fff;
}
.goods-price {
  background-color: #fff;
  font-size: 14px;
}
.goods-bottom {
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: #fff;
  width: 100%;

  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
}
.goods-bottom > div {
  flex: 1;
  padding: 5px;
}
</style>