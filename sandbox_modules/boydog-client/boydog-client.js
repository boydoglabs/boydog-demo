//Boydog client module

"use strict";

const shareDB = require("sharedb/lib/client");
const stringBinding = require("sharedb-string-binding");
const reconnectingWebSocket = require("reconnecting-websocket");
const utils = require("./utils.js");

var boydog = function(client) {
  var documentScope = {};
  var scope;

  if (!client) client = window.location.host;
  let socket = new reconnectingWebSocket("ws://" + client);
  let connection = new shareDB.Connection(socket);

  var restart = function() {
    utils.normalizeAll();

    var els = utils.getDogDOMElements();

    let attr = "dog-value";
    els[attr].each((i, domEl) => {
      let path = domEl.getAttribute(attr);

      documentScope[path] = connection.get("default", path);
      documentScope[path].subscribe(function(err) {
        if (err) throw err;

        let binding = new stringBinding(domEl, documentScope[path], [
          "content"
        ]);
        try {
          binding.setup();
        } catch (e) {
          if (e instanceof TypeError) {
            console.warn("BoyDog couldn't connect. Retrying in a few seconds.");
            setTimeout(function() {
              binding.setup(); //Try again if we couldn't bind tags
            }, 3000);
          }
        }
      });
    });
  };

  var attach = function(_scope) {
    scope = _scope || "html";
    restart();
  };

  return { scope, attach };
};

window.boydog = boydog;
