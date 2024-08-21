import React from "react"

import MainMenu from "./components/MainMenu/MainMenu"
import Router from "./pages/Router"
import "./App.css"
import { Provider} from "react-redux"
import store from "./store/store"
import TimeChanger from "./components/TimeChanger/TimeChanger"
import DataSaver from "./components/DataSaver/DataSaver"

function App() {


  return (
    <Provider store={store}>
      <div className="App">
        <MainMenu />
        <main>
          <Router />
        </main>
      </div>
      <TimeChanger />
      <DataSaver />
    </Provider>

  )
}

export default App
