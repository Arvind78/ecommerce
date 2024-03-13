import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const SalesByCategoryChart = ({ data }) => {
  const options = {
    chart: {
      type: 'spline', // Specify the chart type as 'line'
    },
    legend: {
      enabled: false,
    },
    title: {
      text: 'Sales by Category',
    },
    subtitle: {
      text: 'Source:  Shopnow E-commorce ',
    },
    xAxis: {
      categories: data?.map((dataPoint) => dataPoint?.name), // Set category names as X-axis labels
      title: {
        text: 'Category',
      },
    },
    yAxis: {
      title: {
        text: 'Sales',
      },
      gridLineWidth: 0,
    },
    tooltip: {
      headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
      pointFormat:
        '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>',
    },
    series: [
      {
        name: 'Sales',
        data: data?.map((dataPoint) => dataPoint?.y), // Extract Y values for the series data
      },
    ],
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {data && <HighchartsReact highcharts={Highcharts} options={options} />}
    </div>
  );
};

export default SalesByCategoryChart;
