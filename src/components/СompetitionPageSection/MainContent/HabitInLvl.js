import {React} from "react"

const HabitInLvl = (props) => {
  const {data} = props
  return (
    <article className="lvlBlock__allHabits__habit">
      <div className="lvlBlock__allHabits__habit__title">{data.title}</div>
      <div className="lvlBlock__allHabits__habit__text">{data.description }</div>
    </article>
  )
}

export default HabitInLvl