import React, { createContext, useContext, useState, useMemo } from "react"

const HabitContext = createContext()

export const useHabitContext = () => useContext(HabitContext)

export const HabitProvider = ({ children}) => {
  const [expanded, setExpanded] = useState(false)
  const [saveHabitSection, setSaveHabitSection] = useState(() => {
    return false
  })

  const toggleHeight = () => {
    setExpanded(!expanded)
  }

  const toggleSaveButtonPressed = () => {
    setSaveHabitSection(!saveHabitSection)
  }

  const contextValue = useMemo(() => ({
    expanded,
    saveHabitSection,
    toggleHeight,
    toggleSaveButtonPressed,
  }), [expanded, saveHabitSection])

  return (
    <HabitContext.Provider value={contextValue}>
      {children}
    </HabitContext.Provider>
  )
}
