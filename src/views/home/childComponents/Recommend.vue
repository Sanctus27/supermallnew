<template>
  <div class="recommend">
    <div
      class="recommend-item"
      v-for="(item, index) of recommends"
      :key="index"
    >
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommend",
  props: {
    recommends: {
      Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="less" scoped>
.recommend {
  display: flex;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
  text-align: center;
  .recommend-item {
    flex: 1;
    img {
      width: 80%;
      margin-bottom: 10px;
    }
  }
}
</style>
