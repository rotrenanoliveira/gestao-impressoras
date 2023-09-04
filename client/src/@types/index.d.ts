declare type DeviceStatus = 'ok' | 'warning' | 'danger'

declare type TransactionType = 'insert' | 'remove'

declare type StorageCapacity = {
  type: 'SSD' | 'HDD'
  capacity: number // in gigabytes
}
declare type ComputerSpecs = {
  hostname: string
  processor: string
  storage: StorageCapacity
  ram: string
  so: string
  office: string | null
}

declare interface Computer {
  id: string
  name: string
  usedBy: string
  deviceId: string
  department: string
  status: DeviceStatus
  specs: ComputerSpecs
}

declare interface Printer {
  id: string
  ip: string
  deviceId: string
  name: string
  department: string
  status: DeviceStatus
  rentedIn: Date | null
  expiresAt: Date | null
  obs: string | null
}

declare interface PrinterInk {
  id: string
  name: string
  quantity: number
  printer: {
    id: string
    name: string
  }
}

declare interface InkStockTransaction {
  id: string
  operator: string
  type: 'insert' | 'remove'
  createdAt: Date
  ink: {
    id: string
    name: string
  }
}
