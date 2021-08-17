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
import {RecordItem} from '@/custom';
import {getGroupMonthRecordList} from '@/lib/getGroupMonthRecordList';

@Component
export default class RecordDisplay extends Vue {
  created(){
    this.$store.commit("getRecordListHash")
  }
  get currentMonthRecordHash() {
    return this.$store.state.recordListHash[parseInt(this.$store.state.currentMonth) - 1] || [];
  }
  get groupMonthRecordList(){
    return getGroupMonthRecordList(this.currentMonthRecordHash.recordList)
  }

  update(record: RecordItem){
    window.localStorage.setItem("currentRecord",JSON.stringify(record))
    this.$store.commit("getCurrentRecord")
    this.$router.push("/update")
  }
}
</script>

<style lang="scss" scoped>
.records-wrap {
  height: 70vh;
  overflow: auto;
  width: 100%;
  > .recordItems {
    .content {
      > .content-top {
        background-color: #e9e9e9;
        height: 5vh;
        line-height: 5vh;
      }
      > .content-bottom{
        height: 8vh;
        border-bottom: 1px solid 	#F5F5F5;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        .tag{
          margin-left: 8px;
        }
        .note{
          position: absolute;
          font-size: 0.8em;
          margin-left: 15px;
          left: 0;
          bottom: 0;
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