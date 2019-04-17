import { OptionConfig, SelectFilter } from "xy-select/es/interface";

export interface CustomItemProps {
    id: number;
    source: OptionConfig;
}

export interface AutoCompleteInputProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 根节点的附加类名
     */
    className?: string;
    /**
     * 内联样式
     */
    style?: React.CSSProperties;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 值
     */
    value?: string;
    /**
     * 默认值
     */
    defaultValue?: string;
    /**
     * 占位符文本
     */
    placeholder?: string;
    /**
     * 自动焦点
     */
    autoFocus?: boolean;
    /**
     * tabIndex
     */
    tabIndex?: number;
    /**
     * 输入框焦点事件
     */
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    /**
     * 输入框失去焦点事件
     */
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    /**
     * 键盘事件
     */
    onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
    /**
     * 输入框change事件
     */
    onChange?: (value: string, event?: React.ChangeEvent<HTMLInputElement>) => void;
    /**
     * 开始输入中文
     */
    onCompositionStart?: (e: React.CompositionEvent<HTMLInputElement>) => void;
    /**
     * 输入中文完毕
     */
    onCompositionEnd?: (e: React.CompositionEvent<HTMLInputElement>) => void;
}

export interface AutoCompleteProps extends AutoCompleteInputProps {
    /**
     * 自定义Input搜索框
     */
    children?: React.ReactNode;
    /**
     * 弹出内容类名
     */
    popupClassName?: string;
    /**
     * 是否宽度与目标宽度对齐
     */
    stretch?: boolean;
    /**
     * 是否键盘输入完再回填
     * @description 比如输入中文时候, 可有优化
     */
    backfill?: boolean;
    /**
     * 内容占位符
     * @description下拉内容为空时提示文本
     */
    empyPlaceholder?: string;
    /**
     * 过滤option
     */
    filter?: SelectFilter;
    /**
     * 防抖毫秒
     * 默认 500ms
     * @description 关系到onSearch触发事件的频率
     */
    delay?: number;
    /**
     * 数据源
     */
    dataSource?: OptionConfig[] | string[] | React.ReactNode;
    /**
     * 自定义渲染
     */
    customItem?: (props: CustomItemProps) => JSX.Element;
    /**
     * 改变回调
     * @description 搜索内容改变和选中建议选项都会触发
     */
    onChange?: (value: string) => void;
    /**
     * 搜索回调
     * @description 搜索内容改变触发
     */
    onSearch?: (value: string) => void;
    /**
     * 选择回调
     * @description 选中建议选项都会触发
     */
    onSelect?: (value: string, cfg: OptionConfig) => void;
}

export interface SuggestProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 建议数据
     */
    suggestions: OptionConfig[] | string[] | React.ReactNode;
    /**
     * 自定义渲染
     */
    customItem?: (props: CustomItemProps) => JSX.Element;
}
