<template>
  <div class="tabbar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
    <!-- <slot name="item-text" :class="{ active: isActive }"></slot> -->
  </div>
</template>

<script>
export default {
  name: "tabBarItem",
  computed: {
    isActive() {
      return this.$route.path === this.path;
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {};
    },
  },
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },
  methods: {
    itemClick() {
      this.$router.push(this.path);
    },
  },
};
</script>

<style  lang="less" scoped>
.tabbar-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; //注意一定要区分主轴和侧轴
  flex: 1;
  img {
    width: 24px;
    height: 24px;
    margin-bottom: 2px;
    vertical-align: middle;
  }
}
.active {
  color: red;
}
</style>
