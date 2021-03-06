"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createProcessStream = createProcessStream;

function _process() {
  const data = require("../../../modules/nuclide-commons/process");

  _process = function () {
    return data;
  };

  return data;
}

function _featureConfig() {
  const data = _interopRequireDefault(require("../../../modules/nuclide-commons-atom/feature-config"));

  _featureConfig = function () {
    return data;
  };

  return data;
}

var _os = _interopRequireDefault(require("os"));

function _nuclideUri() {
  const data = _interopRequireDefault(require("../../../modules/nuclide-commons/nuclideUri"));

  _nuclideUri = function () {
    return data;
  };

  return data;
}

var _rxjsCompatUmdMin = require("rxjs-compat/bundles/rxjs-compat.umd.min.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * 
 * @format
 */
const VALID_UDID = /^[a-f0-9-]+$/i;

function createProcessStream() {
  const currentDeviceUdids = (0, _process().observeProcess)('bash', ['-c', WATCH_CURRENT_UDID_SCRIPT], {
    /* TODO(T17353599) */
    isExitError: () => false
  }).catch(error => _rxjsCompatUmdMin.Observable.of({
    kind: 'error',
    error
  })) // TODO(T17463635)
  .map(event => {
    if (event.kind === 'error') {
      throw event.error;
    } else if (event.kind === 'exit' && event.exitCode !== 0) {
      throw new Error('Error getting active iOS Simulator');
    }

    return event;
  }).filter(event => event.kind === 'stdout').map(event => {
    if (!(typeof event.data === 'string')) {
      throw new Error("Invariant violation: \"typeof event.data === 'string'\"");
    }

    return event.data;
  }).map(output => output.trim()).filter(udid => VALID_UDID.test(udid)).distinctUntilChanged(); // Whenever the current device changes, start tailing that device's logs.

  return currentDeviceUdids.switchMap(udid => {
    const logDir = _nuclideUri().default.join(_os.default.homedir(), 'Library', 'Logs', 'CoreSimulator', udid, 'asl');

    return (0, _process().observeProcess)(_featureConfig().default.get('nuclide-ios-simulator-logs.pathToSyslog'), ['-w', '-F', 'xml', '-d', logDir], {
      /* TODO(T17353599) */
      isExitError: () => false
    }).catch(error => _rxjsCompatUmdMin.Observable.of({
      kind: 'error',
      error
    })) // TODO(T17463635)
    .map(event => {
      if (event.kind === 'error') {
        throw event.error;
      }

      return event;
    }).filter(event => event.kind === 'stdout').map(event => {
      if (!(typeof event.data === 'string')) {
        throw new Error("Invariant violation: \"typeof event.data === 'string'\"");
      }

      return event.data;
    });
  });
} // A small shell script for polling the current device UDID. This allows us to avoid spawning a new
// process every interval.


const WATCH_CURRENT_UDID_SCRIPT = `
  set -e;
  while true; do
    defaults read com.apple.iphonesimulator CurrentDeviceUDID;
    sleep 2;
  done;
`;