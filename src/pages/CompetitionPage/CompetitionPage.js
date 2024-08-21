// pages/HomePage.js
import React from "react"
import MainContent from "../../components/СompetitionPageSection/MainContent/MainContent"
import RightContent from "../../components/СompetitionPageSection/RightContent/RightContent "


import { useDispatch, useSelector } from "react-redux"
import { startGame } from "../../store/goalSlice"



const CompetitionPage = () => {
  const lvlPerson = useSelector((state) => state.goal.gameData.lvl)
  const dispatch = useDispatch()


  const startGameHandle = () => {
    dispatch(startGame())
  }

  if (lvlPerson === -1){
    return (
      <>
        <div className="startGame">
          Нажмите в любое место, чтобы начать
        </div>
        <div className='CompetitionPage blur' onClick={startGameHandle}>
          <MainContent />
          <RightContent />
        </div>
      </>
    )
  }

  return(
    <div className='CompetitionPage'>
      <MainContent />
      <RightContent />
    </div>
  )
}

export default CompetitionPage
