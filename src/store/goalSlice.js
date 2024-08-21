
import { createSlice } from "@reduxjs/toolkit"
import getStartOfPeriod from "../functions/GetStartOfPeriod/GetStartOfPeriod"

import presetHabitsLibrary from "../jsonData/Habits/presetHabitsLibrary.json"

import gameData from "../jsonData/GameData/GameData.json"
import { RandomKeyGenerator } from "../functions/RandomKeyGenerator/RandomKeyGenerator"

const initialState ={
  userData: {
    "username": -1,
    "password": -1,
    "uId": RandomKeyGenerator(12),
    "friends": []
  },
  data: [],
  historyHabits: [],
  currentTime: 0,
  newcurrentData: 0,
  habitsTags: [
    {
      id: "2k1mLK21mk",
      title: "Мало времени",
      color: "#F75D64",
      automated: true
    },
    {
      id: "3a1msK23ma",
      title: "В процессе",
      color: "#877DF5",
      automated: true
    },
    {
      id: "Asl21Ks3la",
      title: "Здоровье",
      color: "#71C752",
      automated: false

    },
    {
      id: "dad42a1sL2",
      title: "Задания",
      color: "#0096C8",
      automated: true

    },
    {
      id: "fmcp23AdSW",
      title: "Спорт",
      color: "#2DC3D1",
      automated: false
    },
    {
      id: "fmDp21AdSW",
      title: "Досуг",
      color: "#2DC3D1",
      automated: false
    },
    {
      id: "jlkJj21jJ2",
      title: "Спонсоры",
      color: "#FF1818",
      automated: true
    },
    {
      id: "Dms23kmkLN",
      title: "Время вышло",
      color: "#ffffff",
      automated: true
    },
    {
      id: "Ndl188UhdS",
      title: "Без тега",
      color: "#ffffff",
      automated: true
    },
    {
      id: "1111111111",
      title: "От Sam",
      color: "#ffffff",
      automated: true
    },
  ],
  presetHabitsLibrary: presetHabitsLibrary,
  gameData: {
    data: gameData,
    doneHabits: 0,
    passed: 0,
    lvl: -1,
    xp: 0,
    coin: 0,
    startedTime: -1,
    progressTimeLine: [],
    lvlMaxVal: [100, 200, 300, 450, 600, 800, 1010],
    shop: {
      passTikets: 0,
    }
  },
}


