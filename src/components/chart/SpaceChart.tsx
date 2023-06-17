import Chart from 'react-apexcharts'

const SpaceChart = () => {
  return (
    <>
      <Chart
        type='bar'
        width={'100%'}
        height={'95%'}
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
              columnWidth: '50%'
            }
          },
          xaxis: {
            categories: ['HR', 'Accountant', 'Sales']
          },
          legend: {
            position: 'bottom',
            offsetX: 15,
            offsetY: 10,
            height: 35,
            itemMargin: {
              horizontal: 20
            }
          },
          dataLabels: {
            enabled: true
          },
          grid: {
            show: false
          },
          responsive: [
            // {breakpoint: }
          ]
        }}
      />
    </>
  )
}

export default SpaceChart
