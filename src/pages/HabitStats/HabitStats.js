import React, { useEffect, useState } from "react"
import ChartComponent from "../../components/Chart/ChartComponent"
import { useSelector } from "react-redux"

const HabitStats = () => {
  const storeDataHabit = useSelector((state) => state.goal.data)

  const [habitId, setHabitId] = useState("")
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const paramValue = searchParams.get("habitId")
    if (paramValue) {
      setHabitId(paramValue)
    }
  }, [storeDataHabit])

  const itemWithId = storeDataHabit.find((item) => item.id === habitId)

  return (
    <div>
      <h2>График {habitId}</h2>
      <div className="chart__today">
        <ChartComponent data={itemWithId} />

      </div>
    </div>
  )
}

export default HabitStats
