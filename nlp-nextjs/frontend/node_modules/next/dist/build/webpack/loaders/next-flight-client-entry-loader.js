"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = transformSource;
var _constants = require("../../../lib/constants");
async function transformSource() {
    let { modules , runtime , ssr  } = this.getOptions();
    if (!Array.isArray(modules)) {
        modules = modules ? [
            modules
        ] : [];
    }
    return modules.map((request)=>`import(/* webpackMode: "eager" */ '${request}')`).join(";") + `
    export const __next_rsc__ = {
      server: false,
      __webpack_require__
    };
    export default function RSC() {};
    ` + // Currently for the Edge runtime, we treat all RSC pages as SSR pages.
    (runtime === _constants.SERVER_RUNTIME.edge ? "export const __N_SSP = true;" : ssr ? `export const __N_SSP = true;` : `export const __N_SSG = true;`);
}

//# sourceMappingURL=next-flight-client-entry-loader.js.map