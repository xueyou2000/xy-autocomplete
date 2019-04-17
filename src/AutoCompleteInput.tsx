import classNames from "classnames";
import React from "react";
import { useControll } from "utils-hooks";
import { AutoCompleteInputProps } from "./interface";

export function AutoCompleteInput(props: AutoCompleteInputProps) {
    const { prefixCls, className, style, disabled, onChange, ...rest } = props;
    const inputPrefixCls = `xy-autocomplete-inputwrap`;
    const [value, setValue, isControll] = useControll<string>(props, "value", "defaultValue", "");
    const classString = classNames(inputPrefixCls, className, {
        [`${inputPrefixCls}-disabled`]: disabled
    });

    function changeHandle(event: React.ChangeEvent<HTMLInputElement>) {
        const val = event.target.value;
        if (!isControll) {
            setValue(val);
        }
        if (onChange) {
            onChange(val);
        }
    }

    return (
        <div className={classString} style={style}>
            <input type="text" className={`${inputPrefixCls}-input`} onCompositionStart={(e) => null} aria-disabled={disabled} {...rest} {...(isControll ? { value: value || "" } : { defaultValue: value })} onChange={changeHandle} />
        </div>
    );
}

export default React.memo(AutoCompleteInput);
