import { useEffect } from "react"
import Basket from "../components/Basket/Basket"
import Footer from "../components/Footer/Footer"
import store from "../store"
import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom"
import Error from "../components/Error/Error"
import Loader from "../components/Loader/Loader"

function BasketPage() {
   const navigate = useNavigate()
   useEffect(() => {
      store.getProductsAndBasket(store.products.length == 0)
   }, [])
   const onNext = () => {
      if (store.basketPrice() > 0) navigate("/delivery")
      else store.setErrorStatus(true)
   }
   const onBack = () => navigate("/menu")
   const onCloseError = () => {
      store.setErrorStatus(false)
      window.Telegram.WebApp.close()
   }
   return (
      <>
         {store.loading && <Loader />}
         {store.error && (
            <Error
               onClose={onCloseError}
               text={
                  "сейчас в корзине ничего нет,\nдобавьте в нее товары через\nпункт “меню бургерной” в\nменю чат-бота"
               }
            />
         )}
         <Basket products={store.basket} />
         <Footer onNext={onNext} onBack={onBack} nextText={"дальше"} backText={"назад"} price={store.basketPrice()} />
      </>
   )
}

export default observer(BasketPage)
