declare type DeviceCreateInput = {
  name: string
  type: string
  description: string | null
  acquisition_type: 'bought' | 'rented'
  status: 'ok' | 'warning' | 'danger'
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
  transaction_type: 'insert' | 'remove'
}

declare type InventoryTransactionData = {
  id: string
  created_at: Date
} & InventoryTransactionCreateInput

declare type InventoryTransaction = {
  title: string
} & InventoryTransactionData
