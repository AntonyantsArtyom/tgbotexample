const User = require("../models/User")

module.exports = {
   route: "/basket/:id",
   action: async (req, res) => {
      res.json(await User.findOne({ id: req.params.id }).then((data) => data.basket))
   },
}
