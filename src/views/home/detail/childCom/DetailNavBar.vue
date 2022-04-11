<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="back">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>

      <div slot="center" class="detail-nav-bar">
        <div
          v-for="(item, index) of titles"
          :key="index"
          @click="barClick(index)"
          class="titles"
        >
          <span :class="{ active: index === currentIndex }" class="item">{{
            item
          }}</span>
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      isActive: false,
      currentIndex: 0,
    };
  },
  methods: {
    barClick(index) {
      this.currentIndex = index;
      this.$emit("barClick", index);
    },
    back() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.detail-nav-bar {
  display: flex;
  font-size: 13px;
}
.titles {
  flex: 1;
  .item {
    padding: 0 5px 5px 5px;
    &.active {
      border-bottom: 1px solid red;
      color: @color-high-text;
    }
  }
}
.back {
  margin-top: 10px;
}
</style>
