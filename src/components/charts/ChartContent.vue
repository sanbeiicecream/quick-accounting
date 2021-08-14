<template>
  <div class="wrapper">
    <div class="eChart" ref="eChart"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import echarts,{EChartOption,ECharts} from 'echarts';
@Component
export default class ChartContent extends Vue {
  mounted(){
    let chart: ECharts = echarts.init(this.$refs.eChart as HTMLDivElement)
    let option: EChartOption = {
      grid: {
        left: 0,
        right: 0,
      },
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {
        show:true,
        triggerOn: 'click',
        position: 'top',
        formatter: '{c}'
      },
      xAxis: {
        data: [
            '13', '13', '13', '13', '13', '13',
          '13', '13', '13', '13', '13', '13',
          '13', '13', '13', '13', '13', '13',
          '13', '13', '13', '13', '13', '13',
          '13', '13', '13', '13', '13', '13',
        ]
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [{
        symbolSize: 12,
        name: '销量',
        type: 'line',
        itemStyle:{
          borderWidth: 1, color: '#666',borderColor: '#666'
        },
        data: [5, 20, 36, 10, 10, 20]
      }]
    }
    chart.setOption(option)
  }


}
</script>

<style lang="scss" scoped>
  .wrapper{
    margin-top: 10px;
    width: 100vw;
    overflow: auto;
    &::-webkit-scrollbar{
      display: none;
    }
    > .eChart{
       width: 430%;
       min-height: 400px;
     }
  }
</style>