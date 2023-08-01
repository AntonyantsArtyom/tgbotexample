import DeliveryArea from "../components/DeliveryArea/DeliveryArea"
import Footer from "../components/Footer/Footer"
import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom"
import store from "../store"
import { useEffect, useState } from "react"
import Error from "../components/Error/Error"
import Loader from "../components/Loader/Loader"

function DeliveryPage() {
   const [emptyField, setEmptyField] = useState(null)
   useEffect(() => {
      store.getPromotions()
   }, [])
   const navigate = useNavigate()
   const onNext = async () => {
      if (store.deliveryData.adres == "" || store.deliveryData.phone == "" || store.deliveryData.time == "") {
         if (store.deliveryData.adres == "") setEmptyField("адрес")
         else if (store.deliveryData.phone == "") setEmptyField("номер")
         else if (store.deliveryData.time == "") setEmptyField("время")
         store.setErrorStatus(true)
      } else {
         await store.finishDelivery()
         window.Telegram.WebApp.close()
      }
   }
   const onCloseError = () => {
      store.setErrorStatus(false)
   }
   const onBack = () => navigate("/basket")
   return (
      <>
         {store.loading && <Loader />}
         {store.error && (
            <Error
               onClose={onCloseError}
               text={`вы не заполнили пункт “${emptyField}” -\nчтобы заказать доставку, вам\nнеобходимо его заполнить`}
            />
         )}
         <DeliveryArea
            promotions={store.promotions}
            oldPrice={store.basketPrice()}
            newPrice={store.basketPriceWithPromotions()}
         />
         <Footer onNext={onNext} onBack={onBack} nextText={"готово"} backText={"назад"} />
      </>
   )
}

export default observer(DeliveryPage)
