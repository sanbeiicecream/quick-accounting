import {RecordItem} from '@/custom';
import dayjs from 'dayjs';

type Record ={
  date: string
  value:RecordItem[]
}
export function getWeekOrMonthChartDate(type:string,records:Record[],payOrIncome:string){
  const chartData:{keys:string[],values:number[]} = {keys:[],values:[]}
  let index = 0
  let currentRecord: Record | undefined
  if (type === '周'){
    index = 7
  }else {
    index = dayjs().endOf('month').get('date')
  }
  for (let i = 0; i < index; i++) {
    if (type === '周'){
      currentRecord = records.find((item: {date: string,value:RecordItem[]}) => item.date === dayjs().subtract(i,'day').format("YYYY年M月D日"))
      chartData.keys.push(dayjs().subtract(i, 'day').format("M月D日"))
    }else {
      currentRecord = records.find((item: {date: string,value:RecordItem[]}) => item.date === dayjs().startOf("month").add(i, 'day').format("YYYY年M月D日"))
      chartData.keys.push(dayjs().startOf("month").add(i, 'day').format("M月D日"))
    }
    let todayAccount = 0
    if (currentRecord !== undefined) {
      currentRecord.value.forEach((item: RecordItem) => {
        if (item.type === payOrIncome){
          todayAccount += parseFloat(item.amount)
        }
      })
      chartData.values.push(todayAccount)
    } else {
      chartData.values.push(0)
    }
  }
  if (type === '周'){
    chartData.keys = chartData.keys.reverse()
    chartData.values = chartData.values.reverse()
  }
  return chartData
}