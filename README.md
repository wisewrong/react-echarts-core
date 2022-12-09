# React ECharts Core

一个可以方便快捷渲染 ECharts v5 图表的 React 组件

> React >= 16.8.0

<br />

简体中文 | [English](./README-en_US.md)

<br />

## 🎁 特性

- 开箱即用，无需其他配置，传入 `EChartsOption` 即可渲染图表
- 默认继承父容器宽高，并自适应容器尺寸
- 使用 TypeScript 开发，提供完整的类型定义文件

## 🛠 安装

需要同步安装 echarts

```
npm install react-echarts-core echarts  --save
```

or

```
yarn add react-echarts-core echarts
```

## 🚀 示例

**基本用法**

```tsx
import React from 'react';
import ChartCore from 'react-echarts-core';
import type { EChartsOption } from 'react-echarts-core';

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

**默认支持 *Pie*, *Line*, *Bar* 三种类型的图表，其他图表类型需要使用内置 `use` 函数注册**，详见 [use](#use)

```tsx
import React from 'react';
import { ScatterChart } from 'echarts/charts';
import ChartCore, { use } from 'react-echarts-core';
import type { EChartsOption } from 'react-echarts-core';

use([ScatterChart]);

const Demo = () => {
  // https://echarts.apache.org/examples/zh/editor.html?c=scatter-simple
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

更多示例 👉 [https://github.com/wisewrong/react-echarts-core/tree/main/example/demo](https://github.com/wisewrong/react-echarts-core/tree/main/example/demo)

<br />

## API

#### ChartProps

| 属性名       | 说明                                                         | 类型                           | 默认值              |
| ------------ | ------------------------------------------------------------ | ------------------------------ | ------------------- |
| className    | CSS 样式类名                                                 | string                         | -                   |
| style        | CSS 样式对象                                                 | React.CSSProperties            | -                   |
| option       | [ECharts 图表配置](https://echarts.apache.org/zh/option.html) | EChartsCoreOption              | -                   |
| theme        | [ECharts 图表主题](https://echarts.apache.org/zh/api.html#echarts.init) | string \| Record<string, any>  | 'charts-core-theme' |
| clear        | [更新图表时是否清除画布](https://echarts.apache.org/zh/api.html#echartsInstance.clear) | boolean                        | false               |
| onChartReady | 图表初始化成功后的回调, 提供 echarts 实例                    | (ref: EChartsType) => void | -                   |

---

#### use

```ts
import { use } from 'react-echarts-core';
```

React ECharts Core 内置了以下 echarts 模块

```ts
import { TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import { PieChart, LineChart, BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
```

如果需要使用更多 echarts 模块，或者切换为 `SVGRenderer`，就需要用到 `use` 函数

```ts
type ChartsComponents = (EchartsChart | EchartsComponent | EchartsFeature)[];
type EchartsRender = typeof CanvasRenderer | typeof SVGRenderer;
type Use = (components?: ChartsComponents, render?: EchartsRender) => void;
```

 *use* 的作用和 `echarts.use` 一样，用于注册 echarts 模块。但 *use* 可接收两个参数：*components*, *render*。

- components: 由 `'echarts/features'`, `'echarts/components'`, `'echarts/charts'` 组成的数组
- render: `CanvasRenderer `或者 `SVGRenderer`，默认为 `CanvasRenderer`

**示例：**

```tsx
import React from 'react';
import { ScatterChart } from 'echarts/charts';
import { DataZoomComponent } from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import ChartCore, { use } from 'react-echarts-core';

use([ScatterChart, DataZoomComponent], SVGRenderer);

const Demo: React.FC = () => {
  // ...
}
```

