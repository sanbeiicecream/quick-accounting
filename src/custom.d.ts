export interface State  {
  payOrIncome: string
  isAdd: string,
  tagList: Tag[]
  recordList: RecordItem[]
}
export type Tag = {
  id: string
  name: string
  type: string
}
type RecordItem = {
  tags: Tag[]
  notes: string
  type: string
  amount: number // 数据类型 object | string
  createdAt?: string  // 类 / 构造函数
}