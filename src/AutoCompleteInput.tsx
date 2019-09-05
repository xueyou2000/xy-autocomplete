import classNames from "classnames";
import React, { useRef } from "react";
import { useControll } from "utils-hooks";
import { AutoCompleteInputProps } from "./interface";

export const AutoCompleteInput = React.forwardRef((props: AutoCompleteInputProps, ref: React.MutableRefObject<any>) => {
    const { prefixCls, className, style, disabled, onChange, ...rest } = props;
    if (!ref) {
        ref = useRef(null);
    }
    const inputPrefixCls = `xy-autocomplete-inputwrap`;
    const [value, setValue, isControll] = useControll<string>(props, "value", "defaultValue", "");
    const classString = classNames(inputPrefixCls, className, {
        [`${inputPrefixCls}-disabled`]: disabled,
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
            <input
                type="text"
                disabled={disabled}
                className={classNames(`${inputPrefixCls}-input`, className)}
                onCompositionStart={(e) => null}
                aria-disabled={disabled}
                {...rest}
                ref={ref}
                {...(isControll ? { value: value || "" } : { defaultValue: value })}
                onChange={changeHandle}
            />
        </div>
    );
});

export default React.memo(AutoCompleteInput);
