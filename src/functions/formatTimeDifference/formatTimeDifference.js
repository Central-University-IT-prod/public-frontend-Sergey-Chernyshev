export function timeDifference(date1, date2) {
  var diff = date1 - date2
  if (diff < 60){
    return "<минуты"
  }
  var sec = 1, min = sec * 60, hour = min * 60, day = hour * 24, year = day * 365
  
  var y = Math.floor(diff / year)
  diff -= y * year
  var d = Math.floor(diff / day)
  diff -= d * day
  var h = Math.floor(diff / hour)
  diff -= h * hour
  var m = Math.floor(diff / min)
  diff -= m * min
  var s = Math.floor(diff / sec)
    
  var result = ""
  if (y > 0) result += y + " лет "
  if (d > 0) result += d + " дней "
  if (h > 0) result += h + " часов "
  if (m > 0) result += m + " минут "
  return result
}