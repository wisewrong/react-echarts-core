import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScatterChart } from 'echarts/charts';
import * as echarts from 'echarts/core';
import ChartCore from '../../packages';
import type { EChartsOption } from '../../packages';
import { random } from './utils';

echarts.use([ScatterChart]);

function getRandomSeries(): number[][] {
  return Array.from(new Array(20), () => {
    return [random(1, 20), random(10, 20)];
  });
}

const category = ['React', 'Vue'];

const Demo2: React.FC<{ clear?: boolean }> = ({ clear }) => {
  const [series, setSeries] = useState<EChartsOption['series']>();

  const updateSeries = useCallback(() => {
    const value: EChartsOption['series'] = category.map(name => ({
      name,
      type: 'scatter',
      data: getRandomSeries(),
    }));
    setSeries(value);
  }, []);

  const option: EChartsOption = useMemo(
    () => ({
      legend: {
        show: true,
      },
      grid: {
        left: '8%',
        top: '10%',
      },
      xAxis: {
        splitLine: {
          lineStyle: {
            type: 'dashed',
          },
        },
      },
      yAxis: {
        splitLine: {
          lineStyle: {
            type: 'dashed',
          },
        },
        scale: true,
      },
      series,
    }),
    [series],
  );

  useEffect(() => {
    updateSeries();
    setInterval(updateSeries, 2000);
  }, [updateSeries]);

  return <ChartCore option={option} clear={clear} />;
};

export default Demo2;
