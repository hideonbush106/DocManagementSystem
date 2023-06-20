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
  name: string
  department: {
    id: string
  }
}

export interface UpdateCategories {
  id: string
  name: string
  department: {
    id: string
  }
}

export interface CreateDepartment {
  name: string
}

export interface UpdateDepartment extends CreateDepartment {
  id: string
}

export interface CreateDocument {
  name: string
  description: string
  numOfPages: number
  folder: {
    id: string
  }
  category: {
    id: string
  }
}

export interface ConfirmDocument {
  id: string
  locationQRcode: string
}

export interface CreateFolder {
  name: string
  capacity: number
  locker: {
    id: string
  }
}

export interface UpdateFolder {
  id: string
  name: string
  capacity: number
}

export interface UpdateLocker {
  id: string
  name: string
  capacity: number
}

export interface CreateLocker {
  name: string
  capacity: number
  room: {
    id: string
  }
}

export interface CreateRoom {
  name: string
  capacity: number
  department: {
    id: string
  }
}

export interface UpdateRoom {
  id: string
  name: string
  capacity: number
}

export interface ImportRequest {
  document: {
    name: string
    description: string
    numOfPages: number
    folder: {
      id: string
    }
    category: {
      id: string
    }
  }
  description: string
}

export interface RejectImportRequest {
  id: string
  rejectReason: string
}
