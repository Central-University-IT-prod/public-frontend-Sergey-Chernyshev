import React, { useEffect, useState } from "react"
import NewTaskInput from "./NewTaskInput"
import TaskParametersInput from "./TaskParametersInput"
import TimeParametersInput from "./TimeParametersInput"
import { useHabitContext } from "./context/HabitContext"
import { useDispatch } from "react-redux"
import { removeTag, saveGoalData } from "../../store/goalSlice"
import { RandomKeyGenerator } from "../../functions/RandomKeyGenerator/RandomKeyGenerator"
import TagForm from "../TagBlock/TagForm"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function HabitSection() {
  const { expanded } = useHabitContext()
  const { saveHabitSection } = useHabitContext()
  const [task, setTask] = useState("")
  const [taskParam, setTaskParam] = useState("")
  const [time, setTime] = useState("")
  const [tagsId, setTagsId] = useState([])

  const dispatch = useDispatch()


  const handleSave = () => {
    if (task.trim().length !== 0) {

      const randomKey = RandomKeyGenerator(12)
      const goalData = {
        id: randomKey,
        description: "",
        task: task,
        time: time,
        taskParam: taskParam,
        done: false,
        progress: undefined,
        doneTime: undefined,
        progressTimeLine: [
          {
            "type": "create",
            "time": time.creationTime,
            "done": false,
            "progress": taskParam.numFrom
          }
        ],
        tagsId: tagsId.length > 0 ? tagsId : ["Ndl188UhdS"],
      }

      const compData = JSON.parse(localStorage.getItem("competions")) || []
      
      const hasMatchingId = compData.some(id => tagsId.includes(id.uId));
      if (hasMatchingId) {
        const updatedCompData = compData.map(item => {
          if (tagsId.includes(item.uId)) {
            return { ...item, habitAdd: true, habitFriend:goalData, habitMy: goalData}; 
          }
          return item; 
        });
        localStorage.setItem("competions", JSON.stringify(updatedCompData))
        
        dispatch(removeTag(compData.filter(item => tagsId.includes(item.uId)).map(item => item.uId)[0]))
      }
      else{
        dispatch(saveGoalData(goalData))
        toast('Привычка создана! Не забудьте ее выполнить', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
      })
      }
      
      
      


    }
  }


  useEffect(() => {
    handleSave()
  }, [saveHabitSection])

  return (
    <section className={`section__addHabit ${expanded ? "expanded" : ""}`}>
      <NewTaskInput setTask={setTask} />
      <TaskParametersInput setTaskParam={setTaskParam} />
      <TimeParametersInput setTime={setTime} />
      <TagForm setTags={setTagsId}/>
      <ToastContainer />
    </section>
  )
}

export default HabitSection
