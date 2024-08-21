import React, { useEffect, useState } from "react"
import { useHabitContext } from "./context/HabitContext"

function TaskParametersInput({setTaskParam}) {

  const [numFrom, setFromNum] = useState("")
  const [numTo, setNumTo] = useState("")
  const [unit, setUnit] = useState("")
  const { saveHabitSection } = useHabitContext()


  useEffect(() => {
    setFromNum("")
    setNumTo("")
    setUnit("")
  }, [saveHabitSection])


  const data = {
    "numFrom": numFrom ? parseInt(numFrom) : "0",
    "numTo": numTo ? parseInt(numTo) : undefined,
    "unit": unit ? unit.toString() : undefined,
  }

  useEffect( () => {
    setTaskParam(data)
  }, [numFrom, numTo, unit])


  return (
    <div className="addHabit__form">
      <label>Количество:</label>
      <input value={numFrom} onChange={(e) => setFromNum(e.target.value)} className="form__inputHabit inptHbt-sm" type="number" placeholder="Начальное" />
      <input value={numTo} onChange={(e) => setNumTo(e.target.value)} className="form__inputHabit inptHbt-sm" type="number" placeholder="Конечное" />
      <input value={unit} onChange={(e) => setUnit(e.target.value)} className="form__inputHabit inptHbt-sm" type="text" placeholder="Единица измерения" />
    </div>
  )
}

export default TaskParametersInput
