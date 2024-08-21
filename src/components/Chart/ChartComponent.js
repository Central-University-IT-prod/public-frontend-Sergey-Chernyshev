import React from "react"
import { Line } from "react-chartjs-2"
import formatUnixTime from "../../functions/formatUnixTime/formatUnixTime"

const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString)

  const month = date.toLocaleString("default", { month: "long" })


  const day = date.getDate()

  let hours = date.getHours()
  let minutes = date.getMinutes()

  if (minutes < 10) {
    minutes = "0" + minutes
  }

  const formattedDateTime = `${day} ${month} ${hours}:${minutes}`

  return formattedDateTime
}




const ChartComponent = ({ data }) => {
 
  if (!data || !data.progressTimeLine) {
    return null 
  }

  const chartData = {
    labels: data.progressTimeLine.map(item => formatUnixTime(item.time)),
    datasets: [
      {
        label: "Выполнено:",
        data: data.progressTimeLine.map(item => item.progress),
        fill: false, 
        borderColor: "rgb(75, 192, 192)", 
        tension: 0.3
      }
    ]
  }
  const chartOptions = {
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: data.taskParam.numTo
      }
    }
  }

  return (
    <div>
      <h2>Простой график</h2>
      <Line data={chartData} options={chartOptions}/>
    </div>
  )
}

export default ChartComponent
