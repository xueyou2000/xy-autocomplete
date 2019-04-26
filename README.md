# xy-autocomplete

---

[![NPM version][npm-image]][npm-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/xy-autocomplete.svg?style=flat-square
[npm-url]: http://npmjs.org/package/xy-autocomplete
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/xy-autocomplete.svg?style=flat-square
[download-url]: https://npmjs.org/package/xy-autocomplete

> 基于`React Hooks` + `typescript`的基础组件

## 安装

[![xy-autocomplete](https://nodei.co/npm/xy-autocomplete.png)](https://npmjs.org/package/xy-autocomplete)

| ![IE](https://github.com/alrra/browser-logos/blob/master/src/edge/edge_48x48.png?raw=true) | ![Chrome](https://github.com/alrra/browser-logos/blob/master/src/chrome/chrome_48x48.png?raw=true) | ![Firefox](https://github.com/alrra/browser-logos/blob/master/src/firefox/firefox_48x48.png?raw=true) | ![Opera](https://github.com/alrra/browser-logos/blob/master/src/opera/opera_48x48.png?raw=true) | ![Safari](https://github.com/alrra/browser-logos/blob/master/src/safari/safari_48x48.png?raw=true) |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| IE 10+ ✔                                                                                   | Chrome 31.0+ ✔                                                                                     | Firefox 31.0+ ✔                                                                                       | Opera 30.0+ ✔                                                                                   | Safari 7.0+ ✔                                                                                      |

```sh
# npm
npm install --save xy-autocomplete utils-hooks utils-dom xy-empty xy-select classnames

# yarn
yarn add xy-autocomplete utils-hooks utils-dom xy-empty xy-select classnames
```

## 使用

```tsx
import React from "react";
import ReactDOM from "react-dom";
import AutoComplete from "xy-autocomplete";
const mockData = [{ label: "三全鲜食（北新泾店）", value: "长宁区新渔路144号" }, { label: "Hot honey 首尔炸鸡（仙霞路）", value: "上海市长宁区淞虹路661号" }, { label: "新旺角茶餐厅", value: "上海市普陀区真北路988号创邑金沙谷6号楼113" }];
ReactDOM.render(<AutoComplete dataSource={mockData} />, container);
```

## 开发

```sh
yarn run start
```

## 例子

http://localhost:6006

## 测试

```
yarn run test
```

## 开源许可

xy-autocomplete is released under the MIT license.
