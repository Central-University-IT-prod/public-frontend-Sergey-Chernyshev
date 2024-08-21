import {React} from "react"
import { useSelector } from "react-redux"



const HealthInfo = () => {
  const xpPerson = useSelector((state) => state.goal.gameData)

  return (
    <div className="rightContent__block">
      <div className="health__title">Здоровье:</div>
      <div className="health__progressBar">
        <div className="health__progressBar__minNum">{xpPerson.xp}xp</div>
        <div className="health__progressBar__all">
          <div className="health__progressBar__part" style={{width: (xpPerson.lvlMaxVal[xpPerson.lvl-1]-xpPerson.xp)/100+"%"}}></div>
        </div>
        <div className="health__progressBar__maxNum">{xpPerson.lvlMaxVal[xpPerson.lvl-1]}xp</div>
      </div>
    </div>
  )
}

export default HealthInfo
