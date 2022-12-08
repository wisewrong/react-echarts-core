import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as echarts from 'echarts/core';
import { TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import ChartCore from '../../packages';
import type { EChartsOption } from '../../packages';
import Empty from '../components/Empty';
import Loading from '../components/Loading';
import { random } from './utils';

echarts.use([TooltipComponent, GridComponent, LegendComponent, BarChart, CanvasRenderer]);

function getRandomData(): number[] {
  return Array.from(new Array(7), () => random(10, 100));
}

/** 自定义 loading 或空状态 */
const Demo3: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [data, setData] = useState<number[]>();

  const updateData = useCallback(() => {
    setData(getRandomData());
    setCount(v => v + 1);
  }, []);

  const option: EChartsOption = useMemo(
    () => ({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      tooltip: {
        show: true,
      },
      series: [
        {
          data,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
          },
        },
      ],
    }),
    [data],
  );

  const loading = useMemo(() => count % 4 === 1, [count]);
  const empty = useMemo(() => count % 4 === 0, [count]);

  useEffect(() => {
    updateData();
    setInterval(updateData, 2000);
  }, [updateData]);

  // 需要给 <Loading /> 设置 height: 100%; 让 ChartCore 继承父容器的高度
  return <Loading loading={loading}>{empty ? <Empty /> : <ChartCore option={option} />}</Loading>;
};

export default Demo3;
