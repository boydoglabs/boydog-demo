"use strict";

const $ = require("cash-dom");
const _ = require("lodash");
const allAttributes = [
  "dog-id",
  "dog-class",
  "dog-value",
  "dog-html",
  "dog-click"
];

//Get All [dog-value, dog-id, etc] as DOM elements
var getDogDOMElements = function() {
  let found = {};

  allAttributes.forEach(attr => {
    let el = $(`[${attr}]`);
    if (el.length === 0) return;
    found[attr] = el;
  });

  return found;
};

//Normalize all dog attributes like "user[2].name" to "user>2>name" to avoid issues when trying to access fields like "user.2.name"
var normalizeAll = function() {
  let els = getDogDOMElements();

  Object.keys(els).forEach(attrName => {
    els[attrName].each((k, el) => {
      let newAttr = _.toPath($(el).attr(attrName)).join(">");

      $(el).attr(attrName, newAttr);
    });
  });
};

module.exports = { normalizeAll, getDogDOMElements };
