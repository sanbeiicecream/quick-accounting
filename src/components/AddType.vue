<template>
  <div class="type-items-wrap">
    <ol class="type-items">
      <li class="type-item">衣</li>
      <li class="type-item">食</li>
      <li class="type-item">住</li>
      <li class="type-item">行</li>
    </ol>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class AddType extends Vue {

}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .type-items-wrap{
    overflow: auto;
    > .type-items{
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      > .type-item{
        font-size: 18px;
        display: block;
        border: 1px solid red;
        width: 25%;
        text-align: center;
      }
    }
  }
</style>