import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Suggest from "../src/Suggest";
import { OptionConfig } from "xy-select/es/interface";
import { CustomItemProps } from "../src/interface";
import { OptionsContext } from "xy-select";

describe("Suggest", () => {
    test("Render Wich ReactNode", () => {
        const wrapper = render(<Suggest suggestions={<p>呵呵</p>} />);
        const p = wrapper.getByText("呵呵");
        expect(p).toBeDefined();
    });

    test("Render String Array", () => {
        const addFn = jest.fn();
        const removeFn = jest.fn();

        const wrapper = render(
            <OptionsContext.Provider value={{ onOptionAdd: addFn, onOptionRemove: removeFn }}>
                <Suggest suggestions={["a", "b", "c"]} />
            </OptionsContext.Provider>,
        );
        const options = wrapper.container.querySelectorAll(".xy-option");
        expect([].map.call(options, (x) => x.textContent)).toEqual(["a", "b", "c"]);
    });

    test("Render Config Array", () => {
        const addFn = jest.fn();
        const removeFn = jest.fn();
        const cfgs: OptionConfig[] = [
            {
                label: "苹果",
                value: "pg",
            },
            {
                label: "西瓜",
                value: "xg",
            },
            {
                label: "香蕉",
                value: "xiangjiao",
            },
        ];
        const wrapper = render(
            <OptionsContext.Provider value={{ onOptionAdd: addFn, onOptionRemove: removeFn }}>
                <Suggest suggestions={cfgs} />
            </OptionsContext.Provider>,
        );
        const options = wrapper.container.querySelectorAll(".xy-option");
        expect([].map.call(options, (x) => x.textContent)).toEqual(["苹果", "西瓜", "香蕉"]);
    });

    test("Custom Render Option", () => {
        const addFn = jest.fn();
        const removeFn = jest.fn();
        function MySuggest({ id, source }: CustomItemProps) {
            return (
                <p className="my-custom-option">
                    {id}: {source.label}
                </p>
            );
        }

        const wrapper = render(
            <OptionsContext.Provider value={{ onOptionAdd: addFn, onOptionRemove: removeFn }}>
                <Suggest customItem={MySuggest} suggestions={["a", "b", "c"]} />
            </OptionsContext.Provider>,
        );
        const opt = wrapper.getByText("1: b");
        expect(opt).toBeDefined();
    });
});
