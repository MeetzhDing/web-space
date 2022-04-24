import { EChartsOption } from 'echarts';
import { EChartsReactProps } from 'echarts-for-react';
import EChartsReactCore from 'echarts-for-react/lib/core';
import { LineChart, ScatterChart, SankeyChart, BarChart, PieChart, MapChart } from 'echarts/charts';
import {
  LegendComponent,
  TooltipComponent,
  TitleComponent,
  DatasetComponent,
  ToolboxComponent,
  VisualMapComponent,
  GeoComponent,
  GridComponent,
  BrushComponent,
} from 'echarts/components';
import * as echartsCore from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import React from 'react';

import { Modify } from 'src/utils';

echartsCore.use([
  LineChart,
  BarChart,
  ScatterChart,
  PieChart,
  SankeyChart,
  MapChart,
  LegendComponent,
  TooltipComponent,
  TitleComponent,
  DatasetComponent,
  CanvasRenderer,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
  GeoComponent,
  GridComponent,
  BrushComponent,
  CanvasRenderer,
]);
if (__DEV__) {
  (window as any).echartsCore = echartsCore;
}
export type { EChartsOption };

export type DynamicEChartsReactProps = Modify<
  Omit<EChartsReactProps, 'echarts'>,
  {
    ref?: React.RefAttributes<{ getEchartsInstance: () => EChartsType }>;
    option: EChartsOption;
  }
>;

export const DynamicEChartsReact = React.forwardRef<any, DynamicEChartsReactProps>((props, ref) => (
  <EChartsReactCore echarts={echartsCore} {...props} ref={ref} />
));

DynamicEChartsReact.displayName = 'DynamicEChartsReact';

export type EChartsType = echartsCore.ECharts;

export { echartsCore };
