const bot = require("../bot")
module.exports = {
   callback: "week_promotion",
   action: async (msg) => {
      try {
         await bot.deleteMessage(msg.message.chat.id, msg.message.message_id)
         bot.sendMessage(
            msg.message.chat.id,
            `<b>бонус недели:</b>\n\n<b>обновляется:</b> каждый понедельник.\n<b>можно использовать:</b> 1 раз в неделю\n\nКаждую неделю вы получаете случайный бонус из списка:\nскидка в 15 рублей на заказ\nскидка в 30 рублей на заказ\nскидка в 40 рублей на заказ`,
            {
               parse_mode: "HTML",
               reply_markup: {
                  inline_keyboard: [
                     [
                        { text: "⬅️", callback_data: "friend_promotion" },
                        { text: "➡️", callback_data: "use_promotion" },
                     ],
                     [{ text: "скрыть ❌", callback_data: "delete_message" }],
                  ],
               },
            }
         )
      } catch (error) {}
   },
}
