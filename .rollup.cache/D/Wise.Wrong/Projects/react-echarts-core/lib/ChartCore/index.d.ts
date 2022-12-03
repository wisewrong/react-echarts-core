import React from 'react';
import * as echarts from 'echarts/core';
import type { EChartsOption } from 'echarts';
import './index.css';
export type { EChartsOption } from 'echarts';
export interface ChartProps {
    className?: string;
    style?: React.CSSProperties;
    /**  echarts 图表配置 */
    option: EChartsOption;
    /** echarts 主题配置 */
    theme?: string | Record<string, any>;
    /** 更新数据时 是否清除画布 */
    clear?: boolean;
    /** 是否为空 */
    empty?: boolean;
    /** 图表初始化成功后的回调, 提供 echarts 实例 */
    onChartReady?: (ref: echarts.ECharts) => void;
}
/**
 * 基础图表组件, 基于 ECharts 封装
 * - 实现了 resize 功能
 * - 默认支持 Pie, Line, Bar 三种类型的图表, 其他图表类型需要自行扩展
 * > eg:
 * > ```js
 * > import { ScatterChart } from 'echarts/charts';
 * > import * as echarts from 'echarts/core';
 * > echarts.use([ScatterChart]);
 * > ```
 */
declare const ChartCore: React.FC<ChartProps>;
export default ChartCore;
