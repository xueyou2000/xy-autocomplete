import { AutoCompleteProps } from "@/interface";
import { useControll } from "utils-hooks";
import { OptionConfig } from "xy-select/es/interface";

export default function useValue(props: AutoCompleteProps, setVisible: (v: boolean) => void, cacheSelectCfg: React.MutableRefObject<Map<any, OptionConfig>>): [string, (val: string) => void, (val: string | number) => void] {
    const { disabled, onChange } = props;
    const [value, setValue, isControll] = useControll<string>(props, "value", "defaultValue");

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

    /**
     * 选中option
     * @param val
     */
    function onSelect(val: string | number) {
        const cfg = cacheSelectCfg.current.get(val);
        const v = cfg.label || val + "";
        changeValue(v);
        if (props.onSelect) {
            props.onSelect(v, cfg);
        }
        setVisible(false);
    }

    return [value, changeValue, onSelect];
}
