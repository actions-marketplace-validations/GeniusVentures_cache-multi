import {Inputs, MultiInputs} from "../constants";

// See: https://github.com/actions/toolkit/blob/master/packages/core/src/core.ts#L67
function getInputName(name: string): string {
    return `INPUT_${name.replace(/ /g, "_").toUpperCase()}`;
}

export function setInput(name: string, value: string): void {
    process.env[getInputName(name)] = value;
}

interface CacheInput {
    path: string;
    key: string;
    restoreKeys?: string[];
}

interface CacheMultiInput {
    paths: string[][];
    keys: string[];
    restoreKeys?: string[][];
}

export function setInputs(input: CacheInput): void {
    setInput(Inputs.Path, input.path);
    setInput(Inputs.Key, input.key);
    input.restoreKeys &&
        setInput(Inputs.RestoreKeys, input.restoreKeys.join("\n"));
}

export function setMultiInputs(input: CacheMultiInput): void {
    setInput(MultiInputs.Paths, input.paths.map( strArray => JSON.stringify(strArray)).join("\n"));
    setInput(MultiInputs.Keys, input.keys.join("\n"));
    input.restoreKeys &&
    setInput(MultiInputs.RestoreKeys, input.restoreKeys.map( strArray => JSON.stringify(strArray)).join("\n"));
}

export function clearInputs(): void {
    delete process.env[getInputName(Inputs.Path)];
    delete process.env[getInputName(Inputs.Key)];
    delete process.env[getInputName(Inputs.RestoreKeys)];
    delete process.env[getInputName(Inputs.UploadChunkSize)];
}

export function clearMultiInputs(): void {
    delete process.env[getInputName(MultiInputs.Paths)];
    delete process.env[getInputName(MultiInputs.Keys)];
    delete process.env[getInputName(MultiInputs.RestoreKeys)];
    delete process.env[getInputName(MultiInputs.UploadChunkSize)];
}
