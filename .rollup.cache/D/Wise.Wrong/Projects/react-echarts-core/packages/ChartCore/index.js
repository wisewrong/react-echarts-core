import { __assign } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { useRef, useLayoutEffect, useCallback, useMemo } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import Empty from './Empty';
import { debounce, isFunction } from 'lodash-es';
import * as echarts from 'echarts/core';
import { TooltipComponent, GridComponent, LegendComponent, DataZoomComponent, } from 'echarts/components';
import { PieChart, LineChart, BarChart } from 'echarts/charts';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { THEME_NAME } from './theme';
import './index.css';
echarts.use([
    LineChart,
    PieChart,
    BarChart,
    TooltipComponent,
    LegendComponent,
    DataZoomComponent,
    GridComponent,
    CanvasRenderer,
    LabelLayout,
    UniversalTransition,
]);
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
var ChartCore = function (_a) {
    var className = _a.className, style = _a.style, option = _a.option, empty = _a.empty, clear = _a.clear, theme = _a.theme, onChartReady = _a.onChartReady;
    // echarts 实例
    var $chart = useRef();
    var observerRef = useRef();
    var chartRef = useRef(null);
    var chartWrapperRef = useRef(null);
    // resize
    var resizeHandler = useCallback(function () {
        var _a;
        try {
            (_a = $chart.current) === null || _a === void 0 ? void 0 : _a.resize();
        }
        catch (e) {
            console.warn(e);
        }
    }, []);
    var debounceResizeHandler = useMemo(function () { return debounce(resizeHandler, 160); }, [resizeHandler]);
    // 移除对 chartWrapper.resize 事件的监听
    var removeResizeHandler = useCallback(function () {
        var _a;
        try {
            (_a = observerRef.current) === null || _a === void 0 ? void 0 : _a.unobserve(chartWrapperRef.current);
        }
        catch (_b) { }
        observerRef.current = undefined;
    }, []);
    // 监听 chartWrapper 的 resize 事件
    var addResizeHandler = useCallback(function () {
        removeResizeHandler();
        observerRef.current = new ResizeObserver(debounceResizeHandler);
        observerRef.current.observe(chartWrapperRef.current);
    }, [debounceResizeHandler, removeResizeHandler]);
    // 初始化图表
    var initChart = useCallback(function () {
        $chart.current = echarts.init(chartRef.current, theme || THEME_NAME);
        $chart.current.setOption(option);
        isFunction(onChartReady) && onChartReady($chart.current);
        // 绑定 resize 事件
        if (!observerRef.current)
            addResizeHandler();
    }, [addResizeHandler, onChartReady, option, theme]);
    // 更新图表数据
    var updateChart = useCallback(function () {
        if (!$chart.current)
            return;
        clear && $chart.current.clear();
        $chart.current.setOption(option);
    }, [clear, option]);
    // 销毁图表
    var dispose = useCallback(function () {
        var _a;
        try {
            removeResizeHandler();
            (_a = $chart.current) === null || _a === void 0 ? void 0 : _a.dispose();
        }
        catch (e) {
            console.warn('Charts Dispose Error: ', e);
        }
    }, [removeResizeHandler]);
    useLayoutEffect(function () {
        if (empty) {
            dispose();
        }
        else if ($chart.current) {
            updateChart();
        }
        else {
            initChart();
        }
    }, [empty, dispose, initChart, updateChart]);
    return (_jsx("div", __assign({ className: "chart-wapper ".concat(className), ref: chartWrapperRef, style: style }, { children: !empty ? (_jsx("div", { className: 'chart-canvas', ref: chartRef })) : (_jsx(Empty, {})) })));
};
export default ChartCore;
//# sourceMappingURL=index.js.map