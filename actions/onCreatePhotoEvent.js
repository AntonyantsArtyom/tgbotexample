const { default: axios } = require("axios")
const bot = require("../bot")
const consts = require("../consts")
const controlBot = require("../controlBot")
const Event = require("../models/Event")
const User = require("../models/User")
const needle = require("needle")
const checkAdmin = require("../utils/checkAdmin")

module.exports = {
   action: async (msg) => {
      if (!(await checkAdmin(msg))) {
         return controlBot.sendMessage(msg.chat.id, "вы не найдены в базе администраторов бота")
      }
      let photo = await axios
         .get(
            `https://api.telegram.org/bot${consts.control_bot_token}/getFile?file_id=${
               msg.photo[msg.photo.length - 1].file_id
            }`
         )
         .then((data) => `https://api.telegram.org/file/bot${consts.control_bot_token}/${data.data.result.file_path}`)
      photo = await needle("get", photo)
      photo = photo.body
      const chats = await User.find().then((users) => users.map((user) => user.chat))
      let messages = []
      chats.forEach((chat) =>
         messages.push(
            bot
               .sendPhoto(chat, photo, { caption: msg.caption })
               .then((msg) => msg.message_id)
               .catch((error) => null)
         )
      )
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
