export type fakeDataProps = {
  id: number
  department: string
  room: {
    id: number
    name: string
    locker: {
      id: string
      name: string
    }[]
  }[]
}[]

export const fakeData: fakeDataProps = [
  {
    id: 1,
    department: 'Human Resources',
    room: [
      {
        id: 1,
        name: 'Room 1',
        locker: [
          {
            id: 'Locker 1',
            name: 'Locker 1'
          },
          {
            id: 'Locker 2',
            name: 'Locker 2'
          },
          {
            id: 'Locker 3',
            name: 'Locker 3'
          }
        ]
      },
      {
        id: 2,
        name: 'Room 2',
        locker: [
          {
            id: 'Locker 1',
            name: 'Locker 1'
          },
          {
            id: 'Locker 2',
            name: 'Locker 2'
          },
          {
            id: 'Locker 3',
            name: 'Locker 3'
          }
        ]
      },
      {
        id: 3,
        name: 'Room 3',
        locker: [
          {
            id: 'Locker 1',
            name: 'Locker 1'
          },
          {
            id: 'Locker 2',
            name: 'Locker 2'
          },
          {
            id: 'Locker 3',
            name: 'Locker 3'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    department: 'IT',
    room: [
      {
        id: 1,
        name: 'Room 1',
        locker: [
          {
            id: 'Locker 1',
            name: 'Locker 1'
          },
          {
            id: 'Locker 2',
            name: 'Locker 2'
          },
          {
            id: 'Locker 3',
            name: 'Locker 3'
          }
        ]
      },
      {
        id: 2,
        name: 'Room 2',
        locker: [
          {
            id: 'Locker 1',
            name: 'Locker 1'
          },
          {
            id: 'Locker 2',
            name: 'Locker 2'
          },
          {
            id: 'Locker 3',
            name: 'Locker 3'
          }
        ]
      },
      {
        id: 3,
        name: 'Room 3',
        locker: [
          {
            id: 'Locker 1',
            name: 'Locker 1'
          },
          {
            id: 'Locker 2',
            name: 'Locker 2'
          },
          {
            id: 'Locker 3',
            name: 'Locker 3'
          }
        ]
      }
    ]
  }
]
