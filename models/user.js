const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  uid: { type: String, required: true, unique: true },
  // looking into 
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  emailVerified: { type: Boolean, required: true },
  date: { type: Date, default: Date.now },
  photoURL: { type: String, required: false },
  joinedGroups: {}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

//this.state.user.uid