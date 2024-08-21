// Product.js
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTiketPass } from "../../../store/goalSlice"

function Product({ product }) {
  const {id, name, description, price } = product

  const gameData = useSelector((state) => state.goal.gameData)
  const dispatch = useDispatch()

  const handleBuy = () => {
    console.log(gameData.coin, id)
    if( id === 1 && gameData.coin - price >= 0){
      dispatch(addTiketPass(price))
    }
  }

  return (
    <div className="product">
      <h3>{name}</h3>
      <p>{description}</p>
      <p>Цена: {price} чокопай-coin</p>
      <button onClick={handleBuy}>Купить</button>
    </div>
  )
}

export default Product
