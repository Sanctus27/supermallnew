<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      :class="{ tabcontrol: isFixed }"
      @tabClick="handleTabClick"
      @tabMove="handleTabMove"
      ref="tabControl1"
      v-show="isFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      @scroll="handleScroll"
      @pullingUp="handlePullingUp"
      :probeType="3"
      :pullUpLoad="true"
    >
      <swiper :list="banners" @swiperImageLoad="handleImageLoad"></swiper>
      <recommend :recommends="recommends"></recommend>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="handleTabClick"
        ref="tabControl2"
        @tabMove="handleTabMove"
      ></tab-control>
      <goods-list :goods="showTab"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-if="showBackTop" />
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/scroll/Scroll";
import TabControl from "@/components/content/tabcontrol/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "@/network/home";

import Swiper from "@/views/home/childComponents/Swiper";
import Recommend from "@/views/home/childComponents/Recommend";
import FeatureView from "@/views/home/childComponents/FeatureView";

import {BACKTOP} from "@/common/const"

export default {
  name: "Home",
  components: {
    NavBar,
    Swiper,
    Recommend,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      showBackTop: false,
      tabOffsetTop: 0,
      isFixed: false,
      positionY: 0,
    };
  },
  computed: {
    showTab() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    // console.log(this);
    //请求多个数据
    this.getHomeMultidata();

    //请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  //事件总线监听item中图片加载完成,因为我使用了obersveDOM和observeImage，所以这里只是用于测试
  mounted() {
    //图片加载完成的事件监听
    this.$bus.$on("itemImageLoad", () => {
      // console.log('1111');
      this.$refs.scroll && this.$refs.scroll.scroll.refresh();
      // this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.tabOffsetTop);
    });
  },
  // updated(){
  //   // console.log(111);
  //   console.log(this.$refs.tabControl.$el.offsetTop);
  // },
  methods: {
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        // console.log(this.banners);
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // console.log(this.goods[type].list.concat(res.data.list));
        // console.log(this.goods[type].list.push(...res.data.list));
        //  return this.goods[type].list.concat(res.data.list)
      });
    },
    /**
     * 事件监听相关方法
     */
    handleTabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    //回到顶部
    backClick() {
      // console.log(this.refs);
      this.$refs.scroll.scroll.scrollTo(0, 0, 500);
    },

    handleScroll(position) {
      // 1. 判断backTop是否显示
      // console.log(this.positionY);
      this.positionY = -position.y;
      // console.log(position.y);
      // console.log(this.$refs.scroll.scroll.y); //position.y和this.$refs.scroll.scroll.y值是一样的
      this.showBackTop = this.positionY > BACKTOP;
      this.isFixed = this.positionY > this.tabOffsetTop;
    },
    //上拉加载更多
    handlePullingUp() {
      this.getHomeGoods(this.currentType);
    },
    // 监听图片加载完成后获取其距离顶部的距离
    handleImageLoad() {
      // this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.tabOffsetTop);
      console.log(22);
    },
    handleTabMove() {
      if (this.positionY < this.tabOffsetTop) {
        return;
      }
      this.$refs.scroll.scroll.scrollTo(0, -this.tabOffsetTop, 0);
    },
  },
  updated() {
    // setTimeout(()=>{
    //   this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    //   console.log(this.tabOffsetTop);
    // }, 500)
    // this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    // console.log(this.tabOffsetTop);
    this.$nextTick(() => {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      console.log(this.tabOffsetTop);
    });
  },
};
</script>

<style lang="less" scoped>
#home {
  position: relative;
  height: 100vh;
}
.home-nav {
  //注意不要在公共组件里设置颜色，可以在外部设置
  background-color: @color-tint;
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 9;
}
.tabcontrol {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  // position: relative;
  z-index: 10;
}
.content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
