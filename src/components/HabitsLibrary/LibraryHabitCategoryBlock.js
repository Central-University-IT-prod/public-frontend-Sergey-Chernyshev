import React from "react"
import PropTypes from "prop-types"
import LibraryHabitBlock from "./LibraryHabitBlock"
import { RandomKeyGenerator } from "../../functions/RandomKeyGenerator/RandomKeyGenerator"
import { Link } from "react-router-dom"

const LibraryHabitCategoryBlock = ({data}) => {
  const category = data[0]
  const habit = data[2]
  const habitColors = data[1]
  return(
    <div className="HabitLibrary__Category">
      <div className="HabitLibrary__CategoryTitle">
        {category[1].trim() !== "" ? 
          <Link to={category[1]} >{category[0]}</Link>
          : category[0]
        }
      </div>
      <div className="HabitLibrary__CategoryList">
        <div className="HabitLibrary__HabitContainer">
          {habit.map((habitItem) => (
            <LibraryHabitBlock 
              key={RandomKeyGenerator(6)}
              data = {habitItem}
              colors = {habitColors}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
  
// LibraryHabitCategoryBlock.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.object).isRequired,
// }
  
export default LibraryHabitCategoryBlock