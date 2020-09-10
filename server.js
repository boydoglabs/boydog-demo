const http = require("http")
const express = require("express")
const boydog = require("boydog")
const bodyParser = require("body-parser")
const port = 3090

const app = express()
app.use(express.static("static"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.all("/debugScope", async (req, res) => {
  return res.json(scope) // Debug scope with latest values
})

// Init server
const server = http.createServer(app)

let scope = {
  word: "starting word",
  title: "initial title",
  subject: "random subject",
  thing: "red bold",
  counter: 0,
  data: {
    name: "John Doe",
    address: "74 Henry Road",
  },
}

// Counter example
let diff = 1
setInterval(() => {
  if (scope.counter >= 3) diff = -1
  if (scope.counter <= 0) diff = +1
  scope.counter = parseInt(scope.counter) + diff
}, 1000)

boydog.init(scope, server)

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
