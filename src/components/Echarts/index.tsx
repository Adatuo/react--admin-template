import * as echarts from 'echarts';
import { useEffect, useRef, type CSSProperties, type FC } from 'react';
// 从 ECharts 中导入核心类型
import type { EChartsOption, EChartsType } from 'echarts';
import type { EchartsData } from '../../typings/staticData/home';

// 为组件的 props 定义接口
interface EchartsProps {
  style: CSSProperties;
  chartData: {
    // xData因为可能会有多个,所以就按照实际的类型来定义
    xData: EchartsData['order']['xData'];
    series: EChartsOption['series'];
  };
  isAxisChat?: boolean;
}

const axisOption: EChartsOption = {
  // 图例文字颜色
  textStyle: {
    color: '#333',
  },
  // 提示框
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category', // 类目轴
    data: [],
    axisLine: {
      lineStyle: {
        color: '#17b3a3',
      },
    },
    axisLabel: {
      interval: 0,
      color: '#333',
    },
  },
  yAxis: [
    {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#17b3a3',
        },
      },
    },
  ],
  color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3'],
  series: [],
};

const normalOption: EChartsOption = {
  tooltip: {
    trigger: 'item',
  },
  color: ['#0f78f4', '#dd536b', '#9462e5', '#a6a6a6', '#e1bb22', '#39c362', '#3ed1cf'],
  series: [],
};
//Echarts组件

export const Echarts: FC<EchartsProps> = ({ style, chartData, isAxisChat = true }) => {
  const echartRef = useRef<HTMLDivElement>(null);
  //用useState的话,图形变化会多重触发整个组件重新渲染
  const echartObject = useRef<EChartsType | null>(null);
  useEffect(() => {
    if (!echartObject.current) {
      echartObject.current = echarts.init(echartRef.current);
    }

    if (echartObject.current) {
      let options: EChartsOption;
      if (isAxisChat) {
        //这里的TS后面再改
        axisOption.xAxis.data = chartData.xData;
        axisOption.series = chartData.series;
        options = axisOption;
      } else {
        normalOption.series = chartData.series;
        options = normalOption;
      }
      // 修正了 bug：移除了会无条件覆盖 options 的错误代码
      echartObject.current.setOption(options, true); // true 表示不与之前的 option 合并
    }
  }, [chartData]);
  return <div style={style} ref={echartRef}></div>;
};
