const bot = require("../bot")
module.exports = {
   callback: "FAQ",
   action: async (msg) => {
      try {
         bot.sendMessage(
            msg.message.chat.id,
            `<b>где находитесь?</b>\nВершинина, 309А\n\n<b>какой номер телефона?\n</b>895142999\n\n<b>какой режим работы?</b>\nПН-ПТ: 08:00-22:00\nСБ-ВС: 12:00-22:00`,
            {
               parse_mode: "HTML",
               reply_markup: {
                  inline_keyboard: [[{ text: "скрыть ❌", callback_data: "delete_message" }]],
               },
            }
         )
      } catch (error) {}
   },
}
