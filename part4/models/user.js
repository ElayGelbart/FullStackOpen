const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  password: String,
  // blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

const User = mongoose.model('User', userSchema)

module.exports = User;