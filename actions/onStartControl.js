const consts = require("../consts")
const controlBot = require("../controlBot")
module.exports = {
   text: /\/start/,
   action: (msg, match) => {
      controlBot.sendMessage(
         msg.chat.id,
         "<b>проверка пройдена</b>\n\nотправьте боту любое сообщение и оно будет получено всеми пользователями бота @HeroesBurgersCoffee_bot",
         {
            parse_mode: "HTML",
         }
      )
   },
}
