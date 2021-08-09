<template>
  <div class="money-container">
    <TopNav />
    <SelectTags />
    <NumberPad />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import TopNav from '@/components/money/TopNav.vue';
import NumberPad from '@/components/money/NumberPad.vue';
import SelectTags from '@/components/money/SelectTags.vue';
@Component({
  components: {SelectTags, NumberPad, TopNav}
})
export default  class Money extends Vue{
  name = 'Money'
}
</script>

<style lang="scss" scoped>
  .money-container{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    > .type-items-wrap{
      flex-grow: 1;
      padding-top: 38px;
      padding-bottom: 38px;
      align-self: center;
      width: 80vw;
    }
  }
</style>
