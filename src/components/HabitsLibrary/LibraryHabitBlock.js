import {React, useState} from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { saveGoalData } from "../../store/goalSlice"
import { RandomKeyGenerator } from "../../functions/RandomKeyGenerator/RandomKeyGenerator"
import useCurrentTime from "../../hooks/useCurrentTime"

const LibraryHabitBlock = ({data, colors}) => {
  const dispath = useDispatch()
  const [habitNumTo, setHabitNumTo] = useState("")

  const onClickHandleAddNewHabit = () =>{
    // const currentTime = useCurrentTime()

    // const currentTime = useSelector(state => state.goal.currentTime)


    if (habitNumTo.toString().trim() !== "" || data.taskParam.unit.trim() === ""){

      let typePeriod = "day"     

      if (data.time.day !== ""){
        typePeriod = "day"
      }
        
      if (data.time.week > 0){
        typePeriod = "week"
      }
      if (data.time.month > 0){
        typePeriod = "month"
      }

      const totalSeconds =
        parseInt(data.time.month) * 2592000 +
        parseInt(data.time.weeks) * 604800 +
        parseInt(data.time.days) * 86400

      const newHabit = { 
        "id": RandomKeyGenerator(12),
        "type": data.type,
        "task": data.title.replace("%%N%%", habitNumTo),
        "titleHtml": data.titleHtml,
        "description": data.description,
        "time": 
        {
          "creationTime": -1,
          "periodStart": -1, 
          "totalTime": totalSeconds,
          "timeEnd": -1,
          "type": typePeriod,
          "months": data.time.month,
          "weeks": data.time.weeks,
          "days": data.time.days,
          "hours": 0,
          "minutes": 0
        },
        "taskParam":
        {
          "numFrom": data.taskParam.numFrom,
          "numTo": habitNumTo,
          "unit": data.taskParam.unit
        },
        "done": false,
        "progress": 0,
        "doneTime": -1,
        "progressTimeLine": [],
        "tagsId": data.tagsId,
        "bonuses": 
        {
          "xp": data.bonuses.xp,
          "money": data.bonuses.money
        }
      }

      dispath(saveGoalData(newHabit))
    }
  }


  return(
    <article
      className="HabitLibrary__Habit" style={ {backgroundColor: colors.backgroundColor, borderColor: colors.borderColor} }>
      <div className="HabitLibrary__HabitDetails">
        <div className="HabitLibrary__HabitName">
          {data.titleHtml ? (
            <div dangerouslySetInnerHTML={{ __html: data.titleHtml.replace("%%N%%", "N") }} />
          ) : (
            <div>{data.title.replace("%%N%%", "N") }</div>
          )}
        </div> <div className="HabitLibrary__HabitDescription">
          {data.description}
        </div>
        { data.taskParam.unit.trim() !== "" ? 
          <input
            className="HabitLibrary__HabitInput" 
            value={habitNumTo} 
            type="number"
            placeholder="Введите кол-во:" 
            onChange={(e) => {setHabitNumTo(e.target.value)}} 
          />
          : 
          <div className="HabitLibrary__HabitNoneInput"> </div>
        }
      </div>
      <button className="HabitLibrary__HabitButton" onClick={onClickHandleAddNewHabit}>
          добавить
      </button>
    </article>
  )
}


LibraryHabitBlock.propTypes = {
  data: PropTypes.object.isRequired,
  colors: PropTypes.shape({
    backgroundColor: PropTypes.string.isRequired,
    borderColor: PropTypes.string.isRequired,
  }).isRequired,
}

export default LibraryHabitBlock