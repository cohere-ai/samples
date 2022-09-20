"use strict";
var _primitives = _interopRequireDefault(require("next/dist/compiled/@edge-runtime/primitives"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Polyfill Web Streams for the Node.js runtime.
if (!global.ReadableStream) {
    global.ReadableStream = _primitives.default.ReadableStream;
}
if (!global.TransformStream) {
    global.TransformStream = _primitives.default.TransformStream;
}

//# sourceMappingURL=node-polyfill-web-streams.js.map