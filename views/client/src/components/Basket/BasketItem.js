import classes from "./BasketItem.module.css"
import store from "../../store"
import { observer } from "mobx-react-lite"

function BasketItem({ name, id, image, count, price }) {
   const onCountChange = (event) => {
      if (price * event.target.value + "" == "NaN") event.target.value = event.target.value.replace(/[^0-9.]/g, "")
      event.target.value = event.target.value.replace(/-/, "")
      if (+document.querySelector("." + classes.count).value != 0)
         store.updateBasket("ADD|UPGRADE", {
            id: id,
            name: name,
            price: price,
            image: image,
            count: +event.target.value,
         })
   }
   const onDelete = () => {
      document.activeElement.blur()
      store.updateBasket("DELETE", id)
   }
   return (
      <div className={classes.item}>
         <img className={classes.image} src={store.server + "/" + image + ".svg"} />
         <p className={classes.name}>{name}</p>
         <p className={classes.count_description}>кол-во</p>
         <input className={classes.count} defaultValue={count} onChange={onCountChange} />
         <p className={classes.price_description}>в сумме</p>
         <p className={classes.price}>{count * price + "Р"}</p>
         <button className={classes.del_button} onClick={onDelete}>
            <img src={"images/trash.svg"} />
         </button>
      </div>
   )
}

export default observer(BasketItem)
