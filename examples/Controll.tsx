import React, { useState } from "react";
import AutoComplete from "../src";
import "../src/assets/index";
import { Option, OptGroup } from "xy-select";
import "xy-select/assets/index.css";
import "xy-input/assets/index.css";

export default function() {
    const [value, setValue] = useState("C");

    const options = (
        <div>
            <OptGroup label="语言">
                <Option>C</Option>
                <Option>C++</Option>
                <Option>C#</Option>
                <Option>Java</Option>
            </OptGroup>
            <OptGroup label="水果">
                <Option>苹果</Option>
                <Option>香蕉</Option>
                <Option>梨子</Option>
                <Option>菠萝</Option>
            </OptGroup>
        </div>
    );

    return <AutoComplete filter={null} value={value} onChange={setValue} style={{ width: "250px" }} dataSource={options} />;
}
