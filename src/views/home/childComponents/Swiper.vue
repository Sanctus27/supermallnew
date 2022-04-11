<template>
  <div class="wapper">
    <!-- <h3>swiper轮播</h3> -->
    <swiper :options="swiperOption" v-if="showSwiper">
      <swiper-slide v-for="(item, index) of list" :key="index">
        <a :href="item.link"
          ><img class="swiper-img" alt="" :src="item.image" @load="imageLoad"
        /></a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "HomeSwiper",
  props: {
    list: Array,
  },
  data() {
    //   注意这里子组件定义的时候一定要是函数，但这里采用了ES6的写法
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
        }, //轮播圆点显示
        loop: true, //循环
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        autoplay: {
          delay: 2000,
        },
      },
      isLoad: false, //为了不让Swiper多次发出事件，用其进行状态管理，相当于节流
    };
  },
  computed: {
    showSwiper() {
      return this.list.length;
    },
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper /deep/ .swiper-pagination-bullet-active {
  background: #fff !important;
}
.wrapper {
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-bottom: 52%;
  /*
  或者用下面这个，但是可能有兼容性问题
  height: 31.25%vw;
  width: 100%;
  */
}
.swiper-img {
  width: 100%;
}
</style>
