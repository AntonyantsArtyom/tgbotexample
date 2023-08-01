import { observer } from "mobx-react-lite"
import store from "../../store"
import classes from "./DeliveryArea.module.css"

function DeliveryArea({ promotions, oldPrice, newPrice }) {
   const onChangeAdres = (event) => store.setDeliveryData("adres", event.target.value)
   const onChangePhone = (event) => store.setDeliveryData("phone", event.target.value)
   const onChangeTime = (event) => store.setDeliveryData("time", event.target.value)
   const onChangeAdditional = (event) => store.setDeliveryData("additional", event.target.value)
   return (
      <div className={classes.area}>
         <p className={classes.head}>доставка</p>
         <p className={classes.adres_d}>адрес</p>
         <input className={classes.adres} placeholder={"Вершинина, 45"} onChange={onChangeAdres} />
         <p className={classes.phone_d}>номер телефона</p>
         <input className={classes.phone} placeholder={"895140099375"} onChange={onChangePhone} />
         <p className={classes.time_d}>время</p>
         <input className={classes.time} placeholder={"как можно скорее"} onChange={onChangeTime} />
         <p className={classes.description}>{"после оформления доставки мы\nпозвоним для ее подтверждения"}</p>
         <p className={classes.additional_d}>дополнительная информация</p>
         <textarea
            className={classes.additional}
            placeholder={"у меня аллергия на лук, можете не добавлять его"}
            onChange={onChangeAdditional}
         />
         {promotions.week !== null && promotions.friend !== null && oldPrice !== 0 && (
            <>
               <p className={classes.friend_p}>{`бонус за друзей -${promotions.friend}%`}</p>
               <p className={classes.week_p}>{`бонус недели -${promotions.week}Р`}</p>
               <p className={classes.old_price}>{oldPrice + "Р"}</p>
               <p className={classes.new_price}>{newPrice + "Р"}</p>
            </>
         )}
      </div>
   )
}

export default observer(DeliveryArea)
