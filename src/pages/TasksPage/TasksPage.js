import React, { useState } from "react"
import HabitSection from "../../components/HabitInput/HabitSection"
import { HabitProvider } from "../../components/HabitInput/context/HabitContext"
import SortHabitsHeader from "../../components/SortHabitsHeader/SortHabitsHeader"
import HabitBlock from "../../components/HabitBlock/HabitBlock"
import TagBlock from "../../components/TagBlock/TagBlock"
import EditHabitsBtn from "../../components/EditHabitsButn/EditHabitsBtn"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { deleteHabit } from "../../store/goalSlice"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TasksPage = () => {
  const dispatch = useDispatch()
  const storeData = useSelector((state) => state.goal.data)
  const storeDataTags = useSelector((state) => state.goal.habitsTags)

  const location = useLocation()

  const urlSearchParams = new URLSearchParams(location.search)
  const idTagsFromUrl = urlSearchParams.getAll("idTag")
  const idFilterFromUrl = urlSearchParams.getAll("filterClear")

  const [editMode, setEditMode] = useState(false)
  const [selectedBlocks, setSelectedBlocks] = useState([])


  const handleEditButtonClick = () => {

    setEditMode(!editMode)
    if(editMode){
      const data = {
        "deletId": selectedBlocks,
        "dellData": storeData.filter(item => selectedBlocks.includes(item.id))
      }
      dispatch(deleteHabit(data))
    }
    setSelectedBlocks([])
  }

  const toggleBlockSelection = (id) => {
    setSelectedBlocks(prevSelectedBlocks => {
      if (prevSelectedBlocks.includes(id)) {
        return prevSelectedBlocks.filter(blockId => blockId !== id)
      } else {
        return [...prevSelectedBlocks, id]
      }
    })
  }


  const getHabitBlockCount = (tagId) => {
    return storeData.filter(element => element.tagsId.includes(tagId))
  }

  let filteredTags = []

  filteredTags = idTagsFromUrl.length
    ? storeDataTags.filter(tag => idTagsFromUrl.includes(tag.id))
    : storeDataTags

  filteredTags = idFilterFromUrl.length
    ? filteredTags.filter(tag => {
      idFilterFromUrl.includes(tag.id)
      const habitFilterData = getHabitBlockCount(tag.id)
      return habitFilterData.length > 0
    })
    : filteredTags

  return (
    <div>
      <ToastContainer />

      <section className="section__AllHabits">
        <SortHabitsHeader />
        {filteredTags.map((tag, i) => {
          const habitFilterData = getHabitBlockCount(tag.id)
          return (
            <div className="AllHabitsTags__block" key={i}>
              <Link to={`${tag.id === idTagsFromUrl[0] ? "" : "?idTag=" + tag.id}`}>
                <TagBlock
                  id={i}
                  tagId={tag.id}
                  title={tag.title}
                  counter={habitFilterData.length.toString()}
                  color={tag.color}
                />
              </Link>
              <div className="AllHabits__block">
                {habitFilterData.map((element) => (
                  <HabitBlock
                    key={element.id}
                    data={element}
                    selectable={editMode}
                    selected={selectedBlocks.includes(element.id)}
                    onSelect={() => toggleBlockSelection(element.id)}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </section>
      <EditHabitsBtn 
        onClick={handleEditButtonClick} 
      />
      <HabitProvider>
        <HabitSection />
      </HabitProvider>
    </div>
  )
}

export default TasksPage
