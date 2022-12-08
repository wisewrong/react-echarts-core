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

For ECharts v5, you need to manually load basic components such as `echarts/charts`

```tsx
import React from 'react';
import ChartCore from 'react-echarts-core';
import type { EChartsOption } from 'react-echarts-core';
import * as echarts from 'echarts/core';
import { TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TooltipComponent, GridComponent, LegendComponent, LineChart, CanvasRenderer]);

const Demo = () => {
  // https://echarts.apache.org/examples/zh/editor.html?c=bar-background
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
