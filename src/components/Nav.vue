<template>
  <nav>
    <router-link class="item" to="/statistics" active-class="selected">
      <Icon name="statistics"/>
      明细
    </router-link>
    <router-link class="item" to="/money" active-class="selected">
      <Icon name="money"/>
      记账
    </router-link>
    <router-link class="item" to="/chart" active-class="selected">
      <Icon name="chart"/>
      图表
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'Nav'
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
nav{
  display: flex;
  flex-direction: row;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
  font-size: 1em;
  width: 100%;
  > .item{
    padding: 2px 0;
    display: flex;
    width: 33.333333333333%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
    .icon{
      width: 1.5em;
      height: 1.5em;
    }
  > .selected{
    color: $color-heightLight;
  }
}
</style>