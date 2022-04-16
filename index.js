const fs = require('fs');
const prettier = require("prettier");
const chokidar = require('chokidar');
const _ = require('lodash')

let oldFile = '';

function VitePrettier(option) {
    return {
        name: 'vite-plugin-prettier',
        apply: 'serve', // 只在开发阶段执行
        configResolved() {
            let FSWatcher = chokidar
                .watch('.', {
                    ignored: ['**/node_modules/**', '**/.git/**'],
                    ignoreInitial: true,
                })
                .on('change', _.debounce(path => {
                    if (path == 'vite.config.js') {
                        FSWatcher.close()
                    };
                    let fileStr = fs.readFileSync(path, 'utf8');
                    if (fileStr == oldFile) return;
                    const prettierSource = prettier.format(fileStr, {
                        filepath: path,
                        ...option,
                    });
                    fs.writeFile(path, prettierSource, 'utf8', (err) => {
                        if (err) { return console.log(err); }
                        oldFile = prettierSource;
                    });
                }, 200));
        },
    }
}
module.exports = VitePrettier;