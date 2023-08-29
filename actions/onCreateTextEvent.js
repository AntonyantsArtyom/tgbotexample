const bot = require("../bot")
const consts = require("../consts")
const controlBot = require("../controlBot")
const Event = require("../models/Event")
const User = require("../models/User")
const checkAdmin = require("../utils/checkAdmin")

module.exports = {
   action: async (msg) => {
      if (!(await checkAdmin(msg))) {
         return controlBot.sendMessage(msg.chat.id, "вы не найдены в базе администраторов бота")
      }
      const chats = await User.find().then((users) => users.map((user) => user.chat))
      let messages = []
      chats.forEach(async (chat, index) => {
         messages.push(
            bot
               .sendMessage(chat, msg.text)
               .then((msg) => msg.message_id)
               .catch((error) => null)
         )
      })
      messages = await Promise.all(messages)
      await new Event({
         id: msg.message_id,
         messages: messages.filter((message) => message != null),
      }).save()
      controlBot.sendMessage(
         msg.chat.id,
         "рассылка завершена, для удаления отправленной рассылки нажмите кнопку ниже\n\n‼️ вы можете удалить сообщения рассылки только до конца недели, в которую их отправили",
         {
            reply_markup: {
               inline_keyboard: [[{ text: "удалить сообщения ❌", callback_data: "delete_event" }]],
            },
         }
      )
   },
}
