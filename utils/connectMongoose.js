const { default: mongoose } = require("mongoose")
const consts = require("../consts")

module.exports = () => {
   mongoose
      .set("strictQuery", false)
      .connect(consts.db_url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log("база данных подключена"))
}
