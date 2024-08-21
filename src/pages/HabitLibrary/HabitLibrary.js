// pages/HomePage.js
import React from "react"
import {  useSelector } from "react-redux"
import LibraryHabitCategoryBlock from "../../components/HabitsLibrary/LibraryHabitCategoryBlock"



const HabitLibrary = () => {

  const storeData = useSelector((state) => state.goal.presetHabitsLibrary)

  return (
    <div>
      <section className="HabitLibrary">
        <div className="HabitLibrary__Title">
          Библиотека привычек
        </div>
        {storeData.libraryHabits.map((libraryHabit, index) => (
          <LibraryHabitCategoryBlock 
            key={index}
            data={libraryHabit}
          />
        ))}

      </section>

      
    </div>
  )
}

export default HabitLibrary
