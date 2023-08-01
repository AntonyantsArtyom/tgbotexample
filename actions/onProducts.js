const Product = require("../models/Product")

module.exports = {
   route: "/products",
   action: async (req, res) => {
      res.json(await Product.find())
   },
}
