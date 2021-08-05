<template>
  <div class="money-container">
      <TopNav/>
      <AddType/>
      <NumberPad/>
  </div>
</template>

<script lang="ts">
import TopNav from '@/components/TopNav.vue';
import AddType from '@/components/AddType.vue';
import NumberPad from '@/components/NumberPad.vue';
export default {
  name: 'Money',
  components: {NumberPad, AddType, TopNav}
};
</script>

<style lang="scss" scoped>
  .money-container{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    > .type-items-wrap{
      flex-grow: 1;
      padding-top: 50px;
      align-self: center;
      width: 80vw;
    }
  }
</style>
