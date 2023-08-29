const Admin = require("../models/Admin")

module.exports = async (msg) => {
   const admin = await Admin.findOne({ id: msg.from.id })
   if (!admin) {
      return false
   }
   return true
}
