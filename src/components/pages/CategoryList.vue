<template>
  <div>
    <div class="navbar-div">
      <!-- left-arrow @click-left="onClickLeft" -->
      <van-nav-bar fixed placeholder z-index="10"   title="类别列表"  />
    </div>

    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li
                v-for="(item,index) in category"
                :key="index"
                @click="clickCategory(item, index)"
                :class="{categoryActive: categoryIndex==index}"
              >{{item.MALL_CATEGORY_NAME}}</li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active" swipe-threshold="3" @change="changeSubId">
              <van-tab
                v-for="(item, index) in subCategory"
                :key="index"
                :title="item.MALL_SUB_NAME"
              ></van-tab>
            </van-tabs>
          </div>

          <div id="list-div">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-empty description="空空如也" v-if="goodsList.length == 0 &&  loading == false" />

              <van-list v-model="loading" :finished="finished" @load="onLoad" v-else>
                <div
                  class="list-item"
                  v-for="(item,index) in goodsList"
                  :key="index+'1'"
                  @click="goGoodsDetile(item)"
                >
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" width="100%" :onerror="errorImg" />
                  </div>
                  <div class="list-item-text">
                    <div>{{item.NAME}}</div>
                    <div class>￥{{item.ORI_PRICE | toMoneyFilter}}</div>
                  </div>
                </div>
                <div v-show="finished" class="finished_tips">没有更多了~</div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import {
  getCategoryList,
  getCategorySubList,
  getGoodsBySubId
} from "@/api/index";

import { toMoney } from "@/filter/index";

export default {
  data() {
    return {
      category: [],
      categoryIndex: 0,
      subCategory: [],
      categorySubId: "",
      active: 0,
      loading: false,
      finished: false,
      isRefresh: false,
      goodsList: [],
      page: 1,
      pageSize: 10,
      errorImg: 'this.src="' + require("@/assets/img/errorimg.png") + '"'
    };
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height = winHeight - 46 + "px";
    document.getElementById("list-div").style.height =
      winHeight - 44 - 46 + "px";
  },
  async created() {
    let params = this.$route.params;

    await this.categoryList();
    await this.categorySubList(params.categoryId || 1);

    this.category.forEach((ele, index) => {
      if (ele.ID == params.categoryId) {
        this.categoryIndex = index;
      }
    });
  },
  methods: {
    goGoodsDetile(item) {
      this.$router.push({
        path: "/goods",
        query: {
          goodsId: item.ID
        }
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    //点击大类的方法
    clickCategory(item, index) {
      this.categoryIndex = index;
      this.categorySubList(item.ID);
    },
    changeSubId(index) {
      console.log(index);
      this.categorySubId = this.subCategory[index].ID;
      console.log(this.categorySubId);
      this.page = 1;
      this.finished = false;
      this.goodsList = [];
      this.onLoad();
    },

    // 获取大类
    async categoryList() {
      let res = await getCategoryList();
      if (res.code == 200) {
        this.category = res.data;
      } else {
        this.$toast(res.msg);
      }
    },
    // 获取子类
    async categorySubList(categoryId) {
      let res = await getCategorySubList(categoryId);
      if (res.code == 200) {
        this.subCategory = res.data;
        this.active = 0;
        this.categorySubId = this.subCategory[0].ID;

        this.onRefresh();
      } else {
        this.$toast(res.msg);
      }
    },

    // 获取商品
    async getGoods() {
      let res = await getGoodsBySubId(this.categorySubId, this.page);
      this.loading = false;
      this.isRefresh = false;
      if (res.code == 200) {
        this.goodsList = this.goodsList.concat(res.data);
        this.page = this.page + 1;
        if (res.data.length < this.pageSize) {
          this.finished = true;
        }
      }
    },

    onRefresh() {
      setTimeout(() => {
        this.goodsList = [];
        this.page = 1;
        this.onLoad();
      }, 500);
    },
    onLoad() {
      setTimeout(() => {
        this.getGoods();
      }, 0);
    }
  },
  filters: {
    toMoneyFilter: function(params) {
      return toMoney(params);
    }
  }
};
</script>

<style>
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActive {
  background-color: #eeeeee;
}
.list-item {
  text-align: center;
  line-height: 24px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
}
#list-div {
  overflow: scroll;
}
.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}
#list-div {
  overflow: scroll;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}

.finished_tips {
  text-align: center;
  font-size: 10px;
  color: #ccc;
  padding: 10px 0;
  padding-bottom: 60px;
}
</style>