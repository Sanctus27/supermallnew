<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
import ObserveDOM from "@better-scroll/observe-dom";
import ObserveImage from "@better-scroll/observe-image";
BScroll.use(ObserveDOM).use(Pullup).use(ObserveImage);
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      observeDOM: true, // 开启 observe-dom 插件
      observeImage: true,
      mouseWheel: true, //开启鼠标滚轮
      disableTouch: false,
      probeType: this.probeType, //不加这个无法使用this.scroll.on('scroll', (position),任何时候都派发 scroll 事件，包括调用 scrollTo 或者触发 momentum 滚动动画
      pullUpLoad: this.pullUpLoad,
    });
    //监听滚动的位置
    this.scroll.on("scroll", (position) => {
      // console.log(position);
      this.$emit("scroll", position);
    });
    //监听上拉加载更多
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
      this.scroll.finishPullUp();
    });
  },
};
</script>

<style scoped>
</style>
