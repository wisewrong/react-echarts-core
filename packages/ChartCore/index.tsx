import React, { useRef, useLayoutEffect, useCallback, useMemo, useEffect } from 'react';
import debounce from 'lodash-es/debounce';
import isFunction from 'lodash-es/isFunction';
import renderStyle from '../renderStyle';
import useSize from './hooks/useSize';
import { charCanvas, chartWapper } from './style';
import { THEME_NAME } from './theme';
import type { ChartProps, EChartsType } from '../types';

/**
 * 基础图表组件, 基于 ECharts 封装, 实现了 auto resize
 * > ECharts v5 用法
 * > ```js
 * > import * as echarts from 'echarts/core';
 * > import { TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
 * > import { LineChart } from 'echarts/charts';
 * > import { CanvasRenderer } from 'echarts/renderers';
 * > echarts.use([TooltipComponent, GridComponent, LegendComponent, LineChart, CanvasRenderer]);
 * > <ChartCore option={option} echarts={echarts} />;
 * > ```
 */
const ChartCore: React.FC<ChartProps> = ({
  echarts,
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
    $chart.current = echarts.init(
      chartRef.current as HTMLElement,
      theme || THEME_NAME,
    ) as EChartsType;
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
