<template>
  <div class="back-top">
    <a href="#"><img src="~assets/img/common/top.png" alt="" /></a>
  </div>
</template>

<script>
export default {
  name: "BackTop",
};
</script>

<style scoped>
.back-top {
  position: fixed;
  right: 8px;
  bottom: 55px;
  z-index: 55;
}
.back-top img {
  width: 43px;
  height: 43px;
}
</style>
