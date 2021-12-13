const express = require('express')
const app = express()
const cors = require('cors')
const apiRouter = require("./routes/api")
const mongoose = require('mongoose')
const mongoUrl = 'mongodb+srv://omer:omer12345@cluster0.chke2.mongodb.net/part4?retryWrites=true&w=majority'
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use("/api", apiRouter)
const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app;