const goalSlice = createSlice({
  name: "goal",
  initialState: initialState,
  reducers: {
    addFriend: (state, action) => {
      state.userData.friends = [...state.userData.friends, action.payload]
    },
    saveGoalData: (state, action) => {
      state.data.unshift(action.payload)
    },
    addTiketPass: (state, action) =>{
      state.gameData.coin -= action.payload
      state.gameData.shop.passTikets +=1
    },
    removeTiketPass: (state) =>{
      state.gameData.shop.passTikets -=1
      
    },
    changeHabitDone: (state, action) => {
      const id = action.payload
      const dataIndex = state.data.findIndex((item) => item.id === id)
      if (dataIndex !== -1) {
        state.data[dataIndex].done = !state.data[dataIndex].done
        if (state.data[dataIndex].bonuses){
          const dataAddTimeLineGame = {
            "type": "habitEnd",
            "time": state.currentTime,
            "xp": state.data[dataIndex].bonuses.xp,
            "coin": state.data[dataIndex].bonuses.coin,
            "lvl": state.data[dataIndex].bonuses.lvl
          }

          state.gameData.xp += state.data[dataIndex].bonuses.xp
          state.gameData.coin = parseInt(state.gameData.coin) + parseInt(state.data[dataIndex].bonuses.money)
          state.gameData.progressTimeLine = [...state.gameData.progressTimeLine, dataAddTimeLineGame]
          if (state.gameData.xp >= state.gameData.lvlMaxVal[state.gameData.lvl-1]){
            state.gameData.lvl += 1
            state.gameData.doneHabits += 1
          }
        }

        const dataAddProgress = {
          "type": "change",
          "time": state.currentTime,
          "done": state.data[dataIndex].done,
          "progress": parseInt(state.data[dataIndex].progress)
        }
        state.data[dataIndex].progressTimeLine = [...state.data[dataIndex].progressTimeLine, dataAddProgress]

      }
    },
    changeHabitProgress: (state, action) => {
      const data = action.payload

      const dataIndex = state.data.findIndex((item) => item.id === data.id)
      if (dataIndex !== -1) {
        if (state.data[dataIndex].progress === undefined) {
          state.data[dataIndex].progress = state.data[dataIndex].taskParam.numFrom !== undefined ? state.data[dataIndex].taskParam.numFrom : 0
        }
        state.data[dataIndex].progress = parseInt(state.data[dataIndex].progress) + parseInt(data.delta)
        state.data[dataIndex].done = state.data[dataIndex].progress >= state.data[dataIndex].taskParam.numTo
        const dataAddProgress = {
          "type": "change",
          "time": state.currentTime,
          "done": state.data[dataIndex].done,
          "progress": parseInt(state.data[dataIndex].progress)
        }
        state.data[dataIndex].progressTimeLine = [...state.data[dataIndex].progressTimeLine, dataAddProgress]

      } 
    },
    changeGoalData: (state, action) => {
      const { id, newData } = action.payload
      const dataIndex = state.data.findIndex((item) => item.id === id)
      if (dataIndex !== -1) {
        state.data[dataIndex] = { ...state.data[dataIndex], ...newData }
      }
    },
    addNewTagToHabit: (state, action) => {
      const { id, newData } = action.payload
      const dataIndex = state.data.findIndex((item) => item.id === id)
      if (dataIndex !== -1) {
        state.data[dataIndex].tagsId = [newData, ...state.data[dataIndex].tagsId]
      }
    },
    createNewTag: (state, action) => {
      state.habitsTags = [...state.habitsTags, action.payload]
    },
    removeTag: (state, action) => {
      state.habitsTags = state.habitsTags.filter( i => i.id !== action.payload)
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload
    },

    updateTimeDaltaHabitAfterEnd: (state, action) => {
      const { id, newTime } = action.payload
      const dataIndex = state.data.findIndex((item) => item.id === id)
      if (dataIndex !== -1) {
        state.data[dataIndex].time.periodStart = new Date(getStartOfPeriod(state.data[dataIndex].time.type, newTime)).getTime()/1000
        state.data[dataIndex].time.endTime = newTime + state.data[dataIndex].time.totalTime
        state.data[dataIndex].tagsId = state.data[dataIndex].tagsId.filter((item) => item !== "2k1mLK21mk")
        state.data[dataIndex].progress = state.data[dataIndex].taskParam.numFrom
        state.data[dataIndex].done = false
        const newTimeLineVal = {
          "type": "newTimePart",
          "time": state.currentTime,
          "done": false,
          "progress": parseInt(state.data[dataIndex].progress)
        }
        state.data[dataIndex].progressTimeLine = [...state.data[dataIndex].progressTimeLine, newTimeLineVal]
      }
    },
    deleteHabit: (state, action) => {
      const { deletId, dellData } = action.payload

      state.historyHabits = [dellData, ...state.historyHabits]
      state.data = state.data.filter((item) => !deletId.includes(item.id))
    },
    newDateChange: (state, action) => {
      state.newcurrentData = action.payload
    },
    startGame: (state) => {
      state.gameData.lvl = 1
    },
    registerUser: (state, action) => {
      const {username, password} = action.payload
      state.userData.username = username 
      state.userData.password = password
    },

    exitUser: (state) => {
      state.userData.username = -2
      state.userData.password = -2
      state.userData.uId = RandomKeyGenerator(12)
    },

    resetState: () => initialState,
    setUniqId: (state) => {
      state.userData.uId = RandomKeyGenerator(12)
    },
    updateStore: (state, action) => state = action.payload,
    
    startGameLvlItem: (state, action) => {
      state.gameData.data.libraryLvls[action.payload].started = true
    },
    updateLvl: (state) =>{
      state.gameData.lvl += 1  
    },
    passedInGame: (state) =>{
      state.gameData.passed += 1
      state.gameData.shop.passTikets -= 1
    },

  }
})

export const {removeTag, createNewTag, addFriend, removeTiketPass, addTiketPass, passedInGame, updateLvl, startGameLvlItem, updateStore, saveGoalData, changeHabitDone, changeGoalData, changeHabitProgress, setCurrentTime, addNewTagToHabit, updateTimeDaltaHabitAfterEnd, deleteHabit, newDateChange, startGame, registerUser, exitUser, resetState, setUniqId} = goalSlice.actions
export const selectGoalData = (state) => state.goal.data

export default goalSlice.reducer
