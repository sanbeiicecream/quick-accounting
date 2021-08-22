<template>
  <div class="money-container" ref="container" :style="`height:${currentHeight}`">
    <TopNav />
    <SelectTags />
    <NumberPad :current-height.sync="currentHeight"/>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import TopNav from '@/components/money/TopNav.vue';
import NumberPad from '@/components/money/NumberPad.vue';
import SelectTags from '@/components/money/SelectTags.vue';
@Component({
  components: {SelectTags, NumberPad, TopNav}
})
export default class Money extends Vue{
  currentHeight = document.documentElement.clientHeight + "px"
  get height(){
    return this.currentHeight
  }
  @Watch("currentHeight")
  updateHeight(newValue: string){
    let div = this.$refs.container as HTMLDivElement
    div.style.height = newValue + "px"
  }
}
</script>
<style lang="scss" scoped>
  .money-container{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    width: 100vw;
    > .type-items-wrap{
      flex-grow: 1;
      padding-top: 38px;
      padding-bottom: 38px;
      align-self: center;
      width: 100%;
    }
  }
</style>
