import classNames from "classnames";
import React, { useRef } from "react";
import { Dropdown, SelectContext, useNnavigate, useOptions } from "xy-select";
import "xy-select/assets/index.css";
import AutoCompleteInput from "./AutoCompleteInput";
import useValue from "./Hooks/useValue";
import useVisible from "./Hooks/useVisible";
import { AutoCompleteProps } from "./interface";
import Suggest from "./Suggest";

export const AutoComplete = React.forwardRef((props: AutoCompleteProps, ref: React.MutableRefObject<any>) => {
    const { prefixCls = "xy-autocomplete", className, popupClassName, stretch = true, style, backfill, children, filter, dataSource = [], empyPlaceholder, customItem, onChange, onSelect, onSearch, ...inputProps } = props;
    if (!ref) {
        ref = useRef();
    }
    const dropdownRef = useRef();
    const [visible, setVisible, handleFocus, handleBlur] = useVisible(props, ref, dropdownRef);
    const [options, onOptionAdd, onOptionRemove, _, cacheSelectCfg] = useOptions(false);
    const [value, searchChangeHandle, onOptionSelect, compositionStartHandle, compositionEndHandle] = useValue(props, setVisible, cacheSelectCfg);
    const [focusValue, handleKeyDown, scrollwrapRef] = useNnavigate(options, value, onOptionSelect, setVisible);
    const classString = classNames(prefixCls, className, {
        [`${prefixCls}-visible`]: false,
        [`${prefixCls}-disabled`]: props.disabled
    });

    function renderInput() {
        const _inputProps = {
            ...inputProps,
            className: "autocompolete-inputbox",
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
});

export default React.memo(AutoComplete);
