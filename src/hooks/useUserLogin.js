import React from "react"
import { useSelector } from "react-redux"

const useUserLogin = () => {
  const userData = useSelector(state => state.goal.userData)
  return userData
}

export default useUserLogin
