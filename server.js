const http = require("http")
const express = require("express")
const boydog = require("boydog")
const bodyParser = require("body-parser")
const port = 3090

const app = express()
app.use(express.static("static"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/exampleGetScope", (req, res) => {
  return res.json(scope)
})

// Init server
const server = http.createServer(app)

let scope = {
  word: "starting word",
  title: "initial title",
  subject: "random subject",
  thing: "red bold",
  number: "0",
  data: {
    name: "John Doe",
    address: "74 Henry Road",
  },
}

// Server write example
setInterval(() => {
  scope.number = String(Math.random())
}, 250)

boydog.init(scope, server)

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
