import { useEffect, useRef } from "react";
import { useVisible as useSelectVisible } from "xy-select";
import { AutoCompleteProps } from "../interface";

type UseVisibleReturn = [boolean, (v: boolean, isAlign?: boolean) => void, () => void, () => void, (val: string) => void, Function];

export default function useVisible(props: AutoCompleteProps, innerRef: React.MutableRefObject<any>, dropdownRef: React.MutableRefObject<any>, lastValue: React.MutableRefObject<any>): UseVisibleReturn {
    const { disabled, stretch = true, dataSource = [] } = props;
    const [visible, setVisible, _, align] = useSelectVisible(innerRef, dropdownRef, disabled, stretch);
    const lastPicker = useRef(null);
    const focusRef = useRef(false);
    const empty = !dataSource || (dataSource instanceof Array && dataSource.length <= 0);

    // Tips: 当前焦点时, options 更新了, 也要判断是否收起下拉列表
    useEffect(() => {
        if (lastPicker.current) {
            if (focusRef.current && lastPicker.current !== lastValue.current) {
                handleFocus();
            }
        } else if (focusRef.current) {
            handleFocus();
        }
    }, [dataSource, lastValue.current]);

    function handleFocus() {
        if (empty) {
            focusRef.current = true;
        }
        if (!empty && !props.disabled) {
            focusRef.current = true;
            setVisible(true, true);
        }
    }

    function whenPickerHiden(val: string) {
        lastPicker.current = val;
        setVisible(false);
    }

    function handleBlur() {
        focusRef.current = false;
    }

    return [visible, setVisible, handleFocus, handleBlur, whenPickerHiden, align];
}
