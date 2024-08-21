import React from "react"
import HabitInLvl from "./HabitInLvl"
import { passedInGame, saveGoalData, startGameLvlItem, updateLvl } from "../../../store/goalSlice"
import { useDispatch, useSelector } from "react-redux"
import { RandomKeyGenerator } from "../../../functions/RandomKeyGenerator/RandomKeyGenerator"

const HabitsLevelBlock = (props) => {
  const dispatch = useDispatch()
  const gameData = useSelector((state) => state.goal.gameData)  
  const { data, index } = props
  const habits = data.habits

  const blockStyleValue = {
    pointerEvents: (data.started || index > gameData.lvl-1) ? "none" : "auto",
    filter: (data.started || index > gameData.lvl-1) ? "blur(2px)" : "none",
  }
  const blockStyleValue2 = {
    pointerEvents: index > gameData.lvl-1 ? "none" : "auto",
    filter: index > gameData.lvl-1 ? "blur(1px)" : "none",
  }

  const blockStyleValuePassNone = {
    pointerEvents:  gameData.shop.passTikets === 0 ? "none" : "auto",
    filter:  gameData.shop.passTikets === 0 ? "blur(1px)" : "none",
  }

  const onClickHandlePass = () =>{
    dispatch(updateLvl())
    dispatch(passedInGame())
  
  }

  const onClickHandleAdd = () => {

    habits.forEach((element) => {
      let totalSeconds =
        parseInt(element.time.months) * 2592000 +
        parseInt(element.time.weeks) * 604800 +
        parseInt(element.time.days) * 86400

      let typePeriod = "day"

      if (element.time.day !== "") {
        typePeriod = "day"
      }

      if (element.time.week > 0) {
        typePeriod = "week"
      }
      if (element.time.month > 0) {
        typePeriod = "month"
      }

      let newHabit = {
        id: RandomKeyGenerator(12),
        type: element.type,
        task: element.title,
        titleHtml: element.titleHtml,
        description: element.description,
        time: {
          creationTime: -1,
          periodStart: -1,
          totalTime: totalSeconds,
          timeEnd: -1,
          type: typePeriod,
          months: element.time.month,
          weeks: element.time.weeks,
          days: element.time.days,
          hours: 0,
          minutes: 0,
        },
        taskParam: {
          numFrom: element.taskParam.numFrom,
          numTo: element.taskParam.habitNumTo,
          unit: element.taskParam.unit,
        },
        done: false,
        progress: 0,
        doneTime: -1,
        progressTimeLine: [],
        tagsId: element.tagsId,
        bonuses: {
          xp: element.bonuses.xp,
          money: element.bonuses.money,
        },
      }

      dispatch(saveGoalData(newHabit))
    })
    dispatch(startGameLvlItem(index))

  }

  return (
    <div className="habits__lvlBlock" style={blockStyleValue2}>
      <div className="lvlBlock__infoLvl">
        <div className="infoLvl__title">{data.lvlTitle}</div>
        <div className="infoLvl__buttons" style={blockStyleValue}>
          <div className="infoLvl__buttons__addBtn" onClick={onClickHandleAdd}>
            добавить
          </div>
          <div className="infoLvl__buttons__passBtn" style={blockStyleValuePassNone} onClick={onClickHandlePass}>пропустить</div>
        </div>
      </div>
      <div className="lvlBlock__allHabits">
        {habits.map((habit, index) => (
          <HabitInLvl key={index} data={habit} />
        ))}
      </div>
      <div className="lvlBlock__dopInfo">
        <div className="lvlBlock__dopInfo__xp">+{data.awards.xp}xp</div>
        <div className="lvlBlock__dopInfo__coin">
          +{data.awards.coin} чокопай-coin
        </div>
      </div>
    </div>
  )
}

export default HabitsLevelBlock
