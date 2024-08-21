import {React, useState} from "react"
import PersonInfo from "./PersonInfo"
import HealthInfo from "./HealthInfo"
import CoinInfo from "./CoinInfo"
import AboutSection from "./AboutSection"
import { useSelector } from "react-redux"



function RightContent() {


  return (
    <section className='CompPg__rightContent'>
      <PersonInfo />
      <HealthInfo />
      <CoinInfo />
      <AboutSection />
    </section>
  ) 
  
}

export default RightContent