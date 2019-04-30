import { useEffect, useRef } from "react";
import { useVisible as useSelectVisible } from "xy-select";
import { AutoCompleteProps } from "../interface";

type UseVisibleReturn = [boolean, (v: boolean, isAlign?: boolean) => void, (e: React.FocusEvent<HTMLInputElement>) => void, () => void, Function];

export default function useVisible(ref: React.MutableRefObject<any>, props: AutoCompleteProps, innerRef: React.MutableRefObject<any>, dropdownRef: React.MutableRefObject<any>): UseVisibleReturn {
    const { disabled, stretch = true, dataSource = [], children } = props;
    const [visible, setVisible, _, align] = useSelectVisible(innerRef, dropdownRef, disabled, stretch);
    const focusRef = useRef(false);
    const empty = !dataSource || (dataSource instanceof Array && dataSource.length <= 0);

    // Tips: 当前焦点时, options 更新了, 也要判断是否收起下拉列表
    useEffect(() => {
        if (focusRef.current) {
            handleFocus();
        }
    }, [dataSource]);

    function handleFocus() {
        focusRef.current = true;
        if (!empty && !props.disabled) {
            setVisible(true, true);
        }
    }

    function hide() {
        focusRef.current = false;
        const element = ref.current as HTMLElement;
        if (element) {
            const input = element.querySelector(children ? ".autocompolete-inputbox" : ".xy-autocomplete-inputwrap-input") as HTMLElement;
            if (input) {
                input.focus();
            }
        }
        if (visible) {
            setVisible(false);
        }
    }

    return [visible, setVisible, handleFocus, hide, align];
}
