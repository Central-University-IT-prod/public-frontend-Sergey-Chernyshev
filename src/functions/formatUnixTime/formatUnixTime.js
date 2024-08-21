function formatUnixTime(unixTimeInSeconds) {
  const months = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ]
  
  const date = new Date(unixTimeInSeconds * 1000)
  
  const year = date.getFullYear()
  const month = months[date.getMonth()]
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const formattedDateTime = `${day} ${month} ${hours}:${minutes}`
  
  return formattedDateTime
}
export default formatUnixTime

  