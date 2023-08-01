import { observer } from "mobx-react-lite"
import classes from "./Footer.module.css"
function Footer({ onNext, onBack, nextText, backText, price }) {
   return (
      <footer className={classes.footer}>
         <div className={classes.div}>
            <button className={classes.button_next} onClick={onNext}>
               {nextText}
            </button>
            <button className={classes.button_back} onClick={onBack}>
               {backText}
            </button>
            <p className={classes.price}>{price > 0 ? price + "Р" : ""}</p>
         </div>
      </footer>
   )
}

export default observer(Footer)
