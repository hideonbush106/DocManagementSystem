import Chart from 'react-apexcharts'

const SpaceChart = () => {
  return (
    <>
      <Chart
        type='bar'
        width={350}
        height={200}
        series={[
          {
            name: 'Stored',
            data: [345, 578, 698],
            color: 'var(--blue-background-color)'
          },
          {
            name: 'Free',
            data: [167, 178, 338],
            color: 'var(--gray-light-color)'
          }
        ]}
        options={{
          chart: {
            stacked: true,
            offsetX: -15
          },
          plotOptions: {
            bar: {
              horizontal: true,
              columnWidth: '100%'
            }
          },
          xaxis: {
            categories: ['HR', 'Accountant', 'Sales']
          },
          legend: {
            position: 'bottom',
            itemMargin: {
              horizontal: 20
            }
          },
          dataLabels: {
            enabled: true
          },
          grid: {
            show: false,
            xaxis: {
              lines: {
                show: false
              }
            },
            yaxis: {
              lines: {
                show: false
              }
            }
          }
        }}
      />
    </>
  )
}

export default SpaceChart
