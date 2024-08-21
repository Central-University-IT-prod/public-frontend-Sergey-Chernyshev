import {React} from "react"


const DataInfoBlock = (props) => {
  const {title, text, color} = props 
  return (
    <div className="CompPg__dataInfo__block">
      <div className="dataInfo__block__title" >{title}</div>
      <div className="dataInfo__block__text" style={{color: color}}>{text}</div>
    </div>
  )
}

export default DataInfoBlock