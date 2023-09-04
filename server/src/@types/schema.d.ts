declare interface DeviceSchema {
  id: string
  name: string
  status: DeviceStatus
  department: string
  created_at: string
}

declare interface ComputerSchema {
  id: string
  device_id: string
  specs: ComputerSpecs
  used_by: string
}

declare interface PrinterSchema {
  id: string
  ip: string
  obs: string | null
  rented_in: Date | null
  expires_at: Date | null
  device_id: string
}

declare interface PrinterInkStockSchema {
  id: string
  name: string
  quantity: number
  printer_id: string
}

declare interface InkStockTransactionSchema {
  id: string
  operator: string
  type: 'insert' | 'remove'
  created_at: Date
  ink_id: string
}

declare interface LicenseSchema {
  id: string
  description: string
  init_at: Date
  created_at: Date
  expires_at: Date
  price: LicensePrice
  obs: string | null
}
