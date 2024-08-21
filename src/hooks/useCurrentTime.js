import { useSelector } from "react-redux"

const useCurrentTime = () => {
  const currentTime = useSelector(state => state.goal.currentTime)
  return currentTime
}

export default useCurrentTime
