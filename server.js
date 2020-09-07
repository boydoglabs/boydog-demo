const http = require("http")
const express = require("express")
const boydog = require("boydog")
const port = 3090

const app = express()
app.use(express.static("static"))

// Init server
const server = http.createServer(app)

let scope = {
  word: "starting word",
  title: "initial title",
  subject: "random subject",
  thing: "red bold",
  data: {
    name: "John Doe",
    address: "74 Henry Road",
  },
}

boydog.init(scope, server)

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
