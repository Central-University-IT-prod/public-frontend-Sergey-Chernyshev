import {React} from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const CoinInfo = () => {
  const coinPerson = useSelector((state) => state.goal.gameData.coin)

  return (
    <div className="rightContent__block">
      <div className="coin__title">Чокопай-coin:</div>
      <div className="coin__num">{coinPerson}</div>
      <Link to='/shop'>
        <div className="coin__link">ПОТРАТИТЬ  В МАГАЗИНЕ</div>
      </Link>
    </div>
  )
}

export default CoinInfo