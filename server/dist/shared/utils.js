"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distinctByProperty = void 0;
exports.distinctByProperty = (arr, objKey) => arr.reduce((acc, curr) => acc.some(a => a[objKey] === curr[objKey])
    ? acc
    : [...acc, curr], []);
//# sourceMappingURL=utils.js.map