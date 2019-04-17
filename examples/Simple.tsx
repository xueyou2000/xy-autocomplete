import React, { useState } from "react";
import AutoComplete from "../src";
import { CustomItemProps } from "../src/interface";
import { OptGroup, Option } from "xy-select";

function MySuggest({ id, source }: CustomItemProps) {
    return (
        <p>
            {id}: {source.label}
        </p>
    );
}

const mockData = [
    { label: "三全鲜食（北新泾店）", value: "长宁区新渔路144号" },
    { label: "Hot honey 首尔炸鸡（仙霞路）", value: "上海市长宁区淞虹路661号" },
    { label: "新旺角茶餐厅", value: "上海市普陀区真北路988号创邑金沙谷6号楼113" },
    { label: "泷千家(天山西路店)", value: "天山西路438号" },
    { label: "胖仙女纸杯蛋糕（上海凌空店）", value: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
    { label: "贡茶", value: "上海市长宁区金钟路633号" },
    { label: "豪大大香鸡排超级奶爸", value: "上海市嘉定区曹安公路曹安路1685号" },
    { label: "茶芝兰（奶茶，手抓饼）", value: "上海市普陀区同普路1435号" },
    { label: "十二泷町", value: "上海市北翟路1444弄81号B幢-107" },
    { label: "星移浓缩咖啡", value: "上海市嘉定区新郁路817号" },
    { label: "阿姨奶茶/豪大大", value: "嘉定区曹安路1611号" },
    { label: "新麦甜四季甜品炸鸡", value: "嘉定区曹安公路2383弄55号" },
    { label: "Monica摩托主题咖啡店", value: "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
    { label: "浮生若茶（凌空soho店）", value: "上海长宁区金钟路968号9号楼地下一层" },
    { label: "NONO JUICE  鲜榨果汁", value: "上海市长宁区天山西路119号" },
    { label: "CoCo都可(北新泾店）", value: "上海市长宁区仙霞西路" },
    { label: "快乐柠檬（神州智慧店）", value: "上海市长宁区天山西路567号1层R117号店铺" },
    { label: "Merci Paul cafe", value: "上海市普陀区光复西路丹巴路28弄6号楼819" },
    { label: "猫山王（西郊百联店）", value: "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
    { label: "枪会山", value: "上海市普陀区棕榈路" },
    { label: "纵食", value: "元丰天山花园(东门) 双流路267号" },
    { label: "钱记", value: "上海市长宁区天山西路2" },
    { label: "壹杯加", value: "上海市长宁区通协路" },
    { label: "唦哇嘀咖", value: "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
    { label: "爱茜茜里(西郊百联)", value: "长宁区仙霞西路88号1305室" },
    { label: "爱茜茜里(近铁广场)", value: "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
    { label: "鲜果榨汁（金沙江路和美广店）", value: "普陀区金沙江路2239号金沙和美广场B1-10-6" },
    { label: "开心丽果（缤谷店）", value: "上海市长宁区威宁路天山路341号" },
    { label: "超级鸡车（丰庄路店）", value: "上海市嘉定区丰庄路240号" },
    { label: "妙生活果园（北新泾店）", value: "长宁区新渔路145号" },
    { label: "香宜度麻辣香锅", value: "长宁区淞虹路148号" },
    { label: "凡仔汉堡（老真北路店）", value: "上海市普陀区老真北路160号" },
    { label: "港式小铺", value: "上海市长宁区金钟路968号15楼15-105室" },
    { label: "蜀香源麻辣香锅（剑河路店）", value: "剑河路443-1" },
    { label: "北京饺子馆", value: "长宁区北新泾街道天山西路490-1号" },
    { label: "饭典*新简餐（凌空SOHO店）", value: "上海市长宁区金钟路968号9号楼地下一层9-83室" },
    { label: "焦耳·川式快餐（金钟路店）", value: "上海市金钟路633号地下一层甲部" },
    { label: "动力鸡车", value: "长宁区仙霞西路299弄3号101B" },
    { label: "浏阳蒸菜", value: "天山西路430号" },
    { label: "四海游龙（天山西路店）", value: "上海市长宁区天山西路" },
    { label: "樱花食堂（凌空店）", value: "上海市长宁区金钟路968号15楼15-106室" },
    { label: "壹分米客家传统调制米粉(天山店)", value: "天山西路428号" },
    { label: "福荣祥烧腊（平溪路店）", value: "上海市长宁区协和路福泉路255弄57-73号" },
    { label: "速记黄焖鸡米饭", value: "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
    { label: "红辣椒麻辣烫", value: "上海市长宁区天山西路492号" },
    { label: "(小杨生煎)西郊百联餐厅", value: "长宁区仙霞西路88号百联2楼" },
    { label: "阳阳麻辣烫", value: "天山西路389号" },
    { label: "南拳妈妈龙虾盖浇饭", value: "普陀区金沙江路1699号鑫乐惠美食广场A13" }
];

export default function() {
    const [data, setData] = useState([]);

    function searchHandle(val: string) {
        if (!val) {
            setData([]);
        } else {
            setData([val, val + "@126.com", val + "@gmail.com"]);
        }
    }

    return (
        <div>
            <h1>简单演示</h1>
            <AutoComplete style={{ width: "180px" }} backfill={true} onSearch={val => console.log('onSearch: ' + val)} placeholder="请搜索商家" dataSource={mockData} />
        </div>
    );
}
