const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "user must have username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "user must have password"],
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.passwordCheck = async function (password, iptPassword) {
  return await bcrypt.compare(iptPassword, password);
};

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
