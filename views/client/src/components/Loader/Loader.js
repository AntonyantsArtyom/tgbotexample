import { observer } from "mobx-react-lite"
import classes from "./Loader.module.css"
function Loader() {
   return (
      <>
         <div className={classes.shadow}>
            <div className={classes.loader} />
         </div>
      </>
   )
}

export default observer(Loader)
