import { useEffect } from "react"
import Footer from "../components/Footer/Footer"
import Products from "../components/Product/Product"
import store from "../store"
import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom"
import Error from "../components/Error/Error"
import Loader from "../components/Loader/Loader"

function MenuPage() {
   const navigate = useNavigate()
   useEffect(() => {
      store.getProductsAndBasket(store.products.length == 0)
   }, [])
   const onNext = () => {
      if (store.basketPrice() > 0) navigate("/basket")
      else store.setErrorStatus(true)
   }
   const onBack = () => {
      window.Telegram.WebApp.close()
   }
   const onCloseError = () => {
      store.setErrorStatus(false)
   }
   return (
      <>
         {store.loading && <Loader />}
         {store.error && (
            <Error
               onClose={onCloseError}
               text={"ваша корзина пуста - добавьте\nв нее товары, чтобы перейти к\nследующему пункту"}
            />
         )}
         {store.products.map((product) => (
            <Products
               name={product.name}
               description={product.description}
               price={product.price}
               image={product.image}
               count={product.count}
               id={product._id}
               key={product._id}
            />
         ))}
         <Footer onNext={onNext} onBack={onBack} nextText={"дальше"} backText={"закрыть"} price={store.basketPrice()} />
      </>
   )
}

export default observer(MenuPage)
