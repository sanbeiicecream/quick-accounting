import Vue from 'vue'
import Vuex from 'vuex'
import {State, Tag} from '@/custom';
Vue.use(Vuex)
const state: State = {
  payOrIncome: "pay",
  isAdd: "no",
  tagList: [],
  recordList: []
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
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store