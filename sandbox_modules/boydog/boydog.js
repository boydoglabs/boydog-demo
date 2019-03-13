//BoyDog server module

"use strict";

module.exports = function(server) {
  const fs = require("fs");
  var path = require("path");
  var ShareDB = require("sharedb");
  var WebSocket = require("ws");
  var WebSocketJSONStream = require("websocket-json-stream");
  const _ = require("lodash");
  const ejs = require("ejs");
  const puppeteer = require("puppeteer");
  const createHash = require("hash-generator");
  var backend = new ShareDB();
  var connection = backend.connect();

  //Boydog variables
  var monitor;
  var documentScope = {};
  var options = {
    monitorBasicAuth: createHash(32) //Set a hard to guess hash
  };
  //Scope vars
  var scope;
  var _scope = {}; //The scope mirror that retains actual values as a flat object

  //Add "/boydog-client" as an express Express route
  server._events.request.get("/boydog-client", function(req, res) {
    return res.sendFile("/boydog-client/build/boydog-client.js", {
      root: __dirname + "/.." //Get to "node_modules" folder
    });
  });

  //Add "/boydog-monitor/..." as an express Express route
  server._events.request.get("/boydog-monitor/:monitorBasicAuth", function(
    req,
    res
  ) {
    if (req.params.monitorBasicAuth !== options.monitorBasicAuth)
      return res.redirect("/");

    let getFieldsArray = (root, pre) => {
      if (!pre) {
        pre = "";
      }
      return _.flattenDeep(
        _.map(root, (v, k) => {
          if (_.isObjectLike(v)) {
            return [pre + k].concat(getFieldsArray(v, pre + k + ">"));
          }
          return pre + k;
        })
      );
    };
    let scopeArray = getFieldsArray(scope);

    fs.readFile(
      path.join(__dirname, "/monitor/default-monitor.ejs"),
      "utf8",
      (err, contents) => {
        if (err || !contents)
          return res.status(500).send("Error. Monitor file not found.");
        return res.send(ejs.render(contents, { scopeArray }));
      }
    );
  });

  //Connect any incoming WebSocket connection to ShareDB
  var wss = new WebSocket.Server({ server });
  wss.on("connection", function(ws, req) {
    var stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
  });

  var restart = async function() {
    console.warn("Restarting boy without Puppeteer");

    /*let hasTitle = await monitor.title();
    if (!hasTitle) return;*/

    if (!_.isPlainObject(scope))
      throw new Error("Scope must be a plain object.");

    const iterateScope = (root, prePath) => {
      if (!prePath) prePath = [];

      _.each(root, (value, path) => {
        let fullPath = prePath.concat([path]).join(">");

        if (_.isPlainObject(root[path])) {
          //If current field is {} or []
          documentScope[fullPath] = connection.get("default", fullPath); //Create document connection
          //Try to fetch the document, otherwise create it
          documentScope[fullPath].fetch(err => {
            if (err) throw err;

            if (documentScope[fullPath].type === null) {
              documentScope[fullPath].create(
                { content: JSON.stringify(value) },
                err => {
                  if (err) throw err;

                  _scope[fullPath] = JSON.stringify(value);
                }
              );

              return;
            }
          });

          prePath.push(path);
          iterateScope(root[path], prePath);
        } else if (_.isString(root[path])) {
          //If current field is "" or ''
          documentScope[fullPath] = connection.get("default", fullPath); //Create document connection
          //Try to fetch the document, otherwise create it
          documentScope[fullPath].fetch(err => {
            if (err) throw err;

            if (documentScope[fullPath].type === null) {
              documentScope[fullPath].create({ content: value }, err => {
                if (err) throw err;

                _scope[fullPath] = value;
                //Subscribe to operation events and update "scope" accordingly
                documentScope[fullPath].subscribe(err => {
                  if (err) throw err;

                  documentScope[fullPath].on("op", (op, source) => {
                    //Get latest value
                    documentScope[fullPath].fetch(err => {
                      if (err) throw err;

                      //Update _scope for the field itself
                      _scope[fullPath] = documentScope[fullPath].data.content;

                      //Check if it is a child of a parent and then update parent
                      let parents = fullPath.split(">");
                      parents.pop(); //Take out the current field (it has been already updated above)
                      if (parents.length > 0) {
                        //Has parents that need an update

                        let parentPath = parents.join(">");
                        _scope[parentPath] = JSON.stringify(scope[parentPath]);
                        let jsonV = _scope[parentPath];

                        /*monitor.evaluate(
                          (parentPath, jsonV) => {
                            let el = document.querySelector(
                              `[dog-value=${parentPath}]`
                            );
                            el.value = jsonV;
                            el.dispatchEvent(new Event("input")); //Trigger a change
                          },
                          parentPath,
                          jsonV
                        );*/
                      }
                    });
                  });
                });

                //Define scope getters & setters
                Object.defineProperty(root, path, {
                  set: v => {
                    /*monitor.evaluate(
                      (fullPath, v) => {
                        let el = document.querySelector(
                          `[dog-value=${fullPath}]`
                        );
                        el.value = v;
                        el.dispatchEvent(new Event("input")); //Trigger a change
                      },
                      fullPath,
                      v
                    );*/
                    
                    return v;
                  },
                  get: v => {
                    return _scope[fullPath];
                  }
                });
              });

              return;
            }
          });
        }
      });
    };

    iterateScope(scope);
  };

  var attach = function(_scope) {
    if (!_scope) return;
    console.info(
      `Restarting boy, monitor is available at /boydog-monitor/${
        options.monitorBasicAuth
      }`
    );

    scope = _scope;

    /*(async () => {
      const browser = await puppeteer.launch({ args: ['--no-sandbox'], headless: true });
      monitor = await browser.newPage();
      await monitor.goto(
        `http://localhost:${
          server._connectionKey.split("::::")[1]
        }/boydog-monitor/${options.monitorBasicAuth}`
      );
      restart();
    })();*/
    
    restart();
  };

  return { scope, attach, restart };
};
