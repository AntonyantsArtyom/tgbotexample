const consts = require("../consts")
const controlBot = require("../controlBot")
const Admin = require("../models/Admin")
const checkAdmin = require("../utils/checkAdmin")
module.exports = {
   text: /\/start/,
   action: async (msg, match) => {
      if (!(await checkAdmin(msg))) {
         return controlBot.sendMessage(msg.chat.id, "вы не найдены в базе администраторов бота")
      }
      controlBot.sendMessage(
         msg.chat.id,
         "<b>проверка пройдена</b>\n\nотправьте боту любое сообщение и оно будет получено всеми пользователями бота @HeroesBurgersCoffee_bot",
         {
            parse_mode: "HTML",
         }
      )
   },
}
