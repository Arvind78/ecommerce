import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const SalesPieChart = ({ data }) => {
  console.log(data);
  useEffect(() => {
    // Add custom animation to Highcharts for pie series
    (function (H) {
      H.seriesTypes.pie.prototype.animate = function (init) {
        const series = this,
          chart = series.chart,
          points = series.points,
          { animation } = series.options,
          { startAngleRad } = series;

        function fanAnimate(point, startAngleRad) {
          const graphic = point.graphic,
            args = point.shapeArgs;

          if (graphic && args) {
            graphic
              // Set initial animation values
              .attr({
                start: startAngleRad,
                end: startAngleRad,
                opacity: 1,
              })
              // Animate to the final position
              .animate(
                {
                  start: args.start,
                  end: args.end,
                },
                {
                  duration: animation.duration / points.length,
                },
                function () {
                  // On complete, start animating the next point
                  if (points[point.index + 1]) {
                    fanAnimate(points[point.index + 1], args.end);
                  }
                  // On the last point, fade in the data labels, then apply the inner size
                  if (point.index === series.points.length - 1) {
                    series.dataLabelsGroup.animate(
                      {
                        opacity: 1,
                      },
                      void 0,
                      function () {
                        points.forEach((point) => {
                          point.opacity = 1;
                        });
                        series.update(
                          {
                            enableMouseTracking: true,
                          },
                          false
                        );
                        chart.update({
                          plotOptions: {
                            pie: {
                              innerSize: '40%',
                              borderRadius: 8,
                            },
                          },
                        });
                      }
                    );
                  }
                }
              );
          }
        }

        if (init) {
          // Hide points on init
          points?.forEach((point) => {
            point.opacity = 0;
          });
        } else {
          fanAnimate(points[0], startAngleRad);
        }
      };
    })(Highcharts);
  }, []);

  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: 'Sales By Quarter Wise',
    },
    subtitle: {
      text: 'Source:  Shopnow E-commorce ',
    },
    tooltip: {
      // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          connectorColor: 'silver',
        },
      },
    },
    series: [
      {
        name: 'Share',
        data: data,
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500, // Adjust as needed for your design
          },
          chartOptions: {
            plotOptions: {
              pie: {
                dataLabels: {
                  enabled: true, // Disable data labels for small screens
                },
              },
            },
          },
        },
      ],
    },
  };

  return data && <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default SalesPieChart;
