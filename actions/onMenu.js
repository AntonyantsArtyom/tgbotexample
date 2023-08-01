const bot = require("../bot")
const consts = require("../consts")
const site = consts.site
module.exports = {
   text: /\/menu/,
   action: (msg, match) => {
      try {
         bot.sendMessage(msg.chat.id, "выберите нужный пункт", {
            reply_markup: {
               inline_keyboard: [
                  [{ text: "меню и доставка", web_app: { url: site + "/#/menu" } }],
                  [{ text: "система бонусов", callback_data: "friend_promotion_menu" }],
               ],
            },
         })
      } catch (error) {}
   },
}
