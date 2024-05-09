<template>
  <div>
    <van-calendar
      v-model="isShow"
      :min-date="minDate"
      @confirm="onConfirm"
      @close="onClose"
    />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop, Watch } from 'vue-property-decorator'
  import { Calendar, Cell } from 'vant'
  import dayjs from 'dayjs'

  @Component({
    components: {
      [Calendar.name]: Calendar,
      [Cell.name]: Cell,
    },
  })
  export default class SimpleCalendar extends Vue {
    @Prop() isVisible!: boolean
    isShow = false

    @Watch('isVisible', { immediate: true })
    onIsShow(val: boolean) {
      this.isShow = val
    }

    minDate = dayjs(new Date().toISOString()).subtract(3, 'month').toDate()

    onConfirm(date: Date) {
      this.$emit('update:isVisible', false)
      if (dayjs(date).isSame(dayjs(), 'day')) {
        this.$parent.$data.createAt = '今天'
      } else {
        this.$parent.$data.createAt = dayjs(date).format('YYYY-M-D')
      }
    }

    onClose() {
      this.$emit('update:isVisible', false)
    }
  }
</script>
