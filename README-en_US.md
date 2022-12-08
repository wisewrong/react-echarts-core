# React ECharts Core

A React component that can render ECharts v5 charts quickly and easily

> React >= 16.9.0

<br />

[简体中文](./README.md) | English

<br />

## 🎁 Features

- Render a chart by `EChartsOption`, no other configuration is required
- Auto resize
- Written in TypeScript with predictable static types

## 🛠 Install

```
npm install react-echarts-core echarts  --save
```

or

```
yarn add react-echarts-core echarts
```

## 🚀 Usage

**Basic**

```tsx
import React from 'react';
import ChartCore from 'react-echarts-core';
import type { EChartsOption } from 'react-echarts-core';

const Demo = () => {
  // https://echarts.apache.org/examples/en/editor.html?c=bar-background
  const option: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  };

  return (
    <>
      <h1>React ECharts Core</h1>
      <ChartCore option={option} style={{ height: 300, width: 500 }} />
    </>
  );
}
```

**By default, *Pie*, *Line*, *Bar* are supported, and other charts need to be extended by yourself**

> The built-in imported echarts components are:
>
> `import { TooltipComponent,  GridComponent,  LegendComponent } from 'echarts/components';`
>
> `import { PieChart, LineChart, BarChart } from 'echarts/charts';`
>
> `import { CanvasRenderer } from 'echarts/renderers';`

```tsx
import React from 'react';
import * as echarts from 'echarts/core';
import { ScatterChart } from 'echarts/charts';
import ChartCore from 'react-echarts-core';
import type { EChartsOption } from 'react-echarts-core';

echarts.use([ScatterChart]);

const Demo = () => {
  // https://echarts.apache.org/examples/en/editor.html?c=scatter-simple
  const option: EChartsOption = {
    xAxis: {},
    yAxis: {},
    series: [
      {
        symbolSize: 20,
        data: [
          [10.0, 8.04],
          [8.07, 6.95],
          [13.0, 7.58],
          [9.05, 8.81],
          [11.0, 8.33],
          [14.0, 7.66],
          [13.4, 6.81],
          [10.0, 6.33],
          [14.0, 8.96],
          [12.5, 6.82],
          [9.15, 7.2],
          [11.5, 7.2],
          [3.03, 4.23],
          [12.2, 7.83],
          [2.02, 4.47],
          [1.05, 3.33],
          [4.05, 4.96],
          [6.03, 7.24],
          [12.0, 6.26],
          [12.0, 8.84],
          [7.08, 5.82],
          [5.02, 5.68],
        ],
        type: 'scatter',
      },
    ],
  };

  return (
    <ChartCore option={option} style={{ height: 300, width: 500 }} />
  );
};
```

More examples👉 [https://github.com/wisewrong/react-echarts-core/tree/main/example/demo](https://github.com/wisewrong/react-echarts-core/tree/main/example/demo)

## API

**ChartProps**

| Name         | Description                                                  | Type                           | Default             |
| ------------ | ------------------------------------------------------------ | ------------------------------ | ------------------- |
| className    | CSS class                                                    | string                         | -                   |
| style        | CSS style                                                    | React.CSSProperties            | -                   |
| option       | [ECharts Option](https://echarts.apache.org/en/option.html#title) | EChartsCoreOption              | -                   |
| theme        | [ECharts Theme](https://echarts.apache.org/en/api.html#echarts.init) | string \| Record<string, any>  | 'charts-core-theme' |
| clear        | [Whether to clear the canvas when chart update](https://echarts.apache.org/en/api.html#echartsInstance.clear) | boolean                        | false               |
| onChartReady | The callback after the chart is initialized successfully, providing echarts instance | (ref: EChartsType) => void | -                   |
