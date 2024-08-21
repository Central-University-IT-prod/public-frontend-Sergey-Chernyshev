import React from "react"
import MenuItem from "./MenuItem"


// import icons
import {ReactComponent as FaLogo} from "../../media/menu/menu_logo.svg"
import {ReactComponent as FaHome} from "../../media/menu/faHome.svg"
import {ReactComponent as FaBrain} from "../../media/menu/faBrain.svg"
import {ReactComponent as FaMedal} from "../../media/menu/faMedal.svg"
import {ReactComponent as FaShoppingBasket} from "../../media/menu/faShoppingBasket.svg"
import {ReactComponent as FaUserLarge} from "../../media/menu/faUserLarge.svg"

const MainMenu = () => {
  return (
    <section className="mainMenu">
      <div className="mainMenu-logo">
        <FaLogo/>
      </div>
      <nav>
        <MenuItem icon={<FaHome />} text="Главная" link="/" />
        <MenuItem icon={<FaMedal />} text="Привычки" link="/tasks" />
        <MenuItem icon={<FaMedal />} text="Библиотека" link="/habitLibrary" />
        <MenuItem icon={<FaBrain />} text="Sam" link="/competitions" />
        <MenuItem icon={<FaBrain />} text="Соревнования" link="/duel" />
        <MenuItem icon={<FaShoppingBasket />} text="Магазин" link="/shop" />
        <MenuItem icon={<FaUserLarge />} text="Профиль" link="/profile" />
      </nav>
    </section>
  )
}

export default MainMenu
