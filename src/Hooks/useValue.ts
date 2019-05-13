import { AutoCompleteProps } from "../interface";
import { useControll, useDebounceCallback } from "utils-hooks";
import { OptionConfig } from "xy-select/es/interface";
import { useRef, useLayoutEffect, useState } from "react";

type UseValueReturn = [string, (val: string) => void, (val: string | number) => void, (e: React.CompositionEvent<HTMLInputElement>) => void, (e: React.CompositionEvent<HTMLInputElement>) => void, React.MutableRefObject<string>];

export default function useValue(
    props: AutoCompleteProps,
    cacheSelectCfg: React.MutableRefObject<Map<any, OptionConfig>>,
    align: React.MutableRefObject<Function>,
    onPicker: (val: string, callback?: Function) => void,
    lastValue: React.MutableRefObject<any>,
    visible: boolean
): UseValueReturn {
    const { backfill, disabled, onChange, onSelect, onSearch, delay = 200 } = props;
    const [value, setValue, isControll] = useControll<string>(props, "value", "defaultValue");
    const typingRef = useRef(false);
    const searchRef = useRef("");
    const pickerRef = useRef(null);

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
        lastValue.current = val;
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

    // Tips: 搜索改变会影响推荐列表的数量, 所以需要重新对齐
    useLayoutEffect(() => {
        if (align.current) {
            align.current(false);
        }
    }, [value]);

    // Tips: 选择option后，等待下拉列表关闭动画完毕再设置search, 避免下拉列表内容和高度变化了，再执行动画
    useLayoutEffect(() => {
        if (pickerRef.current) {
            searchRef.current = pickerRef.current;
            pickerRef.current = null;
        }
    }, [visible]);

    /**
     * 选中option
     * @param _value
     */
    function optionSelectHandle(_value: string | number) {
        const optionCfg = cacheSelectCfg.current.get(_value);
        const val = optionCfg.label || _value + "";
        pickerRef.current = val;
        onPicker(val);
        changeValue(val);
        if (onSelect) {
            onSelect(val, optionCfg);
        }
    }

    return [value, searchChangeHandle, optionSelectHandle, compositionStartHandle, compositionEndHandle, searchRef];
}
