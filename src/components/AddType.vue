<template>
  <div class="type-items-wrap">
    <ol class="type-items">
      <li class="type-item">衣</li>
      <li class="type-item">食</li>
      <li class="type-item">住</li>
      <li class="type-item">行</li>
      <li class="type-item">行</li>
      <li class="type-item">行</li>
      <li class="type-item">行</li>
      <li class="type-item">行</li>
      <li class="type-item">行</li>
      <li class="type-item">行</li>
      <li class="type-item">行</li>
      <li class="type-item">行</li>
      <li class="type-item">行</li>
      <li class="type-item">行</li>
      <li class="type-item">行</li>
      <li class="type-item">行</li>
      <li class="type-item">行</li>
      <li class="type-item">行</li>
      <li class="type-item">行</li>
      <li class="type-item">行</li>
      <li class="type-item">行</li>
      <li class="type-item">行</li>
      <li class="type-item">行</li>
      <li class="type-item">行</li>
      <li class="type-item">行</li>
      <li class="type-item">行</li>
      <li class="type-item">行</li>
      <li class="type-item">行</li>
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
    margin-top: 10px;
    overflow: auto;
    > .type-items{
      @extend %clearFix;
      display: flex;
      justify-content: start;
      flex-wrap: wrap;
      > .type-item{
        font-size: 18px;
        display: block;
        outline: 1px solid red;
        width: 20%;
        text-align: center;
        margin: 8px;
      }
    }
  }
</style>