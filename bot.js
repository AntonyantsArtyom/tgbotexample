const TelegramBot = require("node-telegram-bot-api")
const consts = require("./consts")
const token = consts.bot_token
const bot = new TelegramBot(token, { polling: true, interval: 300 })

module.exports = bot
