export interface State  {
  currentMonth: string
  selectedTagIds: string[]
  payOrIncome: string
  isAdd: string,
  tagList: Tag[]
  recordList: RecordItem[]
  recordListHash: RecordHash[]
}
export type Tag = {
  id: string
  name: string
  type: string
}
export type RecordItem = {
  tags: Tag[]
  notes: string
  amount: string
  createdAt: string
  type: string
}
type RecordHash = {
  recordList?:RecordItem[],
  total?:string,
  pay?: string,
  income?: string
}