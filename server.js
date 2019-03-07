var http = require("http");
var express = require("express");
var app = express();
var server = http.createServer(app);
var port = 3090;
var boydog = require("boydog");
var boy = boydog(server);

//Boydog init
var scope = {
  word: "starting word",
  title: "initial title",
  subject: "random subject",
  data: {
    name: "John Doe",
    address: "7431 Henry Smith Rd. Coventry, RI 02816"
  }
};

boy.attach(scope);

app.use(express.static("public"));

server.listen(port);
console.log("Listening on http://localhost:" + port);
