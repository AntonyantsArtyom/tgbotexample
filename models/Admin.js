const { Schema, default: mongoose } = require("mongoose")

const Admin = new Schema({
   id: { type: String, unique: true, require: true },
})

module.exports = mongoose.model("Admin", Admin, "admins")
