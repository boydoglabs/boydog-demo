const shareDB = require('sharedb/lib/client');
const stringBinding = require('sharedb-string-binding');
const reconnectingWebSocket = require('reconnecting-websocket');

var boydog = function(client) {
  if (!client) client = window.location.host;
  let socket = new reconnectingWebSocket('ws://' + client);
  let connection = new shareDB.Connection(socket);

  // Create local Doc instance mapped to 'examples' collection document with id 'textarea'
  let element = document.querySelector('input');
  let doc = connection.get('examples', 'randomABC');
  doc.subscribe(function(err) {
    if (err) throw err;
    
    let binding = new stringBinding(element, doc, ['content']);
    binding.setup();
  });
}

window.boydog = boydog;

