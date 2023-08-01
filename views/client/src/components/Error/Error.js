import { observer } from "mobx-react-lite"
import classes from "./Error.module.css"
function Error({ text, onClose }) {
   return (
      <>
         <div className={classes.shadow} />
         <div className={classes.error}>
            <p className={classes.text}>{text}</p>
            <button className={classes.button} onClick={onClose}>
               ок
            </button>
         </div>
      </>
   )
}

export default observer(Error)
