import type { EChartsType } from 'echarts/core';
import type { EChartsOption } from 'echarts';
import type { CSSProperties } from 'react';

export interface ChartProps {
  echarts: any;
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

export type Size = { width: number; height: number };

export interface StyleItem {
  className: string,
  styles: CSSProperties,
}

export type { CSSProperties } from 'react';
export type { EChartsOption } from 'echarts';
export type { EChartsType } from 'echarts/core';
