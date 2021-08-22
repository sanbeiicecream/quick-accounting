<template>
  <div class="type-items-wrap">
    <ol v-if="$store.state.payOrIncome === 'pay' && $store.state.isAdd === 'no' && this.isEdit === false" class="type-items">
      <li v-for="item in tagList" :key="item.id" :data-id="item.id" @touchstart.prevent="selectOrEdit" @mousedown.prevent="selectOrEdit"
          @touchend.prevent="end" @mouseup.prevent="end">{{ item.name }}
      </li>
      <li v-if="$store.state.selectedTagIds.length === 0" class="add" @click="add">
        <icon name="addTags"/>
      </li>
    </ol>
    <ol v-if="$store.state.payOrIncome === 'income' && $store.state.isAdd === 'no' && this.isEdit === false" class="type-items">
      <li v-for="item in tagList" :key="item.id" :data-id="item.id" @touchstart.prevent="selectOrEdit" @mousedown.prevent="selectOrEdit"
          @touchend.prevent="end" @mouseup.prevent="end">{{ item.name }}</li>
      <li v-if="$store.state.selectedTagIds.length === 0" class="add" @click="add">
        <icon name="addTags"/>
      </li>
    </ol>
    <Tags :edit-id.sync="editId" :is-edit.sync="isEdit" :placeholder="placeholder" :left-button-content="leftButtonContent" :right-button-content="rightButtonContent" :edit-value="editValue" v-if="$store.state.isAdd === 'is' || this.isEdit"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tags from '@/components/money/Tags.vue';
import {Toast} from 'vant';
import {createId} from '@/lib/createId';

@Component({
  components: {Tags}
})
export default class AddType extends Vue {
  editId = '';
  timer = -1;
  placeholder = ""
  selectType = ""
  isLongDown = false;
  isEdit = false
  leftButtonContent = ""
  rightButtonContent = ""
  editValue = ""

  created() {
    this.$store.commit('fetchTags');
    if (this.$store.state.tagList.length === 0){
      this.$store.commit("saveTag",{id:createId(),name:'衣',type:'-'})
      this.$store.commit("saveTag",{id:createId(),name:'食',type:'-'})
      this.$store.commit("saveTag",{id:createId(),name:'住',type:'-'})
      this.$store.commit("saveTag",{id:createId(),name:'行',type:'-'})
      this.$store.commit("saveTag",{id:createId(),name:'工资',type:'+'})
    }
  }

  get tagList() {
    if (this.$store.state.payOrIncome === 'pay') {
      return this.$store.state.tagList.filter((item: { type: string; }) => item.type === '-');
    } else {
      return this.$store.state.tagList.filter((item: { type: string; }) => item.type === '+');
    }
  }

  add() {
    this.$store.state.isAdd = 'is';
    this.placeholder = "标签名"
    this.leftButtonContent = "取消"
    this.rightButtonContent = "添加"
    this.editValue = ""
  }

  selectOrEdit(event: MouseEvent) {
    if (this.$store.state.selectedTagIds.length === 0){
      this.timer = setTimeout(() => {
        this.isLongDown = true;
        this.edit(event);
      }, 1000);
      console.log(this.timer)
    }
  }
  end(event: MouseEvent) {
    if (!this.isLongDown) {
      clearTimeout(this.timer);
      this.select(event);
    }
    this.timer = -1;
    this.isLongDown = false;
  }

  edit(event: MouseEvent) {
    this.isEdit = true
    this.editId = (event.target as HTMLOListElement).dataset.id || ""
    this.placeholder = "修改后的标签名"
    this.leftButtonContent = "删除"
    this.rightButtonContent = "更新"
    this.editValue = (event.target as HTMLOListElement).textContent || ""
    this.timer = -1;
    this.isLongDown = false;
  }

  select(event: MouseEvent) {
    let liNode = event.target as HTMLOListElement;
    if (liNode.className === 'selected') {
      liNode.classList.remove('selected');
      this.$store.state.selectedTagIds = this.$store.state.selectedTagIds.filter(function (item: string){return item !== liNode.dataset.id;})
      } else {
      if (this.$store.state.selectedTagIds.length >= 3){
        Toast("只能添加3个标签呢！")
        return;
      }
      liNode.classList.add('selected');
      this.$store.state.selectedTagIds.push(liNode.dataset.id + '');
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.type-items-wrap {
  $font-size: 1.2em;
  overflow: auto;
  > .type-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: start;
    > li {
      display: block;
      font-size: $font-size;
      border-radius: 10px;
      background-color: transparent;
      width: 20%;
      margin-left: 4%;
      padding: 8px 0 8px 0;
      margin-bottom: 8px;
      text-align: center;
      word-break: break-all;
      user-select: none;
    }

    > .add {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    > .selected {
      background-color: #DCDCDC;
    }
  }
}
</style>