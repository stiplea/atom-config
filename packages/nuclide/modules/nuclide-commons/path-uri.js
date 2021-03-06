"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pathToUri = pathToUri;
exports.uriToPath = uriToPath;

function _vscodeUri() {
  const data = _interopRequireDefault(require("vscode-uri"));

  _vscodeUri = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 *  strict
 * @format
 */
function pathToUri(path) {
  return _vscodeUri().default.file(path).toString();
}

function uriToPath(uri) {
  return _vscodeUri().default.parse(uri).fsPath;
}