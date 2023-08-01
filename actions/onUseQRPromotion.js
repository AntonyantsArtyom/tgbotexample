const bot = require("../bot")
const User = require("../models/User")

module.exports = {
   route: "/useQRPromotions/:id",
   action: async (req, res) => {
      try {
         const user = await User.findOne({ id: req.params.id })
         if (user?.weekPromotion == 0) return res.json("нет бонусов")
         if (!user) {
            return res.json("не найден пользователь")
         }
         await User.updateOne({ id: req.params.id }, { weekPromotion: 0, friendPromotion: 0 })
         bot.sendMessage(user.chat, "<b>бонусы применены</b>\n\nбонусы вновь станут доступны в следующий понедельник", {
            parse_mode: "HTML",
            reply_markup: {
               inline_keyboard: [[{ text: "✅ ок", callback_data: "delete_message" }]],
            },
         })
         res.json("бонусы применены")
      } catch (error) {}
   },
}
