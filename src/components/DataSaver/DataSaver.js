import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateStore } from "../../store/goalSlice"

function DataSaver() {
  const data = useSelector(state => state.goal)
  const dispatch = useDispatch()

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem("usersLogin"))
    let userData = JSON.parse(localStorage.getItem("usersData")) || []
    if (loginData && data) {
      if (data.userData.username !== loginData.username) {
        const userDataAdd = userData.filter(user => user.userData.username === loginData.username)
        dispatch(updateStore(userDataAdd[0]))
      }
    }

    userData = userData.map(user => {
      if (user.userData.uId === data.userData.uId && data.userData.uId !== -1 && data.userData.uId !== -2) {
        return {...data }
      }
      return user
    })
    const userExists = userData.some(user => user.userData.uId === data.userData.uId && user.userData.username === data.userData.username)

    if (!userExists) {
      userData = [...userData, data]
    }

    localStorage.setItem("usersData", JSON.stringify(userData))
  }, [data, dispatch])

  return null
}

export default DataSaver