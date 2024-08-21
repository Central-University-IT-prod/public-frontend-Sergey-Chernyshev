import React, { useEffect, useState } from "react"
import { timeDifference } from "../../functions/formatTimeDifference/formatTimeDifference"
import { useSelector } from "react-redux"

function HabitInfo(props) {
  const { data } = props
  const currentTime = useSelector((state) => state.goal.currentTime)
  const currentData = useSelector((state) => state.goal.data)

  const [updatedData, setUpdatedData] = useState(data)

  useEffect(() => {
    const newData = currentData.find(el => el.id === updatedData.id)
    if (newData) {
      setUpdatedData(newData)
    }
  }, [currentTime])

  return (
    <div className="hBlock__left">
      <div className="hBlock__left__title">{updatedData.task}</div>
      {updatedData.taskParam.numTo !== undefined ? (
        <div className="hBlock__left__progress">Прогресс: {updatedData.progress === undefined ? updatedData.taskParam.numFrom : updatedData.progress} / {updatedData.taskParam.numTo}</div>
      ) : ""}
      {!isNaN(updatedData.time.timeEnd)  ? (
        <div className="hBlock__left__timeLimit">Осталось: {timeDifference(updatedData.time.periodStart + updatedData.time.totalTime, currentTime)}</div>
      ) : ""}
    </div>
  )
}

export default HabitInfo
