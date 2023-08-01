const bot = require("../bot")
module.exports = {
   callback: "friend_promotion",
   callback2: "friend_promotion_menu",
   action: async (msg) => {
      try {
         msg.data == "friend_promotion" && (await bot.deleteMessage(msg.message.chat.id, msg.message.message_id))
         bot.sendMessage(
            msg.message.chat.id,
            `<b>бонус за приглашение</b>\n\n<b>обновляется:</b> каждый понедельник.\n<b>можно использовать:</b> 1 раз в неделю\n\nприглашайте в бота пользователей, чтобы получить скидку на заказ.\n\n+1% к скидке за пользователя.\nМаксимальная скидка - 5%\n\nhttps://t.me/HeroesBurgersCoffee_bot?start=${msg.from.id} - ссылка для приглашения, как только пользователь перейдет по ней и запустит бота, будет считаться, что вы его пригласили`,
            {
               parse_mode: "HTML",
               reply_markup: {
                  inline_keyboard: [
                     [{ text: "дальше ➡️", callback_data: "week_promotion" }],
                     [{ text: "скрыть ❌", callback_data: "delete_message" }],
                  ],
               },
            }
         )
      } catch (error) {}
   },
}
