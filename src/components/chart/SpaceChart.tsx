import Chart from 'react-apexcharts'

type Props = {
  stored: { stored: number; name: string }[]
  capacity: { capacity: number; name: string }[]
}

const SpaceChart = ({ stored, capacity }: Props) => {
  const freeData = capacity.map((item) => item.capacity - (stored.find((s) => s.name === item.name)?.stored || 0))

  return (
    <>
      <Chart
        type='bar'
        width={'95%'}
        height={'95%'}
        series={[
          {
            name: 'Stored',
            data: stored.map((item) => item.stored),
            color: 'var(--blue-background-color)'
          },
          {
            name: 'Free',
            data: freeData,
            color: 'var(--gray-color)'
          }
        ]}
        options={{
          chart: {
            stacked: true,
            offsetY: -10,
            toolbar: {
              show: false
            }
          },
          plotOptions: {
            bar: {
              horizontal: true,
              barHeight: '60vh'
            }
          },
          xaxis: {
            categories: capacity.map((item) => item.name)
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
