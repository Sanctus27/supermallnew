<template>
<div class="tabbar">
    <slot></slot>
</div>
</template>

<script>
export default {
name: 'TabBar',
}
</script>

<style scoped>
.tabbar {
  display: flex;
  background: #f6f6f6;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.2);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 49px;
  font-size: 14px;
  z-index: 9;
}
</style>
