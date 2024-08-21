import {React} from "react"

import DataInfo from "./DataInfo"
import HabitsLearn from "./HabitsLearn"

const MainContent = () => {
  return (
    <section className='CompPg__mainContent'>
      <DataInfo />
      <HabitsLearn />
    </section>
  )
}

export default MainContent