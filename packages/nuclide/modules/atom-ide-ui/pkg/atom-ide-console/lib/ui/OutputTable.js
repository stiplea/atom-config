"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _collection() {
  const data = require("../../../../../nuclide-commons/collection");

  _collection = function () {
    return data;
  };

  return data;
}

function _UniversalDisposable() {
  const data = _interopRequireDefault(require("../../../../../nuclide-commons/UniversalDisposable"));

  _UniversalDisposable = function () {
    return data;
  };

  return data;
}

function _nullthrows() {
  const data = _interopRequireDefault(require("nullthrows"));

  _nullthrows = function () {
    return data;
  };

  return data;
}

function _observableDom() {
  const data = require("../../../../../nuclide-commons-ui/observable-dom");

  _observableDom = function () {
    return data;
  };

  return data;
}

function _Hasher() {
  const data = _interopRequireDefault(require("../../../../../nuclide-commons/Hasher"));

  _Hasher = function () {
    return data;
  };

  return data;
}

var React = _interopRequireWildcard(require("react"));

function _List() {
  const data = _interopRequireDefault(require("react-virtualized/dist/commonjs/List"));

  _List = function () {
    return data;
  };

  return data;
}

var _rxjsCompatUmdMin = require("rxjs-compat/bundles/rxjs-compat.umd.min.js");

function _RecordView() {
  const data = _interopRequireDefault(require("./RecordView"));

  _RecordView = function () {
    return data;
  };

  return data;
}

function _recordsChanged() {
  const data = _interopRequireDefault(require("../recordsChanged"));

  _recordsChanged = function () {
    return data;
  };

  return data;
}

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
 * 
 * @format
 */

/* eslint-enable react/no-unused-prop-types */
// The number of extra rows to render beyond what is visible
const OVERSCAN_COUNT = 5;
const INITIAL_RECORD_HEIGHT = 21;

