import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeHabitDone, changeHabitProgress } from "../../store/goalSlice"

function HabitControls(props) {

  const dispatch = useDispatch()
  const { data } = props
  const [isClickPlusBtn, isClickPlusBtnChange] = useState(false)
  const [isClickMinusBtn, isClickMinusBtnChange] = useState(false)
  const [deltaChangeMinus, deltaChangeMinusFunc] = useState("")
  const [deltaChangePlus, deltaChangePlusFunc] = useState("")
  const funcDune = () => {
    dispatch(changeHabitDone(data.id))

  }
  const blockStyle = {
    pointerEvents: data.done ? "none" : "auto",
    filter: data.done ? "blur(2px)" : "none" 
  }
  const blockStyleValue = {
    pointerEvents: data.taskParam.numTo === undefined ? "none" : "auto",
    filter: data.taskParam.numTo === undefined ? "blur(2px)" : "none" 
  }

  const minusBtnClick = () => {
    isClickMinusBtnChange(!isClickMinusBtn)
    const newDelta = deltaChangeMinus !== "" ? parseInt(deltaChangeMinus) : 1
    if (newDelta !== 0 && newDelta > 0) {
      dispatch(changeHabitProgress({ id: data.id, delta: -newDelta }))
    }
  }

  const plusBtnClick = () => {
    isClickPlusBtnChange(!isClickPlusBtn)
    const newDelta = deltaChangePlus !== "" ? parseInt(deltaChangePlus) : 1
    if (newDelta !== 0 && newDelta > 0) {
      dispatch(changeHabitProgress({ id: data.id, delta: newDelta }))
    }
  }

  return (
    <div className="hBlock__right" style={blockStyle}>
      <div className="form__hBlock" style={blockStyleValue}>
        <input value={deltaChangePlus} onChange={(e) => deltaChangePlusFunc(e.target.value)} className="form__hBlock__inpt" type="number" name="" id="" placeholder="Добавить" />
        <div className="form__btnAddNum" onClick={plusBtnClick}>
          <svg width="40" height="25" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20.6923 2.69231C20.6923 1.20312 19.4892 0 18 0C16.5108 0 15.3077 1.20312 15.3077 2.69231V14.8077H3.19231C1.70312 14.8077 0.5 16.0108 0.5 17.5C0.5 18.9892 1.70312 20.1923 3.19231 20.1923H15.3077V32.3077C15.3077 33.7969 16.5108 35 18 35C19.4892 35 20.6923 33.7969 20.6923 32.3077V20.1923H32.8077C34.2969 20.1923 35.5 18.9892 35.5 17.5C35.5 16.0108 34.2969 14.8077 32.8077 14.8077H20.6923V2.69231Z"
              fill="#16171B" />
          </svg>
        </div>
      </div>
      <div className="form__hBlock" style={blockStyleValue}>
        <input value={deltaChangeMinus} onChange={(e) => deltaChangeMinusFunc(e.target.value)} className="form__hBlock__inpt" type="number" name="" id="" placeholder="Убавить" />
        <div onClick={minusBtnClick} className="form__btnMinusNum">
          <svg width="40" height="20" viewBox="0 0 36 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18 0.807678C19.4892 0.807678 21.2293 0.807687 18 0.807678C16.5108 0.807678 17 0.807684 15.3077 0.807684H3.19231C1.70312 0.807684 0.5 2.01081 0.5 3.49999C0.5 4.98917 1.70312 6.1923 3.19231 6.1923H20.6923H19.2449C17.5 6.1923 19.2031 6.1923 20.6923 6.1923C22.1815 6.1923 23 6.1923 22 6.1923H20.6923H32.8077C34.2969 6.1923 35.5 4.98917 35.5 3.49999C35.5 2.01081 34.2969 0.807684 32.8077 0.807684H20.6923L18 0.807678Z"
              fill="#16171B" />
          </svg>
        </div>
      </div>
      <div className="form__hBlock">
        <div className="form__btnDone" onClick={funcDune}>Завершить</div>
      </div>
    </div>
  )
}

export default HabitControls
