import { configureStore } from "@reduxjs/toolkit"
import goalReducer from "./goalSlice"

export default configureStore({
  reducer: {
    goal: goalReducer,
  },
})
