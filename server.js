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
  thing: "red bold",
  detectText: "lowercase",
  data: {
    name: "John Doe",
    address: "74 Henry Road"
  }
};

var logic = {
  _write: function(val, isMonitor) { //TODO: Implement `isMonitor` boolean to avoid stackoverflows
    return (val === "uppercase") ? val.toUpperCase() : val;
  }
}

boy.attach(scope, logic);

app.use(express.static("public"));

//Testing routes
app.get("/testScopeChangeFromServer", (req, res) => {
  scope.word = "Changes";
  scope.title = "From";
  scope.subject = "Server";

  return res.json({
    done:
      "Some fields have been changed from the server. These values should be now visible to all users."
  });
});

server.listen(port);
console.log("Listening on http://localhost:" + port);
