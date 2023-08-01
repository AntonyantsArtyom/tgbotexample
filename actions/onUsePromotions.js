const bot = require("../bot")
const qr = require("qrcode")
const User = require("../models/User")
module.exports = {
   callback: "use_promotion",
   action: async (msg) => {
      try {
         await bot.deleteMessage(msg.message.chat.id, msg.message.message_id)
         const user = await User.findOne({ id: msg.from.id })
         const text = `<b>заказ доставки через бота:</b> бонусы применяются автоматически\n\n<b>заказ в заведении:</b> для использования бонусов покажите QR-код официанту\n\nне переходите по QR-коду сами, иначе ваши бонусы будут списаны${
            user.weekPromotion != 0
               ? `\n\n<b>активные бонусы:</b>${user.friendPromotion != 0 ? `\n-${user.friendPromotion}%` : ""}\n-${
                    user.weekPromotion
                 } рублей`
               : ""
         }`
         bot.sendPhoto(
            msg.message.chat.id,
            await qr.toBuffer(`http://localhost4000/useQRPromotions/${msg.from.id}`, { margin: 5, size: 5 }),
            {
               caption: text,
               parse_mode: "HTML",
               reply_markup: {
                  inline_keyboard: [
                     [{ text: "⬅️ назад", callback_data: "week_promotion" }],
                     [{ text: "❌ скрыть", callback_data: "delete_message" }],
                  ],
               },
            }
         )
      } catch (error) {}
   },
}
