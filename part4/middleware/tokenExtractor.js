const express = require("express")

function tokenExtractor(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      next()
      return;
    }
    const UserJWT = authorization.split(" ")[1];
    req.token = UserJWT;
    console.log(req.token, "in middle");
    next();
    return;
  } catch (err) {
    next();
    return;
  }
}

module.exports = tokenExtractor;