#### 更简单的使用prettier
在开发项目中经常使用prettier,但是prettier的配置颇为麻烦，如果在vscode中使用需要先
- 安装vscode插件
- 配置prettierrc.js文件
- 项目package.json中写入依赖
- 还要切换编辑器的默认格式化插件，设置保存自动格式化
- 这些东西表面上看是呈离散状态的，给新手使用造成很大的困惑，如果我们把prettier集成在vite插件中会不会更简单一些呢
#### 安装

```
npm i vite-plugin-prettier  或者  yarn add vite-plugin-prettier
```
#### 使用
在 vite.config.js文件中引入插件

```javascript
import VitePrettier from 'vite-plugin-prettier'
export default defineConfig({
  plugins: [
    VitePrettier({
      singleQuote: true,// 字符串是否使用单引号
      //...更多规则
    })
  ],
})
```
#### 插件特点
- 保存自动格式化
- 无需安装编辑器插件
- 无需配置.prettierrc.js
- 无需在项目package.json写入prettier依赖
- 反正什么都不需要，只需要安装这个插件就行了