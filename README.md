| ![IE](https://github.com/alrra/browser-logos/blob/master/src/edge/edge_48x48.png?raw=true) | ![Chrome](https://github.com/alrra/browser-logos/blob/master/src/chrome/chrome_48x48.png?raw=true) | ![Firefox](https://github.com/alrra/browser-logos/blob/master/src/firefox/firefox_48x48.png?raw=true) | ![Opera](https://github.com/alrra/browser-logos/blob/master/src/opera/opera_48x48.png?raw=true) | ![Safari](https://github.com/alrra/browser-logos/blob/master/src/safari/safari_48x48.png?raw=true) |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| IE 10+ ✔                                                                                   | Chrome 31.0+ ✔                                                                                     | Firefox 31.0+ ✔                                                                                       | Opera 30.0+ ✔                                                                                   | Safari 7.0+ ✔                                                                                      |

![NPM version](http://img.shields.io/npm/v/xy-autocomplete.svg?style=flat-square)
![node version](https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square)
![npm download](https://img.shields.io/npm/dm/xy-autocomplete.svg?style=flat-square)

[![xy-autocomplete](https://nodei.co/npm/xy-autocomplete.png)](https://npmjs.org/package/xy-autocomplete)

# xy-autocomplete

联想输入组件。

## 特性

-   [x] 支持方向键上下导航，并且跳过禁用的。
-   [x] 支持 backfill 盘输入完再回填, 对中文输入很有效。
-   [x] 支持过滤 Option。
-   [x] 设置 delay 节流毫秒
-   [x] 自定义渲染选项
-   [x] 自定义输入框组件

## 安装

```bash
# yarn
yarn add xy-autocomplete utils-hooks utils-dom xy-empty xy-select classnames
```

## 使用例子

```tsx
import React from "react";
import ReactDOM from "react-dom";
import AutoComplete from "xy-autocomplete";
const mockData = [{ label: "三全鲜食（北新泾店）", value: "长宁区新渔路144号" }, { label: "Hot honey 首尔炸鸡（仙霞路）", value: "上海市长宁区淞虹路661号" }, { label: "新旺角茶餐厅", value: "上海市普陀区真北路988号创邑金沙谷6号楼113" }];
ReactDOM.render(<AutoComplete dataSource={mockData} />, container);
```

## API

### AutoComplete

| 属性            | 说明                                         | 类型                                           | 默认值 |
| --------------- | -------------------------------------------- | ---------------------------------------------- | ------ |
| children        | 自定义 Input 搜索框                          | React.ReactNode                                | 无     |
| popupClassName  | 弹出内容类名                                 | string                                         | 无     |
| stretch         | 下拉列表是否宽度与输入框宽度对齐             | boolean                                        | true   |
| backfill        | 是否键盘输入完再回填                         | boolean                                        | false  |
| empyPlaceholder | 内容占位符, 下拉内容为空时提示文本           | string                                         | 无     |
| filter          | 过滤 option 本, 返回 true 则过滤             | (cfg: OptionConfig, search: string) => boolean | 无     |
| delay           | 防抖毫秒                                     | number                                         | 200    |
| dataSource      | 数据源                                       | OptionConfig[] / string[] / React.ReactNode    | 无     |
| customItem      | 自定义渲染                                   | (props: CustomItemProps) => JSX.Element        | 无     |
| onChange        | 改变回调, 搜索内容改变和选中建议选项都会触发 | (value: string) => void                        | 无     |
| onSearch        | 搜索回调, 搜索内容改变触发                   | (value: string) => void                        | 无     |
| onSelect        | 选择回调, 选中建议选项都会触发               | (value: string, cfg: OptionConfig) => void     | 无     |

### AutoCompleteInput

| 属性               | 说明               | 类型                                                                 | 默认值 |
| ------------------ | ------------------ | -------------------------------------------------------------------- | ------ |
| disabled           | 是否禁用           | boolean                                                              | false  |
| value              | 输入框值           | string                                                               | 无     |
| defaultValue       | 输入框默认值       | string                                                               | 无     |
| placeholder        | 占位符文本         | string                                                               | 无     |
| autoFocus          | 自动焦点           | boolean                                                              | 无     |
| onFocus            | 输入框焦点事件     | (e: React.FocusEvent<HTMLInputElement>) => void                      | 无     |
| onBlur             | 输入框失去焦点事件 | (e: React.FocusEvent<HTMLInputElement>) => void                      | 无     |
| onKeyDown          | 键盘事件           | (e: React.KeyboardEvent<HTMLInputElement>) => void                   | 无     |
| onChange           | 输入框 change 事件 | (value: string, event?: React.ChangeEvent<HTMLInputElement>) => void | 无     |
| onCompositionStart | 开始输入中文       | (e: React.CompositionEvent<HTMLInputElement>) => void                | 无     |
| onCompositionEnd   | 输入中文完毕       | (e: React.CompositionEvent<HTMLInputElement>) => void                | 无     |

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
