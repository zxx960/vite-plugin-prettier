const fs = require('fs');
const prettier = require("prettier");
const chokidar = require('chokidar');
const _ = require('lodash')

const FileCache = {};

function VitePrettier(option, watchOptions={}) {
    let { watchDirs=[], ignoreDirs=[] } = watchOptions;
    watchDirs = ['vite.config.js', 'vite.config.ts', 'src/']
    let FSWatcher
    return {
        name: 'vite-plugin-prettier',
        enforce: 'pre',
        apply: 'serve', // 只在开发阶段执行
        configureServer(server){
            server.httpServer.on('close', function(){
                FSWatcher.close()
            })
        },
        config() {
            FSWatcher = chokidar
                .watch(watchDirs, {
                    ignored: ignoreDirs,
                    ignoreInitial: true,
                })
                .on('change', _.debounce(path => {
                    FileCache[path] = FileCache[path] || {};
                    let fileStr = fs.readFileSync(path, 'utf8');
                    if (fileStr == FileCache[path].file || FileCache[path].parsing) return;
                    FileCache[path].parsing = true;
                    const prettierSource = prettier.format(fileStr, {
                        filepath: path,
                        ...option,
                    });
                    fs.writeFile(path, prettierSource, 'utf8', (err) => {
                        if (err) { return console.log(err); }
                        FileCache[path].parsing = false;
                        FileCache[path].file = prettierSource;
                    });
                }, 200));
        },
    }
}
module.exports = VitePrettier;