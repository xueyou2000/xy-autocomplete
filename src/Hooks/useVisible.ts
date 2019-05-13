import { useEffect, useRef, useState } from "react";
import { AutoCompleteProps } from "../interface";

type UseVisibleReturn = [boolean, (v: boolean) => void, () => void, () => void, (val: string) => void];

export default function useVisible(props: AutoCompleteProps, lastValue: React.MutableRefObject<any>): UseVisibleReturn {
    const { dataSource = [], onBlur } = props;
    const [visible, setVisible] = useState(false);
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
            setVisible(true);
        }
    }

    function whenPickerHiden(val: string) {
        lastPicker.current = val;
        setVisible(false);
    }

    function handleBlur(e?: any) {
        focusRef.current = false;
        setVisible(false);
        if (onBlur) {
            onBlur(e);
        }
    }

    return [visible, setVisible, handleFocus, handleBlur, whenPickerHiden];
}
