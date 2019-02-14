var http = require('http');
var express = require('express');
var app = express();
app.use(express.static('public'));
var server = http.createServer(app);

//BoyDog module
var boydog = function(server) {
  var ShareDB = require('sharedb');
  var WebSocket = require('ws');
  var WebSocketJSONStream = require('websocket-json-stream');
  
  var scope = {};

  var backend = new ShareDB();
  var connection = backend.connect();

  var doc = connection.get('examples', 'randomABC');
  doc.fetch(function(err) {
    if (err) throw err;
    if (doc.type === null) {
      doc.create({ content: 'abc123' }, () => {
        console.log("created");
      });
      return;
    }
  });

  // Connect any incoming WebSocket connection to ShareDB
  var wss = new WebSocket.Server({ server });
  wss.on('connection', function(ws, req) {
    var stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
  });
  
  return { doc };
}

var boy = boydog(server);
console.log("boy", boy);

setInterval(function(){
  boy.doc.fetch();
  console.log(`doc ${ boy.doc.version } - ${ boy.doc.type.name } - ${ boy.doc.data.content }`);
}, 1000);

app.get("/test", function(req, res) {
  boy.doc.fetch();
  return res.json({ v: boy.doc.version, data: boy.doc.data });
});

app.get("/testChange", function(req, res) {
  boy.doc.fetch();
  
  var op = [{ p: ['content'], t: 'text0', o: [{ p: 0, i: 'XYZ' }] }];
  boy.doc.submitOp(op, (error) => {
      if (error) {
          console.error("err", error);
      } else {
          console.log('success');
      }
  });
        
        
  return res.json({ change: "ok" });
});

server.listen(7873);
console.log('Listening on http://localhost:7873');
