import { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'

type Props = {
  items: {
    name: string
    color: string
    value: number
  }[]
}

const AnalysisChart = ({ items }: Props) => {
  const options: ApexOptions = {
    chart: {
      animations: {
        enabled: false
      }
    },
    labels: items.map((item) => item.name),
    colors: items.map((item) => item.color),
    legend: {
      position: 'top',
      formatter: function (legendName, opts) {
        return legendName + ' - ' + opts.w.globals.series[opts.seriesIndex]
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5
      }
    },
    dataLabels: {
      enabled: false
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
    ]
  }
  const series: ApexNonAxisChartSeries = items.map((item) => item.value)

  return <Chart type='donut' width='100%' height='100%' options={options} series={series} />
}

export default AnalysisChart
