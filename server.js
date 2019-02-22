var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var boydog = require('boydog');
var boy = boydog(server);

app.use(express.static('public'));

setInterval(function() {
  boy.doc.fetch();
  console.log(`doc ${ boy.doc.version } - ${ boy.doc.type.name } - ${ boy.doc.data.content }`);
}, 10000);

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