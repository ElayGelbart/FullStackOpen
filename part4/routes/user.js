const express = require("express")
const User = require("../models/user")
const crypto = require("crypto")
const usersRouter = express.Router();

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body
  try {
    if (!username || username.length < 3 || !name || !password || password.length < 3) {
      throw username
    }
    const findUsername = await User.find({ username: username });
    if (findUsername.length !== 0) {
      throw username
    }
    const hashPass = crypto.createHash("sha256").update(password).digest("hex");
    console.log(hashPass, "throw in hete")
    await User.insertMany({ username, name, password: hashPass })
    res.send()
  } catch (err) {
    res.status(400).send("inValid")
  }
})

module.exports = usersRouter