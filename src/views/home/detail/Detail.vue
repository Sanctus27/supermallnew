<template>
  <div class="detail">
    <detail-nav-bar
      class="nav-bar"
      @barClick="handleBarClick"
      ref="nav"
    ></detail-nav-bar>
    <scroll
      class="content"
      :pullUpLoad="true"
      ref="scroll"
      @scroll="handleScroll"
    >
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="handleImageLoad"
      ></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info
        :commentInfo="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="handleAddToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-if="showBackTop" />
    <!-- <toast></toast> -->
  </div>
</template>

<script>
import DetailNavBar from "@/views/home/detail/childCom/DetailNavBar";
import DetailSwiper from "@/views/home/detail/childCom/DetailSwiper";
import DetailBaseInfo from "@/views/home/detail/childCom/DetailBaseInfo";
import DetailShopInfo from "@/views/home/detail/childCom/DetailShopInfo";
import DetailGoodsInfo from "@/views/home/detail/childCom/DetailGoodsInfo";
import DetailParamInfo from "@/views/home/detail/childCom/DetailParamInfo";
import DetailCommentInfo from "@/views/home/detail/childCom/DetailCommentInfo";
import DetailBottomBar from "@/views/home/detail/childCom/DetailBottomBar";

import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/goods/GoodsList";
import Toast from '@/components/common/toast/Toast'

import { BACKTOP } from "@/common/const";
import { backTopMixin } from "@/common/mixin";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "@/network/detail";
import { debounce } from "@/common/utils";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    Toast
  },
  mixins: [backTopMixin],
  created() {
    //两种获取路由参数的方式
    this.iid = this.$route.params.id;
    // this.iid = this.$route.query.id
    //请求详情数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      const data = res.result;
      //获取顶部的轮播数据
      this.topImages = data.itemInfo.topImages;
      //获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);
      //保存商品的详情数据
      this.detailInfo = data.detailInfo;
      //获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //取出评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    //请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
      // console.log(this.recommends);
    });
    // console.log(this.$route);
    //为什么写在created里？？
    // 给getThemeTopY赋值(对给list.themeTopYs赋值的操作进行防抖)
    this.getThemeTopY = debounce(() => {
      this.themeTops = [];
      this.themeTops.push(0);
      this.themeTops.push(this.$refs.param.$el.offsetTop);
      this.themeTops.push(this.$refs.comment.$el.offsetTop);
      this.themeTops.push(this.$refs.recommend.$el.offsetTop);
      this.themeTops.push(Number.MAX_VALUE);
    }, 100);
  },
  // updated(){
  //   this.$nextTick(() => {
  //     this.themeTops = [];
  //     this.themeTops.push(0);
  //     this.themeTops.push(this.$refs.param.$el.offsetTop);
  //     this.themeTops.push(this.$refs.comment.$el.offsetTop);
  //     this.themeTops.push(this.$refs.recommend.$el.offsetTop);
  //     console.log(this.themeTops);
  //   });
  // },
  mounted() {
    // this.getThemeTopY = debounce(() => {
    //   this.themeTops = [];
    //   this.themeTops.push(0);
    //   this.themeTops.push(this.$refs.param.$el.offsetTop);
    //   this.themeTops.push(this.$refs.comment.$el.offsetTop);
    //   this.themeTops.push(this.$refs.recommend.$el.offsetTop);
    //   this.themeTops.push(Number.MAX_VALUE);
    // }, 100);
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTops: [],
      getThemeTopY: null,
      currentIndex: 0,
    };
  },
  methods: {
    handleBarClick(index) {
      // console.log(index);
      this.$refs.scroll.scroll.scrollTo(0, -this.themeTops[index], 500);
    },
    handleImageLoad() {
      //这里用了debounce,但其实可以不用，因为DetailGoodsInfo已经做了防抖操作了，所以也可以用下面的六行代码
      this.getThemeTopY();
      // this.themeTops = [];
      // this.themeTops.push(0);
      // this.themeTops.push(this.$refs.param.$el.offsetTop);
      // this.themeTops.push(this.$refs.comment.$el.offsetTop);
      // this.themeTops.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTops);
    },
    handleScroll(position) {
      const positionY = -position.y;
      let length = this.themeTops.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTops[i] &&
          positionY < this.themeTops[i + 1]
        ) {
          this.currentIndex = i;
          console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      this.showBackTop = positionY > BACKTOP;
      //   for (let i=0;i<)
      //   if (
      //     0 <= positionY &&
      //     positionY < this.$refs.param.$el.offsetTop
      //   ) {
      //     this.index = 0;
      //     console.log(0);
      //   } else if (
      //     this.$refs.param.$el.offsetTop <= positionY &&
      //     positionY < this.$refs.comment.$el.offsetTop
      //   ) {
      //     this.index = 1;
      //     console.log(1);
      //   } else if (
      //     this.$refs.comment.$el.offsetTop <=
      //     positionY && positionY <
      //     this.$refs.recommend.$el.offsetTop
      //   ) {
      //     this.index = 2;
      //     console.log(2);
      //   } else {
      //     this.index = 3;
      //     console.log(3);
      //   }
      // },
    },
    handleAddToCart() {
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      this.$store.dispatch('addCart', product).then(res=>{
        console.log(res);
      })
    },
  },
};
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 12;
  background-color: #fff;
  height: 100vh;
}
.nav-bar {
  position: relative;
  z-index: 55;
  background-color: #fff;
}
.content {
  /* 如果只写下面的代码是不行的，因为100%是相对于父元素，所以父元素要设置高度 */
  /* height: calc(100% - 44px);  */
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 0;
}
</style>
