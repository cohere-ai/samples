"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parsePath = parsePath;
function parsePath(path) {
    const hashIndex = path.indexOf('#');
    const queryIndex = path.indexOf('?');
    if (queryIndex > -1 || hashIndex > -1) {
        return {
            pathname: path.substring(0, queryIndex > -1 ? queryIndex : hashIndex),
            query: queryIndex > -1 ? path.substring(queryIndex, hashIndex > -1 ? hashIndex : undefined) : '',
            hash: hashIndex > -1 ? path.slice(hashIndex) : ''
        };
    }
    return {
        pathname: path,
        query: '',
        hash: ''
    };
}

//# sourceMappingURL=parse-path.js.map