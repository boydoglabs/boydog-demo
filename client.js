var sharedb = require('sharedb/lib/client');
var StringBinding = require('sharedb-string-binding');

// Open WebSocket connection to ShareDB server
const WebSocket = require('reconnecting-websocket');
var socket = new WebSocket('ws://' + window.location.host);
var connection = new sharedb.Connection(socket);

var element = document.querySelector('input');

// Create local Doc instance mapped to 'examples' collection document with id 'textarea'
var doc = connection.get('examples', 'randomABC');
doc.subscribe(function(err) {
  if (err) throw err;
  
  var binding = new StringBinding(element, doc, ['content']);
  binding.setup();
});
