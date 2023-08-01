const User = require("../models/User")

module.exports = {
   route: "/promotions/:id",
   action: async (req, res) => {
      const user = await User.findOne({ id: req.params.id })
      res.json({ week: user.weekPromotion, friend: user.friendPromotion })
   },
}
