import { EChartsConfigBuilder } from './components/EChartsConfigBuilder';
import { EChartsGraph } from './components/EChartsGraph';

// ### Tooltip 能力优化 [低优先] [5d]
// - [ ] Tooltip 使用 React Portal 优化渲染性能。 ~~技术方案1：[原生AxisPointer事件](https://github.com/apache/echarts/issues/11865)~~ 技术方案2： [ZRender mouse move事件](https://github.com/perses/perses/pull/266/files#diff-67806350a5015bbdcfc58a2202349c96b8af3d4b3887b15d7725738c1b134145R153)
// - [ ] 优化 Tooltip Single 场景，实现 [the closest series item hover](https://github.com/apache/echarts/issues/15080) 效果。
// - [ ] 优化 Tooltip 展示位置与方向逆转逻辑。依赖 [canvas位置信息](https://github.com/apache/echarts/issues/16908)
const builder = new EChartsConfigBuilder({
  dataset: {
    source: {
      timestamp: [
        1650862200000, 1650862500000, 1650862800000, 1650863100000, 1650863400000, 1650863700000, 1650864000000,
        1650864300000, 1650864600000, 1650864900000, 1650865200000, 1650865500000, 1650865800000, 1650866100000,
        1650866400000, 1650866700000, 1650867000000, 1650867300000, 1650867600000, 1650867900000, 1650868200000,
        1650868500000, 1650868800000, 1650869100000, 1650869400000, 1650869700000, 1650870000000, 1650870300000,
        1650870600000, 1650870900000, 1650871200000, 1650871500000, 1650871800000, 1650872100000, 1650872400000,
        1650872700000, 1650873000000, 1650873300000, 1650873600000, 1650873900000, 1650874200000, 1650874500000,
        1650874800000, 1650875100000, 1650875400000, 1650875700000, 1650876000000, 1650876300000, 1650876600000,
        1650876900000, 1650877200000, 1650877500000,
      ],
      series1: [
        181, 1956, 2286, 2271, 2068, 1640, 1939, 2176, 2179, 2732, 2413, 3895, 4267, 4773, 4794, 6606, 5893, 6240, 7586,
        7543, 7777, 8470, 7914, 9043, 10403, 7946, 6684, 9411, 7483, 6542, 8308, 6309, 8714, 9721, 6112, 6955, 6907,
        7894, 6512, 6554, 6822, 6544, 7482, 7166, 8231, 7295, 8003, 7355, 6364, 6848, 7135, 8226,
      ],
      series2: [
        null,
        3,
        0,
        0,
        3,
        5,
        16,
        0,
        8,
        5,
        2,
        13,
        7,
        36,
        8,
        30,
        23,
        13,
        15,
        18,
        20,
        14,
        11,
        27,
        14,
        13,
        17,
        22,
        3,
        9,
        10,
        5,
        17,
        26,
        29,
        3,
        9,
        22,
        10,
        11,
        1,
        9,
        12,
        21,
        13,
        11,
        22,
        19,
        13,
        20,
        21,
        16,
      ],
    },
    dimensions: [
      {
        name: 'timestamp',
        type: 'time',
      },
      {
        name: 'series1',
        type: 'number',
      },
      {
        name: 'series2',
        type: 'number',
      },
    ],
  },
  series: [
    {
      name: '200',
      encode: {
        x: 'timestamp',
        y: 'series1',
      },
      type: 'line',
      sampling: 'lttb',
      large: true,
      showAllSymbol: false,
      emphasis: {
        disabled: true,
      },
      itemStyle: {
        color: '#529DFF',
      },
      smooth: false,
      lineStyle: {
        width: 1,
        type: 'solid',
      },
      areaStyle: {
        opacity: 0,
      },
      connectNulls: false,
      symbol: 'circle',
      symbolSize: 1,
    },
    {
      name: '404',
      encode: {
        x: 'timestamp',
        y: 'series2',
      },
      type: 'line',
      sampling: 'lttb',
      large: true,
      showAllSymbol: false,
      emphasis: {
        disabled: true,
      },
      itemStyle: {
        color: '#78BD6D',
      },
      smooth: false,
      lineStyle: {
        width: 1,
        type: 'solid',
      },
      areaStyle: {
        opacity: 0,
      },
      connectNulls: false,
      symbol: 'circle',
      symbolSize: 1,
    },
  ] as any,
  animation: false,
  grid: {
    top: 15,
    right: 15,
    bottom: 10,
    left: 0,
    containLabel: true,
  },
  xAxis: {
    type: 'time',
    splitLine: {
      show: true,
    },
    axisLabel: {
      showMinLabel: false,
      showMaxLabel: false,
      hideOverlap: true,
      formatter: '{HH}:{mm}',
    },
    min: 1650862200000,
    max: 1650877500000,
  },
  yAxis: {
    type: 'value',
    show: true,
    axisLabel: {},
  },
  toolbox: {
    show: false,
    feature: {},
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    order: 'seriesAsc',
    transitionDuration: 0,
    appendToBody: true,
  },
  axisPointer: {
    show: true,
    type: 'line',
    animation: false,
    label: {
      show: false,
    },
    triggerTooltip: false,
    link: [
      {
        xAxisIndex: 'all',
      },
    ],
  },
  brush: {
    toolbox: ['lineX', 'clear'],
    xAxisIndex: 0,
    yAxisIndex: 'none',
    brushType: 'lineX',
    transformable: false,
    throttleType: 'debounce',
    throttleDelay: 300,
    removeOnClick: false,
    brushStyle: {
      borderWidth: 1,
      color: 'rgba(120,140,180,0.3)',
      borderColor: 'rgba(120,140,180,0.8)',
    },
    inBrush: {
      colorAlpha: 1,
    },
    outOfBrush: {
      colorAlpha: 1,
    },
  },
});

function App() {
  return (
    <div className="App">
      <EChartsGraph builder={builder} height={800} width={1000} />
    </div>
  );
}

export default App;
