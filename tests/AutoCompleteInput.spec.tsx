import React from "react";
import { render, fireEvent } from "react-testing-library";
import AutoCompleteInput from "../src/AutoCompleteInput";

describe("AutoCompleteInput", () => {
    test("input disabled", () => {
        const wrapper = render(<AutoCompleteInput className="autocompolete-inputbox" disabled={true} />);
        const inputBox = wrapper.container.querySelector(".autocompolete-inputbox");
        const input = inputBox.querySelector("input");
        expect(inputBox.classList.contains("xy-autocomplete-inputwrap-disabled")).toBeTruthy();
        expect(input.hasAttribute("disabled")).toBeTruthy();
    });

    test("placeholder", () => {
        const wrapper = render(<AutoCompleteInput placeholder="请输入内容" />);
        const input = wrapper.getByPlaceholderText("请输入内容");
        expect(input).toBeDefined();
    });

    test("auto focus", () => {
        const fn = jest.fn();
        render(<AutoCompleteInput autoFocus={true} onFocus={fn} />);
        expect(fn).toBeCalled();
    });

    test("input event", () => {
        const onFocus = jest.fn();
        const onBlur = jest.fn();
        const onKeyDown = jest.fn();
        const onChange = jest.fn();
        const onCompositionStart = jest.fn();
        const onCompositionEnd = jest.fn();
        const wrapper = render(<AutoCompleteInput placeholder="请输入内容" onFocus={onFocus} onBlur={onBlur} onKeyDown={onKeyDown} onChange={onChange} onCompositionStart={onCompositionStart} onCompositionEnd={onCompositionEnd} />);
        const input = wrapper.getByPlaceholderText("请输入内容");

        fireEvent.focus(input);
        expect(onFocus).toBeCalled();

        fireEvent.blur(input);
        expect(onBlur).toBeCalled();

        fireEvent.keyDown(input, { keyCode: 13 });
        expect(onKeyDown).toBeCalled();

        fireEvent.change(input, { target: { value: "123" } });
        expect(onChange).toBeCalled();
        expect(onChange.mock.calls[0][0]).toBe("123");

        fireEvent.compositionStart(input);
        expect(onCompositionStart).toBeCalled();

        fireEvent.compositionEnd(input);
        expect(onCompositionEnd).toBeCalled();
    });
});
