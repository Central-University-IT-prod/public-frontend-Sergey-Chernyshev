import {React} from "react"
import DataInfoBlock from "./DataInfoBlock"
import { useSelector } from "react-redux"

const DataInfo = () => {
  const doneHabits = useSelector(state => state.goal.gameData.doneHabits)
  const passedHabits = useSelector(state => state.goal.gameData.passed)
  const lvl = useSelector(state => state.goal.gameData.lvl)

  return (
    <div className='CompPg__dataInfo'>
      <DataInfoBlock color="#EDFF20" title="Следующий бонус" text="+100" />
      <DataInfoBlock title="Изучено привычек" text={doneHabits} />
      <DataInfoBlock title="Пропустил" text={passedHabits} />
      <DataInfoBlock title="Уровень" text={lvl} />
    </div>
  )
}

export default DataInfo