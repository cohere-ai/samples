import type { Module } from '@swc/core';
/**
 * Extracts the value of an exported const variable named `exportedName`
 * (e.g. "export const config = { runtime: 'experimental-edge' }") from swc's AST.
 * The value must be one of (or throws UnsupportedValueError):
 *   - string
 *   - boolean
 *   - number
 *   - null
 *   - undefined
 *   - array containing values listed in this list
 *   - object containing values listed in this list
 *
 * Throws NoSuchDeclarationError if the declaration is not found.
 */
export declare function extractExportedConstValue(module: Module, exportedName: string): any;
/**
 * A wrapper on top of `extractExportedConstValue` that returns undefined
 * instead of throwing when the thrown error is known.
 */
export declare function tryToExtractExportedConstValue(module: Module, exportedName: string): any;
