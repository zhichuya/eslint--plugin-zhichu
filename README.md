# eslint--plugin-zhichu

结合开发中发现的一些问题，而开发的eslint插件来做静态代码检查。

### 规则目录

1. no-type-prefix 在ts开发中不推荐类型名称带前缀"T"、"I"、"E" 备注：因人而异，有的人习惯带"T"、"I"、"E"前缀比如java程序员
2. no-float-computation 不允许对浮点数进行数学运算，因为浮点数进行数学运算会导致精度丢失等情况
3. no-promise-reject-object 不允许在表单校验函数中通过Promise.reject()直接传入对象，这可能会导致错误信息丢失，推荐传入new Error（）
4. recommend-use-optional-chain 在开发中通过解构赋值声明的变量在访问其属性或者方法时推荐使用?.可选链访问防止出现undefined、null等的意外情况

### 使用步骤

#### 1、安装：

```shell
# npm 方式
npm install '@eslint-plugin-zhichu'

# yarn
yarn add '@eslint-plugin-zhichu'
```

#### 2、配置

在.eslintrc.js文件中使用规则即可，如：

```js
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:eslint-plugin/recommended",
    "plugin:node/recommended",
    "@eslint-plugin-zhichu:recommended" // 开发的插件
  ],
  env: {
    node: true,
  },
  overrides: [
    {
      files: ["tests/**/*.js"],
      env: { mocha: true },
    },
  ],
};
```
