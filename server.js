var http = require("http");
var express = require("express");
var app = express();
var server = http.createServer(app);
var port = 7873;
var boydog = require("boydog");
var boy = boydog(server);

//Boydog init
var scope = {
  word: "abc",
  title: "qwe",
  random: "iop",
  subject: "starting, subject",
};

boy.attach(scope);

app.use(express.static("public"));

app.get("/restart", function(req, res) {
  boy.restart();

  return res.json({ ok: true });
});

app.get("/scope", function(req, res) {
  
  return res.json({ val: scope.word });
});

server.listen(port);
console.log("Listening on http://localhost:" + port);
