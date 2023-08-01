import { observer } from "mobx-react-lite"
import "./App.css"
import { HashRouter, Route, Routes } from "react-router-dom"
import MenuPage from "./pages/MenuPage"
import BasketPage from "./pages/BasketPage"
import DeliveryPage from "./pages/DeliveryPage"
import { useEffect } from "react"

function App() {
   useEffect(() => window.Telegram.WebApp.expand(), [])
   return (
      <HashRouter>
         <div className="App">
            <Routes>
               <Route path="/menu" element={<MenuPage />} />
               <Route path="/basket" element={<BasketPage />} />
               <Route path="/delivery" element={<DeliveryPage />} />
            </Routes>
         </div>
      </HashRouter>
   )
}

export default observer(App)
