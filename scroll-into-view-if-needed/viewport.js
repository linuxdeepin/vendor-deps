"use strict";

exports.__esModule = true;
exports.default = void 0;
var viewport;

var _default = function _default() {
  var doc = document;

  if (!viewport) {
    viewport = doc.compatMode !== 'CSS1Compat' && doc.scrollingElement || doc.documentElement;
  }

  return viewport;
};

exports.default = _default;
module.exports = exports["default"];