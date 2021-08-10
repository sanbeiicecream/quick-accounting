<template>
  <div class="container-wrap" ref="container">
    <label class="note">
      <span>备注：</span><input type="text" v-model="noteValue" @input.prevent="addNote">
    </label>
    <label class="amount">
      <span>金额：</span><input v-bind:value="value" onfocus="this.blur()" type="text">
    </label>
    <button @click="inputContent">1</button>
    <button @click="inputContent">2</button>
    <button @click="inputContent">3</button>
    <button @click="calculate('+')">+</button>
    <button @click="clear">清除</button>
    <button @click="inputContent">4</button>
    <button @click="inputContent">5</button>
    <button @click="inputContent">6</button>
    <button @click="calculate('-')">-</button>
    <button @click="clearAll">清空</button>
    <button @click="inputContent">7</button>
    <button @click="inputContent">8</button>
    <button @click="inputContent">9</button>
    <button @click="calculate('×')">×</button>
    <button class="ok" @click="ok" ref="ok">完成</button>
    <button @click="inputContent">0</button>
    <button @click="inputContent">.</button>
    <button class="date" @click="isVisible = true">{{createAt}}</button>
    <button @click="calculate('÷')">÷</button>
    <simple-calendar :is-visible.sync="isVisible" v-if="isVisible"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import SimpleCalendar from '@/components/money/SimpleCalendar.vue';
import {Toast} from 'vant';
import {RecordItem, Tag} from '@/custom';
import {Dayjs} from 'dayjs';
Vue.use(Toast);
@Component({
  components: {SimpleCalendar}
})
export default class NumberPad extends Vue {
  value = '0';
  noteValue = '';
  isVisible = false
  createAt = "今天"
  inputContent(event: MouseEvent) {
    let inputNode = event.target as HTMLButtonElement;
    let input = inputNode.textContent || '';
    let matchArray = this.value.match(/[0-9,.]*/g) || [];
    inputNode.classList.add('clickStyle');
    setTimeout(() => {
      inputNode.classList.remove('clickStyle');
    }, 100);

    if (matchArray.length > 0) {
      let temArray = matchArray.filter((item) => {
        return item.length > 0;
      });
      if (temArray.length === 1 && "+-×÷".indexOf(this.value.charAt(this.value.length - 1)) === -1 ) {
        if (temArray[0].length >= 8) {
          return;
        }
      } else if (temArray.length === 2) {
        if (temArray[0].length >= 8 && temArray[1].length >= 8) {
          return;
        }
      }
    }
    if (this.value === '0') {
      if (input === '.') {
        this.value += input;
      } else {
        this.value = input;
      }
    } else if (input === '.') {
      if (this.value.slice(0, -1) === '.') {
        return;
      } else if ('+-×÷'.indexOf(this.value.charAt(this.value.length - 1)) >= 0) {
        this.value += '0.';
      } else if (this.value.indexOf('.') === -1) {
        this.value += input;
      }
    } else if (input === '0') {
      if ('+-×÷'.indexOf(this.value.charAt(this.value.length - 1)) >= 0) {
        this.value += input;
      } else if (this.value.length > 0) {
        this.value += input;
      }
    } else {
      if (this.value.indexOf('+') >= 0 || this.value.indexOf('-') >= 0 || this.value.indexOf('×') >= 0 || this.value.indexOf('÷') >= 0) {
        (this.$refs.ok as HTMLButtonElement).textContent = '=';
        this.value += input;
      } else {
        this.value += input;
      }
    }

  }

  clear() {
    if (this.value !== '0') {
      this.value = this.value.slice(0, -1);
      if (this.value === '') {
        this.value = '0';
      } else if ('+-×÷'.indexOf(this.value.charAt(this.value.length - 1)) >= 0) {
        (this.$refs.ok as HTMLButtonElement).textContent = '完成';
      }
    }
  }

  addNote() {
    console.log('xx');
  }

  clearAll() {
    this.value = '0';
    (this.$refs.ok as HTMLButtonElement).textContent = '完成';
  }

