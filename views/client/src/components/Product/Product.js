import { useEffect, useRef, useState } from "react"
import classes from "./Product.module.css"
import store from "../../store"
import { observer } from "mobx-react-lite"

function Products({ name, description, price, image, count, id }) {
   const [mode, setMode] = useState(count ? "in_basket" : "initial")
   const [lastMode, setLastMode] = useState(null)
   const [totalCount, setTotalCount] = useState(count)
   const [totalPrice, setTotalPrice] = useState(price * count + "" === "NaN" ? price : price * count)
   const onCountChange = (event) => {
      if (price * event.target.value + "" == "NaN") event.target.value = event.target.value.replace(/[^0-9.]/g, "")
      event.target.value = event.target.value.replace(/-/g, "")
      event.target.value = event.target.value.replace(/[\s.,%]/g, "")
      setTotalPrice(price * event.target.value)
   }
   const onToBasketClick = () => {
      setMode("adding")
      setLastMode("initial")
   }
   const onFinalClick = async () => {
      if (price * +countInput.current.value == 0) return 0
      await store.updateBasket("ADD|UPGRADE", {
         id: id,
         name: name,
         price: price,
         image: image,
         count: +countInput.current.value,
      })
      setTotalCount(+countInput.current.value)
      setMode("in_basket")
      setLastMode("adding")
   }
   const onChangeClick = () => {
      setTotalPrice(price)
      setMode("adding")
      setLastMode("in_basket")
   }
   const onBackClick = () => {
      setMode(lastMode)
   }
   const onDeleteClick = async () => {
      await store.updateBasket("DELETE", id)
      setTotalPrice(price)
      setMode("initial")
   }
   const countInput = useRef(0)
   return (
      <div className={classes.product}>
         {mode == "initial" && (
            <>
               <p className={classes.name}>{name}</p>
               <p className={classes.description}>{description}</p>
               <p className={classes.price}>{price + "Р"}</p>
               <button className={classes.button_toBasket} onClick={onToBasketClick}>
                  в корзину
               </button>
               <img className={classes.image} src={store.server + "/" + image + ".svg"} />
            </>
         )}
         {mode == "adding" && (
            <>
               <p className={classes.name}>{name}</p>
               <p className={classes.calculatedPrice}>{"в сумме " + totalPrice + "Р"}</p>
               <p className={classes.countInput_desc}>кол-во</p>
               <input className={classes.countInput} defaultValue={1} onChange={onCountChange} ref={countInput} />
               <button className={classes.button_toBasket} onClick={onFinalClick}>
                  принять
               </button>
               <button className={classes.button_Back} onClick={onBackClick}>
                  отмена
               </button>
               <img className={classes.image} src={store.server + "/" + image + ".svg"} />
            </>
         )}
         {mode == "in_basket" && (
            <>
               <p className={classes.name}>{name}</p>
               <p className={classes.count_inBasket}>{"в корзине " + totalCount}</p>
               <p className={classes.price_inBasket}>{"на сумму " + totalPrice + "Р"}</p>
               <button className={classes.button_Change} onClick={onChangeClick}>
                  изменить
               </button>
               <button className={classes.button_Delete} onClick={onDeleteClick}>
                  удалить
               </button>
               <img className={classes.image} src={store.server + "/" + image + ".svg"} />
            </>
         )}
      </div>
   )
}

export default observer(Products)
