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
const onGenerateQR = require("./actions/onGenerateQR")
const onUsePromotions = require("./actions/onUsePromotions")
const onDelete = require("./actions/onDelete")
const onUseQRPromotion = require("./actions/onUseQRPromotion")
const cron = require("node-cron")
const onRefreshPromotions = require("./actions/onRefreshPromotions")
const onFAQ = require("./actions/onFAQ")
const https = require("https")
const fs = require("fs")
const onPing = require("./actions/onPing")
const controlBot = require("./controlBot")
const onStartControl = require("./actions/onStartControl")
const onDeleteInControl = require("./actions/onDeleteInControl")
const onCreateTextEvent = require("./actions/onCreateTextEvent")
const onDeleteEvent = require("./actions/onDeleteEvent")
const onCreatePhotoEvent = require("./actions/onCreatePhotoEvent")
const onClearEvents = require("./actions/onClearEvents")
const port = consts.port

app.listen(port, () => console.log(`порт сервера - ${port}`))
app.use(express.static(path.join(__dirname, "views/client/build/")))
app.use(express.static(path.join(__dirname, "views/client/public/images")))
app.use(express.json())
app.use(
   cors({ "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS" })
)
connectMongoose()
bot.onText(onStart.text, onStart.action)
bot.onText(onMenu.text, onMenu.action)
app.get(onProducts.route, onProducts.action)
app.get(onBasket.route, onBasket.action)
app.put(onUpdateBasket.route, onUpdateBasket.action)
app.post(onDeliveryMessage.route, onDeliveryMessage.action)
app.get(onPromotions.route, onPromotions.action)
app.get(onGenerateQR.route, onGenerateQR.action)
app.get(onUseQRPromotion.route, onUseQRPromotion.action)
app.get(onPing.route, onPing.action)
app.get("*", (req, res) => res.sendFile(path.resolve("views/client/build/index.html")))

bot.on("callback_query", (msg) => {
   msg.data == onFriendPromotion.callback && onFriendPromotion.action(msg)
   msg.data == onFriendPromotion.callback2 && onFriendPromotion.action(msg)
   msg.data == onWeekPromotion.callback && onWeekPromotion.action(msg)
   msg.data == onUsePromotions.callback && onUsePromotions.action(msg)
   msg.data == onDelete.callback && onDelete.action(msg)
   msg.data == onFAQ.callback && onFAQ.action(msg)
})

controlBot.onText(onStartControl.text, onStartControl.action)
controlBot.on("callback_query", (msg) => {
   msg.data == onDeleteEvent.callback && onDeleteEvent.action(msg)
})
controlBot.on("text", (msg) => onStartControl.text.test(msg.text) == false && onCreateTextEvent.action(msg))
controlBot.on("photo", onCreatePhotoEvent.action)

cron.schedule("*/30 * * * *", () => onRefreshPromotions.action())
cron.schedule("* */1 * * *", () => onClearEvents.action())
