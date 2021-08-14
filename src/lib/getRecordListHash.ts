import {RecordHash, RecordItem} from '@/custom';
import dayjs from 'dayjs';

export function getRecordListHash(recordList: RecordItem[]){
  const recordListHash: RecordHash[] = []
  const month = [0,1,2,3,4,5,6,7,8,9,10,11]
  month.forEach((monthItem) => {
    const currentRecord =  recordList.filter(item => dayjs(item.createdAt).get("month") === monthItem)
    const currentRecordHash: RecordHash = {recordList: [], total: "", pay: "",income:""}
    currentRecordHash.recordList = currentRecord
    let pay = 0
    let income = 0
    if (currentRecord.length > 0){
      currentRecord.sort((a,b): number => {
        if (dayjs(a.createdAt).isBefore(dayjs(b.createdAt))){
          return -1;
        }else if (dayjs(a.createdAt).isAfter(dayjs(b.createdAt))){
          return 1;
        }else {
          return 0;
        }
      })
      currentRecord.forEach(item => {
        if (item.type === "-"){
          pay += parseFloat(item.amount)
        }else if (item.type === "+"){
          income += parseFloat(item.amount)
        }
      })
      currentRecordHash.total = income - pay + ""
      currentRecordHash.pay = pay + ""
      currentRecordHash.income = income + ""
      recordListHash.push(currentRecordHash)
    }else {
      currentRecordHash.recordList = []
      currentRecordHash.pay = "0"
      currentRecordHash.income = "0"
      currentRecordHash.total = "0"
      recordListHash.push(currentRecordHash)
    }
  })
  return recordListHash
}