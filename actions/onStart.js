const bot = require("../bot")
const consts = require("../consts")
const User = require("../models/User")

module.exports = {
   text: /\/start (.+)|\/start/,
   action: async (msg, match) => {
      try {
         bot.sendPhoto(
            msg.chat.id,
            "https://kartinkin.net/uploads/posts/2021-07/1625772730_17-kartinkin-com-p-burger-makdonalds-yeda-krasivo-foto-19.jpg",
            {
               caption:
                  "Здравствуйте, рады видеть вас в нашем боте. Через бота можно заказать доставку, узнать об акциях, получить доступ к системе бонусов",
               parse_mode: "HTML",
               reply_markup: {
                  inline_keyboard: [
                     [{ text: "меню и доставка", web_app: { url: consts.site + "/#/menu" } }],
                     [{ text: "система бонусов", callback_data: "friend_promotion_menu" }],
                     [{ text: "частые вопросы", callback_data: "FAQ" }],
                  ],
               },
            }
         )
         if (!(await User.findOne({ id: msg.from.id }))) {
            await new User({
               id: msg.from.id,
               chat: msg.chat.id,
               father: await User.findOne({ id: match[1] }).then((data) => data?.id),
               children: [],
               basket: [],
               weekPromotion: 0,
               friendPromotion: 0,
            }).save()
            if ((await User.findOne({ id: match[1] })) && match[1] != msg.from.id) {
               const children = await User.findOne({ id: match[1] }).then((data) => data.children)
               await User.updateOne({ id: match[1] }, { children: [...children, msg.from.id] })
               bot.sendMessage(
                  await User.findOne({ id: match[1] }).then((data) => data.chat),
                  "кто-то перешел в бота по вашей ссылке. бонус за приглашения изменен",
                  {
                     parse_mode: "HTML",
                     reply_markup: {
                        inline_keyboard: [[{ text: "✅ ок", callback_data: "delete_message" }]],
                     },
                  }
               )
            }
         }
      } catch (error) {
         console.log(error)
      }
   },
}
