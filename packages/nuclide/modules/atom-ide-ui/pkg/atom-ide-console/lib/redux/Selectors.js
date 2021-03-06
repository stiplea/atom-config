"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllRecords = getAllRecords;
exports.getCurrentExecutorId = getCurrentExecutorId;

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 *  strict-local
 * @format
 */
function getAllRecords(state) {
  const {
    records,
    incompleteRecords
  } = state;
  return records.concat(incompleteRecords);
}

function getCurrentExecutorId(state) {
  let {
    currentExecutorId
  } = state;

  if (currentExecutorId == null) {
    const firstExecutor = Array.from(state.executors.values())[0];
    currentExecutorId = firstExecutor && firstExecutor.id;
  }

  return currentExecutorId;
}