// ProductList.js
import React from "react"
import Product from "./Product"

const products = [
  { id: 1, name: "Билет пропуска", description: "С помощью него вы можете пропускать уровень заданий, но учтите, что лучше так не делать!", price: 150 },
  { id: 2, name: "Скидка на TinkoffPRO", description: "Ну по кайфу же)))", price: 300 },
  { id: 3, name: "Возможность прикрепить на главынй экран тэг", description: "Переходи на главный экран и закрепляй виджет", price: 50 },
]

function ProductList() {
  return (
    <div>
      {products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList
