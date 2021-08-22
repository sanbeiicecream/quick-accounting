<template>
    <div class="add-window">
      <label><input type="text" v-model="value" :placeholder=placeholder @input="isExceed"/></label>
      <div class="button-wrap">
        <button class="cancel" @click="cancelOrRemove" ref="cancelOrRemove">{{ leftButtonContent }}</button>
        <button class="addOrEdit" @click="addOrUpdate" ref="addOrUpdate">{{ rightButtonContent }}</button>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import {createId} from '@/lib/createId';
import {Toast} from 'vant';

@Component
export default class Tags extends Vue {
  @Prop() placeholder?: string;
  @Prop() editId?: string;
  @Prop() leftButtonContent?: string;
  @Prop() rightButtonContent?: string;
  @Prop() isEdit?: boolean;
  @Prop(String) editValue!: string
  value =  this.editValue.trim() || ""

  isExceed() {
    if (this.value.length >= 15) {
      this.value = this.value.slice(0, 15);
    }
  }

  cancel() {
    this.$store.state.isAdd = 'no';
  }

  add() {
    if (this.value !== '') {
      let type: string;
      if (this.$store.state.payOrIncome === 'pay') {
        type = '-';
      } else {
        type = '+';
      }
      this.$store.commit('saveTag', {id: createId() + '', name: this.value, type: type});
      this.$store.state.isAdd = 'no';
    }else {
      Toast({message:"标签名不能为空",duration:1000})
    }
  }

  remove() {
    this.$store.commit('removeTag', this.editId);
    console.log(this.editId)
    this.$store.state.isAdd = 'no';
    this.$emit('update:isEdit', false);
    this.$emit('update:editId', '');
    Toast({message:"删除标签成功",duration:1000})
  }

  update() {
    if (this.value !== '') {
      let type: string;
      if (this.$store.state.payOrIncome === 'pay') {
        type = '-';
      } else {
        type = '+';
      }
      this.$store.commit('updateTag', {id: this.editId + '', name: this.value, type: type});
    }
    this.$emit('update:isEdit', false);
    this.$emit('update:editId', '');
    Toast({message:"更新标签成功",duration:1000})
  }


  addOrUpdate() {
    let node = this.$refs.addOrUpdate as HTMLButtonElement;
    if (node.textContent === '更新') {
      this.update();
    } else {
      this.add();
    }
  }

  cancelOrRemove() {
    let node = this.$refs.cancelOrRemove as HTMLButtonElement;
    if (node.textContent === '取消') {
      this.cancel();
    } else {
      this.remove();
    }

  }
}
</script>

<style lang="scss" scoped>
.add-window {
  margin: 10vh auto;
  width: 70%;
  > label {
    display: block;
    padding: 30px 50px;
    font-size: 1.2em;
  }

  > .button-wrap {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.2em;
  }
}
</style>