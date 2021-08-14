import {RecordItem} from '@/custom';
import dayjs from 'dayjs';
export function getGroupMonthRecordList(monthRecord:RecordItem[]){
  let recordArray: RecordItem[];
  type Record = {
    date: string
    value: RecordItem[]
  };
  const recordList: Record[] = [];
  let record: Record;
  let previousDay = '';
  monthRecord.forEach((item: RecordItem) => {
    const formatDate = dayjs(item.createdAt).format('YYYY年M月D日');
    if (previousDay === formatDate) {
      recordArray.push(item);
      record['date'] = formatDate;
      record['value'] = recordArray;
    } else {
      record = {date:"",value:[]};
      previousDay = formatDate;
      recordArray = [];
      recordArray.push(item);
      record['date'] = formatDate;
      record['value'] = recordArray;
      recordList.push(record);
    }
  });
  return recordList;
}