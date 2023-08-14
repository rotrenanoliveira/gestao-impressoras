declare type Device = {
  id: string
  name: string
  type: string
  supplier: string
  status: string
  acquisition_type: 'RENTED' | 'BOUGHT'
  created_at: string
  rented_in: string | null
  contract_expiration: string | null
  description: string | null
  obs: string | null
}

declare type Inventory = {
  id: string
  title: string
  quantity: number
  location: string
  created_at: string
  updated_at: string
  description: null | string
  device_id: string
}

declare type InventoryTransaction = {
  id: string
  item_id: string
  operator: string
  quantity: string
  transaction_type: 'INSERT' | 'REMOVE'
  created_at: string
  item: {
    title: string
  }
}
