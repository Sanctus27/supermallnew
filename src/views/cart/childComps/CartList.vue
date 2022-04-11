<template>
  <div>
    <div id="shop-item" v-for="(item, index) of cartList" :key="index">
      <div class="item-selector">
        <CheckButton
          :isChecked="item.isChecked"
          @click.native="checkClick(index)"
        ></CheckButton>
      </div>
      <div class="item-img">
        <img :src="item.image" alt="商品图片" />
      </div>
      <div class="item-info">
        <div class="item-title">{{ item.title }}</div>
        <div class="item-desc">{{ item.desc }}</div>
        <div class="info-bottom">
          <div class="item-price left">¥{{ item.price }}</div>
          <div class="item-count right">x{{ item.count }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CheckButton from "@/views/cart/childComps/CheckButton";
export default {
  name: "CartList",
  computed: {
    ...mapGetters(["cartList"]),
  },
  components: {
    CheckButton,
  },
  methods: {
    checkClick(index) {
        this.$store.commit("changeChecked", index)
    },
  },
};
</script>

<style scoped>
#shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
  /*border: 1px solid #ccc;*/
}

.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price {
  color: orangered;
}
</style>
