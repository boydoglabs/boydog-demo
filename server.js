var http = require("http");
var express = require("express");
var app = express();
var server = http.createServer(app);
var port = 7873;
var boydog = require("boydog");
var boy = boydog(server);

app.use(express.static("public"));

app.get("/restart", function(req, res) {
  boy.restart();

  return res.json({ ok: true });
});

app.get("/test", function(req, res) {
  return res.json({ test: "ok" });
});

//Boydog init
var scope = {
  word: "abc",
  title: "qwe",
  random: "iop"
};

boy.attach(scope);

server.listen(port);
console.log("Listening on http://localhost:" + port);
