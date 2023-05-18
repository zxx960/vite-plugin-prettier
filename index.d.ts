import {  Plugin } from 'vite';
import { RequiredOptions } from 'prettier'

interface WatchOptions {
    watchDirs?: string[];
    ignoreDirs?: string[];
}


declare function vuePlugin(rawOptions?: RequiredOptions, watchOptions: WatchOptions): Plugin;

export { vuePlugin as default };
