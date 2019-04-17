import React from "react";
import { SuggestProps } from "./interface";
import { OptionConfig } from "xy-select/es/interface";
import { Option } from "xy-select";

export default function Suggest(props: SuggestProps) {
    const { prefixCls, suggestions, customItem } = props;

    function renderSuggest() {
        if (suggestions instanceof Array) {
            return (
                <ul>
                    {(suggestions as any).map((x, i) => {
                        const cfg: OptionConfig =
                            typeof x === "string"
                                ? {
                                      value: x,
                                      label: x
                                  }
                                : x;

                        return (
                            <Option key={cfg.value} value={cfg.value} disabled={cfg.disabled}>
                                {!customItem
                                    ? cfg.label
                                    : React.createElement(customItem as any, {
                                          id: i,
                                          source: cfg
                                      })}
                            </Option>
                        );
                    })}
                </ul>
            );
        } else {
            return suggestions;
        }
    }

    return <div className={`${prefixCls}-suggest`}>{renderSuggest()}</div>;
}
