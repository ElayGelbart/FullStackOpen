const express = require("express")
const User = require("../models/user")
const crypto = require("crypto")
const usersRouter = express.Router();

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body
  try {
    if (!username || !name || !password) {
      throw username
    }
    const hashPass = crypto.createHash("sha256").update(password).digest("hex");
    await User.insertOne({ username, name, hashPass })
    res.send()
  } catch (err) {
    res.status(400).send("inValid")
  }
})

module.exports = usersRouter