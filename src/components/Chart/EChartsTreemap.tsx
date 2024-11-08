import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import mockData from './userData.json';

const EChartsTreemap = (props: any) => {
  let chartRef: any = useRef(null);
  const [data, setData] = useState(mockData.children);

  const { type, mapTreeSplit } = props;

  const getLevelOption = () => {
    return [
      {
        itemStyle: {
          borderColor: '#777',
          borderWidth: 0,
          gapWidth: 1,
        },
        upperLabel: {
          show: false,
        },
      },
      {
        itemStyle: {
          borderColor: '#555',
          borderWidth: 5,
          gapWidth: 1,
        },
        emphasis: {
          itemStyle: {
            borderColor: '#ddd',
          },
        },
      },
      {
        colorSaturation: [0.35, 0.5],
        itemStyle: {
          borderWidth: 5,
          gapWidth: 1,
          borderColorSaturation: 0.6,
        },
      },
    ];
  };

  const treemapOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%', // 显示名称和占比
    },

    series: [
      {
        type: 'treemap',
        id: 'echarts-package-size',
        animationDurationUpdate: 1000,
        roam: false,
        nodeClick: undefined,
        data: data,
        universalTransition: true,
        upperLabel: {
          show: true,
          height: 30,
        },
        label: {
          show: true,
        },
        breadcrumb: {
          show: false,
        },
        name: 'Disk Usage',
        visibleMin: 300,
        itemStyle: {
          borderColor: '#fff',
        },
        levels: getLevelOption(),
      },
    ],
  };

  const sunburstOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%', // 显示名称和占比
    },
    series: [
      {
        type: 'sunburst',
        id: 'echarts-package-size',
        radius: ['20%', '90%'],
        animationDurationUpdate: 1000,
        nodeClick: undefined,
        data: data,
        universalTransition: true,
        itemStyle: {
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,.5)',
        },
        label: {
          show: false,
        },
      },
    ],
  };

  useEffect(() => {
    const current = mockData.children.map((d: any) => {
      d.label = {
        show: true,
      };
      d.children.map((c: any) => {
        if (c.name === 'CSI') {
          c.label = {
            show: true,
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333',
            textBorderColor: '#ffffff',
            textBorderWidth: 2,
          };
        }
        return c;
      });
      return d;
    });

    setData(current);
    // 清理 chart 实例
    return () => {
      chartRef.dispose();
    };
  }, []);

  useEffect(() => {
    chartRef = echarts.init(document.getElementById('treemap'));

    // 使用配置项
    chartRef.setOption(
      type ? sunburstOption : { ...treemapOption, levels: getLevelOption() },
    );
    console.log(chartRef);
    chartRef.resize();

  }, [data, type, mapTreeSplit]);

  return <div id="treemap" style={{ width: '100%', height: '600px' }}></div>;
};

export default EChartsTreemap;
