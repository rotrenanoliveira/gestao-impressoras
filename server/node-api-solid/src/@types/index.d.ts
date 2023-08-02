declare const ACQUISITION_TYPE: { [x: string]: 'BOUGHT' | 'RENTED' } = {
  BOUGHT: 'BOUGHT',
  RENTED: 'RENTED',
}

declare const DEVICE_STATUS: { [x: string]: 'OK' | 'WARNING' | 'DANGER' } = {
  OK: 'OK',
  WARNING: 'WARNING',
  DANGER: 'DANGER',
}

declare const TRANSACTION_TYPE: { [x: string]: 'INSERT' | 'REMOVE' } = {
  INSERT: 'INSERT',
  REMOVE: 'REMOVE',
}

declare type ACQUISITION_TYPE = (typeof ACQUISITION_TYPE)[keyof typeof ACQUISITION_TYPE]
declare type DEVICE_STATUS = (typeof DEVICE_STATUS)[keyof typeof DEVICE_STATUS]
declare type TRANSACTION_TYPE = (typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE]

declare type DeviceCreateInput = {
  name: string
  type: string
  description: string | null
  acquisition_type: ACQUISITION_TYPE
  status: DEVICE_STATUS
}

declare type Device = {
  id: string
  created_at: Date
} & DeviceCreateInput

declare type RentedDeviceCreateInput = {
  device_id: string
  supplier: string
  rented_in: Date
  contract_expiration: Date
  obs: string | null
}

declare type RentedDevice = {
  id: string
  created_at: Date
} & RentedDeviceCreateInput

declare type ItemCreateInput = {
  title: string
  quantity: number
  location: string
  device_id: string | null
  description: string | null
}

declare type Item = {
  id: string
  created_at: Date
  updated_at: Date
} & ItemCreateInput

declare type InventoryTransactionCreateInput = {
  item_id: string
  operator: string
  quantity: number
  transaction_type: TRANSACTION_TYPE
}

declare type InventoryTransactionData = {
  id: string
  created_at: Date
} & InventoryTransactionCreateInput

declare type InventoryTransaction = {
  title: string
} & InventoryTransactionData
