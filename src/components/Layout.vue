<template>
  <div class="layout-wrapper" ref="layout">
    <div class="content">
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Layout'
};
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  width: 100%;
  > .content{
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
}
</style>