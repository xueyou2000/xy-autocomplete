import classNames from "classnames";
import React, { useRef, useEffect } from "react";
import { Dropdown, SelectContext, useNnavigate, useOptions, useVisible } from "xy-select";
import "xy-select/assets/index.css";
import AutoCompleteInput from "./AutoCompleteInput";
import useValue from "./Hooks/useValue";
import { AutoCompleteProps } from "./interface";
import Suggest from "./Suggest";

export function AutoComplete(props: AutoCompleteProps) {
    const { prefixCls = "xy-autocomplete", className, popupClassName, stretch = true, style, backfill, children, filter, dataSource = [], empyPlaceholder, customItem, onChange, onSelect, onSearch, ...inputProps } = props;
    const ref = useRef();
    const dropdownRef = useRef();
    const empty = !dataSource || (dataSource instanceof Array && dataSource.length <= 0);
    const [visible, setVisible] = useVisible(ref, dropdownRef, props.disabled, stretch);
    const [options, onOptionAdd, onOptionRemove, _, cacheSelectCfg] = useOptions(false);
    const [value, searchChangeHandle, onOptionSelect, compositionStartHandle, compositionEndHandle] = useValue(props, setVisible, cacheSelectCfg);
    const [focusValue, handleKeyDown, scrollwrapRef] = useNnavigate(options, value, onOptionSelect, setVisible);
    const classString = classNames(prefixCls, className, {
        [`${prefixCls}-visible`]: false,
        [`${prefixCls}-disabled`]: props.disabled
    });
    const focusRef = useRef(false);

    // Tips: 当前焦点时, options 更新了, 也要判断是否收起下拉列表
    useEffect(() => {
        if (focusRef.current) {
            handleFocus();
        } else {
            handleBlur();
        }
    }, [dataSource]);

    function handleFocus() {
        focusRef.current = true;
        if (!empty) {
            setVisible(true, true);
        }
    }

    function handleBlur() {
        focusRef.current = false;
        setVisible(false);
    }

    function renderInput() {
        const _inputProps = {
            ...inputProps,
            value,
            onKeyDown: handleKeyDown,
            onChange: searchChangeHandle,
            onFocus: handleFocus,
            onBlur: handleBlur,
            onCompositionStart: compositionStartHandle,
            onCompositionEnd: compositionEndHandle
        };

        if (children) {
            return React.cloneElement(children as any, _inputProps);
        } else {
            return <AutoCompleteInput {..._inputProps} />;
        }
    }

    return (
        <div className={classString} style={style} ref={ref}>
            {renderInput()}
            <SelectContext.Provider value={{ value, filter, search: filter ? null : value, onOptionAdd, onOptionRemove, onSelect: onOptionSelect, focusValue }}>
                <Dropdown prefixCls="xy-select" popupClassName={popupClassName} visible={visible} placeholder={empyPlaceholder} dropdownRef={dropdownRef} scrollwrapRef={scrollwrapRef}>
                    <Suggest prefixCls={prefixCls} suggestions={dataSource} customItem={customItem} />
                </Dropdown>
            </SelectContext.Provider>
        </div>
    );
}

export default React.memo(AutoComplete);
