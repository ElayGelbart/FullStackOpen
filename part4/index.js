const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require("./routes/blogs")
const mongoose = require('mongoose')
const mongoUrl = 'mongodb+srv://omer:omer12345@cluster0.chke2.mongodb.net/part4?retryWrites=true&w=majority'
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
const PORT = 3003
const listener = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
app.killServer = () => {
  listener.close()
}

module.exports = app;