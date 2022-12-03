import * as echarts from 'echarts/core';

export const THEME_NAME = 'charts-core-theme';

const theme = {
  tooltip: {
    borderWidth: 0,
  },
  legend: {
    show: true,
    icon: 'circle',
    orient: 'horizontal',
    itemWidth: 10,
    itemHeight: 10,
    right: 0,
    itemGap: 14,
    textStyle: {
      color: '#67717A',
      fontSize: 12,
    },
  },
  categoryAxis: {
    axisLine: { show: false },
    splitLine: { show: false },
    splitArea: { show: false },
    axisTick: { show: false },
  },
  valueAxis: {
    axisLine: { show: false },
    splitLine: {
      lineStyle: {
        type: 'dashed',
      },
    },
    minInterval: 1,
  },
};

echarts.registerTheme(THEME_NAME, theme);

export default theme;
