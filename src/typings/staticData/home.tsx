import type { EChartsOption } from "echarts";

export interface staticTableColumns {
  title: string;
  dataIndex: string;
}

export interface staticCountData {
  name: string;
  value: number;
  icon: string;
  color: string;
}

export interface EchartsData {
  order: {
    //xDate因为可能会有多个,所以就按照实际的类型来定义
    xData: string[];
    series: EChartsOption['series']
  },
  user: {
    xData: string[];
    series: EChartsOption['series']
  },
  video: {
    series: EChartsOption['series']
  }
}