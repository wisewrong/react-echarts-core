import debounce from 'lodash-es/debounce';
import * as echarts from 'echarts/core';
import { LineChart, BarChart, PieChart } from 'echarts/charts';
import { TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import * as components from 'echarts/components';
import * as charts from 'echarts/charts';
import * as features from 'echarts/features';
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers';

type ValueOf<T> = T[keyof T];
type EchartsComponents = Array<ValueOf<typeof components>>;
type EchartsCharts = Array<ValueOf<typeof charts>>;
type EchartsFeatures = Array<ValueOf<typeof features>>;

export type ChartsComponents = [...EchartsFeatures, ...EchartsCharts, ...EchartsComponents];
export type EchartsRender = typeof CanvasRenderer | typeof SVGRenderer;

const componentsList: ChartsComponents = [];
const renderList: EchartsRender[] = [];

function useEcharts(components?: ChartsComponents, renders?: EchartsRender[]) {
  const baseComponents: ChartsComponents = [
    LineChart,
    BarChart,
    PieChart,
    LegendComponent,
    TooltipComponent,
    GridComponent,
  ];
  // console.log('finnaly=====>', components, renders);
  const currentRender = renders?.[0] || CanvasRenderer;
  echarts.use([...baseComponents, ...(Array.isArray(components) ? components : []), currentRender]);
}

const debounceUseEcharts = debounce(useEcharts, 0);

/**
 * Register echarts component, like `echarts.use`
 * - The following components are imported by default:
 * > *LineChart, BarChart, PieChart, LegendComponent, TooltipComponent, GridComponent*
 * @param components (EchartsChart | EchartsComponent | EchartsFeature)[]
 * @param render CanvasRenderer | SVGRenderer
 */
export default function use(components?: ChartsComponents, render?: EchartsRender) {
  const main = () => {
    componentsList.push(...(Array.isArray(components) ? components : []));
    render && renderList.push(render);
    debounceUseEcharts(componentsList, renderList);
  };

  return main();
}
