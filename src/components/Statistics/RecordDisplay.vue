<template>
  <div class="records-wrap">
    <div class="recordItems">
      <div v-for="item in groupMonthRecordList" :key="item.date">
        <div class="content">
          <div class="content-top">{{ item.date }}</div>
          <div v-for="(record,index) in item.value" :key="index"  class="content-bottom" @click="update(record)" >
            <span v-for="(tags,index) in record.tags" :key="index">
              <span class="tag">{{ tags.name }}</span>
            </span>
            <span class="note">{{record.notes}}</span>
            <span class="amount" @click="update">{{record.amount !== '0'?record.type + record.amount:record.amount}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import dayjs from 'dayjs';
import {RecordItem} from '@/custom';

@Component
export default class RecordDisplay extends Vue {
  get currentMonthRecordHash() {
    return this.$store.state.recordListHash[parseInt(this.$store.state.currentMonth) - 1];
  }
  get groupMonthRecordList(){
    let monthRecord = this.currentMonthRecordHash.recordList;
    let recordArray: RecordItem[];
    type Record = {
      date: string
      value: RecordItem[]
    };
    let recordList: Record[] = [];
    let record: Record;
    let previousDay = '';
    monthRecord.forEach((item: RecordItem) => {
      let formatDate = dayjs(item.createdAt).format('YYYY年M月D日');
      if (previousDay === formatDate) {
        recordArray.push(item);
        record['date'] = formatDate;
        record['value'] = recordArray;
      } else {
        record = {date:"",value:[]};
        previousDay = formatDate;
        recordArray = [];
        recordArray.push(item);
        record['date'] = formatDate;
        record['value'] = recordArray;
        recordList.push(record);
      }
    });
    return recordList;
  }

  update(record: RecordItem){
    this.$store.state.currentRecord = record
    window.localStorage.setItem("currentRecord",JSON.stringify(record))
    this.$router.push("/update")
  }
}
</script>

<style lang="scss" scoped>
.records-wrap {
  height: 70vh;
  overflow: auto;

  > .recordItems {
    .content {
      > .content-top {
        background-color: #DCDCDC;
      }
      .content-bottom{
        line-height: 3em;
        border-bottom: 1px solid 	#F5F5F5;
        position: relative;
        width: 100vw;
        overflow: hidden;
        .tag{
          margin-left: 8px;
        }
        .note{
          position: absolute;
          font-size: 0.8em;
          margin-left: 15px;
          left: -1em;
          bottom: -1.2em;
        }
        .amount{
          align-items: end;
          position: absolute;
          right: 10px;
        }
      }
    }
  }
}
</style>