const chartData = {
  type: 'line',
  height: 115,
  options: {
    chart: {
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#fff'],

    stroke: {
      curve: 'smooth',
      width: 3
    },
    yaxis: {
      min: 0,
      max: 10
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: () => 'APR per Day'
        }
      },
      marker: {
        show: true
      }
    }
  },
  series: [
    {
      name: 'APRs',
      data: [4.3, 3.5, 2.5, 2.2, 3.0, 5.0 ,1.6,4.3, 3.5, 2.5, 2.2, 3.0, 5.0 ,1.6]
    }
  ]
};

export default chartData;