  mounted() {
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    let container = this.$refs.container as HTMLDivElement;
    //Android
    if (isAndroid) {
      //获取原窗口的高度
      let originalHeight = document.documentElement.clientHeight || document.body.clientHeight;
      window.onresize = function () {
        let resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
        if (resizeHeight < originalHeight) {
          //当软键盘弹起，在此处操作
          container.style.marginBottom = '-200px';
        } else {
          //当软键盘收起，在此处操作
          container.style.marginBottom = '0';
        }
      };
    }
    if (isiOS) {
      document.body.addEventListener('focusin', () => {
        //软键盘弹出的事件处理
        //this.show_bo = false;
      });
      document.body.addEventListener('focusout', () => {
        //软键盘收起的事件处理
        //this.show_bo = true;
      });
    }
  }

  calculate(type: string) {
    let temValue = this.value;
    if (this.value.indexOf('+') >= 0 || this.value.indexOf('-') >= 0 || this.value.indexOf('×') >= 0 || this.value.indexOf('÷') >= 0) {
      if ('+-×÷'.indexOf(this.value.charAt(this.value.length - 1)) >= 0) {
        this.value = this.value.substr(0, this.value.length - 1) + type;
        return;
      }
      if (this.value.charAt(0) === '-') {
        temValue = this.value.substr(1, this.value.length - 1);
      }
      if (temValue.split('+').length === 2) {
        this.value = parseFloat(this.value.split('+')[0]) + parseFloat(this.value.split('+')[1]) + type;
      } else if (temValue.split('-').length === 2) {
        this.value = parseFloat(this.value.split('-')[0]) - parseFloat(this.value.split('-')[1]) + type;
      } else if (temValue.split('×').length === 2) {
        this.value = parseFloat(this.value.split('×')[0]) * parseFloat(this.value.split('×')[1]) + type;
      } else if (temValue.split('÷').length === 2) {
        this.value = parseFloat(this.value.split('÷')[0]) / parseFloat(this.value.split('÷')[1]) + type;
      } else {
        this.value += type;
      }
      if (this.value.slice(0, -1).split('.').length > 1) {
        if (this.value.slice(0, -1).split('.')[1].length > 2) {
          this.value = parseFloat(this.value.slice(0, -1)).toFixed(2) + type;
        }
      }
    } else {
      this.value += type;
    }
  }

