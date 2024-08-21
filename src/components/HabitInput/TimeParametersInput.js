import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import getStartOfPeriod from "../../functions/GetStartOfPeriod/GetStartOfPeriod"






function TimeParametersInput({ setTime }) {
  const [months, setMonths] = useState("")
  const [weeks, setWeeks] = useState("")
  const [days, setDays] = useState("")  
    

  const currentTime = useSelector(state => state.goal.currentTime)




  useEffect(() => {

    let typePeriod = "day"     

    if (days !== ""){
      typePeriod = "day"
    }
      
    if (weeks > 0){
      typePeriod = "week"
    }
    if (months > 0){
      typePeriod = "month"
    }


    const m = (months === "" ? 0 : months)
    const w = (weeks === "" ? 0 : weeks)
    const d = (days === "" ? 0 : days)
    const totalSeconds =
          parseInt(m) * 2592000 +
          parseInt(w) * 604800 +
          parseInt(d) * 86400

    const startPeriodTime = new Date(getStartOfPeriod(typePeriod, currentTime)).getTime()/1000
    const data = {
      "creationTime": currentTime,
      "periodStart": startPeriodTime, 
      "totalTime": totalSeconds,
      "timeEnd": startPeriodTime + totalSeconds,
      "type": typePeriod,
      "months": m,
      "weeks": w,
      "days": d,
      "hours": 0,
      "minutes": 0,
    }
    setTime(data)
  }, [months, weeks, days])




  return (
    <div className="addHabit__form">
      {/* <label>Лет:</label> */}
      <label>Период:</label>
      <input
        value={months}
        onChange={(e) => setMonths(e.target.value)}
        type="number"
        className="form__inputHabit inptHbt-sm"
        placeholder="Месяцев"
        disabled={weeks != "" || days != ""}

      />
      <input
        value={weeks}
        onChange={(e) => setWeeks(e.target.value)}
        type="number"
        className="form__inputHabit inptHbt-sm"
        placeholder="Недель"
        disabled={months != "" || days != ""}
      />
      <input
        value={days}
        onChange={(e) => setDays(e.target.value)}
        type="number"
        className="form__inputHabit inptHbt-sm"
        placeholder="Дней"
        disabled={months != "" || weeks != ""}

      />
    </div>
  )
}

export default TimeParametersInput
