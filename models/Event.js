const { Schema, default: mongoose } = require("mongoose")

const Event = new Schema({
   id: { type: String, unique: true, require: true },
   messages: [{ type: String }],
})

module.exports = mongoose.model("Events", Event, "events")
