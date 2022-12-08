import React, { useRef, useLayoutEffect, useCallback, useMemo, useEffect } from 'react';
import debounce from 'lodash-es/debounce';
import isFunction from 'lodash-es/isFunction';
import { use, init } from 'echarts/core';
import type { EChartsType } from 'echarts/core';
import type { EChartsOption } from 'echarts';
import { TooltipComponent,  GridComponent,  LegendComponent } from 'echarts/components';
import { PieChart, LineChart, BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import renderStyle from '../renderStyle';
import useSize from './hooks/useSize';
import { charCanvas, chartWapper } from './style';
import { THEME_NAME } from './theme';

export type { EChartsOption } from 'echarts';
export type { EChartsType } from 'echarts/core';

export interface ChartProps {
  className?: string;
  style?: React.CSSProperties;
  /**  echarts 图表配置 */
  option: EChartsOption;
  /** echarts 主题配置 */
  theme?: string | Record<string, any>;
  /** 更新数据时 是否清除画布 */
  clear?: boolean;
  /** 图表初始化成功后的回调, 提供 echarts 实例 */
  onChartReady?: (ref: EChartsType) => void;
}

use([
  LineChart,
  PieChart,
  BarChart,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  CanvasRenderer,
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
  clear,
  theme,
  onChartReady,
}) => {
  // echarts 实例
  const $chart = useRef<EChartsType>();
  const chartRef = useRef<HTMLDivElement>(null);
  const chartWrapperRef = useRef<HTMLDivElement>(null);

  const { width, height } = useSize(chartWrapperRef.current || document.body);

  // resize
  const resizeHandler = useCallback(() => {
    try {
      $chart.current?.resize();
    } catch (e) {
      console.warn(e);
    }
  }, []);

  const debounceResizeHandler = useMemo(() => debounce(resizeHandler, 160), [resizeHandler]);

  // 初始化图表
  const initChart = useCallback(() => {
    $chart.current = init(chartRef.current as HTMLElement, theme || THEME_NAME);
    $chart.current.setOption(option);
    isFunction(onChartReady) && onChartReady($chart.current);
  }, [onChartReady, option, theme]);

  // 更新图表数据
  const updateChart = useCallback(() => {
    if (!$chart.current) return;
    clear && $chart.current.clear();
    $chart.current.setOption(option);
  }, [clear, option]);

  // 销毁图表
  const dispose = useCallback(() => {
    try {
      $chart.current?.dispose();
    } catch (e) {
      console.warn('Charts Dispose Error: ', e);
    }
  }, []);

  useLayoutEffect(() => {
    debounceResizeHandler();
  }, [width, height]);

  useLayoutEffect(() => {
    if (!$chart.current) {
      initChart();
    } else {
      updateChart();
    }
  }, [dispose, initChart, updateChart]);

  // 组件卸载时 销毁图表
  useEffect(() => dispose, [dispose]);

  return (
    <div
      className={`${renderStyle(chartWapper)} ${className || ''}`}
      ref={chartWrapperRef}
      style={style}
    >
      <div className={renderStyle(charCanvas)} ref={chartRef} />
    </div>
  );
};

export default ChartCore;
