var shareDB = require('sharedb/lib/client');
var stringBinding = require('sharedb-string-binding');
const rWebSocket = require('reconnecting-websocket');

window.dog = { shareDB, stringBinding, rWebSocket };