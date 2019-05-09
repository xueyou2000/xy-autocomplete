import React from "react";
import { fireEvent, render } from "react-testing-library";
import AutoComplete from "../src";

describe("AutoComplete", () => {
    test("Disabled ClassName", () => {
        const wrapper = render(<AutoComplete disabled={true} />);
        const autoComplete = wrapper.container.querySelector(".xy-autocomplete");
        expect(autoComplete.classList.contains("xy-autocomplete-disabled")).toBeTruthy();
    });

    test("Placeholder", () => {
        const wrapper = render(<AutoComplete placeholder="请搜索" />);
        const input = wrapper.getByPlaceholderText("请搜索");
        expect(input).toBeDefined();
    });

    test("AutoFocus", () => {
        const wrapper = render(<AutoComplete autoFocus={true} placeholder="请搜索" />);
        const input = wrapper.getByPlaceholderText("请搜索");
        expect(input === document.activeElement).toBeTruthy();
    });

    test("OnBlur", () => {
        const fn = jest.fn();
        const wrapper = render(<AutoComplete autoFocus={true} placeholder="请搜索" onBlur={fn} />);
        const input = wrapper.getByPlaceholderText("请搜索");
        fireEvent.blur(input);
        expect(fn).toBeCalled();
    });

    test("When Input Chinese Complete Trigger onSearch", () => {
        const onSearch = jest.fn();
        const wrapper = render(<AutoComplete backfill={true} delay={0} placeholder="请搜索" onSearch={onSearch} />);
        const input = wrapper.getByPlaceholderText("请搜索");
        fireEvent.compositionStart(input, { target: { value: `xue'y` } });
        expect(onSearch.mock.calls.length).toBe(1);
        fireEvent.change(input, { target: { value: `xue'y123` } });
        expect(onSearch.mock.calls.length).toBe(1);
        fireEvent.compositionEnd(input, { target: { value: `学友` } });
        fireEvent.change(input, { target: { value: `学友` } });
        expect(onSearch.mock.calls.length).toBe(2);
        expect(onSearch.mock.calls[1][0]).toBe("学友");
    });

    test("Filter Option", () => {
        const wrapper = render(<AutoComplete filter={(cfg) => cfg.label.indexOf("1") !== -1} dataSource={["a", "b", "c", "a1", "b1", "c1"]} />);
        const options = document.body.querySelectorAll(".xy-option");
        expect([].map.call(options, (x) => x.textContent)).toEqual(["a", "b", "c"]);
    });

    test("onSelect Event", () => {
        const fn = jest.fn();
        const wrapper = render(<AutoComplete onSelect={fn} dataSource={["a", "b", "c", "a1", "b1", "c1"]} />);
        const option = document.body.querySelector(`[data-value="b1"]`);
        fireEvent.click(option);
        expect(fn).toBeCalled();
        expect(fn.mock.calls[0][0]).toBe("b1");
        expect(fn.mock.calls[0][1]).toEqual({ label: "b1", value: "b1", disabled: false, filtered: undefined });
    });
});
