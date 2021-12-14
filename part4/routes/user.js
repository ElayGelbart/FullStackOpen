const express = require("express")
const User = require("../models/user")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const JWTSECRET = "shhhhh"
const usersRouter = express.Router();

usersRouter.post("/signup", async (req, res) => {
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
    await User.insertMany({ username, name, password: hashPass })
    res.send()
  } catch (err) {
    res.status(400).send("inValid")
  }
})

usersRouter.post("/login", async (req, res) => {
  const { username, password } = req.body

  try {
    if (!username || username.length < 3 || !password || password.length < 3) {
      throw username
    }
    console.log(username, "blogs and notes");
    const findUsername = await User.find({ username: username });
    if (findUsername.length === 0) {
      throw username
    }
    const hashPass = crypto.createHash("sha256").update(password).digest("hex");
    if (hashPass !== findUsername[0].password) {
      throw username
    }
    const userJwt = jwt.sign({ username }, JWTSECRET, { expiresIn: "1h" })
    console.log(userJwt, "hereeeeasd")
    res.cookie("JWT", userJwt, { maxAge: 1021031 })
    res.send()
  } catch (err) {
    res.status(400).send("inValid")
  }
})

module.exports = usersRouter