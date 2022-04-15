const fs = require('fs');
const prettier = require("prettier");

function VitePrettier(option) {
    return {
        name: 'vite-plugin-prettier',
        apply: 'serve', // 只在开发阶段执行
        handleHotUpdate({ read, modules }) {
            read().then(res => {
                if (modules.length) {
                    const prettierSource = prettier.format(res, {
                        filepath: modules[0].id,
                        ...option
                    });
                    setTimeout(() => {
                        fs.writeFileSync(modules[0].id, prettierSource, 'utf8');
                    }, 200);
                }
            })
        }
    }
}
module.exports = VitePrettier;