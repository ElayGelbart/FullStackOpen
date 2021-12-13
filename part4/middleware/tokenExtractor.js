const express = require("express")
const jwt = require("jsonwebtoken")
const JWTSECRET = "shhhhh"

function tokenExtractor(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      next()
      return;
    }
    const UserJWT = authorization.split(" ")[1];
    req.token = UserJWT;
    const cookieUserObj = jwt.verify(UserJWT, JWTSECRET);
    req.user = cookieUserObj.username
    console.log(req.user, "username");
    next();
    return
  } catch (err) {
    next();
    return;
  }
}

module.exports = tokenExtractor;