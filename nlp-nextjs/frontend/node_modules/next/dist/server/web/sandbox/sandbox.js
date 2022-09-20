"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.run = exports.ErrorSource = void 0;
var _middleware = require("next/dist/compiled/@next/react-dev-overlay/dist/middleware");
var _context = require("./context");
const ErrorSource = Symbol("SandboxError");
exports.ErrorSource = ErrorSource;
const run = withTaggedErrors(async (params)=>{
    const { runtime , evaluateInContext  } = await (0, _context).getModuleContext({
        moduleName: params.name,
        onWarning: params.onWarning,
        useCache: params.useCache !== false,
        env: params.env,
        wasm: params.wasm
    });
    for (const paramPath of params.paths){
        evaluateInContext(paramPath);
    }
    const subreq = params.request.headers[`x-middleware-subrequest`];
    const subrequests = typeof subreq === "string" ? subreq.split(":") : [];
    if (subrequests.includes(params.name)) {
        return {
            waitUntil: Promise.resolve(),
            response: new runtime.context.Response(null, {
                headers: {
                    "x-middleware-next": "1"
                }
            })
        };
    }
    return runtime.context._ENTRIES[`middleware_${params.name}`].default({
        request: params.request
    });
});
exports.run = run;
/**
 * Decorates the runner function making sure all errors it can produce are
 * tagged with `edge-server` so they can properly be rendered in dev.
 */ function withTaggedErrors(fn) {
    return (params)=>{
        return fn(params).then((result)=>{
            var ref;
            return {
                ...result,
                waitUntil: result == null ? void 0 : (ref = result.waitUntil) == null ? void 0 : ref.catch((error)=>{
                    throw (0, _middleware).getServerError(error, "edge-server");
                })
            };
        }).catch((error)=>{
            throw (0, _middleware).getServerError(error, "edge-server");
        });
    };
}

//# sourceMappingURL=sandbox.js.map