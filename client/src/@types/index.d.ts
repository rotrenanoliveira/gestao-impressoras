declare type DeviceStatus = 'ok' | 'warning' | 'danger'

declare type TransactionType = 'insert' | 'remove'

declare type StorageCapacity = {
  type: 'SSD' | 'HDD'
  capacity: number // in gigabytes
}

declare interface Computer {
  id: string
  name: string
  usedBy: string
  deviceId: string
  status: DeviceStatus
  specs: ComputerSpecs
}
