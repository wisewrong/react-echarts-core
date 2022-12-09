import React, { useCallback, useRef, useState } from 'react';
import * as echarts from 'echarts/core';
import { TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import ChartCore from '../../packages';
import type { EChartsOption, EChartsType } from '../../packages';

echarts.use([TooltipComponent, GridComponent, LegendComponent, PieChart, CanvasRenderer]);

/** 事件处理 */
const Demo4: React.FC = () => {
  const [tips, setTips] = useState<string>();
  const chartInstance = useRef<EChartsType>();

  const option: EChartsOption = {
    legend: {
      top: 'center',
      right: 60,
      width: 40,
    },
    tooltip: {
      show: true,
      trigger: 'item',
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [20, 120],
        center: ['40%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8,
        },
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 40, name: 'rose 1' },
          { value: 38, name: 'rose 2' },
          { value: 32, name: 'rose 3' },
          { value: 30, name: 'rose 4' },
          { value: 28, name: 'rose 5' },
          { value: 26, name: 'rose 6' },
          { value: 22, name: 'rose 7' },
          { value: 18, name: 'rose 8' },
        ],
      },
    ],
  };

  // 绑定事件
  const bind = useCallback((ref: EChartsType) => {
    if (!ref) return;
    ref.on('click', params => {
      setTips(`The value of ${params.name} is ${params.value}`);
    });
    ref.on('mouseover', params => {
      setTips(`Hello ${params.name}`);
    });
    ref.on('mouseout', () => {
      setTips('');
    });
  }, []);

  // 通过加载图表成功的回调获取 echarts 实例
  const onChartReady = useCallback((ref: EChartsType) => {
    chartInstance.current = ref;
    bind(ref);
  }, []);

  return (
    <>
      {tips && <div className="demo4-tips">{tips}</div>}
      <ChartCore echarts={echarts} option={option} onChartReady={onChartReady} />
    </>
  );
};

export default Demo4;
