<template>
  <div class="layout-wrapper" ref="layout">
    <div class="content">
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Layout extends Vue{
  mounted(){
    let div = this.$refs.layout as HTMLDivElement
    div.style.height = document.documentElement.clientHeight + "px"
  }
}
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