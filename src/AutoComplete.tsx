import classNames from "classnames";
import React, { useRef } from "react";
import { TriggerAction } from "utils-hooks";
import { Dropdown, OptionsContext, OptionStateContext, useNnavigate, useOptions, ValueContext } from "xy-select";
import "xy-select/assets/index.css";
import Trigger from "xy-trigger";
import AutoCompleteInput from "./AutoCompleteInput";
import useValue from "./Hooks/useValue";
import useVisible from "./Hooks/useVisible";
import { AutoCompleteProps } from "./interface";
import Suggest from "./Suggest";

const ACTION: TriggerAction[] = [];
const POPUPALIGN = { overflow: { adjust: false, flip: true } };

export const AutoComplete = React.forwardRef((props: AutoCompleteProps, ref: React.MutableRefObject<any>) => {
    const {
        prefixCls = "xy-autocomplete",
        className,
        popupClassName,
        stretch = true,
        style,
        backfill,
        children,
        filter,
        dataSource = [],
        empyPlaceholder,
        customItem,
        onChange,
        onSelect,
        onSearch,
        ...inputProps
    } = props;
    if (!ref) {
        ref = useRef(null);
    }
    const align = useRef<Function>(null);
    const lastValue = useRef(null);
    const [options, optionsContextRef, _, cacheSelectCfg] = useOptions(false);
    const [visible, setVisible, handleFocus, handleBlur, whenPickerHiden] = useVisible(props, lastValue);
    const [value, searchChangeHandle, onOptionSelect, compositionStartHandle, compositionEndHandle, searchRef] = useValue(
        props,
        cacheSelectCfg,
        align,
        whenPickerHiden,
        lastValue,
        visible,
    );
    const [focusValue, handleKeyDown, scrollwrapRef] = useNnavigate(options, value, onOptionSelect, setVisible, true);
    const classString = classNames(prefixCls, className, {
        [`${prefixCls}-visible`]: false,
        [`${prefixCls}-disabled`]: props.disabled,
    });

    function renderInput() {
        const _inputProps = {
            ...inputProps,
            className: "autocompolete-inputbox",
            value,
            onKeyDown: handleKeyDown,
            onChange: searchChangeHandle,
            onBlur: handleBlur,
            onFocus: handleFocus,
            onCompositionStart: compositionStartHandle,
            onCompositionEnd: compositionEndHandle,
            ref,
        };

        if (children) {
            return React.cloneElement(children as any, _inputProps);
        } else {
            return <AutoCompleteInput {..._inputProps} />;
        }
    }

    function renderDropdown() {
        return (
            <OptionStateContext.Provider value={{ focusValue, filter, search: "filter" in props ? null : searchRef.current }}>
                <OptionsContext.Provider value={optionsContextRef.current}>
                    <Dropdown placeholder={empyPlaceholder} scrollwrapRef={scrollwrapRef}>
                        <Suggest prefixCls={prefixCls} suggestions={dataSource} customItem={customItem} />
                    </Dropdown>
                </OptionsContext.Provider>
            </OptionStateContext.Provider>
        );
    }

    return (
        <ValueContext.Provider value={{ value, onSelect: onOptionSelect }}>
            <Trigger
                prefixCls={`xy-select-transition`}
                visible={visible}
                onChange={setVisible}
                alignRef={align}
                action={ACTION}
                popupAlign={POPUPALIGN}
                popupClassName={popupClassName}
                stretch={stretch}
                popup={renderDropdown()}
            >
                <div className={classString} style={style}>
                    {renderInput()}
                </div>
            </Trigger>
        </ValueContext.Provider>
    );
});

export default React.memo(AutoComplete);