class OutputTable extends React.Component {
  // This is a <List> from react-virtualized (untyped library)
  // The currently rendered range.
  // LazyNestedValueComponent expects an expansionStateId which is a stable
  // object instance across renders, but is unique across consoles. We
  // technically support multiple consoles in the UI, so here we ensure these
  // references are local to the OutputTable instance.
  constructor(props) {
    super(props);
    this._renderedRecords = new Map();
    this._heights = new (_collection().DefaultWeakMap)(() => INITIAL_RECORD_HEIGHT);
    this._expansionStateIds = new (_collection().DefaultWeakMap)(() => ({}));
    this._heightChanges = new _rxjsCompatUmdMin.Subject();

    this._handleRef = node => {
      this._refs.next(node);
    };

    this._recomputeRowHeights = () => {
      // The react-virtualized List component is provided the row heights
      // through a function, so it has no way of knowing that a row's height
      // has changed unless we explicitly notify it to recompute the heights.
      if (this._list == null) {
        return;
      } // $FlowIgnore Untyped react-virtualized List component method


      this._list.recomputeRowHeights(); // If we are already scrolled to the bottom, scroll to ensure that the scrollbar remains at
      // the bottom. This is important not just for if the last record changes height through user
      // interaction (e.g. expanding a debugger variable), but also because this is the mechanism
      // through which the record's true initial height is reported. Therefore, we may have scrolled
      // to the bottom, and only afterwards received its true height. In this case, it's important
      // that we then scroll to the new bottom.


      if (this.props.shouldScrollToBottom()) {
        this.scrollToBottom();
      }
    };

    this._handleListRender = opts => {
      this._startIndex = opts.startIndex;
      this._stopIndex = opts.stopIndex;
    };

    this._getExecutor = id => {
      return this.props.getExecutor(id);
    };

    this._getProvider = id => {
      return this.props.getProvider(id);
    };

    this._renderRow = rowMetadata => {
      const {
        index,
        style
      } = rowMetadata;
      const record = this.props.records[index];
      const key = record.messageId != null ? `messageId:${record.messageId}` : `recordHash:${this._hasher.getHash(record)}`;
      return React.createElement("div", {
        key: key,
        className: "console-table-row-wrapper",
        style: style
      }, React.createElement(_RecordView().default // eslint-disable-next-line nuclide-internal/jsx-simple-callback-refs
      , {
        ref: view => {
          if (view != null) {
            this._renderedRecords.set(record, view);
          } else {
            this._renderedRecords.delete(record);
          }
        },
        getExecutor: this._getExecutor,
        getProvider: this._getProvider,
        record: record,
        expansionStateId: this._expansionStateIds.get(record),
        showSourceLabel: this.props.showSourceLabels,
        onHeightChange: this._handleRecordHeightChange
      }));
    };

    this._getRowHeight = ({
      index
    }) => {
      return this._heights.get(this.props.records[index]);
    };

    this._handleTableWrapper = tableWrapper => {
      this._wrapper = tableWrapper;
    };

    this._handleListRef = listRef => {
      const previousValue = this._list;
      this._list = listRef; // The child rows render before this ref gets set. So, if we are coming from
      // a state where the ref was null, we should ensure we notify
      // react-virtualized that we have measurements.

      if (previousValue == null && this._list != null) {
        this._heightChanges.next(null);
      }
    };

    this._handleResize = (height, width) => {
      if (height === this.state.height && width === this.state.width) {
        return;
      }

      this.setState({
        width,
        height
      }); // When this component resizes, the inner records will
      // also resize and potentially have their heights change
      // So we measure all of their heights again here

      this._renderedRecords.forEach(recordView => recordView.measureAndNotifyHeight());
    };

    this._handleRecordHeightChange = (record, newHeight) => {
      const oldHeight = this._heights.get(record);

      if (oldHeight !== newHeight) {
        this._heights.set(record, newHeight);

        this._heightChanges.next(null);
      }
    };

    this._onScroll = ({
      clientHeight,
      scrollHeight,
      scrollTop
    }) => {
      this.props.onScroll(clientHeight, scrollHeight, scrollTop);
    };

    this._disposable = new (_UniversalDisposable().default)();
    this._hasher = new (_Hasher().default)();
    this.state = {
      width: 0,
      height: 0
    };
    this._startIndex = 0;
    this._stopIndex = 0;
    this._refs = new _rxjsCompatUmdMin.Subject();

    this._disposable.add(this._heightChanges.subscribe(() => {
      // Theoretically we should be able to (trailing) throttle this to once
      // per render/paint using microtask, but I haven't been able to get it
      // to work without seeing visible flashes of collapsed output.
      this._recomputeRowHeights();
    }), this._refs.filter(Boolean).switchMap(node => new (_observableDom().ResizeObservable)((0, _nullthrows().default)(node)).mapTo(node)).subscribe(node => {
      const {
        offsetHeight,
        offsetWidth
      } = (0, _nullthrows().default)(node);

      this._handleResize(offsetHeight, offsetWidth);
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this._list != null && (0, _recordsChanged().default)(prevProps.records, this.props.records)) {
      // $FlowIgnore Untyped react-virtualized List method
      this._list.recomputeRowHeights();
    }

    if (prevProps.fontSize !== this.props.fontSize) {
      this._renderedRecords.forEach(recordView => recordView.measureAndNotifyHeight());
    }
  }

  componentWillUnmount() {
    this._disposable.dispose();
  }

  render() {
    return React.createElement("div", {
      className: "console-table-wrapper native-key-bindings",
      ref: this._handleRef,
      tabIndex: "1"
    }, this._containerRendered() ? React.createElement(_List().default // $FlowFixMe(>=0.53.0) Flow suppress
    , {
      ref: this._handleListRef,
      height: this.state.height,
      width: this.state.width,
      rowCount: this.props.records.length,
      rowHeight: this._getRowHeight,
      rowRenderer: this._renderRow,
      overscanRowCount: OVERSCAN_COUNT,
      onScroll: this._onScroll,
      onRowsRendered: this._handleListRender
    }) : null);
  }

  scrollToBottom() {
    if (this._list != null) {
      // $FlowIgnore Untyped react-virtualized List method
      this._list.scrollToRow(this.props.records.length - 1);
    }
  }

  _containerRendered() {
    return this.state.width !== 0 && this.state.height !== 0;
  }

}

exports.default = OutputTable;