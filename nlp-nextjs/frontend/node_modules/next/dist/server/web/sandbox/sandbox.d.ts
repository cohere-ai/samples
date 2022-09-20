import type { RequestData, FetchEventResult } from '../types';
import type { WasmBinding } from '../../../build/webpack/loaders/get-module-build-info';
export declare const ErrorSource: unique symbol;
declare type RunnerFn = (params: {
    name: string;
    env: string[];
    onWarning: (warn: Error) => void;
    paths: string[];
    request: RequestData;
    useCache: boolean;
    wasm: WasmBinding[];
}) => Promise<FetchEventResult>;
export declare const run: RunnerFn;
export {};
