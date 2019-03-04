var http = require("http");
var express = require("express");
var app = express();
var server = http.createServer(app);
var port = 7873;
var boydog = require("boydog");
var boy = boydog(server);

//Boydog init
var scope = {
  word: "starting word",
  title: "initial title",
  subject: "random subject"
};

boy.attach(scope);

app.use(express.static("public"));

server.listen(port);
console.log("Listening on http://localhost:" + port);
