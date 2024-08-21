function getStartOfPeriod(interval, curTime) {
  const today = new Date(curTime*1000)
  const startOfPeriod = new Date(today)
  if (interval === "day") {
    startOfPeriod.setHours(0, 0, 0, 0)
  } else if (interval === "week") {
    const diff = today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)
    startOfPeriod.setDate(diff)
    startOfPeriod.setHours(0, 0, 0, 0)
  } else if (interval === "month") {
    startOfPeriod.setDate(1)
    startOfPeriod.setHours(0, 0, 0, 0)
  } else {
    throw new Error(`Unsupported interval: ${interval}`)
  }
  return startOfPeriod
}

export default getStartOfPeriod