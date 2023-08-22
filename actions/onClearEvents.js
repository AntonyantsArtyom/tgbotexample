const Event = require("../models/Event")
module.exports = {
   action: async () => {
      try {
         await Event.deleteMany({})
      } catch (error) {
         console.log(error)
      }
   },
}
