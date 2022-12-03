# React ECharts Core

一个可以方便快捷渲染 ECharts 图表的 React 组件

> React >= 16.9.0

<br />

简体中文 | [English](./README-en_US.md)

<br />

## ✨ 特性

- 开箱即用，无需其他配置，传入 `EChartsOption` 即可渲染图表
- 自适应容器宽度
- 使用 TypeScript 开发，提供完整的类型定义文件

## 📦 安装

```
npm install react-echarts-core echarts  --save
```

or

```
yarn add react-echarts-core echarts
```

## 🔨 示例

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

## API

**ChartProps**

| 属性名       | 说明                                                         | 类型                           | 默认值              |
| ------------ | ------------------------------------------------------------ | ------------------------------ | ------------------- |
| className    | CSS 样式类名                                                 | string                         | -                   |
| style        | CSS 样式对象                                                 | React.CSSProperties            | -                   |
| option       | [ECharts 图表配置](https://echarts.apache.org/zh/option.html) | EChartsCoreOption              | -                   |
| theme        | [ECharts 图表主题](https://echarts.apache.org/zh/api.html#echarts.init) | string \| Record<string, any>  | 'charts-core-theme' |
| clear        | [更新图表时是否清除画布](https://echarts.apache.org/zh/api.html#echartsInstance.clear) | boolean                        | false               |
| empty        | 是否显示空状态                                               | boolean                        | false               |
| renderEmpty  | 空状态显示的组件                                             | () => React.ReactNode          | 内置 `Empty` 组件   |
| onChartReady | 图表初始化成功后的回调, 提供 echarts 实例                    | (ref: echarts.ECharts) => void | -                   |