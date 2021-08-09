<template>
  <div class="type-items-wrap">
    <ol v-if="$store.state.payOrIncome === 'pay' && $store.state.isAdd === 'no' && this.isEdit === false" class="type-items">
      <li v-for="item in tagList" :key="item.id" :data-id="item.id" @touchstart.prevent="selectOrEdit"
          @touchend.prevent="end">{{ item.name }}
      </li>
      <li v-if="selectedItemIds.length === 0" class="add" @click="add">
        <icon name="addTags"/>
      </li>
    </ol>
    <ol v-if="$store.state.payOrIncome === 'income' && $store.state.isAdd === 'no' && this.isEdit === false" class="type-items">
      <li v-for="item in tagList" :key="item.id" :data-id="item.id" @touchstart.prevent="selectOrEdit"
          @touchend.prevent="end">{{ item.name }}</li>
      <li v-if="selectedItemIds.length === 0" class="add" @click="add">
        <icon name="addTags"/>
      </li>
    </ol>
    <Tags :edit-id.sync="editId" :is-edit.sync="isEdit" :placeholder="placeholder" :left-button-content="leftButtonContent" :right-button-content="rightButtonContent" v-if="$store.state.isAdd === 'is' || this.isEdit"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import AddTags from '@/components/money/AddTag.vue';
import Tags from '@/components/money/Tags.vue';

@Component({
  components: {Tags, AddTags}
})
export default class AddType extends Vue {
  selectedItemIds: string[] = [];
  editId = '';
  timer = -1;
  placeholder = ""
  selectType = ""
  isLongDown = false;
  isEdit = false
  leftButtonContent = ""
  rightButtonContent = ""

  created() {
    this.$store.commit('fetchTags');
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
    this.placeholder = "请输入需要添加的标签名"
    this.leftButtonContent = "取消"
    this.rightButtonContent = "添加"
  }

  selectOrEdit(event: MouseEvent) {
    if (this.selectedItemIds.length === 0){
      this.timer = setTimeout(() => {
        this.isLongDown = true;
        this.edit(event);
      }, 500);
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
    this.placeholder = "请输入修改后的标签名"
    this.leftButtonContent = "删除"
    this.rightButtonContent = "更新"
  }

  select(event: MouseEvent) {
    let liNode = event.target as HTMLOListElement;
    if (liNode.className === 'selected') {
      liNode.classList.remove('selected');
      this.selectedItemIds = this.selectedItemIds.filter(item => item !== liNode.dataset.id);
    } else {
      liNode.classList.add('selected');
      this.selectedItemIds.push(liNode.dataset.id + '');
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.type-items-wrap {
  $font-size: 18px;
  overflow: auto;

  > .type-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;

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
      align-self: baseline;
      user-select: none;
    }

    > .add {
      display: flex;
      justify-content: center;
      align-items: center;

      > .icon {
        width: $font-size;
        height: $font-size;
      }
    }

    > .selected {
      background-color: #DCDCDC;
    }
  }
}
</style>