# TODO

```tsx
<AutoComplete>
    <AutoCompleteInput prefixCls={prefixCls} disabled={disabled} value={value} defaultValue={defaultValue} placeholder={placeholder} autoFocus={autoFocus} tabIndex={tabIndex} onFocus={onFocus} onBlur={onBlur} onChange={onChange} />
    <SelectDropdown prefixCls={prefixCls} empty={empty} visible={visible} placeholder={empyPlaceholder} dropdownRef={dropdownRef} scrollwrapRef={scrollwrapRef} />
</AutoComplete>
```

-   与`select`对比, AutoCompolete 主要是通过搜索来获取内容, `select`主要是固定内容的选择
-   input 改变可以节流

## 差别

-   选择 Option, 和 selectInner 离开焦点后, input 搜索框的值被清空, Autocomplete 不应该清空
-   AutoComplete 的值只能是字符串, 搜索输入框也只是字符串， 选中后的值也是字符串
-   点击 selectInner 弹出下拉列表 应该由一个 props 去控制这个行为
-   Select 是很多固定选项, 只能从这些固定选项中选中，输入不匹配的搜索， 离开焦点就会被清空
-   弹出框严重问题， 再对齐时溢出则反转这个逻辑需要更换， 应为如果上下都溢出，就会显示不全，如果反转后放的下就反转，否则应该将弹出框高度设定为剩余高度, 并且要设定的元素需要自定义!!!

AutoComplete 里的 optionCfgs 是缓存的, 如果已经选中了, 哪怕 options 里空了, 还是能正确显示 label.

-   AutoComplete 没有内容则 点击输入框不会弹出 dropdown
-   仅有 dataSource 没有 filterOption 筛选, 则不是查询模式
-   AutoComplete 的内容可以提供自定义 Input, 用来自定义 搜索输入框的样式
-   自带节流函数
