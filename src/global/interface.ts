export interface Department {
  id: string
  name: string
  roomMap?: Map<string, Room>
}

export interface Room {
  id: string
  name: string
  capacity: number
  lockerMap?: Map<string, Locker>
}

export interface Locker {
  id: string
  name: string
  capacity: number
  folderMap?: Map<string, FolderTree>
}

export interface Folder {
  id: string
  name: string
  capacity: number
}

export interface File {
  id: string
  name: string
  description: string
  status: string
  storageUrl?: string
  numOfPage: number
  createdAt: Date
  updatedAt: Date
}

export interface FolderTree extends Folder {
  files: File[]
}

export interface LockerTree extends Locker {
  folders: FolderTree[]
}

export interface RoomTree extends Room {
  lockers: LockerTree[]
}

export interface DepartmentTree extends Department {
  rooms: RoomTree[]
}

export interface BorrowRequest {
  document: {
    id: string
  }
  description: string
  startDate: Date
  borrowDuration: number
}

export interface Categories {
  id: string
  department: {
    id: string
  }
}

export interface UpdateCategories extends Categories {
  name: string
}
