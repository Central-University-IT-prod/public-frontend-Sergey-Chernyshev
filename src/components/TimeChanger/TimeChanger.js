import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentTime, updateTimeDaltaHabitAfterEnd } from "../../store/goalSlice"

function TimeChanger() {
  const dispatch = useDispatch()
  const habits = useSelector(state => state.goal.data)
  const [unixTime, setUnixTime] = useState(Math.floor(Date.now() / 1000))
  const [newDateTime, setNewDateTime] = useState("") 

  const handleDateTimeChange = (e) => {
    setNewDateTime(e.target.value)
  }

  const handleButtonClick = () => {
    // console.log("Новая дата и время:", newDateTime)
    setUnixTime(new Date(newDateTime).getTime()/1000)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setUnixTime(prevUnixTime => prevUnixTime + 1)
    }, 1000)
  
    return () => clearInterval(interval)
  }, []) 
    
  useEffect(() => {
    dispatch(setCurrentTime(unixTime))
    habits.forEach(el => {
      // console.log(el.time.periodStart + el.time.totalTime, unixTime)
      if (el.time.periodStart + el.time.totalTime <= unixTime) {
        const data = {
          "id": el.id,
          "newTime": unixTime,
        }
        dispatch(updateTimeDaltaHabitAfterEnd(data))
      }
    })
  }, [unixTime])

  return (
    <div>
      <h2>Изменение времени</h2>
      <input type="datetime-local" value={newDateTime} onChange={handleDateTimeChange}></input>
      <button onClick={handleButtonClick}>Изменить время</button>
    </div>
  )
}

export default TimeChanger
