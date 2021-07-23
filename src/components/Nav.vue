<template>
  <nav>
    <router-link class="item" to="/label" active-class="selected">
      <Icon name="label"/>
      标签
    </router-link>
    <router-link class="item" to="/money" active-class="selected">
      <Icon name="money"/>
      记账
    </router-link>
    <router-link class="item" to="/statistics" active-class="selected">
      <Icon name="statistics"/>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'Nav'
};
</script>

<style lang="scss" scoped>
nav{
  display: flex;
  flex-direction: row;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
  font-size: 15px;
  > .item{
    padding: 2px 0;
    display: flex;
    width: 33.333333333333%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  > .selected{
    color: red;
  }
}
</style>