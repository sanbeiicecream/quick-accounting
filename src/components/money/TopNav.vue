<template>
<div class="nav-top-wrap">
  <div class="pay" :class="{selected: value === 'pay'}" @click="select">支出</div>
  <div class="income" :class="{selected: value === 'income'}" @click="select">收入</div>
  <div class="return">
    <router-link to="/statistics" @click.native="getClick">
      <icon name="return"/>
    </router-link>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';


@Component
export default class TopNav extends Vue{
  selected = false
  value = "pay"
  select($event: MouseEvent){
    this.$store.state.selectedTagIds = []
    if ($event.target !== null){
      this.value = ($event.target as HTMLDivElement).classList[0] === "income"?"income":"pay"
      this.$store.state.payOrIncome = this.value
    }
  }
  getClick(){
    this.$store.state.payOrIncome = "pay"
  }
}
</script>

<style lang="scss" scoped>
  .nav-top-wrap{
    display: flex;
    background-color:	#A9A9A9;
    justify-content: center;
    font-size: 18px;
    height: 6vh;
    align-items: flex-end;
    position: relative;
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
    .return{
      position: absolute;
      left: 5%;
      top: 30%;
      transform: translateY(-20%);
    }
  }
</style>