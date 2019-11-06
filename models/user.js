const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  avatar: {
    type: String,
    default: "https://www.w3schools.com/w3images/avatar2.png"
  },
  name: { type: String, default: "" },
  gender: { type: String }
});

module.exports = User;
