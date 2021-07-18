import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const time = parseInt(process.env.VUE_APP_TIME)
const timeBreak = parseInt(process.env.VUE_APP_TIME_BREAK)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sound: 'alarm.mp3',
    list: [],
    finished: [],
    // 開始倒數時，從 list 裡面抓出第一個 name 放入 current(文字)
    // 倒數完後，從 current 丟入 finished 裡面
    current: '',
    timeleft: time,
    isBreak: false,
    // 0 = 停止
    // 1 = 倒數中
    // 2 = 暫停
    status: 0
  },
  mutations: {
    selectSound (state, data) {
      state.sound = data
    },
    addList (state, data) {
      state.list.push({
        name: data,
        edit: false,
        model: data
      })
    },
    // 編輯清單
    editList (state, data) {
      state.list[data].edit = true
    },
    // 確認修改清單
    changeList (state, data) {
      state.list[data].name = state.list[data].model
      state.list[data].edit = false
    },
    // 取消修改清單
    cancelList (state, data) {
      state.list[data].model = state.list[data].name
      state.list[data].edit = false
    },
    // 刪除清單
    delList (state, data) {
      state.list.splice(data, 1)
    },
    start (state, data) {
      if (state.isBreak) {
        state.current = '休息一下'
      } else {
        state.current = state.list.shift().name
      }
    },
    // 改狀態
    changeStatus (state, data) {
      state.status = data
    },
    countdown (state) {
      state.timeleft--
    },
    addFinish (state) {
      // 如果現在不是休息狀態才將目前的current加入(不然'休息一下'也會被加入)
      if (!state.isBreak) {
        // 將完成的事項加入已完成清單
        state.finished.push(state.current)
      }
      // 清空 current
      state.current = ''
      // 判斷待辦清單內還有沒有東西要做再看是否要進休息時間
      if (state.list.length > 0) {
        // 反過來(不是休息時間進休息時間，是休息時間就進工作時間)
        state.isBreak = !state.isBreak
      }
      // if state.isBreak = true = timeBreak else time
      state.timeleft = state.isBreak ? timeBreak : time
    },
    delFinish (state, data) {
      state.finished.splice(data, 1)
    }
  },
  getters: {
    list (state) {
      return state.list
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      key: 'pomodoro'
    })
  ]
})
