const User = require("../models/User")

module.exports = {
   route: "/updateBasket",
   action: async (req, res) => {
      res.json(await User.updateOne({ id: req.body.id }, { basket: req.body.basket }))
   },
}
