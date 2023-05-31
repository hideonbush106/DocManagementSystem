import Chart from 'react-apexcharts'

const SummaryChart = () => {
  return (
    <>
      <Chart
        type='donut'
        width={280}
        height={280}
        series={[46, 90]}
        options={{
          labels: ['Lending', 'Available'],
          colors: ['var(--red-color)', 'var(--primary-color)'],
          plotOptions: {
            pie: {
              expandOnClick: false,
              donut: {
                labels: {
                  show: true,
                  total: {
                    show: true,
                    showAlways: true,
                    //formatter: () => '343',
                    fontSize: '20px',
                    fontWeight: '600',
                    color: 'var(--black-color)'
                  }
                }
              }
            }
          },
          legend: {
            position: 'bottom',
            offsetX: 10,
            formatter: function (legendName, opts) {
              return legendName + ' - ' + opts.w.globals.series[opts.seriesIndex]
            },
            itemMargin: {
              horizontal: 10
            }
          },
          dataLabels: {
            enabled: false
          },
          chart: {
            offsetX: 20,
            offsetY: 10
          }
        }}
      />
    </>
  )
}
export default SummaryChart
