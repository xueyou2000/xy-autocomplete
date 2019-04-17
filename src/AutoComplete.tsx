import classNames from "classnames";
import React, { useRef } from "react";
import { Dropdown, SelectContext, useNnavigate, useOptions, useVisible } from "xy-select";
import AutoCompleteInput from "./AutoCompleteInput";
import useValue from "./Hooks/useValue";
import { AutoCompleteProps } from "./interface";
import Suggest from "./Suggest";
import "xy-select/assets/index.css";

// TODO: #1 给children自定义输入框

export function AutoComplete(props: AutoCompleteProps) {
    const { prefixCls = "xy-autocomplete", className, popupClassName, stretch = true, style, children, filter, dataSource = [], empyPlaceholder, customItem, onChange, onSearch, ...inputProps } = props;
    const ref = useRef();
    const dropdownRef = useRef();
    const empty = !dataSource || (dataSource instanceof Array && dataSource.length <= 0);
    const [visible, setVisible, toggleVisible, align] = useVisible(ref, dropdownRef, props.disabled, stretch);
    const [options, onOptionAdd, onOptionRemove, getOptionCfg, cacheSelectCfg] = useOptions(false);
    const [value, setValue, onSelect] = useValue(props, setVisible, cacheSelectCfg);
    const [focusValue, handleKeyDown, scrollwrapRef] = useNnavigate(options, value, onSelect, setVisible);

    const classString = classNames(prefixCls, className, {
        [`${prefixCls}-visible`]: false,
        [`${prefixCls}-disabled`]: props.disabled
    });

    function handleFocus() {
        if (!empty) {
            setVisible(true, true);
        }
    }

    function handleBlur() {
        // setVisible(false);
    }

    return (
        <div className={classString} style={style} ref={ref}>
            <AutoCompleteInput {...inputProps} prefixCls={prefixCls} value={value} onKeyDown={handleKeyDown} onChange={setValue} onFocus={handleFocus} onBlur={handleBlur} />
            <SelectContext.Provider value={{ value, filter, search: filter ? null : value, onOptionAdd, onOptionRemove, onSelect, focusValue }}>
                <Dropdown prefixCls="xy-select" popupClassName={popupClassName} empty={empty} visible={visible} placeholder={empyPlaceholder} dropdownRef={dropdownRef} scrollwrapRef={scrollwrapRef}>
                    <Suggest prefixCls={prefixCls} suggestions={dataSource} customItem={customItem} />
                </Dropdown>
            </SelectContext.Provider>
        </div>
    );
}

export default React.memo(AutoComplete);
