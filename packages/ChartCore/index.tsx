import React, { useRef, useLayoutEffect, useCallback, useMemo } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import debounce from 'lodash-es/debounce';
import isFunction from 'lodash-es/isFunction';
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
} from 'echarts/components';
import { PieChart, LineChart, BarChart } from 'echarts/charts';
import type { EChartsOption } from 'echarts';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import renderStyle from '../renderStyle';
import { charCanvas, chartWapper } from './style';
import { THEME_NAME } from './theme';
import Empty from './Empty';

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
  /** 自定义空状态 */
  renderEmpty?: () => React.ReactNode;
}

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
const ChartCore: React.FC<ChartProps> = ({
  className,
  style,
  option,
  empty,
  clear,
  theme,
  onChartReady,
  renderEmpty,
}) => {
  // echarts 实例
  const $chart = useRef<echarts.ECharts>();
  const observerRef = useRef<ResizeObserver>();
  const chartRef = useRef<HTMLDivElement>(null);
  const chartWrapperRef = useRef<HTMLDivElement>(null);

  // resize
  const resizeHandler = useCallback(() => {
    try {
      $chart.current?.resize();
    } catch (e) {
      console.warn(e);
    }
  }, []);

  const debounceResizeHandler = useMemo(
    () => debounce(resizeHandler, 160),
    [resizeHandler],
  );

  // 移除对 chartWrapper.resize 事件的监听
  const removeResizeHandler = useCallback(() => {
    try {
      observerRef.current?.unobserve(chartWrapperRef.current as Element);
    } catch { }
    observerRef.current = undefined;
  }, []);

  // 监听 chartWrapper 的 resize 事件
  const addResizeHandler = useCallback(() => {
    removeResizeHandler();
    observerRef.current = new ResizeObserver(debounceResizeHandler);
    observerRef.current.observe(chartWrapperRef.current as Element);
  }, [debounceResizeHandler, removeResizeHandler]);

  // 初始化图表
  const initChart = useCallback(() => {
    $chart.current = echarts.init(
      chartRef.current as HTMLElement,
      theme || THEME_NAME,
    );
    $chart.current.setOption(option);
    isFunction(onChartReady) && onChartReady($chart.current);

    // 绑定 resize 事件
    if (!observerRef.current) addResizeHandler();
  }, [addResizeHandler, onChartReady, option, theme]);

  // 更新图表数据
  const updateChart = useCallback(() => {
    if (!$chart.current) return;
    clear && $chart.current.clear();
    $chart.current.setOption(option);
  }, [clear, option]);

  // 销毁图表
  const dispose = useCallback(() => {
    try {
      removeResizeHandler();
      $chart.current?.dispose();
    } catch (e) {
      console.warn('Charts Dispose Error: ', e);
    }
  }, [removeResizeHandler]);

  useLayoutEffect(() => {
    if (empty) {
      dispose();
    } else if ($chart.current) {
      updateChart();
    } else {
      initChart();
    }
  }, [empty, dispose, initChart, updateChart]);

  const emptyComponent = useMemo(() => isFunction(renderEmpty) ? renderEmpty() : <Empty />, []);

  return (
    <div
      className={`${renderStyle(chartWapper)} ${className || ''}`}
      ref={chartWrapperRef}
      style={style}
    >
      {!empty ? (
        <div className={renderStyle([charCanvas])} ref={chartRef}></div>
      ) : (
        emptyComponent
      )}
    </div>
  );
};

export default ChartCore;
