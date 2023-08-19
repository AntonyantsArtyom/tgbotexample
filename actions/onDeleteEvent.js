const bot = require("../bot")
const controlBot = require("../controlBot")
const Event = require("../models/Event")
const User = require("../models/User")

module.exports = {
   callback: "delete_event",
   action: async (msg) => {
      const messages = await Event.findOne({ id: msg.message.message_id - 1 }).then((msg) => msg?.messages)
      if (messages == null) {
         controlBot.sendMessage(msg.message.chat.id, "<b>сообщение уже было удалено или срок для удаления истек</b>", {
            parse_mode: "HTML",
         })
         return 0
      }
      messages.forEach(async (message) => {
         for (const user of await User.find()) {
            try {
               await bot.deleteMessage(user.chat, message)
            } catch (error) {}
         }
      })
      controlBot.sendMessage(
         msg.message.chat.id,
         "<b>сообщение удалено - оно исчезло из рассылки всех пользователей</b>",
         { parse_mode: "HTML" }
      )
      await Event.findOneAndDelete({ id: msg.message.message_id - 1 })
   },
}
