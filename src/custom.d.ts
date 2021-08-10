export interface State  {
  selectedTagIds: string[]
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
export type RecordItem = {
  tags: Tag[]
  notes: string
  amount: string
  createdAt: string
}