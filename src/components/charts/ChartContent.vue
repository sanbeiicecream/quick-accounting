<template>
  <div class="wrapper" ref="wrapper">
    <div class="eChart" ref="eChart"></div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Watch } from 'vue-property-decorator'
  import echarts, { EChartOption, ECharts } from 'echarts'
  import { RecordHash } from '@/custom'
  import { getRecordListHash } from '@/lib/getRecordListHash'
  import { getGroupMonthRecordList } from '@/lib/getGroupMonthRecordList'
  import dayjs from 'dayjs'
  import { getWeekOrMonthChartDate } from '@/lib/getWeekOrMonthChartDate'

  @Component
  export default class ChartContent extends Vue {
    option: EChartOption = {
      grid: {
        left: 0,
        right: 0,
      },
      title: {
        text: '本周',
      },
      tooltip: {
        show: true,
        triggerOn: 'click',
        position: 'top',
        formatter: '{c}',
      },
      xAxis: {
        type: 'category',
        data: [],
        axisTick: { alignWithLabel: true },
        axisLine: { lineStyle: { color: '#666' } },
        axisLabel: {
          interval: 0,
        },
      },
      yAxis: {
        type: 'value',
        show: false,
      },
      series: [
        {
          symbol: 'circle',
          symbolSize: 12,
          type: 'line',
          itemStyle: {
            borderWidth: 1,
            color: '#666',
            borderColor: '#666',
          },
          data: [],
        },
      ],
    }
    chart?: ECharts
    chartData: { keys: string[]; values: number[] } = { keys: [], values: [] }

    @Watch('$store.state.chartPayOrIncome')
    optionInitByPayOrIncome() {
      this.getChartDate()
    }

    @Watch('$store.state.chartOrderByTime')
    optionInitByOrderTime() {
      let order: string = this.$store.state.chartOrderByTime || ''
      let title = order !== '年' ? '本' + order : '今年'
      if (this.chart === undefined) return
      this.chart.setOption({ title: { text: title } })
      let chartNode = this.$refs.eChart as HTMLDivElement
      let wrapNode = this.$refs.wrapper as HTMLDivElement
      if (order === '周' || order === '年') {
        chartNode.style.width = wrapNode.offsetWidth + 'px'
        // console.log(wrapNode.offsetWidth)
      } else {
        chartNode.style.border = 'none'
        chartNode.style.width =
          Math.round(wrapNode.offsetWidth * (4 + 2 / 7)) + 'px'
        ;(this.$refs.wrapper as HTMLDivElement).scrollLeft =
          (chartNode.offsetWidth * dayjs().get('date')) / 30 -
          wrapNode.offsetWidth / 2
      }
      this.getChartDate()
      this.chart.resize()
    }

    mounted() {
      this.chart = echarts.init(this.$refs.eChart as HTMLDivElement)
      this.chart.setOption(this.option)
      this.getChartDate()
    }
    beforeDestroy() {
      this.$store.state.chartOrderByTime = '周'
      this.$store.state.chartPayOrIncome = '支出'
    }

    getChartDate() {
      this.$store.commit('fetchRecordList')
      if (this.$store.state.chartOrderByTime === '年') {
        this.chartData = { keys: [], values: [] }
        let index = 1
        const recordListHash = getRecordListHash(this.$store.state.recordList)
        recordListHash.forEach((item: RecordHash) => {
          this.chartData.keys.push(index + '月')
          if (this.$store.state.chartPayOrIncome === '支出') {
            this.chartData.values.push(parseInt(item.pay))
          } else {
            this.chartData.values.push(parseInt(item.income))
          }
          index++
        })
      } else if (this.$store.state.chartOrderByTime === '周') {
        let groupMonthRecordList = getGroupMonthRecordList(
          this.$store.state.recordListHash[dayjs().get('month')].recordList
        )
        let groupPreviousMonthRecordList = getGroupMonthRecordList(
          this.$store.state.recordListHash[
            dayjs().subtract(1, 'month').get('month')
          ].recordList
        )
        if (this.$store.state.chartPayOrIncome === '支出') {
          this.chartData = getWeekOrMonthChartDate(
            '周',
            [...groupPreviousMonthRecordList, ...groupMonthRecordList],
            '-'
          )
        } else {
          this.chartData = getWeekOrMonthChartDate(
            '周',
            [...groupPreviousMonthRecordList, ...groupMonthRecordList],
            '+'
          )
        }
      } else if (this.$store.state.chartOrderByTime === '月') {
        let groupMonthRecordList = getGroupMonthRecordList(
          this.$store.state.recordListHash[dayjs().get('month')].recordList
        )
        if (this.$store.state.chartPayOrIncome === '支出') {
          this.chartData = getWeekOrMonthChartDate(
            '月',
            groupMonthRecordList,
            '-'
          )
        } else {
          this.chartData = getWeekOrMonthChartDate(
            '月',
            groupMonthRecordList,
            '+'
          )
        }
      }
      let option: EChartOption = {
        xAxis: {
          data: this.chartData.keys,
        },
        series: [
          {
            data: this.chartData.values,
          },
        ],
      }
      this.chart?.setOption(option)
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    margin-top: 10px;
    width: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    > .eChart {
      min-height: 400px;
    }
  }
</style>
