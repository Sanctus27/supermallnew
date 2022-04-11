<template>
  <div class="tab-control">
    <div
      v-for="(item, index) of titles"
      :key="index"
      class="tab-control-item"
      @click="itemClick(index)"
    >
      <span :class="{ active: currentIndex === index }">{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
      isIndex1: false,
      isIndex2: false,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
      if (!this.isIndex1 && index === 1) {
        this.isIndex1 = true;
        this.$emit("tabMove");
      }
      if (!this.isIndex2 && index === 2) {
        this.isIndex2 = true;
        this.$emit("tabMove");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tab-control {
  display: flex;
  // width: 100%;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  z-index: 9;
  .tab-control-item {
    flex: 1;
    span {
      padding: 5px;
    }
  }
}
.active {
  color: @color-high-text;
  border-bottom: 3px solid @color-tint;
}
</style>
