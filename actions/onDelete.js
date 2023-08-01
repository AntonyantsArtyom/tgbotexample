const bot = require("../bot")
module.exports = {
   callback: "delete_message",
   action: async (msg) => {
      try {
         await bot.deleteMessage(msg.message.chat.id, msg.message.message_id)
      } catch (error) {}
   },
}
