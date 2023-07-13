import { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'

type Props = {
  items: {
    name: string
    color: string
    value: number[]
  }[]
}

const MonthlyChart = ({ items }: Props) => {
  const options: ApexOptions = {
    chart: {
      type: 'line',
      stacked: false,
      toolbar: {
        show: false
      },
      animations: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: true
    },
    labels: items.map((item) => item.name),
    colors: items.map((item) => item.color),
    legend: {
      position: 'top',
      itemMargin: {
        horizontal: 10,
        vertical: 5
      }
    },
    plotOptions: {
      pie: {
        customScale: 0.9,
        expandOnClick: false,
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              fontSize: '22px',
              fontWeight: '600',
              color: 'var(--black-color)'
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 900,
        options: {
          legend: {
            position: 'right'
          }
        }
      },
      {
        breakpoint: 600,
        options: {
          legend: {
            position: 'bottom'
          }
        }
      }
    ],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yaxis: [
      {
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: 'var(--black-light-color)'
        },
        labels: {
          style: {
            colors: 'var(--black-color)'
          }
        }
      }
    ]
  }
  const series: ApexAxisChartSeries = items.map((item) => ({
    name: item.name,
    data: item.value
  }))

  return <Chart type='line' width='100%' height='95%' options={options} series={series} />
}

export default MonthlyChart
