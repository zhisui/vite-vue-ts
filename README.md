# Vue 2.7 + Typescript + Vite

## vscode

.vscode文件夹中放了推荐的插件和配置,需要参考 https://code.visualstudio.com/docs/editor/extension-marketplace#_workspace-recommended-extensions
安装推荐的插件

## settings.js

public下存放了`settings.js`用作配置文件,需要注意这个配置文件不会进行编译,所以这个`settings.js`中只能写es5的js代码

## 包管理器

按顺序推荐pnpm > npm >= yarn,不要使用**cnpm**
推荐使用ni进行安装

## 安装依赖

```sh
$ npm i @antfu/ni -g
$ ni --frozen
```

### 编译及热重载（开发环境）

```sh
# 运行定义在 package.json scripts 中的 `serve` 命令
$ nr serve
```

### 编译并最小化文件（用于生产环境）

```sh
$ nr build
```
## elementUI和iview组件引入说明

为了减少打包体积，该项目采用按需引入的方式引入UI组件,为了不用在每个组件中都写引入语句，将
引入的代码写在了src/uiComponent目录中，按需添加即可
## @suc/ui-components

标准页组件库

```
// 可以通过一下命令之一打开简要文档,已经变量修改器
pnpm run custom-theme-web
yarn custom-theme-web
npm run custom-theme-web
```

## vxe-table

复杂表格需求可以使用,例如树型表格,虚拟滚动表格,滚动无限加载,表头合并,单元格编辑等
vue2需要看v3版本文档 https://vxetable.cn/v3/#/table/start/install

## @suc/simple-echarts

echarts需要使用@suc/simple-echarts这个基于vue-echarts修改的组件库 https://cnpm.sucsoft.com/package/@suc/simple-echarts

## unplugin-auto-import

使用了`unplugin-auto-import`插件来生成全局导入,所以不需要在`.vue`文件中再导入`ref`,`watch`,`useRouter`等语法,可以直接使用

```vue
// 示例
<script lang="ts" setup>
const model = ref(false);
</script>
```

## vite-plugin-http2,vite-plugin-mkcert

配置插件,方便在本地开发时使用https+http2突破浏览器的单个域同时只能发起6个请求的限制,减少调试页面打开时间.
需要注意初次启动是需要输入管理员密码,或者以管理员身份运行,因为插件会添加一个自行生成的https正式到操作系统中

## 注意

`@antfu/utils@0.6.1`存在bug,所以在`package.json`中锁定了版本,并且需要使用`npm i`安装依赖

## vscode 工作空间配置
以下配置添加后可以动态提示变量或者参数的类型,不需要鼠标移上去才知道类型.看个人喜好添加
```json
{
  "typescript.inlayHints.enumMemberValues.enabled": true,
  "typescript.inlayHints.functionLikeReturnTypes.enabled": true,
  "typescript.inlayHints.parameterNames.enabled": "all",
  "typescript.inlayHints.propertyDeclarationTypes.enabled": true,
  "typescript.inlayHints.parameterTypes.enabled": true,
  "typescript.inlayHints.variableTypes.enabled": true,
  "javascript.inlayHints.functionLikeReturnTypes.enabled": true,
  "javascript.inlayHints.enumMemberValues.enabled": true,
  "javascript.inlayHints.parameterTypes.enabled": true,
  "javascript.inlayHints.propertyDeclarationTypes.enabled": true,
  "javascript.inlayHints.parameterNames.enabled": "all",
  "javascript.inlayHints.variableTypes.enabled": true,
}
```


