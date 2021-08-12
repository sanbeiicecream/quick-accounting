<template>
  <div class="top-wrap">
    <div @click="showPopup" class="selectDate">{{displayDate}}<Icon :name="iconName" /></div>
    <div class="displayAmount">
      <div>{{amount}}</div>
      <div>{{currentMonth + "月结余"}}</div>
    </div>
    <div class="payAndIncome">
      <div class="pay">
        <div>{{pay}}</div>
        <div>{{currentMonth + "月收入"}}</div>
      </div>
      <div class="income">
        <div>{{income}}</div>
        <div>{{currentMonth + "月支出"}}</div>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '40%' }" @close="onClose">
      <van-datetime-picker
          v-model="currentDate"
          type="year-month"
          title="选择年月"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @cancel="onCancel"
          @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {DatetimePicker, Popup} from 'vant';
import dayjs from 'dayjs';

@Component({
  components:{[DatetimePicker.name]: DatetimePicker, [Popup.name]: Popup}
})
export default class Statistics extends Vue {
  minDate = new Date(2020, 0, 1)
  maxDate = dayjs().add(3,'year').toDate()
  currentDate = new Date()
  displayDate = dayjs(this.currentDate).format("YYYY年MM月")
  get currentMonth(){
    if (parseInt(this.displayDate.substring(5,7)) > 9){
      return this.displayDate.substring(5,7)
    }else {
      return this.displayDate.substring(5,7).replace("0","")
    }
  }
  show = false
  iconName = "subDuct"
  amount = "0"
  pay = 0
  income = 0
  created(){
    this.$store.commit("fetchRecordList")
    this.$store.commit("getRecordListHash")
    this.amount = this.$store.state.recordListHash[parseInt(this.currentMonth) - 1].total;
    this.pay = this.$store.state.recordListHash[parseInt(this.currentMonth) - 1].pay;
    this.income = this.$store.state.recordListHash[parseInt(this.currentMonth) - 1].income;
    this.$store.state.currentMonth = this.currentMonth
  }
  showPopup() {
    this.currentDate = new Date()
    this.show = true;
    this.iconName = "upDuct"
  }
  onClose(){
    this.iconName = "subDuct"
  }
  formatter(type: string, val: string) {
    if (type === 'year') {
      return `${val}年`;
    } else if (type === 'month') {
      return `${val}月`;
    }
    return val;
  }
  onCancel(){
    this.show = false
  }
  onConfirm(value: string){
    this.show = false
    this.displayDate = dayjs(value).format("YYYY年MM月")
    this.amount = this.$store.state.recordListHash[parseInt(this.currentMonth) - 1].total;
    this.pay = this.$store.state.recordListHash[parseInt(this.currentMonth) - 1].pay;
    this.income = this.$store.state.recordListHash[parseInt(this.currentMonth) - 1].income;
    this.$store.state.currentMonth = this.currentMonth
  }
}
</script>

<style lang="scss" scoped>
.top-wrap{
  height: 18vh;
  background: #D0D0D0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > .selectDate{
    font-size: 1.2em;
    text-align: center;
      }
      > .displayAmount{
        text-align: center;
        line-height: 1em;
        :nth-child(1){
          font-size: 1.3em;
        }
        :nth-child(2){
          font-size: 0.8em;
        }
      }
      > .payAndIncome{
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 1.2em;
        line-height: 0.8em;
        > .pay{
          flex-grow: 1;
          text-align: center;
          border-right:1px solid black;
          > :nth-child(2){
            font-size: 0.6em;
          }
        }
        > .income{
          vertical-align: bottom;
          flex-grow: 1;
          text-align: center;
          > :nth-child(2){
            font-size: 0.5em;
          }
        }
      }
    }
</style>