import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const EBarChart: React.FC = () => {
  let chartRef: any = useRef(null);

  useEffect(() => {
    chartRef = echarts.init(document.getElementById('bar-chart'));

    const series = [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        stack: 'a',
        name: 'Others',
        label: { show: true },
      },
      {
        data: [10, 46, 64, 50, 30, 35, 40],
        type: 'bar',
        stack: 'a',
        name: 'CSI',
        label: { show: true },
      },
      {
        name: 'HC',
        type: 'line',
        yAxisIndex: 1,
        label: { show: true },
        data: [100, 200, 260, 300, 300, 150, 220],
      },
    ];

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}', // 显示名称和占比  trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      legend: {
        data: ['CSI', 'Others', 'HC'],
      },
      xAxis: {
        type: 'category',
        data: ['24YQ1', '24YQ2', '24YQ3', '24YQ4', '25YQ1', '25YQ2', '25YQ3'],
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter: '{value}',
        },
      },
      yAxis: [
        {
          type: 'value',
          name: 'PO Amount ($)',
          axisLine: {
            show: true,
          },
          axisLabel: {
            formatter: '$ {value}',
          },
        },
        {
          type: 'value',
          name: 'HC',
          min: 0,
          max: 400,
          interval: 50,
          axisLine: {
            show: true,
          },
          axisLabel: {
            formatter: '{value}',
          },
        },
      ],
      series: series,
    };

    // 使用配置项
    chartRef.setOption(option);

    // 清理 chart 实例
    return () => {
      chartRef.dispose();
    };
  }, []);

  return <div id="bar-chart" style={{ width: '100%', height: '600px' }}></div>;
};

export default EBarChart;
