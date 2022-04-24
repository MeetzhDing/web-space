import { EChartsOption } from 'echarts';
import {
  AxisPointerOption,
  BrushOption,
  DatasetOption,
  GridOption,
  TooltipOption,
  XAXisOption,
  YAXisOption,
  DataZoomComponentOption,
  LegendComponentOption,
  ToolboxComponentOption,
  VisualMapComponentOption,
  SeriesOption,
} from 'echarts/types/dist/shared';
import { isFunction } from 'lodash';

import { hasOwnProperty } from '../utils';

const echartsOptionProperties: (keyof EChartsOption)[] = [
  'dataset',
  'series',
  'animation',
  'grid',
  'xAxis',
  'yAxis',
  'toolbox',
  'tooltip',
  'axisPointer',
  'brush',
  'legend',
  'dataZoom',
  'visualMap',
];

export class EChartsConfigBuilder {
  /** 图表数据相关配置 */
  dataset?: DatasetOption = {};
  series?: SeriesOption[] = [];
  /** 图表的其他配置 */
  animation?: boolean = false;
  grid?: GridOption;
  xAxis?: XAXisOption;
  yAxis?: YAXisOption | YAXisOption[] = {};
  toolbox?: ToolboxComponentOption;
  tooltip?: TooltipOption;
  axisPointer?: AxisPointerOption;
  brush?: BrushOption;
  legend?: LegendComponentOption;
  dataZoom?: DataZoomComponentOption;
  visualMap?: VisualMapComponentOption;

  /** ConfigBuilder 内部值 */
  private initOption: EChartsOption;
  constructor(initOption: EChartsOption) {
    this.initOption = initOption || {};
    Object.keys(this.initOption).forEach((property) => {
      (this as any)[property] = initOption[property];
    });
  }

  setProperty<T extends keyof this>(property: T, value: this[T]) {
    (this as any)[property] = value;
  }

  getConfig(): EChartsOption {
    const config: EChartsOption = {};
    for (const property of echartsOptionProperties) {
      if (hasOwnProperty(this, property as any) && !isFunction(this[property])) {
        config[property] = this[property];
      }
    }
    return config;
  }

  /** ECharts 相关事件配置，为后续能力预留，暂未启用 */
  // eslint-disable-next-line @typescript-eslint/member-ordering
  events: Record<string, Function> = {};
  setEvent(eventName: string, callback: Function) {
    if (callback) {
      this.events[eventName] = callback;
    } else {
      delete this.events[eventName];
    }
  }
}