  ok() {
    let isMinus = false;
    if ('+-×÷'.indexOf(this.value.charAt(this.value.length - 1)) >= 0) {
      this.value = this.value.slice(0, -1);
      return;
    } else if (this.value.charAt(0) === '-') {
      isMinus = true;
      this.value = this.value.slice(1, this.value.length);
    }
    if (this.value.indexOf('+') >= 0 || this.value.indexOf('-') >= 0 || this.value.indexOf('×') >= 0 || this.value.indexOf('÷') >= 0) {
      let temValue = 0;
      if (this.value.split('+').length === 2) {
        temValue = parseFloat(this.value.split('+')[0]) + parseFloat(this.value.split('+')[1]);
      } else if (this.value.split('-').length === 2) {
        if (isMinus) {
          temValue = (0 - parseFloat(this.value.split('-')[0])) - parseFloat(this.value.split('-')[1]);
        } else {
          temValue = parseFloat(this.value.split('-')[0]) - parseFloat(this.value.split('-')[1]);
        }
      } else if (this.value.split('×').length === 2) {
        temValue = parseFloat(this.value.split('×')[0]) * parseFloat(this.value.split('×')[1]);
      } else {
        temValue = parseFloat(this.value.split('÷')[0]) / parseFloat(this.value.split('÷')[1]);
      }
      if ((temValue + '').split('.').length > 1) {
        if ((temValue + '').split('.')[1].length > 2) {
          temValue = parseFloat(temValue.toFixed(2));
        }
      }
      this.value = temValue + '';
    } else {
      if (this.$store.state.selectedTagIds.length > 0){
        let currentRecord: RecordItem = {tags: [], notes:"",amount:"",createdAt:""}
        this.$store.state.selectedTagIds.forEach((item: string) => {
          let currentTag = this.$store.state.tagList.find(((item1: Tag) => item1.id === item))
          if (currentTag){
            currentRecord.tags.push(currentTag)
          }
        })
        currentRecord.amount = this.value
        currentRecord.notes = this.noteValue
        if (this.createAt === "今天"){
          currentRecord.createdAt = new Date().toISOString()
        }else {
          currentRecord.createdAt = new Dayjs(this.createAt).toISOString()
        }
        this.$store.commit("saveRecord", currentRecord)
        this.$router.push({path:"/statistics"})
        Toast.success({message: "保存成功",duration: 1000})
      }else {
        Toast("请选择至少一个标签")
      }
    }
    (this.$refs.ok as HTMLButtonElement).textContent = '完成';
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.container-wrap {
  @extend %clearFix;
  float: left;
  font-weight: bold;
  $height: 70px;
  > label {
    font-size: 15px;
    display: inline-block;
    width: 50%;
    vertical-align: bottom;
    border-top: 1px solid #D3D3D3;
    font-family: Consolas, monospace;
    &:nth-child(1) {
      border-right: 1px solid #D3D3D3;
    }

    > input {
      width: 60%;
    }

    > span {
      padding-left: 5px;
    }
  }

  > button {
    height: $height;
    width: 20%;
    &.date{
      font-size: 13px;
    }
    &:nth-child(3) {
      border-bottom: 1px solid #D3D3D3;
      border-top: 1px solid #D3D3D3;
    }

    &:nth-child(4) {
      border-bottom: 1px solid #D3D3D3;
      border-left: 1px solid #D3D3D3;
      border-top: 1px solid #D3D3D3;
    }

    &:nth-child(5) {
      border-bottom: 1px solid #D3D3D3;
      border-left: 1px solid #D3D3D3;
      border-top: 1px solid #D3D3D3;
    }

    &:nth-child(6) {
      border-bottom: 1px solid #D3D3D3;
      border-left: 1px solid #D3D3D3;
      border-top: 1px solid #D3D3D3;
    }

    &:nth-child(7) {
      border-bottom: 1px solid #D3D3D3;
      border-left: 1px solid #D3D3D3;
      border-top: 1px solid #D3D3D3;
    }

    &:nth-child(8) {
      border-bottom: 1px solid #D3D3D3;
    }

    &:nth-child(9) {
      border-bottom: 1px solid #D3D3D3;
      border-left: 1px solid #D3D3D3;
    }

    &:nth-child(10) {
      border-bottom: 1px solid #D3D3D3;
      border-left: 1px solid #D3D3D3;
    }

    &:nth-child(11) {
      border-bottom: 1px solid #D3D3D3;
      border-left: 1px solid #D3D3D3;
    }

    &:nth-child(12) {
      border-bottom: 1px solid #D3D3D3;
      border-left: 1px solid #D3D3D3;
    }

    &:nth-child(13) {
      border-bottom: 1px solid #D3D3D3;
    }

    &:nth-child(14) {
      border-bottom: 1px solid #D3D3D3;
      border-left: 1px solid #D3D3D3;
    }

    &:nth-child(15) {
      border-bottom: 1px solid #D3D3D3;
      border-left: 1px solid #D3D3D3;
    }

    &:nth-child(16) {
      border-bottom: 1px solid #D3D3D3;
      border-left: 1px solid #D3D3D3;
    }

    &.ok {
      float: right;
      border-left: 1px solid #D3D3D3;
    }

    &:nth-child(17) {
      height: 2*$height;
    }

    &:nth-child(18) {
    }

    &:nth-child(19) {
      border-left: 1px solid #D3D3D3;
    }

    &:nth-child(20) {
      border-left: 1px solid #D3D3D3;
    }

    &:nth-child(21) {
      border-left: 1px solid #D3D3D3;
    }
  }

}

</style>