import Vue from 'vue'
import Vuex from 'vuex'
import {RecordItem, State, Tag} from '@/custom';
import {getRecordHash} from '@/lib/getRecordHash';
Vue.use(Vuex)
const state: State = {
  currentMonth: "",
  selectedTagIds: [],
  payOrIncome: "pay",
  isAdd: "no",
  tagList: [],
  recordList: [],
  recordListHash: [],
  currentRecord: {tags:[],notes:"",amount:"",createdAt:"",type:""}
}
const store =  new Vuex.Store({
  state,
  mutations: {
    fetchTags(state): void{
      state.tagList = JSON.parse(window.localStorage.getItem("tagList") || "")
    },
    saveTag(state,payload: Tag): void{
      state.tagList.push(payload)
      window.localStorage.setItem("tagList",JSON.stringify(state.tagList))
      store.commit("fetchTags")
    },
    updateTag(state,payload: Tag): void{
      const index = state.tagList.findIndex(item => item.id === payload.id)
      if (index !== -1){
        state.tagList.splice(index,1,payload)
        window.localStorage.setItem("tagList",JSON.stringify(state.tagList))
      }
    },
    removeTag(state, payload: string){
      if (payload){
        window.localStorage.setItem("tagList",JSON.stringify(state.tagList.filter(item => item.id !== payload)))
        store.commit("fetchTags")
      }
    },
    fetchRecordList(state){
      state.recordList = JSON.parse(window.localStorage.getItem("recordList") || "")
    },
    saveRecord(state,payload: RecordItem){
      state.recordList.push(payload)
      window.localStorage.setItem("recordList",JSON.stringify(state.recordList))
      store.commit("fetchRecordList")
      state.selectedTagIds = []
      store.commit("getRecordListHash")
    },
    getRecordListHash(state){
      state.recordListHash = getRecordHash(state.recordList)
    }

  },
  actions: {
  },
  modules: {
  }
})

export default store