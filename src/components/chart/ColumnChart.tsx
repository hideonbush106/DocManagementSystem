import { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'

type Props = {
  items: {
    name: string
    color: string
    value: number[]
  }[]
}

const ColumnChart = ({ items }: Props) => {
  const options: ApexOptions = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: {
        show: false
      },
      animations: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
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
      bar: {
        horizontal: false,
        borderRadius: 0,
        columnWidth: '50%',
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: '11px',
              fontWeight: 600,
              fontFamily: 'Poppins, sans-serif',
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
      type: 'category',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  }
  const series: ApexAxisChartSeries = items.map((item) => ({
    name: item.name,
    data: item.value
  }))
  return <Chart type='bar' width='100%' height='95%' options={options} series={series} />
}

export default ColumnChart
