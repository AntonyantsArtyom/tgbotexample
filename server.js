const onMenu = require("./actions/onMenu")
const onStart = require("./actions/onStart")
const bot = require("./bot")
const express = require("express")
const consts = require("./consts")
const connectMongoose = require("./utils/connectMongoose")
const onProducts = require("./actions/onProducts")
const cors = require("cors")
const onBasket = require("./actions/onBasket")
const onUpdateBasket = require("./actions/onUpdateBasket")
const onDeliveryMessage = require("./actions/onDeliveryMessage")
const onPromotions = require("./actions/onPromotions")
const app = express()
const path = require("path")
const onFriendPromotion = require("./actions/onFriendPromotion")
const onWeekPromotion = require("./actions/onWeekPromotion")
const onGenerateGR = require("./actions/onGenerateGR")
const onUsePromotions = require("./actions/onUsePromotions")
const onDelete = require("./actions/onDelete")
const onUseQRPromotion = require("./actions/onUseQRPromotion")
const cron = require("node-cron")
const onRefreshPromotions = require("./actions/onRefreshPromotions")
const onFAQ = require("./actions/onFAQ")
const https = require("https")
const fs = require("fs")
const port = consts.port
/*
const sslServer = https.createServer(
   {
      key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
      cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
   },
   app
)
sslServer.listen(port, () => console.log(`порт защищенного сервера - ${port}`))
*/
app.listen(port, () => console.log(`порт сервера - ${port}`))
app.use(express.static(path.join(__dirname, "views/client/build/")))
app.use(express.static(path.join(__dirname, "views/client/public/images")))
app.use(express.json())
app.use(cors())
connectMongoose()

bot.onText(onStart.text, onStart.action)
bot.onText(onMenu.text, onMenu.action)
app.get(onProducts.route, onProducts.action)
app.get(onBasket.route, onBasket.action)
app.put(onUpdateBasket.route, onUpdateBasket.action)
app.post(onDeliveryMessage.route, onDeliveryMessage.action)
app.get(onPromotions.route, onPromotions.action)
app.get(onGenerateGR.route, onGenerateGR.action)
app.get(onUseQRPromotion.route, onUseQRPromotion.action)
app.get("*", (req, res) => res.sendFile(path.resolve("views/client/build/index.html")))

bot.on("callback_query", (msg) => {
   msg.data == onFriendPromotion.callback && onFriendPromotion.action(msg)
   msg.data == onFriendPromotion.callback2 && onFriendPromotion.action(msg)
   msg.data == onWeekPromotion.callback && onWeekPromotion.action(msg)
   msg.data == onUsePromotions.callback && onUsePromotions.action(msg)
   msg.data == onDelete.callback && onDelete.action(msg)
   msg.data == onFAQ.callback && onFAQ.action(msg)
})

cron.schedule("*/30 * * * *", () => {
   try {
      onRefreshPromotions.action()
   } catch (error) {}
})
