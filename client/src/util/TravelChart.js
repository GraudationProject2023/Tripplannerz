import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export const TravelChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    const initialData = {
      categories: [],
      data: [],
    };

    for (let i = 0; i < 10; i++) {
        initialData.categories.push(new Date().toLocaleTimeString());
        initialData.data.push(Math.floor(Math.random() * 100));
      }

    const options = {
      title: {
        text: 'Travel Preferences',
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: initialData.categories,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: initialData.data,
          type: 'line',
        },
      ],
    };

    myChart.setOption(options);

    const updateData = () => {
      const newData = {
        categories: [...initialData.categories, new Date().toLocaleTimeString()],
        data: [...initialData.data, Math.floor(Math.random() * 100)], 
      };

      myChart.setOption({
        xAxis: {
          data: newData.categories,
        },
        series: [
          {
            data: newData.data,
          },
        ],
      });

      initialData.categories = newData.categories;
      initialData.data = newData.data;
    };

    const intervalId = setInterval(updateData, 10000);

    return () => {
      clearInterval(intervalId);
      myChart.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ height: '400px' }} />;
};
