import React from "react"
import GameDialogs from "../../../jsonData/GameData/GameDialogs.json"
import { useSelector } from "react-redux"


const AboutSection = () => {
  const lvlPerson = useSelector((state) => state.goal.gameData.lvl)
  console.log(GameDialogs)

  return (
    <div className="rightContent__block__about">
      <div className="aboutPers__text">{GameDialogs.libraryLvlsDialogs[lvlPerson-1]}</div>
    </div>
  )
}

export default AboutSection