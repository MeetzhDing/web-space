import { BrushAreaParam } from 'echarts/types/src/component/brush/BrushModel';
import React, { PureComponent } from 'react';

import { DynamicEChartsReact, EChartsType } from './DynamicEChartsReact';
import { EChartsConfigBuilder } from './EChartsConfigBuilder';

export interface EChartsGraphProps {
  builder: EChartsConfigBuilder;
  width: number;
  height: number;
  // X轴范围选中时触发
  onZoom?: (range: [number, number]) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EChartsGraphState {}

/** 以时间序列作为X轴的绘图组件，使用 AlignedFrame 进行图表绘制，使用 field.config 生成 echartsConfig */
export class EChartsGraph extends PureComponent<EChartsGraphProps, EChartsGraphState> {
  echartsReactRef = React.createRef<{ getEchartsInstance: () => EChartsType }>();

  constructor(props) {
    super(props);
    this.onChartOptionUpdate();
  }

  componentDidUpdate() {}

  render() {
    const { builder, width, height } = this.props;
    return (
      <DynamicEChartsReact
        ref={this.echartsReactRef}
        option={builder.getConfig()}
        lazyUpdate={false}
        notMerge={true}
        style={{ width, height }}
        onEvents={this.eventDict}
        onChartReady={this.onChartReady}
      />
    );
  }

  private getEChartsIns = () => {
    const { echartsReactRef } = this;
    if (echartsReactRef.current) {
      return echartsReactRef.current.getEchartsInstance?.();
    }
    return null;
  };

  private onChartOptionUpdate = () => {
    setTimeout(() => {
      const echartsIns = this.getEChartsIns();
      if (echartsIns) {
        echartsIns?.dispatchAction({
          type: 'takeGlobalCursor',
          key: 'brush',
          brushOption: {
            brushType: 'lineX',
          },
        });
        this.forceUpdate();
      }
    });
  };

  private onChartReady = (ins: EChartsType) => {
    /**
     * 图表联动会导致 tooltip 也一起展示，需要手动维护联动目标，并进行事件分发。优先级低，暂不处理
     *  {@links https://github.com/apache/echarts/issues/13828 issues}
     */
    ins.group = 'timeseries';
    // echartsCore.connect('timeseries');
  };

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private eventDict = {
    // 图表横向刷取区域后，触发全局时间变更
    brushEnd: (e: { areas: BrushAreaParam[] }) => {
      if (Array.isArray(e?.areas) && e.areas[0]) {
        const brushArea = e.areas[0];
        if (Array.isArray(brushArea?.coordRange)) {
          this.props.onZoom?.(brushArea.coordRange as [number, number]);
        }

        const ins = this.getEChartsIns();
        ins?.dispatchAction({
          type: 'brush',
          areas: [],
        });
      }
    },
  };
}
