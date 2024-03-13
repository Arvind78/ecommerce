import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const SalesByMonthChart = ({ data }) => {
  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Sales by Month',
    },
    subtitle: {
      text: 'Source:  Shopnow E-commorce ',
    },
    xAxis: {
      categories: data.map((res) => res.name),
    },
    yAxis: {
      title: {
        text: 'Sales',
      },
      gridLineWidth: 0,
    },
    legend: {
      enabled: false,
    },

    tooltip: {
      pointFormat:
        '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>',
    },
    series: [
      {
        name: 'Sales',
        data: data,
        animation: {
          duration: 1000,
        },
      },
    ],
    // Responsive settings
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500, // Adjust as needed based on screen size
          },
          chartOptions: {
            legend: {
              enabled: false, // Disable legend on small screens
            },
          },
        },
      ],
    },
  };

  return data && <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default SalesByMonthChart;
