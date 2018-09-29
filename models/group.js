const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  title: { type: String, required: true, unique: true },
  duration: { type: String, required: true },
  info: String,
  buyIn: { type: Number, required: true },
  numberOfParticipants: Number,
  totalPot: Number,
  // totalPot: this.buyIn * this.numberOfParticipants,
  dateCreated: { type: Date, default: Date.now }
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
