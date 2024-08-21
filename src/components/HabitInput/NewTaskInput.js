import React, { useEffect, useState } from "react"
import MoreOptionsButton from "./MoreOptionsButton"
import { useHabitContext } from "./context/HabitContext"

function NewTaskInput({ setTask }) {
  const [inputValue, setInputValue] = useState("")
  const { toggleSaveButtonPressed } = useHabitContext()
  const { saveHabitSection } = useHabitContext()


  useEffect(() => {
    setInputValue("")
  }, [saveHabitSection])

  useEffect( () => {
    setTask(inputValue)
  }, [inputValue])

  return (
    <div className="addHabit__form">
      <input className="form__inputHabit" value={inputValue}  onChange={(e) => setInputValue(e.target.value)} type="text" placeholder="Введите новую привычку" />
      <button className="form__btnHabit" onClick={toggleSaveButtonPressed}>создать</button>
      <MoreOptionsButton />
    </div>
  )
}

export default NewTaskInput
