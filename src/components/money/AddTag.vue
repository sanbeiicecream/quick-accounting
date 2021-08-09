<template>
  <div>
    <div class="add-window">
      <label><input type="text" v-model="value" placeholder="请输入标签名" @input="isExceed"/></label>
      <div class="button-wrap">
        <button class="cancel" @click="cancel">取消</button>
        <button class="add" @click="add">添加</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {createId} from '@/lib/createId';

@Component
export default class AddTags extends Vue {
  value = ""
  isExceed(){
    if (this.value.length >= 15){
      this.value = this.value.slice(0,15)
    }
  }
  cancel(){
    this.$store.state.isAdd = "no"
  }
  add(){
   if (this.value !== ""){
     let type: string
     if (this.$store.state.payOrIncome === "pay"){
       type = "-"
     }else {
       type = "+"
     }
     this.$store.commit("saveTag",{id: createId() + "",name: this.value,type: type})
     this.$store.state.isAdd = "no"
   }
  }

}
</script>

<style lang="scss" scoped>
  .add-window{
    margin: 10px auto;
    > label{
      display: block;
      padding: 20px 50px;
      font-size: 1em;
    }
    > .button-wrap{
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 1.1em;
    }
  }
</style>