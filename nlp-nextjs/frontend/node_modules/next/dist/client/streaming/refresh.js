"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useRefreshRoot = useRefreshRoot;
exports.RefreshContext = void 0;
var _react = require("react");
const RefreshContext = (0, _react).createContext((_props)=>{});
exports.RefreshContext = RefreshContext;
function useRefreshRoot() {
    return (0, _react).useContext(RefreshContext);
}

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=refresh.js.map