const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  title: { type: String, required: true, unique: true },
  // looking into 
  duration: { type: String, required: true },
  info: String,
  date: { type: Date, default: Date.now }
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
