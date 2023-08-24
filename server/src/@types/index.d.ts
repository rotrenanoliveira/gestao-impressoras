declare type DeviceStatus = 'ok' | 'warning' | 'danger'

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

declare type LicensePrice = {
  value: number // always in cents (multiply value by 100)
  currency: 'BRL' | 'USD' | 'EUR'
}

declare type DeviceCreateInput = {
  name: string
  department: string
}

declare type ComputerCreateInput = {
  deviceId: string
  specs: ComputerSpecs
  usedBy: string
}

declare type ComputerSaveInput = Partial<Omit<ComputerCreateInput, 'deviceId'>>

declare type PrinterCreateInput = {
  ip: string
  deviceId: string
  obs: string | null
  rentedIn: Date | null
  expiresAt: Date | null
}

declare type PrinterSaveInput = Partial<Omit<PrinterCreateInput, 'deviceId'>>

declare type PrinterInkStockCreateInput = {
  name: string
  quantity: number
  printerId: string
}

declare type PrinterInkStockSaveInput = {
  name: string
}

declare type InkStockTransactionCreateInput = {
  operator: string
  type: 'insert' | 'remove'
  inkId: string
}

declare type LicenseCreateInput = {
  description: string
  price: LicensePrice
  obs: string | null
  expiresAt: Date
  initAt: Date
}
