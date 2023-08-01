import { observer } from "mobx-react-lite"
import classes from "./Basket.module.css"
import BasketItem from "./BasketItem"

function Basket({ products }) {
   return (
      <div className={classes.basket}>
         <p className={classes.head}>корзина</p>
         {products.map((product) => (
            <BasketItem
               name={product.name}
               count={product.count}
               image={product.image}
               price={product.price}
               id={product.id}
               key={product.id}
            />
         ))}
      </div>
   )
}

export default observer(Basket)
