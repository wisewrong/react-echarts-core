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

/**
 * Register echarts component, like `echarts.use`
 * - The following components are imported by default:
 * > *LineChart, BarChart, PieChart, LegendComponent, TooltipComponent, GridComponent*
 * @param components (EchartsChart | EchartsComponent | EchartsFeature)[]
 * @param render CanvasRenderer | SVGRenderer
 */
export default function use(components?: ChartsComponents, render?: EchartsRender) {
  const baseComponents: ChartsComponents = [
    LineChart,
    BarChart,
    PieChart,
    LegendComponent,
    TooltipComponent,
    GridComponent,
  ];
  const currentRender = render || CanvasRenderer;
  echarts.use([...baseComponents, ...(Array.isArray(components) ? components : []), currentRender]);
}
