<template>
<div class="nav-top-wrap">
  <div class="pay" :class="{selected: value === 'pay'}" @click="select">支出</div>
  <div class="income" :class="{selected: value === 'income'}" @click="select">收入</div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'


@Component
export default class TopNav extends Vue{

  selected: boolean
  value = "pay"

  select($event: MouseEvent){
    this.value = $event.target.classList[0] === "income"?"income":"pay"
  }
}
</script>

<style lang="scss" scoped>
  .nav-top-wrap{
    display: flex;
    background:#ffda47 ;
    justify-content: center;
    font-size: 18px;
    height: 8vh;
    align-items: flex-end;
    > .pay{
      padding: 0  10px;
      text-align: center;
    }
    > .income{
      padding: 0 10px;
      text-align: center;
    }
    .selected::after{
      content: '';
      display: block;
      outline: 1px solid black;
    }
  }
</style>