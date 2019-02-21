//BoyDog server module

"use strict";

module.exports = function(server) {
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