<template>
  <div class="content-wrap">
    <div class="top">
      <Icon class="icon" name="return1" @click.native="goBack"/>
      <span>详情</span>
    </div>
    <div class="content">
      <van-cell-group>
        <van-field v-model="tags" label="标签名" placeholder="请输入标签名" />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="amount" label="金额" placeholder="请输入金额" />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="createdAt" label="日期" placeholder="请选择日期" />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="notes" label="备注" placeholder="请输入备注" />
      </van-cell-group>
    </div>
    <div>
      <button></button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {Field,CellGroup} from 'vant';

@Component(
    {components:{[Field.name]: Field,[CellGroup.name]: CellGroup}}
)
export default class UpdateStatistics extends Vue {
  created(){
    this.$store.state.currentRecord = JSON.parse(window.localStorage.getItem("currentRecord"))
  }
  tags = ""
  get notes(){
    return this.$store.state.currentRecord.notes
  }
  get amount(){
    return this.$store.state.currentRecord.amount
  }
  get createdAt(){
    return this.$store.state.currentRecord.createdAt
  }
  goBack(){
    this.$router.push("/statistics")
  }
}
</script>

<style lang="scss" scoped>
  .content-wrap{
    background-color: #efefef;
    height: 100vh;
    width: 100vw;
    > .top{
      display: flex;
      align-items: center;
      height: 7vh;
      background-color: white;
      margin-bottom:  5vh;
     > .icon{
       width: 1em;
       height: 1em;
       margin-left: 5%;
       margin-right: 8%;
      }
    }
  }

</style>