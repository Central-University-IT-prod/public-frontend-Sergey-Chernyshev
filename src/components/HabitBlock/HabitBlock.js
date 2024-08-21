import React from "react"
import HabitInfo from "./HabitInfo"
import HabitControls from "./HabitControls"
import { Link } from "react-router-dom"

function HabitBlock(props) {
  const {data, selectable, selected, onSelect} = props
  return (
    <article
      className={`block__habit ${data.done ? "habitDone" : ""} ${selected ? "selected" : ""}`}
      onClick={selectable ? onSelect : undefined}
    >
      <Link to={`/habitStats?habitId=${data.id}`}>
        <HabitInfo data={data} />
      </Link>

      <HabitControls data={data} />
    </article>
  )
}

export default HabitBlock
