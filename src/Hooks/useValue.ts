import { AutoCompleteProps } from "@/interface";
import { useControll, useDebounceCallback } from "utils-hooks";
import { OptionConfig } from "xy-select/es/interface";
import { useRef } from "react";

type UseValueReturn = [string, (val: string) => void, (val: string | number) => void, (e: React.CompositionEvent<HTMLInputElement>) => void, (e: React.CompositionEvent<HTMLInputElement>) => void];

export default function useValue(props: AutoCompleteProps, setVisible: (v: boolean) => void, cacheSelectCfg: React.MutableRefObject<Map<any, OptionConfig>>): UseValueReturn {
    const { backfill, disabled, onChange, onSelect, onSearch, delay = 500 } = props;
    const [value, setValue, isControll] = useControll<string>(props, "value", "defaultValue");
    const typingRef = useRef(false);
    const searchRef = useRef("");

    useDebounceCallback(
        () => {
            if (onSearch) {
                if (backfill) {
                    if (typingRef.current === false) {
                        onSearch(value);
                    }
                } else {
                    onSearch(value);
                }
            }
        },
        delay,
        [searchRef.current]
    );

    function compositionStartHandle(e: React.CompositionEvent<HTMLInputElement>) {
        typingRef.current = true;
    }

    function compositionEndHandle(e: React.CompositionEvent<HTMLInputElement>) {
        typingRef.current = false;
    }

    function changeValue(val: string) {
        if (disabled) {
            return;
        }
        if (!isControll) {
            setValue(val);
        }
        if (onChange) {
            onChange(val);
        }
    }

    function searchChangeHandle(val: string) {
        searchRef.current = val;
        changeValue(val);
    }

    /**
     * 选中option
     * @param val
     */
    function optionSelectHandle(val: string | number) {
        const cfg = cacheSelectCfg.current.get(val);
        const v = cfg.label || val + "";
        changeValue(v);
        if (onSelect) {
            onSelect(v, cfg);
        }
        setVisible(false);
    }

    return [value, searchChangeHandle, optionSelectHandle, compositionStartHandle, compositionEndHandle];
}
