<template>
  <div class="cart">
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <scroll :pullUpLoad="true" class="content" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/scroll/Scroll";
import CartList from "@/views/cart/childComps/CartList";
import CartBottomBar from '@/views/cart/childComps/CartBottomBar'
import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar,
    Scroll,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters(["cartLength"]),
  },
  activated() {
    this.$refs.scroll.scroll.refresh();
  },
};
</script>

<style lang="less" scoped>
.cart {
  position: relative;
  height: 100vh;
}
.cart-nav {
  background-color: @color-tint;
  color: #fff;
  font-weight: 700;
  //   position: relative;
  //   z-index: 999;
}
.content {
  position: absolute;
  overflow: hidden;
  left: 0;
  top: 44px;
  right: 0;
  bottom: 93px;
}
</style>
