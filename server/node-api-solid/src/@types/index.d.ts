const ACQUISITION_TYPE: { [x: string]: 'BOUGHT' | 'RENTED' } = {
  BOUGHT: 'BOUGHT',
  RENTED: 'RENTED',
}

const DEVICE_STATUS: { [x: string]: 'OK' | 'WARNING' | 'DANGER' } = {
  OK: 'OK',
  WARNING: 'WARNING',
  DANGER: 'DANGER',
}

const TRANSACTION_TYPE: { [x: string]: 'INSERT' | 'REMOVE' } = {
  INSERT: 'INSERT',
  REMOVE: 'REMOVE',
}

declare type ACQUISITION_TYPE = (typeof ACQUISITION_TYPE)[keyof typeof ACQUISITION_TYPE]
declare type DEVICE_STATUS = (typeof DEVICE_STATUS)[keyof typeof DEVICE_STATUS]
declare type TRANSACTION_TYPE = (typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE]

declare type DeviceCreateInput = {
  name: string
  type: string
  supplier: string
  status: DEVICE_STATUS

  acquisition_type: ACQUISITION_TYPE
  rented_in: Date | null
  contract_expiration: Date | null

  obs: string | null
  description: string | null
}

declare type Device = {
  id: string
  created_at: Date
} & DeviceCreateInput

declare type InventoryItemCreateInput = {
  title: string
  quantity: number
  location: string
  deviceId: string | null
  description: string | null
}

declare type InventoryItem = {
  id: string
  created_at: Date
  updated_at: Date
} & InventoryItemCreateInput

declare type InventoryTransactionCreateInput = {
  itemId: string
  operator: string
  quantity: number
  transaction_type: TRANSACTION_TYPE
}

declare type InventoryTransactionData = {
  id: string
  created_at: Date
} & InventoryTransactionCreateInput

declare type InventoryTransaction = {
  item: {
    title: string
  }
} & InventoryTransactionData
