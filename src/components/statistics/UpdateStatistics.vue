<template>
  <div class="content-wrap" ref="container">
    <div class="top">
      <Icon class="icon" name="return1" @click.native="goBack"/>
      <span>详情</span>
    </div>
    <div class="content">
      <van-cell-group>

        <van-cell is-link title="收入类型" @click="showActionSheet = true" :value="tagType" />
        <van-action-sheet v-model="showActionSheet" :actions="actions" @select="onSelect"/>
        <van-cell title="标签" @click="showPopup" closeable >{{ currentTagNames }}</van-cell>
        <van-popup
            v-model="show"
            closeable
            position="bottom"
            :style="{ height: '30%' }"
        >
          <van-checkbox-group v-model="selectResult" direction="horizontal" :max="3" @change="onChange">
            <van-checkbox v-for="(tag,index) in tagList" :key="index" :name="tag.id" shape="square">{{tag.name}}</van-checkbox>
          </van-checkbox-group>
        </van-popup>


        <van-field v-model="amount" label="金额" type="number" placeholder="请输入金额" @input="inputAmount"/>
<!--        <van-field v-model="createdAt" label="日期" placeholder="请选择日期" />-->
        <van-cell title="日期" :value="displayDate" @click="showCalendar = true" />
        <van-calendar v-model="showCalendar" @confirm="onConfirm" :min-date="minDate" :max-date="maxDate"/>
        <van-field v-model="notes" @input="inputNote" label="备注" placeholder="请输入备注" />
      </van-cell-group>
    </div>
    <div class="bottom">
      <button class="remove" @click="remove">删除</button>
      <button class="update" @click="update">更新</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import {Field, CellGroup, Popup, Cell, Checkbox, CheckboxGroup, Calendar, ActionSheet, Toast} from 'vant';
import {RecordItem, Tag} from '@/custom';
import dayjs from 'dayjs';
Vue.use(Calendar)
@Component(
    {components:{[Field.name]: Field,[CellGroup.name]: CellGroup, [Popup.name]: Popup, [Cell.name]: Cell, [Checkbox.name]: Checkbox, [CheckboxGroup.name]:CheckboxGroup,[ActionSheet.name]: ActionSheet}
    }
)
export default class UpdateStatistics extends Vue {
  show = false
  selectResult: string[] = []
  currentTagNames = ""
  defaultTagIds: string[] = []
  defaultTagType = ""
  tagIncomeList: Tag[] = []
  tagPayList: Tag[] = []
  tagList: Tag[] = []
  minDate = dayjs().startOf("year").toDate()
  maxDate = dayjs().endOf("year").toDate()
  showCalendar = false
  showActionSheet = false
  displayDate = ""
  actions = [{name: '支出'},{name: "收入"}]
  amount = ""
  tagType = ""
  actionItem = ""
  notes = ""
  createAt = ""
  mounted(){
    let div = this.$refs.container as HTMLDivElement
    div.style.height = document.documentElement.clientHeight + "px"
  }
  onSelect(item: {name: string}) {
    this.showActionSheet = false;
    this.tagType = item.name
    if (this.actionItem !== item.name){
      this.selectResult = []
      this.currentTagNames = "无"
    }
    if (item.name === "支出"){
      this.tagList = this.tagPayList
    }else {
      this.tagList = this.tagIncomeList
    }
    this.actionItem = item.name
  }
  showPopup() {
    this.show = true;
  }
  @Watch('$store.state.currentRecord',{immediate: true})
  onInit(){
    let currentRecord = JSON.parse(window.localStorage.getItem("currentRecord") || "")
    if (currentRecord === null){
      return
    }
    this.amount = currentRecord.amount
    this.notes = currentRecord.notes
    this.createAt = currentRecord.createdAt
    this.defaultTagType = currentRecord.tags[0].type
    currentRecord.tags.forEach((item: Tag) =>{
      this.selectResult.push(item.id)
      this.defaultTagIds.push(item.id)
      this.currentTagNames += item.name + " "
    })
    this.$store.commit("fetchTags")
    this.$store.state.tagList.forEach((item: Tag) =>{
      if (item.type === "+"){
        this.tagIncomeList.push(item)
      }else {
        this.tagPayList.push(item)
      }
    })
    if (currentRecord.tags[0].type === '-'){
      this.tagType = "支出"
      this.tagList = this.tagPayList
      this.actionItem = "支出"
    }else {
      this.tagType = "收入"
      this.tagList = this.tagIncomeList
      this.actionItem = "收入"
    }
    this.displayDate = dayjs(currentRecord.createdAt).format("YYYY年M月D日")
  }

  goBack(){
    this.$router.push("/statistics")
  }
  remove(){
    this.$store.commit("removeRecord",this.$store.state.currentRecord)
    this.goBack()
  }
  findTagsById(ids: string[]){
    const selectTags: Tag[] = []
    let tag: Tag | undefined
    ids.forEach((id: string) => {
      tag = this.tagList.find((item: Tag) => item.id === id)
      if (tag !== undefined){
        selectTags.push(tag)
      }
    })
    return selectTags
  }
  update(){
    if (this.currentTagNames === "无"){
      Toast("请选择至少一个标签")
      this.selectResult = this.defaultTagIds
      this.currentTagNames = this.findNameById(this.defaultTagIds)
      if (this.defaultTagType === "-"){
        this.tagType = "支出"
        this.tagList = this.tagPayList
      }else {
        this.tagList = this.tagIncomeList
        this.tagType = "收入"
      }
    }else if (this.amount === ""){
      Toast("必须要有一个值呢！")
    } else {
      const tags = this.findTagsById(this.selectResult)
      let amount = this.amount
      if (parseFloat(this.amount) < 0){
        amount = amount.slice(1)
      }
      const record: RecordItem = {tags:tags,notes: this.notes,amount: amount,createdAt: this.createAt,type: ""}
      if (this.tagType === "支出"){
        record.type = "-"
      }else {
        record.type = "+"
      }
      this.$store.commit("updateRecord",record)
      this.$router.push("/statistics")
      Toast("更新成功")
    }
  }
  findNameById(ids: string[]){
    let name = ""
    let tag: Tag | undefined
    ids.forEach((id: string) => {
      tag = this.$store.state.tagList.find((item: Tag) => item.id === id)
      if (tag !== undefined){
        name += tag.name + ' '
      }
    })
    return name;
  }
  onChange(){
    if (this.selectResult.length === 0){
      this.currentTagNames = "无"
    }else {
      this.currentTagNames = this.findNameById(this.selectResult)
    }
  }
  onConfirm(date: Date) {
    this.showCalendar = false;
    this.displayDate = dayjs(date).format("YYYY年M月D日")
    this.createAt = dayjs(date).toISOString()
  }
  inputNote(){
    if (this.notes.length > 23){
      Toast("备注太多了！")
      this.notes = this.notes.slice(0,23)
    }
  }
  inputAmount(){
    if (this.amount.length > 11){
      Toast("太多的数字了")
      this.amount = this.amount.slice(0,11)
    }else if (this.amount.length >= 2){
      if (this.amount[0] === "0" && this.amount[1] !== "."){
        Toast("格式不太对！")
        this.amount = " 0"
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .content-wrap{
    background-color: #efefef;
    height: 100vh;
    width: 100%;
    position: relative;
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
    > .bottom{
      position: absolute;
      bottom: 0;
      left: 0;
      height: 7vh;
      width: 100%;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      > .remove{
        border-right: 1px solid #D0D0D0;
        flex-grow: 1;
      }
      > .update{
        flex-grow: 1;
      }
    }
  }

</style>