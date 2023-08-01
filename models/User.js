const { Schema, default: mongoose } = require("mongoose")

const User = new Schema({
   id: { type: String, unique: true, require: true },
   father: { type: String, ref: "User", default: "None" },
   chat: { type: String },
   children: [{ type: String, ref: "User", default: [] }],
   weekPromotion: { type: Number },
   friendPromotion: { type: Number },
   basket: [{ type: Object }],
})

module.exports = mongoose.model("User", User, "users")
