"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputGroup = void 0;

function _classnames() {
  const data = _interopRequireDefault(require("classnames"));

  _classnames = function () {
    return data;
  };

  return data;
}

var React = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

/**
 * Visually groups Buttons/inputs passed in as children.
 * Unlike <ButtonGroup> this currently **requires that all children have equal
 * height (corresponding `size` props)**
 */
const InputGroup = props => {
  const {
    children,
    className
  } = props;
  const newClassName = (0, _classnames().default)(className, 'nuclide-input-group');
  return (// $FlowFixMe(>=0.53.0) Flow suppress
    React.createElement("div", {
      className: newClassName
    }, children)
  );
};

exports.InputGroup = InputGroup;