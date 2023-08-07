const bot = require("../bot")
const User = require("../models/User")
module.exports = {
   action: async () => {
      for (const user of await User.find()) {
         try {
            const weeks = [15, 30, 40]
            const week = weeks[Math.floor(Math.random() * weeks.length)]
            const friend = user.children.length
            await User.updateOne(
               { id: user.id },
               {
                  weekPromotion: week,
                  friendPromotion: friend,
               }
            )
            try {
               bot.sendMessage(
                  user.chat,
                  `<b>бонусы были обновлены</b>\n\n<b>активные бонусы:</b>${
                     friend != 0 ? `\n-${friend}%` : ""
                  }\n-${week} рублей`,
                  {
                     parse_mode: "HTML",
                     reply_markup: {
                        inline_keyboard: [[{ text: "✅ ок", callback_data: "delete_message" }]],
                     },
                  }
               )
            } catch (error) {
               console.log(error)
            }
         } catch (error) {
            console.log(error)
         }
      }
   },
}
