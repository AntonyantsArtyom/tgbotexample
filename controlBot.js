const TelegramBot = require("node-telegram-bot-api")
const consts = require("./consts")
const control__token = consts.control_bot_token
const controlBot = new TelegramBot(control__token, { polling: true, interval: 300 })

module.exports = controlBot
