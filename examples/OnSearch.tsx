import React, { useState } from "react";
import AutoComplete from "../src";
import "../src/assets/index";

export default function() {
    const [data, setData] = useState([]);

    function searchHandle(val: string) {
        if (!val) {
            setData([]);
        } else {
            setData([val, val + "@126.com", val + "@gmail.com"]);
        }
    }

    return <AutoComplete style={{ width: "180px" }} onSearch={searchHandle} backfill={true} placeholder="请输入邮箱" dataSource={data} />;
}
