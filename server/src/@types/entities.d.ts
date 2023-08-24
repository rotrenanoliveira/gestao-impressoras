declare interface Device {
  id: string
  name: string
  status: DeviceStatus
  department: string
}

declare interface Computer {
  id: string
  deviceId: string
  name: string
  status: DeviceStatus
  specs: ComputerSpecs
  usedBy: string
}

declare interface Printer {
  id: string
  ip: string
  deviceId: string
  name: string
  status: DeviceStatus
  rentedIn: Date | null
  expiresAt: Date | null
  obs: string | null
}

declare interface PrinterInkStock {
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

declare interface License {
  id: string
  initAt: Date
  expiresAt: Date
  createdAt: Date
  description: string
  price: LicensePrice
  obs: string | null
}
