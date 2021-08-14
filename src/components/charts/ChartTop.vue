<template>
  <div class="wrapper">
    <div class="payOrIncome">
      <span class="selectPayOrIncome" @click="selectPayOrIncome">支出</span>
      <span @click="selectPayOrIncome">收入</span>
    </div>
    <div class="orderByTime">
      <span class="selectOrderByTime" @click="selectOrderByTime">周</span>
      <span @click="selectOrderByTime">月</span>
      <span @click="selectOrderByTime">年</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class ChartTop extends Vue {
  selectPayOrIncome(event: Event){
    let spanNode = event.target as HTMLSpanElement
    if (spanNode.parentNode === null) return
    spanNode.parentNode.childNodes.forEach((item) => {
      (item as HTMLSpanElement).classList.remove("selectPayOrIncome")
    })
    spanNode.classList.add("selectPayOrIncome")
  }
  selectOrderByTime(event: Event){
    let spanNode = event.target as HTMLSpanElement
    if (spanNode.parentNode === null) return
    spanNode.parentNode.childNodes.forEach((item ) => {
      (item as HTMLSpanElement).classList.remove("selectOrderByTime")
    })
    spanNode.classList.add("selectOrderByTime")
  }

}
</script>

<style lang="scss" scoped>
  .wrapper{
    height: 15vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .selectPayOrIncome{
      border-bottom: 1.5px solid black;
    }
    .selectOrderByTime{
      background-color: black;
      color: white;
    }
    > .payOrIncome{
      width: 30vw;
      display: flex;
      justify-content: center;
      text-align: center;
      font-size: 1.2em;
      :nth-child(1){
        flex-grow: 1;
      }
      :nth-child(2){
        flex-grow: 1;
      }
    }
    > .orderByTime{
      width: 60vw;
      font-size: 1.2em;
      display: flex;
      justify-content: center;
      text-align: center;
      :nth-child(1){
        flex-grow: 1;
        border: 2px solid black;
      }
      :nth-child(2){
        flex-grow: 1;
        border-top: 2px solid black;
        border-right: 2px solid black;
        border-bottom: 2px solid black;
      }
      :nth-child(3){
        flex-grow: 1;
        border-top: 2px solid black;
        border-right: 2px solid black;
        border-bottom: 2px solid black;
      }
    }
  }
</style>