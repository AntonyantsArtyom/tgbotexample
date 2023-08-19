const controlBot = require("../controlBot")

module.exports = {
   callback: "delete_message",
   action: async (msg) => {
      try {
         await controlBot.deleteMessage(msg.message.chat.id, msg.message.message_id)
      } catch (error) {}
   },
}
