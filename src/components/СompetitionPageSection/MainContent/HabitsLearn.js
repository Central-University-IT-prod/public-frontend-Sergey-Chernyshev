import React from "react"
import HabitsLevelBlock from "./HabitsLevelBlock"
import { useSelector } from "react-redux"

const HabitsLearn = () => {
  const gameData = useSelector((state) => state.goal.gameData)
  

  return (
    <div className="CompPg__habits">
      <div className="CompPg__habits__title">Привычки на изучение</div>
      {gameData.data.libraryLvls
        .filter((i) => !i.ended)
        .map((filteredItem, index) => (
          <HabitsLevelBlock key={index} data={filteredItem} index={index} />
        ))}
    </div>
  )
}

export default HabitsLearn
