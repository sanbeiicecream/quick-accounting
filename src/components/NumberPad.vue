<template>
  <div class="container-wrap">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>+</div>
    <div>x</div>
    <div>x</div>
    <div>x</div>
    <div>x</div>
    <div>x</div>
    <div>x</div>
    <div>x</div>
    <div>x</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {

}
</script>

<style lang="scss" scoped>
  .container-wrap{
    border: 1px solid red;
  }

</style>