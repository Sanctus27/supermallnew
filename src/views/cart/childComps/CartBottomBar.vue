<template>
  <div class="bottom-menu">
    <div class="select-all">
      <check-button
        class="button"
        :isChecked="isSelectAll"
        @click.native="handleAllClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">合计: {{ totalPrice }}</div>
    <div class="buy-product">去计算: {{ checkLength }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CheckButton from "./CheckButton";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      const cartList = this.cartList;
      return (
        "￥" +
        cartList
          .filter((item) => {
            return item.isChecked;
          })
          .reduce((preValue, item) => {
            return preValue + item.count * item.price;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList
        .filter((item) => item.isChecked)
        .reduce((pre, item) => {
          return pre + item.count;
        }, 0);
    },
    ...mapGetters(["cartList"]),
    isSelectAll() {
      return (
        this.cartList.length !== 0 &&
        this.cartList.every((item) => item.isChecked)
      );
    },
  },
  methods: {
    handleAllClick() {
        this.$store.commit("changeSelectAll", this.isSelectAll);
    //   if (this.isSelectAll) {
    //       this.cartList.forEach(item => item.isChecked = false)
    //   } else {
    //       this.cartList.forEach(item => item.isChecked = true)
    //   }
    },
  },
};
</script>

<style lang="less" scoped>
.bottom-menu {
  display: flex;
  height: 44px;
  align-items: center;
  background-color: #eee;
  position: fixed;
  justify-content: space-between;
  left: 0;
  right: 0;
  bottom: 49px;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  .select-all {
    display: flex;
    align-items: center;
    margin-left: 15px;
    .button {
      margin-right: 5px;
    }
  }
  .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }
  .buy-product {
    text-align: center;
    height: 100%;
    line-height: 44px;
    background-color: orangered;
    color: #fff;
    width: 100px;
  }
}
</style>
