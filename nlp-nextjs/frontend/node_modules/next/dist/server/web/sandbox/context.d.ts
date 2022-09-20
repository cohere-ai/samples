/// <reference types="node" />
import type { Primitives } from 'next/dist/compiled/@edge-runtime/primitives';
import type { WasmBinding } from '../../../build/webpack/loaders/get-module-build-info';
import { EdgeRuntime } from 'next/dist/compiled/edge-runtime';
/**
 * For a given path a context, this function checks if there is any module
 * context that contains the path with an older content and, if that's the
 * case, removes the context from the cache.
 */
export declare function clearModuleContext(path: string, content: Buffer | string): void;
interface ModuleContextOptions {
    moduleName: string;
    onWarning: (warn: Error) => void;
    useCache: boolean;
    env: string[];
    wasm: WasmBinding[];
}
/**
 * For a given module name this function will get a cached module
 * context or create it. It will return the module context along
 * with a function that allows to run some code from a given
 * filepath within the context.
 */
export declare function getModuleContext(options: ModuleContextOptions): Promise<{
    evaluateInContext: (filepath: string) => void;
    runtime: EdgeRuntime<Primitives>;
    paths: Map<string, string>;
    warnedEvals: Set<string>;
}>;
export {};
