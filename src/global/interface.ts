export interface Folder {
  id: string
  name: string
  capacity: number
}

export interface Locker {
  id: string
  name: string
  capacity: number
  folders: Folder[]
}

export interface Room {
  id: string
  name: string
  capacity: number
  lockers: Locker[]
}

export interface Department {
  id: string
  name: string
  rooms: Room[]
}
